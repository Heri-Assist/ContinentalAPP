import { de } from "date-fns/locale";
import { Usuario } from "../interfaces/usuarioRegistro";


export interface AuthState {
    status: "checking" | "authenticated" | "not-authenticated";
    session: string | null;
    errorMessage: string;
    usuario: Usuario | null;
    token: string | null;
}

type AuthAction =  
    | { type: "signUp", payload: { token: string, usuario: Usuario, session:string } }
    | { type: "addError", payload: string }
    | { type: "removeError" }
    | { type: "notAuthenticated" }
    | { type: "logout" };


export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {
    switch ( action.type ) {
        case 'addError':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                usuario: null,
                errorMessage: action.payload
            }
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            }
        case 'signUp':
            return {
                ...state,
                status: 'authenticated',
                usuario: action.payload.usuario,
                token: '356964e2f8c0811ead9d1529fbae58127379054e',
                session: action.payload.session
            }
        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                usuario: null,
                token: null
            }
        default:
            return state;     
   }
}