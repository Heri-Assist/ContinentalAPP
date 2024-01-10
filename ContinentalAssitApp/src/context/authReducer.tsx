/**
 * Función reductora del estado de autenticación.
 * @param state El estado de autenticación actual.
 * Acción @param La acción de autenticación que se realizará.
 * @returns El nuevo estado de autenticación.
 */

import { UsuarioLogin } from "../interfaces/login";
import { CodigoRegistro, Usuario, UsuarioRegistro, usuarioRegistro } from '../interfaces/usuarioRegistro';


/**
 * Interface for the authentication state.
 */
export interface AuthState {
    status: "checking" | "authenticated" | "not-authenticated";
    session: string | null;
    errorMessage: string;
    usuarioRegistro?:Usuario  | null;   
    usuarioLogin: UsuarioLogin | null;   
    token: string | null;
    isLoading: boolean;
    formData: {} | null;
    idUsuario: CodigoRegistro | null;
    idioma: string;
    isGeolocation: { location: null, error: null },
}

/**
 * Type for the authentication actions.
 */
type AuthAction =  
    | { type: "signUp", payload: { token: string,usuarioRegistro:Usuario, session:string | null, formData:{}, isGeolocation: {}, idioma:string} }
    | { type: "login", payload: { token: string, usuarioLogin:UsuarioLogin, session:string, formData:{}, isGeolocation: {}, idioma:string, usuarioRegistro?:Usuario | null } }
    | { type: "addError", payload: string}
    | { type: "removeError" }
    | { type: "notAuthenticated" }
    | { type: "logout"}
    | { type: "isLoading", payload: boolean }
    | { type: "updateIdUsuario", payload: { idUsuario: CodigoRegistro | null }}
  

/**
 * Reducer function for the authentication state.
 * @param state The current authentication state.
 * @param action The authentication action to be performed.
 * @returns The new authentication state.
 */
export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {
    switch ( action.type ) {
        case 'login':
            return {
                ...state,
                status: 'authenticated',
                usuarioLogin: action.payload.usuarioLogin,
                token: action.payload.token, // Incluye el token en el estado
                session: action.payload.session,
                errorMessage: '',
                formData: action.payload.formData,
                isLoading: false,
                idioma: action.payload.idioma,
                usuarioRegistro: action.payload.usuarioRegistro,
            }
        case 'addError':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                usuarioRegistro: null,
                errorMessage: action.payload,
                isLoading: false,
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
                usuarioRegistro: action.payload.usuarioRegistro,
                token: action.payload.token, // Incluye el token en el estado
                session: action.payload.session,
                formData: action.payload.formData,
                isLoading: false,
                idioma: action.payload.idioma,
            }
        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                usuarioLogin: null,
                usuarioRegistro: null,
                token: null,
                session: null,
                errorMessage: '',
                formData: null,
                isLoading: false,
                idioma: 'spa',
            }
        case 'isLoading':
            return {
                ...state,
                isLoading: action.payload,
            }
        case 'updateIdUsuario':
            return {
                ...state,
                idUsuario: action.payload.idUsuario,
            }
        default:
            return state;     
   }
}