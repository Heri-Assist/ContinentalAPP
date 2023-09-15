// Este archivo contiene solo el authReducer, como se separó del AuthContext.
// authReducer.ts

import { Message, UserFirebase } from "../interfaces/firebaseUser";
import { ChatMotivo, MotivoChat } from "../interfaces/motivoChatInterface";


export interface FirebaseState {
  user: UserFirebase | null;
	motivosChatData: ChatMotivo[] | null;
	messages: Message[];
  isLoading: boolean;
  error: string | null;
}

// Define los tipos de acciones que puede realizar el reducer.
type firebaseAction =
  | { type: 'setUser'; payload: { user:UserFirebase } }
  | { type: 'logout' }
	| { type: 'motivosChat'; payload: {motivosChatData:ChatMotivo[] | null}} 
	| { type: 'SEND_MESSAGE'; message: Message }
  | { type: 'GET_MESSAGES'; messages: Message[] }
  | { type: 'LOGOUT_CHAT' };



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
				user: action.payload.user
			};
		case 'logout':
			return { 
				...state, 
				user: null };
		case 'motivosChat':
			return {
				...state,
				motivosChatData: action.payload.motivosChatData
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
		default:
			return state;
	}
};


