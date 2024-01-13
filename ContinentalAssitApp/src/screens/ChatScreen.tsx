import React, { useContext, useEffect, useState, } from 'react';
import { View, Text, TextInput, TouchableOpacity, 
        ScrollView, KeyboardAvoidingView, Platform, 
        ActivityIndicator, Alert, Image } from 'react-native';
import { Style } from '../theme/ChatCSS';
import {  database, ref, push, child, update, onChildAdded, onChildChanged, serverTimestamp,
            DataSnapshot, set, onValue, dbRef } from '../api/firebaseApi';
import { firebaseContext } from '../context/firebaseContext';
import { MessageChat, MensajeRespuesta } from '../interfaces/firebaseUser';
import Icon from 'react-native-vector-icons/FontAwesome';
 import { AuthContext } from '../context/authContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}


export const ChatScreen = ({navigation}: Props) => {
  const { t } = useTranslation();
  const [newMessage, setNewMessage] = useState('');
  const { sendMessage, messages, uploadFile, motivoMensaje, ordenRegistrada, logoutChat } = useContext(firebaseContext);
  const { idioma } = useContext(AuthContext);
  const [listaMensajes, setListaMensajes] = useState<MessageChat[]>([]);
  const [isAttachButtonVisible, setAttachButtonVisible] = useState(false); // Nueva variable de estado
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState<MessageChat | null>(null);
  

  useEffect(() => {    
    iniciarChat();
    inicializarChat();
  }, []); 
  
  
  const iniciarChat = async () => {
    // Establece el mensaje de bienvenida
    setWelcomeMessage({
      mensaje: idioma == 'es' ? 'Bienvenido a Continental Assist, ¿En qué podemos ayudarte?'
      : 'Welcome to Continental Assist, how can we help you?',
      fecha: Date.now(),
      isSent: false, // Asume que el mensaje de bienvenida es un mensaje enviado
    });
  
    // Aquí va el código para conectar con Firebase y empezar a escuchar por nuevos mensajes
  };
  


  const inicializarChat = async () => {
    
    // setIsLoading(true);

    const mensajesRef = ref(database, 'mensajes/' + ordenRegistrada);
    const dbRef = ref(database, 'mensajes/CO-NTINEN-TAL/' + ordenRegistrada);
    const userRefa = ref(database, 'users/' + ordenRegistrada);

      onChildAdded(mensajesRef, (snapshot) => {
        const mensajeEntrada = snapshot.val() as MessageChat;
        setListaMensajes((prevListaMensajes) => [...prevListaMensajes, mensajeEntrada]);
        setIsLoading(false);
      });

      // Escucha por nuevos mensajes de salida
      onChildAdded(dbRef, (snapshot) => {
        const mensajeSalida = snapshot.val() as MensajeRespuesta;
        setListaMensajes((prevListaMensajes) => [...prevListaMensajes, { ...mensajeSalida, isSent: false }]);
      });

       setListaMensajes((prevListaMensajes) => prevListaMensajes.sort((a:any, b:any) => a.fecha - b.fecha));

      const archviAdjutno = onValue(userRefa, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setAttachButtonVisible(data.chatEnviarAdjunto);
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
        tipo: motivoMensaje,
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

  const SalirChat = () => {
    Alert.alert('Salir del Chat', '¿Deseas salir del Chat?', [
      {
        text: 'Cancelar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Salir', onPress: () => CerrarSessionChat()},
    ]);
  
  }

  const  CerrarSessionChat = async () => {
    await logoutChat();
    navigation.navigate('MiPlan');
  }
  

  return (
    <>
     {isLoading ? ( 
       <ActivityIndicator size="large" color="#0000ff" />
       ) : (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={Style.container}
        > 
          <View style={Style.BotonSalirContainer}>
            <TouchableOpacity style={Style.BotonSalir} onPress={ SalirChat }>
              <Text style={Style.BotonSalirText}>{t('chat.botonSalir')}</Text>
            </TouchableOpacity>
          </View>    
          <View style={Style.container}>
            <ScrollView contentContainerStyle={Style.messagesContainer}>
              {[
                welcomeMessage,
                ...listaMensajes.filter(Boolean)
              ].map((message, index) => {
                let date;
                if ((message && message.fecha && typeof message.fecha === 'number') ) {
                  date = new Date(message.fecha);
                } else if (message && message.fecha && 'seconds' in (message.fecha as object)) {
                  date = new Date((message.fecha as { seconds: number }).seconds * 1000);
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
                        backgroundColor: message?.isSent ? '#F2DB85' : '#00184C',
                        alignSelf: message?.isSent ? 'flex-end' : 'flex-start',
                      },
                    ]}
                  >
                    {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
                    {message && message.mensaje && message.mensaje.startsWith('http') ? (
                      <Image source={{uri:message.mensaje}} 
                          style={{ width: 100, height: 100 }}  
                          onLoadStart={() => setIsLoading(true)} 
                          onLoadEnd={() => setIsLoading(false)}
                        /> // Ajusta el tamaño según tus necesidades
                    ) : (
                      <Text style={[Style.mensajeText,
                        {
                          color: message?.isSent ? '#000' : '#fff',
                        },
                      ]}>
                        {message?.mensaje}
                      </Text>
                    )}
                    <Text style={Style.timestamp}>{dateString} {timeString}
                    {!message?.isSent && (
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
              {isAttachButtonVisible && (
                <TouchableOpacity style={Style.attachButton} onPress={handleAttachFile}>
                  <Icon name="paperclip" size={20} color="#000" />
                </TouchableOpacity>
              )}
              <TouchableOpacity style={Style.sendButton} onPress={handleSendMessage}>
                <Text style={Style.sendButtonText}>{t('chat.botonEnviar')}</Text>
              </TouchableOpacity>
            </View>
          </View>

        </KeyboardAvoidingView>
      )}
    </>
  );
}


