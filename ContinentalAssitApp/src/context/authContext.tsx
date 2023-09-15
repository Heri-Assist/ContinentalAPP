/**
 * @file Este archivo exporta los componentes AuthContext y AuthProvider.
 * @description Este contexto proporciona el estado de autenticación y los métodos para iniciar sesión, registrarse, cerrar sesión y eliminar errores.
 * @requires reaccionar, reaccionar-router-dom, usuarioRegistro, authReducer, continentalApi.
 * @exports AuthContext, AuthProvider.
 */
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { Usuario, usuarioRegistro, UsuarioRegistro, ErrorUsuario, CodigoRegistro } from '../interfaces/usuarioRegistro';
import { Data, UsuarioLogin, ErrorUsuarioLogin, LoginRespuesta } from '../interfaces/login';
import { AuthState, authReducer } from "./authReducer";
import continentalApi from "../api/continentalApi";
import { id } from 'date-fns/locale';
import { Alert, DeviceEventEmitter, NativeModules } from "react-native";
import { useGeolocation } from '../hooks/useGeolocation'; 
import * as RNLocalize from 'react-native-localize';
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Defina la forma del objeto de contexto de autenticación.
type AuthContextProps = {
    errorMessage: string ;
    session: string | null;
    token: string | null;
    status: "checking" | "authenticated" | "not-authenticated";
    usuarioRegistro:Usuario | null;   
    usuarioLogin: UsuarioLogin | null;   
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

// Estado inicial para el contexto de autenticación
const authInitialState: AuthState = {
    status: 'checking',
    session: null,
    usuarioRegistro: null,
    usuarioLogin: null,
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

// Crear el contexto de autenticación
export const AuthContext = createContext({} as AuthContextProps);

// Hook para acceder al contexto de autenticación
export const AuthProvider = ({children}:any) => {

    // Configurar las cabeceras de la solicitud
    const headers = {
        'Content-Type': 'application/json',
        'PHP-AUTH-USER': '356964e2f8c0811ead9d1529fbae58127379054e',
    };

    // Obtener el estado de autenticación y la función de despacho del reductor de autenticación
    const [state, dispatch] = useReducer(authReducer, authInitialState);

    // Estado para indicar si el proceso de autenticación se está cargando actualmente
    const [isLoading, setIsLoading] = useState(false);

    // Obtener la ubicación del usuario
    const { location, error } = useGeolocation();
   
    // obtener el id del usuario
    const updateIdUsuario = (newIdUsuario: CodigoRegistro | null) => {
        dispatch({
            type: 'updateIdUsuario',
            payload: {
                idUsuario: newIdUsuario,
            },
        });
    };

    // Iniciar sesión
    const login = async (data:UsuarioRegistro) => {
         
        const { email, nombre, nacimiento, idEmision} = data;

        try {
            setIsLoading(true);
            const datosLogin = {
                ps: 'www.continentalassist.com',
                nombre,
                email,
                nacimiento,
                idEmision,
            }

            const resp = await continentalApi.post<Data>('/app_login',  datosLogin, { headers })
                       
                if (resp.data.error === false ) {
                    
                    const dataUsuario = (resp.data.resultado as LoginRespuesta).usuario as UsuarioLogin;
                    const guardarSesion = async () => {
                        try {
                            await AsyncStorage.setItem('session', JSON.stringify(resp.data));
                            console.log('Sesión guardada en AsyncStorage');
                        } catch (error) {
                            console.error('Error al guardar la sesión en AsyncStorage', error);
                        }
                    };

                    dispatch({
                        type: 'login',
                        payload: {
                            token: '356964e2f8c0811ead9d1529fbae58127379054e',
                            usuarioLogin: dataUsuario as UsuarioLogin,
                            session: JSON.stringify(resp.data as Data),
                            formData: datosLogin,
                            isGeolocation: { location, error},
                            idioma: NativeModules.I18nManager.localeIdentifier,
                        }
                    });
                } else {
                    const errorUsuariosLogin: ErrorUsuarioLogin[] = resp.data.resultado as ErrorUsuarioLogin[];
                    const errorMessage = errorUsuariosLogin[0]?.mensaje_error || 'Información incorrecta';
                    dispatch({
                        type: 'addError',
                        payload: errorMessage,
                    });
                }
        } catch (error) {
            console.log(error)
        }     
               
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
            const fechaActual = new Date();
            const day = nacimiento?.getDate();
            const month = months[nacimiento===undefined? 1 : nacimiento.getMonth()];
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
                idEmision: data.idEmision,
            }
            // console.log('datosRegistro',datosRegistro);
            const resp = await continentalApi.post<usuarioRegistro>('/app_registro_usuario',  datosRegistro, { headers });
            // console.log(resp.data.resultado[0].mensaje_error)
            if (resp.data.error === false ) {
                const usuarios: Usuario[] = resp.data.resultado as Usuario[];
                datosRegistro.idEmision = usuarios[0].id;  

                const obtenerSesion = async () => {
                    try {
                      const sessionData = await AsyncStorage.getItem('session');
                      return JSON.parse(sessionData as string);
                    } catch (error) {
                      console.error('Error al obtener la sesión desde AsyncStorage', error);
                      return null;
                    }
                  };

                  const sessionData = await obtenerSesion();
                  const session = sessionData ? JSON.parse(sessionData) : null;
                // console.log('Datos Usuario',usuarios[0]);
                dispatch({
                    type: 'signUp',
                    payload: {
                        token: '356964e2f8c0811ead9d1529fbae58127379054e',
                        usuarioRegistro: usuarios[0],
                        session: session,  
                        formData: datosRegistro,
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
    
    // Cerrar sesión
    const logout = () => {};

    // Eliminar errores
    const removeError = () => {
        dispatch({
            type: 'removeError',
        });
    };

    // Comprobar si el usuario está autenticado
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