/**
 * Función reductora del estado de autenticación.
 * @param state El estado de autenticación actual.
 * Acción @param La acción de autenticación que se realizará.
 * @returns El nuevo estado de autenticación.
 */

import { CodigoRegistro, Usuario, UsuarioRegistro } from "../interfaces/usuarioRegistro";


/**
 * Interface for the authentication state.
 */
export interface AuthState {
    status: "checking" | "authenticated" | "not-authenticated";
    session: string | null;
    errorMessage: string;
    usuario: Usuario | null;
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
    | { type: "signUp", payload: { token: string, usuario: Usuario, session:string, formDdata:{}, isGeolocation: {}, idioma:string } }
    | { type: "login", payload: { token: string, usuario: Usuario, session:string, formDdata:{}, isGeolocation: {} } }
    | { type: "addError", payload: string}
    | { type: "removeError" }
    | { type: "notAuthenticated" }
    | { type: "logout" }
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
                usuario: action.payload.usuario,
                token: action.payload.token, // Incluye el token en el estado
                session: action.payload.session,
                errorMessage: '',
                formData: action.payload.formDdata,
                isLoading: false,
            }
        case 'addError':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                usuario: null,
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
                usuario: action.payload.usuario,
                token: action.payload.token, // Incluye el token en el estado
                session: action.payload.session,
                errorMessage: '',
                formData: action.payload.formDdata,
                isLoading: false,
                idioma: action.payload.idioma,
            }
        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                usuario: null,
                token: null
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