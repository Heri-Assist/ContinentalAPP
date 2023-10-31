import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import ReactNativeAsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

const config = {
  	apiKey: " AIzaSyABIhi0uBbFttP-cN_kGxUCG6IKqAIAOi0 ",
		authDomain: "appmovilcontinental.firebaseapp.com",
		databaseURL: "https://appmovilcontinental.firebaseio.com",
		projectId: "appmovilcontinental",
		storageBucket: "appmovilcontinental.appspot.com",
		messagingSenderId: "133279053492"
};


// Agrega una función para cerrar la sesión
export const signOut = async () => {
  try {
    await FIREBASE_AUTH.signOut();
    // Realiza cualquier otra limpieza o redireccionamiento necesario después de cerrar la sesión.
  } catch (error) {
    console.error('Error al cerrar la sesión:', error);
  }
};


const FIREBASE_APP = initializeApp(config);
const FIREBASE_DATABASE = getDatabase(FIREBASE_APP);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export {
  FIREBASE_APP,
  FIREBASE_DATABASE,
  FIREBASE_AUTH,
  ref, // Exporta la función de referencia de la base de datos
  set, // Exporta la función para establecer datos en la base de datos
  onValue, // Exporta la función para escuchar cambios en la base de datos
};
  

  function getReactNativePersistence(ReactNativeAsyncStorage: AsyncStorageStatic): import("@firebase/auth").Persistence | import("@firebase/auth").Persistence[] | undefined {
    throw new Error('Function not implemented.');
  }

