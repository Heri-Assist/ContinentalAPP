import React, { createContext, useReducer, useEffect, useState, useContext } from 'react';
import { firebaseReducer, FirebaseState } from './firebaseReducer';
import { Message, UserFirebase } from '../interfaces/firebaseUser';
import continentalApi from '../api/continentalApi';
import { MotivoChat, ChatMotivo } from '../interfaces/motivoChatInterface';
import { FIREBAESE_APP, FIREBASE_AUTH, FIREBASE_DATABASE, ref, set, onValue, signOut } from '../api/firebaseApi';
import { DataSnapshot } from 'firebase/database';
import { Data } from '../interfaces/Login';
import firebase, { FirebaseError } from 'firebase/app'
import { te } from 'date-fns/locale';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from './authContext';
// Define los tipos para User y AuthState según tus necesidades.


type FirebaseContextProps = {
	user: UserFirebase | null;
	motivosChatData: ChatMotivo[] | null;
	sendMessage: (message: Message) => void;
  getMessages: () => void;
  logoutChat: () => void;
	motivosChat:() => void;

}
 
const firebaseInitialState: FirebaseState = {
  user: null,
	motivosChatData: null,
	messages: [],
  isLoading: false,
  error: null,
};

// Crea el contexto de autenticación.
export const firebaseContext = createContext({} as FirebaseContextProps);

// Crea el reducer de autenticación.



// Crea el componente AuthProvider que utiliza el contexto y el reducer.
/**
 * Provides a Firebase context for the application.
 * @param children The child components to render.
 * @returns The Firebase context provider.
 */
	export const FirebaseProvider = ({ children }: any) => {

		const [state, dispatch] = useReducer(firebaseReducer, firebaseInitialState);
		const { idioma } = useContext(AuthContext)
		const headers = {
			'Content-Type': 'application/json',
		};


	

		useEffect(() => {
			// Tu código para la gestión de la autenticación aquí (usando Firebase u otro método).


		}, []); // Asegúrate de agregar la lógica de autenticación aquí.
		

		const motivosChat = async () => {
		
				const response = await continentalApi.post<MotivoChat>('/app_consulta_motivos_chat', { ps: 'www.continentalassist.com' }, { headers });
				const data:MotivoChat = response.data as MotivoChat;

				// console.log('========Obeterner data del api========',data);
		

			dispatch({
				type: 'motivosChat',
				payload: {
					motivosChatData: data.resultado as ChatMotivo[]
				}
			});

		}
		const signInAnonymously = async (user:UserFirebase) => {
	
			try {
				const userRef = ref(FIREBASE_DATABASE, `users/CA-KL0BI4-1-COM`);
				await set(userRef, {
					name: user.nombre,
					email: user.email,
					language: user.language,
					ipLatitude: user.ipLatitude,
					ipLongitude: user.ipLongitude
				});
				console.log('Datos guardados exitosamente.');
			} catch (error) {
				console.error('Error al guardar los datos:', error);
			}
			}

		const sendMessage = (message: Message) => {
			// Tu lógica para enviar un mensaje al servidor (Firebase Database

			

			const userFire = {
				nombre: 'continental Assist',
				ipLatitude: '4.507694316979693',
				ipLongitude: '-74.10527981055446',
				email: 'hvhvalencia3@gmail.com',
				language: idioma == 'es' ? 'spa' : 'eng'
			}

			signInAnonymously(userFire);


			if (state.user) {
				const userRef = ref(FIREBASE_DATABASE, `messages/${state.user}`);
				set(userRef, [...state.messages, message]);
			 }
			console.log('========Obeterner data del api========',message);
		};
	
		const getMessages = () => {
			// Tu lógica para obtener mensajes del servidor (Firebase Database)
			if (state.user) {
				const userRef = ref(FIREBASE_DATABASE, `messages/${state.user	}`);
				onValue(userRef, (snapshot: DataSnapshot) => {
					const messagesData = snapshot.val();
					if (messagesData) {
						// Actualiza el estado de los mensajes
						dispatch({ type: 'GET_MESSAGES', messages: messagesData });
					}
				});
			}
		};
	
		const logoutChat = () => {
			// Realiza cualquier otra limpieza o cierre de sesión necesario
			dispatch({ type: 'LOGOUT_CHAT' });
	
			// Cierra la sesión de Firebase Auth
			signOut();
		};

		return (
			<firebaseContext.Provider value={{ 
				...state,
				motivosChat,
				sendMessage,
				getMessages,
				logoutChat
			}}>
				{children}
			</firebaseContext.Provider>
		);
};

