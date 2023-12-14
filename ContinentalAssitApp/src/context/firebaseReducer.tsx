// Este archivo contiene solo el authReducer, como se separó del AuthContext.
// authReducer.ts

import { MessageChat, UserFirebase } from "../interfaces/firebaseUser";
import { ChatMotivo, MotivoChat } from "../interfaces/motivoChatInterface";


export interface FirebaseState {
  userFirebaseData: UserFirebase | null;
	motivosChatData: ChatMotivo[] | null;
	entrarChat: string | null;
	motivoMensaje: string | null;
	ordenRegistrada: string | null;
	messages: MessageChat[];
  isLoading: boolean;
  error: string | null;
	uploadFile: (file: any  | string | null) => void;
}

// Define los tipos de acciones que puede realizar el reducer.
type firebaseAction =
  | { type: 'setUser'; payload: { userFirebaseData:UserFirebase } }
  | { type: 'logout' }
	| { type: 'motivosChat'; payload: {motivosChatData:ChatMotivo[] | null}} 
	| { type: 'entrarChat'; payload: {motivoMensaje:string, ordenRegistrada:string}}
	| { type: 'SEND_MESSAGE'; message: MessageChat }
  | { type: 'GET_MESSAGES'; messages: MessageChat[] }
  | { type: 'LOGOUT_CHAT' }
	| { type: 'uploadFile'; payload: {file:any | String | null} };



/**
 * Reducer function for Firebase state management.
 * @param state - Current state of the Firebase context.
 * @param action - Dispatched action to update the state.
 * @returns Updated state based on the dispatched action.
 */
export const firebaseReducer = (state: FirebaseState, action: firebaseAction): FirebaseState => {
	switch (action.type) {
		case 'setUser':
			return { 
				...state, 
				userFirebaseData: action.payload.userFirebaseData
			};
		case 'logout':
			return { 
				...state, 
				userFirebaseData: null };
		case 'motivosChat':
			return {
				...state,
				motivosChatData: action.payload.motivosChatData
			}
		case 'entrarChat':
			return {
				...state,
				motivoMensaje: action.payload.motivoMensaje,
				ordenRegistrada: action.payload.ordenRegistrada
			}
		case 'SEND_MESSAGE':
			return {
				...state,
				messages: [...state.messages, action.message],
			};
		case 'GET_MESSAGES':
			return {
				...state,
				messages: action.messages,
			};
		case 'LOGOUT_CHAT':
			return {
				...state,
				messages: [],
			};
		case 'uploadFile':
			return {
				...state,
			}
		default:
			return state;
	}
};


