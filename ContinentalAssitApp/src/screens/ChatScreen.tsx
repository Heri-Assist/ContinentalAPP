import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, 
        ScrollView, KeyboardAvoidingView, Platform, 
        ActivityIndicator, Alert, Image } from 'react-native';
import { Style } from '../theme/ChatCSS';
import { firebase, database, storage, ref, getDownloadURL, 
            uploadBytesResumable, push, child, update, onChildAdded, onChildChanged, serverTimestamp,
            DataSnapshot, set, onValue } from '../api/firebaseApi';
import { firebaseContext } from '../context/firebaseContext';
import { MessageChat } from '../interfaces/firebaseUser';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/authContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ca } from 'date-fns/locale';

export const ChatScreen = () => {
  const [newMessage, setNewMessage] = useState('');
  const { sendMessage, getMessages, messages, uploadFile } = useContext(firebaseContext);
  const { usuarioRegistro, idioma } = useContext(AuthContext);
  const [listaMensajes, setListaMensajes] = useState<MessageChat[]>([]);
  const [motivoChat, setMotivoChat] = useState(''); // Nueva variable de estado
  const [isAttachButtonVisible, setAttachButtonVisible] = useState(true); // Nueva variable de estado
  const [ordenRegistrada, setOrdenRegistrada] = useState('') ;
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {

    let voucher:any = usuarioRegistro?.codigo.split('-')
    const  longitud:any = voucher?.length;
    voucher = (longitud > 3) ? voucher[0]+'-'+voucher[1]+'-'+voucher[2]+'-'+usuarioRegistro?.cantidad+'-'+voucher[3] 
	  															 : voucher[0]+'-'+voucher[1]+'-'+usuarioRegistro?.cantidad+'-'+voucher[2];
    setOrdenRegistrada(voucher);
    getMessages();
    inicializarChat();
    const welcomeMessage: MessageChat = {
      de: 'CO-NTINEN-TAL',
      mensaje: idioma == 'es' ? 'Bienvenido a Continental Assist, ¿En qué podemos ayudarte?'
                              :'Welcome to Continental Assist, how can we help you?',
      fecha: Date.now(),
      tipo: '1',
      nombreArchivo: '',
      isSent: false,
    };
    sendMessage(welcomeMessage);
  }, []);

  const inicializarChat = async () => {
    
    
    const mensajesRef = ref(database, 'mensajes/CO-NTINEN-TAL/' + ordenRegistrada);

    onChildAdded(mensajesRef, (snapshot) => {
      if (snapshot.val().tipo === '1') {
        setListaMensajes((prevListaMensajes) => [...prevListaMensajes, snapshot.val() as MessageChat]);
      }
    });

    const mensajesOrdenRef = ref(database, 'mensajes/' + ordenRegistrada);

    onChildAdded(mensajesOrdenRef, (snapshot) => {
      if (snapshot.val().tipo === '1') {
        setListaMensajes((prevListaMensajes) => [...prevListaMensajes, snapshot.val() as MessageChat]);
      }
    });

    const usersRef = ref(database, 'users/' + ordenRegistrada);
    onChildChanged(usersRef, (snapshot) => {
      if (snapshot.key === 'chatEnviarAdjunto') {
        handleAttachFile(snapshot.val());
      }
    });
  }

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

  const handleFileSelected = async (response:any) => {
    console.log('file', response);
    const { uri, fileName } = response.assets[0];
    const blob = await fetch(uri).then(r => r.blob());
    setIsLoading(true);
    try{
      const urlImage = await uploadFile({ blob, name: fileName });
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

