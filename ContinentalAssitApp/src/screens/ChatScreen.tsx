import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, 
        ScrollView, KeyboardAvoidingView, Platform, 
        ActivityIndicator, Alert, Image } from 'react-native';
import { Style } from '../theme/ChatCSS';
import { firebase, database, storage, ref, getDownloadURL, get,
            uploadBytesResumable, push, child, update, onChildAdded, onChildChanged, serverTimestamp,
            DataSnapshot, set, onValue, dbRef } from '../api/firebaseApi';
import { firebaseContext } from '../context/firebaseContext';
import { MessageChat } from '../interfaces/firebaseUser';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/authContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { t, use } from 'i18next';


export const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('');
  const { sendMessage, getMessages, messages, uploadFile, motivoMensaje, ordenRegistrada } = useContext(firebaseContext);
  const { usuarioRegistro, idioma } = useContext(AuthContext);
  const [listaMensajes, setListaMensajes] = useState<MessageChat[]>([]);
  const [motivoChat, setMotivoChat] = useState(''); // Nueva variable de estado
  const [isAttachButtonVisible, setAttachButtonVisible] = useState(true); // Nueva variable de estado
  // const [ordenRegistrada, setOrdenRegistrada] = useState('') ;
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {    
    console.log('ListaMensajes', listaMensajes)
    console.log('motivoMensaje=====>', motivoMensaje);
    console.log('ordenRegistrada', ordenRegistrada);
    getMessages();
    inicializarChat(); 
      sendMessage(welcomeMessage);
  }, []); 
  

  const welcomeMessage: MessageChat = {
    de: 'CO-NTINEN-TAL',
    mensaje: idioma == 'es' ? 'Bienvenido a Continental Assist, ¿En qué podemos ayudarte?'
                            : 'Welcome to Continental Assist, how can we help you?',
    fecha: Date.now(),
    tipo: '1',
    nombreArchivo: '',
    isSent: false,
  };


  const inicializarChat = async () => {
    
    const mensajesRef = ref(database, 'mensajes/CO-NTINEN-TAL/' + ordenRegistrada);
      onChildAdded(mensajesRef, (snapshot) => {
        console.log('snapshot.val()', snapshot.val());
        if (snapshot.val().tipo === motivoMensaje) {
          setListaMensajes((prevListaMensajes) => [...prevListaMensajes, snapshot.val() as MessageChat]);
          console.log('listaMensajes', listaMensajes)
        }
    });
    

    const mensajesOrdenRef = ref(database, 'mensajes/' + ordenRegistrada);

    onChildAdded(mensajesOrdenRef, (snapshot) => {
      if (snapshot.val().tipo === motivoMensaje) {
        setListaMensajes((prevListaMensajes) => [...prevListaMensajes, snapshot.val() as MessageChat]);
        console.log('listaMensajes', listaMensajes)
      }
    });

    const usersRef = ref(database, 'users/' + ordenRegistrada);
    onChildChanged(usersRef, (snapshot) => {
      if (snapshot.key === 'chatEnviarAdjunto') {
        handleAttachFile(snapshot.val());
        console.log('snapshot.val ---------------', snapshot.val());
      }
    });
  }


  // const obtenerTablas = () => {
  //   try {
  //     onValue(dbRef, (snapshot) => {
  //       if (snapshot.exists()) {
  //         const tablas = Object.keys(snapshot.val());
  //         console.log('Tablas existentes:', tablas);
  //       } else {
  //         console.log('No hay tablas en la base de datos.');
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error al obtener las tablas:', error);
  //   }
  // };



  // onValue(dbRef, (snapshot) => {
  //   const data = snapshot.val(); // Obtiene todos los datos de la base de datos
  //   console.log(data);
  // });



const usersRef = child(dbRef, 'users'); // Referencia a la tabla "users"
const mensajesRef = child(dbRef, 'mensajes'); // Referencia a la tabla "mensajes"

// get(usersRef).then((snapshot) => {
//   if (snapshot.exists()) {
//     const primerUsuario = snapshot.val();
//     console.log('Primer registro de la tabla "users":', primerUsuario);
//   } else {
//     console.log('No hay registros en la tabla "users".');
//   }
// }).catch((error) => {
//   console.error('Error al obtener el primer registro de "users":', error);
// });

// Obtener el primer registro de la tabla "mensajes"
// get(mensajesRef).then((snapshot) => {
//   if (snapshot.exists()) {
//     const primerMensaje = snapshot.val();
//     console.log('Primer registro de la tabla "mensajes":', primerMensaje);
//   } else {
//     console.log('No hay registros en la tabla "mensajes".');
//   }
// }).catch((error) => {
//   console.error('Error al obtener el primer registro de "mensajes":', error);
// });


// Función para buscar el registro por su clave única
// const buscarRegistroPorClave = () => {
//   const registroRef = ref(database, 'users/' + 'CA-KL0BI4-3-COM');

//   get(registroRef).then((snapshot) => {
//     if (snapshot.exists()) {
//       const registro = snapshot.val();
//       console.log('Registro encontrado:', registro);
//     } else {
//       console.log('No se encontró ningún registro con la clave:');
//     }
//   }).catch((error) => {
//     console.error('Error al buscar el registro:', error);
//   });
// };

// buscarRegistroPorClave();

  const handleSendMessage = async () => {

    const msgId = push(child(ref(database, 'mensajes'), ordenRegistrada)).key;
    console.log('msgId', msgId);

    if (newMessage.trim() !== '') {
      const message: MessageChat = {
        mensaje: newMessage,
        fecha: serverTimestamp(),
        de: ordenRegistrada,
        tipo: '1',
        nombreArchivo: '',
        isSent: true,
      };
      await sendMessage(message);      
      setNewMessage('');
    }
  }
  	
  const handleAttachFile = async (file:any) => {

    Alert.alert('Adjuntar Imagen', '¿Deseas adjuntar una Imagen?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Cámara', onPress: () => launchCamera({ mediaType: 'photo' }, handleFileSelected) },
      { text: 'Galería', onPress: () => launchImageLibrary({ mediaType: 'photo' }, handleFileSelected) },
    ]);

    // await uploadFile(file);
  };

  const handleFileSelected = async (response: any) => {
    console.log('file', response);
    const { uri, fileName } = response.assets[0];
    const blob = await fetch(uri).then(r => r.blob());
    setIsLoading(true);
    try{
      //@ts-ignore
      const urlImage:string = await uploadFile({ blob, name: fileName });
      console.log('urlImage', urlImage);
      const message: MessageChat = {
        mensaje: urlImage,
        fecha: serverTimestamp(),
        de: ordenRegistrada,
        tipo: '1',
        nombreArchivo: fileName,
        isSent: true,
      };
      await sendMessage(message);
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={Style.container}
    >
      <View style={Style.container}>
        <ScrollView contentContainerStyle={Style.messagesContainer}>
        {messages.map((message, index) => {
         let date;
         if (typeof message.fecha === 'number') {
           date = new Date(message.fecha);
         } else if ('seconds' in message.fecha) {
           date = new Date(message.fecha.seconds * 1000);
         } else {
           date = new Date();
         }
          const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
          const timeString = `${date.getHours()}:${date.getMinutes()}`;

            return (
              <View
                key={index}
                style={[
                  Style.message,
                  {
                    backgroundColor: message.isSent ? '#F2DB85' : '#00184C',
                    alignSelf: message.isSent ? 'flex-end' : 'flex-start',
                  },
                ]}
              >
                {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                {message.mensaje.startsWith('http') ? (
                  <Image source={{uri:message.mensaje}} 
                      style={{ width: 100, height: 100 }}  
                      onLoadStart={() => setIsLoading(true)} 
                      onLoadEnd={() => setIsLoading(false)}
                     /> // Ajusta el tamaño según tus necesidades
                ) : (
                  <Text style={[Style.mensajeText,
                    {
                      color: message.isSent ? '#000' : '#fff',
                    },
                  ]}>
                    {message.mensaje}
                  </Text>
                )}
                <Text style={Style.timestamp}>{dateString} {timeString}
                {!message.isSent && (
                 <Text style={Style.receivedMessage}>
                    <Icon name="check" size={10} color="#F2DB85" />
                 </Text>
                )}
                </Text>
              </View>
              
            );
          })}
        </ScrollView>
        <View style={Style.inputContainer}>
          <TextInput
            style={Style.input}
            placeholder="Escribe tu mensaje..."
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
          />
          {isAttachButtonVisible && ( // Solo muestra el botón si isAttachButtonVisible es true
            <TouchableOpacity style={Style.attachButton} onPress={handleAttachFile}>
              <Icon name="paperclip" size={20} color="#000" />
            </TouchableOpacity>
          )}
          <TouchableOpacity style={Style.sendButton} onPress={handleSendMessage}>
            <Text style={Style.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


