/**
 * @file Este archivo exporta los componentes AuthContext y AuthProvider.
 * @description Este contexto proporciona el estado de autenticación y los métodos para iniciar sesión, registrarse, cerrar sesión y eliminar errores.
 * @requires reaccionar, reaccionar-router-dom, usuarioRegistro, authReducer, continentalApi.
 * @exports AuthContext, AuthProvider.
 */
import React, { createContext, useContext, useReducer } from "react";
import { Usuario, usuarioRegistro, UsuarioLogin } from '../interfaces/usuarioRegistro';
import { AuthState, authReducer } from "./authReducer";
import continentalApi from "../api/continentalApi";


type AuthContextProps = {
    errorMessage: string ;
    session: string | null;
    token: string | null;
    status: "checking" | "authenticated" | "not-authenticated";
    usuario:Usuario | null;   
    login: () => void;
    logout: () => void;
    removeError: () => void;
    signUp: (UsuarioLogin: UsuarioLogin) => void;
    
}

const authInitialState: AuthState = {
    status: 'checking',
    session: null,
    usuario: null,
    errorMessage: '',
    token: null,
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}:any) => {

    const headers = {
        'Content-Type': 'application/json',
        'PHP-AUTH-USER': '356964e2f8c0811ead9d1529fbae58127379054e',
    };

    const [state, dispatch] = useReducer(authReducer, authInitialState);
     
    const login = () => {};
    
    const signUp = async( obj:UsuarioLogin ) => {
        
        const { nombre, fechaNacimiento, email, phoneNumber } = obj;

        const months = [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
          ];

        try {
             
            // Formatear la fecha manualmente
            const day = fechaNacimiento.getDate();
            const month = months[fechaNacimiento.getMonth()];
            const year = fechaNacimiento.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;

            const datosRegistro = {
                ps: 'www.continentalassist.com',
                nombre,
                nacimiento: formattedDate,
                email,
                phoneNumber
            }

            const resp = await continentalApi.post<usuarioRegistro>('/app_registro_usuario',  datosRegistro, { headers });
            console.log(resp.data)
            dispatch({
                type: 'signUp',
                payload: {
                    token: '356964e2f8c0811ead9d1529fbae58127379054e',
                    usuario: resp.data.resultado[0],
                    session: '',
                }
            });        
                
        } catch (error) {
            console.log(error)
        }
    };
    
    const logout = () => {};
    const removeError = () => {};


    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            signUp,
            logout,
            removeError,
        }}>
            {children}  
      </AuthContext.Provider>
    )
}   