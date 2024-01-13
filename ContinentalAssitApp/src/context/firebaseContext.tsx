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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Usuario, Beneficiario } from '../interfaces/usuarioRegistro';
import { is } from 'date-fns/locale';
import { ref as storageRef } from 'firebase/storage';
import { Alert } from 'react-native';
import { useGeolocation } from '../hooks/useGeolocation'; 
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
	motivoMensaje:string | null;
	ordenRegistrada:string ;
}
 
const firebaseInitialState: FirebaseState = {
	userFirebaseData: null,
	motivosChatData: null,
	entrarChat: null,
	messages: [],
	isLoading: false,
	error: null,
	uploadFile: () => {},
	motivoMensaje: null,
	ordenRegistrada: ''
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
		const { location, error } = useGeolocation();
		const headers = {
			'Content-Type': 'application/json',
		};


		useEffect(() => {
			// Tu código para la gestión de la autenticación aquí (usando Firebase u otro método)			
			
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
					
				const beneficiarios = usuarioRegistro?.beneficiarios;
				const ubicar =  isGeolocation;
				
				let voucher:any = usuarioRegistro?.codigo.split('-')
				const  longitud:number = voucher?.length;
				voucher = (longitud > 3) ? voucher[0]+'-'+voucher[1]+'-'+voucher[2]+'-'+usuarioRegistro.cantidad+'-'+voucher[3] 
																 : voucher[0]+'-'+voucher[1]+'-'+usuarioRegistro.cantidad+'-'+voucher[2];			
				const ordenRegistrada = voucher;

				const beneficiarioNombre = beneficiarios.find(item => item.voucherBeneficiario === ordenRegistrada);
			
				// validar que ubicar no sea null y si lo es que solicite los permites para obtener la ubicacion
				
					// Verifica si los valores son undefined o null antes de llamar a set()
					// console.log('ubicar***************===>>>>', ubicar)
					
					set(ref(database, 'users/' + ordenRegistrada),{
						chatEnviarAdjunto: false,
						email: beneficiarioNombre?.email,
						ipLatitude: ubicar?.location?.latitude,
						ipLongitude: ubicar?.location?.longitude,
						language: idioma == 'es' ? 'spa' : 'eng',
						name: beneficiarioNombre?.nombre,
					});
				
				dispatch({
					type: 'entrarChat',
					payload: {
						motivoMensaje: motivo,
						ordenRegistrada: voucher
					}
				});
			}
		}
			
		const sendMessage = (message: MessageChat) => {
			message.tipo = motivosChatSelect;
			

	  	let voucher:any = usuarioRegistro?.codigo.split('-')
			const longitud:any = voucher?.length;
			voucher = (longitud > 3) ? voucher[0]+'-'+voucher[1]+'-'+voucher[2]+'-'+usuarioRegistro?.cantidad+'-'+voucher[3] 
															 : voucher[0]+'-'+voucher[1]+'-'+usuarioRegistro?.cantidad+'-'+voucher[2];
			const ordenRegistrada = voucher;
		
			// Guarda el mensaje en la base de datos y obtén su clave
			const newMessageRef = push(ref(database, 'mensajes/' + ordenRegistrada));
  		set(newMessageRef, message);
		
			// Obtiene la clave del mensaje
			const msgId = newMessageRef.key;
		
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
			// Cierra la sesión de Firebase Auth
			// signOut(auth);

			dispatch({ type: 'LOGOUT_CHAT' });
		
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
						const downloadURL: string = await getDownloadURL(uploadTask.snapshot.ref);
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

