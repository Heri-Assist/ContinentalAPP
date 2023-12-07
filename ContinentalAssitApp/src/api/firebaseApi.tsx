
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onChildAdded, push, child, update, DataSnapshot, set, onValue, onChildChanged, serverTimestamp } from "firebase/database";
import { getStorage,  uploadBytesResumable, getDownloadURL  } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCLDbhnKqvJvSJUWX3KTkq3DxcmkhKeje4",
    authDomain: "continentalchat-9d236.firebaseapp.com",
    databaseURL: "https://continentalchat-9d236.firebaseio.com",
    projectId: "continentalchat-9d236",
    storageBucket: "continentalchat-9d236.appspot.com",
    messagingSenderId: "657181137880",
    appId: "1:657181137880:android:dadc12457d3817d37af0ad"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

const dbRef = ref(database);
const storage = getStorage(firebase);


export { firebase, database, dbRef, storage, getDownloadURL, push, ref, uploadBytesResumable, onChildAdded, child, update, DataSnapshot, set, onValue, onChildChanged, serverTimestamp }; 