import React, { createContext, useReducer, useEffect, useState, useContext } from 'react';
import { firebaseReducer, FirebaseState } from './firebaseReducer';
import { MessageChat, UserFirebase } from '../interfaces/firebaseUser';
import continentalApi from '../api/continentalApi';
import { MotivoChat, ChatMotivo } from '../interfaces/motivoChatInterface';
import { firebase, database, storage, ref, getDownloadURL, 
					uploadBytesResumable, push, child, update, onChildAdded, 
					DataSnapshot, set, onValue } from '../api/firebaseApi';
import { Data, UsuarioLogin } from '../interfaces/Login';
import { AuthContext, } from './authContext';
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario } from '../interfaces/usuarioRegistro';
import { is } from 'date-fns/locale';
import { ref as storageRef, StorageReference } from 'firebase/storage';
// Define los tipos para User y AuthState según tus necesidades.


type FirebaseContextProps = {
	userFirebaseData: UserFirebase | null;
	motivosChatData: ChatMotivo[] | null;
	sendMessage: (message: MessageChat) => void;
  getMessages: () => void;
  logoutChat: () => void;
	motivosChat:() => void;
	entrarChat: (motivo: string) => void;
	messages: MessageChat[];
	uploadFile: (file: any) => void;
}
 
const firebaseInitialState: FirebaseState = {
	userFirebaseData: null,
	motivosChatData: null,
	entrarChat: null,
	messages: [],
	isLoading: false,
	error: null,
	uploadFile: () => {},
};

// Crea el contexto de autenticación.
export const firebaseContext = createContext({} as FirebaseContextProps);


// Crea el componente AuthProvider que utiliza el contexto y el reducer.
/**
 * Provides a Firebase context for the application.
 * @param children The child components to render.
 * @returns The Firebase context provider.
 */
	export const FirebaseProvider = ({ children }: any) => {

		const [state, dispatch] = useReducer(firebaseReducer, firebaseInitialState);
		const { idioma, usuarioLogin, session, usuarioRegistro, isGeolocation } = useContext(AuthContext)
		const [motivosChatSelect, setMotivosChatSelect] = useState(String)
		const headers = {
			'Content-Type': 'application/json',
		};


		useEffect(() => {
			// Tu código para la gestión de la autenticación aquí (usando Firebase u otro método).
			
			
		}, []); // Ejecuta el efecto solo una vez al cargar el componente.
		
		const motivosChat = async () => {
			const response = await continentalApi.post<MotivoChat>('/app_consulta_motivos_chat', { ps: 'www.continentalassist.com' }, { headers });
			const data:MotivoChat = response.data as MotivoChat;
			dispatch({
				type: 'motivosChat',
				payload: {
					motivosChatData: data.resultado as ChatMotivo[]
				}
			});
		}

		const entrarChat = async (motivo: string) => {
			// Tu código para la gestión de la autenticación aquí (usando Firebase u otro método).	
			
			setMotivosChatSelect(motivo)
			
			if(usuarioRegistro){	 	
				
				const ubicar =  isGeolocation;
				let voucher:any = usuarioRegistro?.codigo.split('-')
				const  longitud:number = voucher?.length;
				voucher = (longitud > 3) ? voucher[0]+'-'+voucher[1]+'-'+voucher[2]+'-'+usuarioRegistro.cantidad+'-'+voucher[3] 
																 : voucher[0]+'-'+voucher[1]+'-'+usuarioRegistro.cantidad+'-'+voucher[2];

			
				set(ref(database, 'users/' + voucher), {
					name: usuarioLogin?.nombre,
					celular: usuarioLogin?.telefonos[0].telefono,
					ipLatitude: ubicar?.location?.latitude,
					ipLongitude: ubicar?.location?.longitude,
					email: usuarioLogin?.email,
					chatEnviarAdjunto: false
				});

				let dbRef = ref(database, 'users');
				onChildAdded(dbRef, (snapshot) => {
					// Navega a la pantalla de chat con el estado actual como parámetro
				});
				dispatch({
					type: 'entrarChat',
					payload: {
						motivo
					}
				});
			}
		}
			
		// const signInAnonymously = async (user: UserFirebase) => {
		// 	try {
		// 		const userRef = ref(database, `users/CA-KL0BI4-1-COM`);
		// 		await set(userRef, {
		// 			name: user.nombre,
		// 			email: user.email,
		// 			language: user.language,
		// 			ipLatitude: user.ipLatitude,
		// 			ipLongitude: user.ipLongitude
		// 		});
		// 		console.log('Datos guardados exitosamente.');
		// 	} catch (error) {
		// 		console.error('Error al guardar los datos:', error);
		// 	}
		// }
	
		const sendMessage = (message: MessageChat) => {
			
			message.tipo = motivosChatSelect;
			
			const userFire = {
				nombre: usuarioLogin?.nombre,
				ipLatitude: isGeolocation?.location?.latitude,
				ipLongitude: isGeolocation?.location?.latitude,
				email: usuarioLogin?.email,
				language: idioma == 'es' ? 'spa' : 'eng'
			}
			let voucher:any = usuarioRegistro?.codigo.split('-')
			const  longitud:any = voucher?.length;
			voucher = (longitud > 3) ? voucher[0]+'-'+voucher[1]+'-'+voucher[2]+'-'+usuarioRegistro?.cantidad+'-'+voucher[3] 
	  														 : voucher[0]+'-'+voucher[1]+'-'+usuarioRegistro?.cantidad+'-'+voucher[2];
			const ordenRegistrada = voucher;
			const msgId = push(child(ref(database, 'mensajes'), ordenRegistrada)).key;

			const updates: { [key: string]: MessageChat } = {};
			updates[`mensajes/${state.userFirebaseData}/${msgId}`] = message;
			update(ref(database), updates);
  		dispatch({ type: 'SEND_MESSAGE', message });
		};


		const getMessages = () => {
			if (state.userFirebaseData) {
				const userRef = ref(database, `mensajes/${state.userFirebaseData}`);
				onValue(userRef, (snapshot: DataSnapshot) => {
					const messagesData = snapshot.val();
					if (messagesData) {
						dispatch({ type: 'GET_MESSAGES', messages: messagesData });
					}
				});
			}
		};
	
		const logoutChat = () => {
			// Realiza cualquier otra limpieza o cierre de sesión necesario
			dispatch({ type: 'LOGOUT_CHAT' });
		
			// Cierra la sesión de Firebase Auth
			const auth = getAuth(firebase);
			signOut(auth);
		};

		const uploadFile = async (file:any) : Promise<string> => {

			let voucher:any = usuarioRegistro?.codigo.split('-')
			const  longitud:any = voucher?.length;
			voucher = (longitud > 3) ? voucher[0]+'-'+voucher[1]+'-'+voucher[2]+'-'+usuarioRegistro?.cantidad+'-'+voucher[3] 
	  														 : voucher[0]+'-'+voucher[1]+'-'+usuarioRegistro?.cantidad+'-'+voucher[2];		
			const ordenRegistrada = voucher;
			const refStorage = storageRef(storage, `adjuntos/${ordenRegistrada}/${file.name}`);
			const metadata = {
				contentType: 'image/jpeg'
			};

			const uploadTask = uploadBytesResumable(refStorage, file.blob, metadata);
			return new Promise((resolve, reject) => {
				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log(`Upload is ${progress}% done`);
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
						}
					},
					(error) => {
						console.error(error);
					},
					async () => {
						const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
						console.log('File available at', downloadURL);
						set(ref(database, 'users/' + ordenRegistrada), {
							chatEnviarAdjunto: true
						});
						resolve(downloadURL);
					}
				);
			});
		};
		

		return (
			<firebaseContext.Provider value={{ 
				...state,
				motivosChat,
				entrarChat,
				sendMessage,
				getMessages,
				logoutChat,
				uploadFile,
			}}>
				{children}
			</firebaseContext.Provider>
		);
	};

