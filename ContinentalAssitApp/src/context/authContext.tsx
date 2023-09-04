/**
 * @file Este archivo exporta los componentes AuthContext y AuthProvider.
 * @description Este contexto proporciona el estado de autenticación y los métodos para iniciar sesión, registrarse, cerrar sesión y eliminar errores.
 * @requires reaccionar, reaccionar-router-dom, usuarioRegistro, authReducer, continentalApi.
 * @exports AuthContext, AuthProvider.
 */
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { Usuario, usuarioRegistro, UsuarioRegistro, ErrorUsuario, CodigoRegistro } from '../interfaces/usuarioRegistro';
import { AuthState, authReducer } from "./authReducer";
import continentalApi from "../api/continentalApi";
import { id } from 'date-fns/locale';
import { Alert, DeviceEventEmitter, NativeModules } from "react-native";
import { useGeolocation } from '../hooks/useGeolocation'; 
import * as RNLocalize from 'react-native-localize';

/** * Define la forma del objeto de contexto de autenticación. 
* @typedef {Object} AuthContextProps 
* @property {string} errorMessage: el mensaje de error, si lo hay. 
* @property {cadena | null} sesión: el ID de la sesión, si está autenticado. 
* @property {cadena | null} token: el token de autenticación, si está autenticado. 
* @property {"comprobando" | "autenticado" | Estado "no autenticado"}: el estado de autenticación. 
* @property {Usuario | null} usuario: el objeto de usuario autenticado, si está autenticado. 
* @propiedad {{} | null} formData: los datos del formulario, si los hay. * @property {cadena | null} idUsuario: el ID del usuario autenticado, si está autenticado. 
* @property {() => void} login - La función de inicio de sesión. 
* @property {() => void} cerrar sesión: la función de cerrar sesión. 
* @property {() => void} removeError: la función para eliminar cualquier mensaje de error. 
* @property {(UsuarioRegistro: UsuarioRegistro) => void} signUp - La función para registrar un nuevo usuario. 
* @property {boolean} isLoading - Un indicador que indica si el proceso de autenticación se está cargando actualmente. 
* @property {(newIdUsuario: string) => void} updateIdUsuario - La función para actualizar el ID del usuario autenticado. 
 * */ 

type AuthContextProps = {
    errorMessage: string ;
    session: string | null;
    token: string | null;
    status: "checking" | "authenticated" | "not-authenticated";
    usuario:Usuario | null;   
    formData: {} | null;
    idUsuario:CodigoRegistro | null;
    isLoading: boolean;
    idioma: string;
    isGeolocation: { location: any, error: any } | null;
    updateIdUsuario: (newIdUsuario: CodigoRegistro | null) => void;
    login: (UsuarioRegistro: UsuarioRegistro) => void;
    logout: () => void;
    removeError: () => void;
    signUp: (UsuarioRegistro: UsuarioRegistro) => void;
  
}

/**
 * Estado inicial para el contexto de autenticación.
 * @typedef {Objeto} Estado de autenticación
 * @property {string} status: el estado del proceso de autenticación.
 * @property {Object} sesión: los datos de la sesión del usuario.
 * @property {Object} usuario - La información del usuario.
 * @property {string} errorMessage: el mensaje de error, si lo hay.
 * @property {string} token: el token de autenticación del usuario.
 * @property {boolean} isLoading: si el proceso de autenticación se está cargando actualmente.
 * @property {Object} formData: los datos del formulario del usuario.
 * @property {string} idUsuario - El ID del usuario.
 */

const authInitialState: AuthState = {
    status: 'checking',
    session: null,
    usuario: null,
    errorMessage: '',
    token: null,
    isLoading: false,
    formData: null,
    idUsuario: null,
    idioma: RNLocalize.getLocales()[0].languageCode, // Inicializa el idioma con el idioma del dispositivo
    isGeolocation: { location: null, error: null },
}

/**
 * Proporciona contexto de autenticación para la aplicación.
 * @param children Los componentes secundarios que el proveedor empaquetará.
 * @returns El proveedor de contexto de autenticación.
 */
export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}:any) => {

    const headers = {
        'Content-Type': 'application/json',
        'PHP-AUTH-USER': '356964e2f8c0811ead9d1529fbae58127379054e',
    };
    const [state, dispatch] = useReducer(authReducer, authInitialState);
    const [isLoading, setIsLoading] = useState(false);
    const { location, error } = useGeolocation();
   
    
   
    const updateIdUsuario = (newIdUsuario: CodigoRegistro | null) => {
        dispatch({
            type: 'updateIdUsuario',
            payload: {
                idUsuario: newIdUsuario,
            },
        });
    };

    const login = (data:UsuarioRegistro) => {
        Alert.alert('Registro Correcto', JSON.stringify(data))
        // console.log('++++++++',data);
    };
    
    //Registrar un nuevo usuario
    const signUp = async( data:UsuarioRegistro ) => {
        
        const { nombre, nacimiento, email, telefono } = data;
        // console.log('Datos Registro',data);
        const months = [
            'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
          ];

        try {
             
            // Formatear la fecha manualmente
            const day = nacimiento?.getDate();
            const month = months[nacimiento.getMonth()];
            const year = nacimiento?.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;

            const datosRegistro = {
                ps: 'www.continentalassist.com',
                nombre,
                nacimiento: formattedDate,
                email,
                telefono:telefono,
                pais_callingCode: data.pais_callingCode,
                pais_name: data.pais_name,
                pais_flag: data.pais_flag,
                idEmision: data.id_emision,
            }
            // console.log('datosRegistro',datosRegistro);
            const resp = await continentalApi.post<usuarioRegistro>('/app_registro_usuario',  datosRegistro, { headers });
            // console.log(resp.data.resultado[0].mensaje_error)
            if (resp.data.error === false ) {
                const usuarios: Usuario[] = resp.data.resultado as Usuario[];
                datosRegistro.idEmision = usuarios[0].id;
                // console.log('Datos Usuario',usuarios[0]);
                dispatch({
                    type: 'signUp',
                    payload: {
                        token: '356964e2f8c0811ead9d1529fbae58127379054e',
                        usuario: usuarios[0],
                        session: '',
                        formDdata: datosRegistro,
                        isGeolocation: { location, error},
                        idioma: NativeModules.I18nManager.localeIdentifier,
                    }
                });
            } else {
                const errorUsuarios: ErrorUsuario[] = resp.data.resultado as ErrorUsuario[];
                const errorMessage = errorUsuarios[0]?.mensaje_error || 'Información incorrecta';
                dispatch({
                    type: 'addError',
                    payload: errorMessage,
                });
            }        
                
        } catch (error) {
            console.log(error)
        }
    }
    
    
    const logout = () => {};
    const removeError = () => {
        dispatch({
            type: 'removeError',
        });
    };


    return (
        <AuthContext.Provider value={{
            ...state,
            login,
            signUp,
            logout,
            removeError,
            isLoading,
            updateIdUsuario,
            isGeolocation: { location, error},
            idioma: RNLocalize.getLocales()[0].languageCode,
        }}>
            {children}  
      </AuthContext.Provider>
    )
};