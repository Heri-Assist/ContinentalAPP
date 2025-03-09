import React, {
  createContext,
  useReducer,
  useEffect,
  useState,
  useContext,
} from 'react';
import { firebaseReducer, FirebaseState } from './firebaseReducer';
import { MessageChat, UserFirebase } from '../interfaces/firebaseUser';
import continentalApi from '../api/continentalApi';
import { MotivoChat, ChatMotivo } from '../interfaces/motivoChatInterface';
import {
  database,
  storage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  push,
  DataSnapshot,
  set,
  onValue,
} from '../api/firebaseApi';

import { AuthContext } from './authContext';
import { ref as storageRef } from 'firebase/storage';
// Define los tipos para User y AuthState según tus necesidades.

type FirebaseContextProps = {
  userFirebaseData: UserFirebase | null;
  motivosChatData: ChatMotivo[] | null;
  sendMessage: (message: MessageChat) => void;
  getMessages: () => void;
  logoutChat: () => void;
  motivosChat: () => void;
  entrarChat: (motivo: string) => void;
  messages: MessageChat[];
  uploadFile: (file: any) => void;
  motivoMensaje: string | null;
  ordenRegistrada: string;
};

const firebaseInitialState: FirebaseState = {
  userFirebaseData: null,
  motivosChatData: null,
  entrarChat: null,
  messages: [],
  isLoading: false,
  error: null,
  uploadFile: () => {},
  motivoMensaje: null,
  ordenRegistrada: '',
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
  const { idioma, usuarioRegistro, isGeolocation } = useContext(AuthContext);
  const [motivosChatSelect, setMotivosChatSelect] = useState(String);

  const headers = {
    'Content-Type': 'application/json',
    'EVA-AUTH-USER':
      'eyJpdiI6Ik1tTTh3My9NMFdTUUtROGNMb3ZXTHc9PSIsInZhbHVlIjoiVmlySXEwOElhQ0hYS1I3eE1QdGFGM0t5Ulh0SHhub3ljUFVlczA1bWVIUT0iLCJtYWMiOiI2YTZkMzBmMjlmOTA4NGE1ZDc0ZWZmNTgyZDI4MTgxM2UzMTMxODQwMWMwNTNmZWQwNTk2ZjMzODhkMDc3YzY5IiwidGFnIjoiIn0=',
  };

  useEffect(() => {
    // Tu código para la gestión de la autenticación aquí (usando Firebase u otro método)
  }, []); // Ejecuta el efecto solo una vez al cargar el componente.

  const motivosChat = async () => {
    const response = await continentalApi.post<MotivoChat>(
      '/app_consulta_motivos_chat',
      { ps: 'www.continentalassist.com' },
      { headers },
    );
    const data: MotivoChat = response.data as MotivoChat;
    dispatch({
      type: 'motivosChat',
      payload: {
        motivosChatData: data.resultado as ChatMotivo[],
      },
    });
  };

  const entrarChat = async (motivo: string) => {
    // Tu código para la gestión de la autenticación aquí (usando Firebase u otro método).

    setMotivosChatSelect(motivo);

    if (usuarioRegistro) {
      const beneficiarios = usuarioRegistro?.beneficiarios;
      const ubicar = isGeolocation;

      let voucher: any = usuarioRegistro?.codigo.split('-');
      const longitud: number = voucher?.length;

      // CA-MJ9MAF-1-MX
      //CA-3905L3-1-MX
      //CA-WE4X18-3-VE
      //CA-
      console.log('---beneficiarios----', beneficiarios);
      voucher =
        longitud > 3
          ? voucher[0] +
            '-' +
            voucher[1] +
            '-' +
            '1' +
            '-' +
            voucher[3]
          : voucher[0] +
            '-' +
            voucher[1] +
            '-' +
            '1' +
            '-' +
            voucher[2];
      const ordenRegistrada = voucher;
      console.log('---longitud----', longitud);
      console.log('---voucher----', voucher);
      console.log('---codigo----', usuarioRegistro?.codigo);
      console.log('---ordenRegistrada----', ordenRegistrada);
      const beneficiarioNombre = beneficiarios.find(
        item => item.voucherBeneficiario === ordenRegistrada,
      );

      set(ref(database, 'users/' + ordenRegistrada), {
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
          ordenRegistrada: voucher,
        },
      });
    }
  };

  const sendMessage = (message: MessageChat) => {
    message.tipo = motivosChatSelect;

    let voucher: any = usuarioRegistro?.codigo.split('-');
    const longitud: any = voucher?.length;
    voucher =
      longitud > 3
        ? voucher[0] +
          '-' +
          voucher[1] +
          '-' +
          '1' +
          '-' +
          voucher[3]
        : voucher[0] +
          '-' +
          voucher[1] +
          '-' +
          '1' +
          '-' +
          voucher[2];
    const ordenRegistrada = voucher;
    // Guarda el mensaje en la base de datos y obtén su clave
    const newMessageRef = push(ref(database, 'mensajes/' + ordenRegistrada));
    set(newMessageRef, message);

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

  const uploadFile = async (file: any): Promise<string> => {
    let voucher: any = usuarioRegistro?.codigo.split('-');
    const longitud: any = voucher?.length;
    voucher =
      longitud > 3
        ? voucher[0] +
          '-' +
          voucher[1] +
          '-' +
          usuarioRegistro?.cantidad +
          '-' +
          voucher[3]
        : voucher[0] +
          '-' +
          voucher[1] +
          '-' +
          usuarioRegistro?.cantidad +
          '-' +
          voucher[2];
    const ordenRegistrada = voucher;
    const refStorage = storageRef(
      storage,
      `adjuntos/${ordenRegistrada}/${file.name}`,
    );
    const metadata = {
      contentType: 'image/jpeg',
    };

    const uploadTask = uploadBytesResumable(refStorage, file.blob, metadata);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        error => {
          console.error(error);
        },
        async () => {
          const downloadURL: string = await getDownloadURL(
            uploadTask.snapshot.ref,
          );
          console.log('File available at', downloadURL);
          set(ref(database, 'users/' + ordenRegistrada), {
            chatEnviarAdjunto: true,
          });
          resolve(downloadURL);
        },
      );
    });
  };

  return (
    <firebaseContext.Provider
      value={{
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
