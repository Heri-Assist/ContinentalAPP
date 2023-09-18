import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Style } from '../theme/ChatCSS';
import { firebaseContext } from '../context/firebaseContext';
import { MessageChat } from '../interfaces/firebaseUser';


export const ChatScreen = () => {
  const [messages, setMessages] = useState<MessageChat[]>([]); // Cambié el tipo de Message a Message[]
  const [newMessage, setNewMessage] = useState('');
	const { sendMessage } = useContext(firebaseContext);

  const handleSendMessage = async () => {
		if (newMessage.trim() !== '') {
			// Crea un nuevo mensaje
			const message: MessageChat = {
				id: '51548484',
				text: newMessage,
				isSent: true,
				timestamp: Date.now(),
			};

			await sendMessage(message);

			// Crea un nuevo array con todos los mensajes anteriores y el nuevo mensaje
			const updatedMessages = [...messages, message];
	
			// Actualiza el estado de mensajes con el nuevo array
			setMessages(updatedMessages);
	
			// Limpia el campo de entrada
			setNewMessage('');
		}
	};
	
  return (
    <View style={Style.container}>
      <ScrollView contentContainerStyle={Style.messagesContainer}>
        {messages.map((message, index) => (
				
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
							<Text>{message.text}</Text>
						</View>
        ))}
      </ScrollView>
      <View style={Style.inputContainer}>
        <TextInput
          style={Style.input}
          placeholder="Escribe tu mensaje..."
          value={newMessage}
          onChangeText={(text) => setNewMessage(text)}
        />
        <TouchableOpacity style={Style.sendButton} onPress={handleSendMessage}>
          <Text style={Style.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
	
};

