
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onChildAdded, push, child, update, DataSnapshot, set, onValue, onChildChanged, serverTimestamp, get } from "firebase/database";
import { getStorage,  uploadBytesResumable, getDownloadURL  } from "firebase/storage";

const firebaseConfig = {
    // apiKey: "AIzaSyCLDbhnKqvJvSJUWX3KTkq3DxcmkhKeje4",
    // authDomain: "continentalchat-9d236.firebaseapp.com",
    // databaseURL: "https://continentalchat-9d236.firebaseio.com",
    // projectId: "continentalchat-9d236",
    // storageBucket: "continentalchat-9d236.appspot.com",
    // messagingSenderId: "657181137880",
    // appId: "1:657181137880:android:dadc12457d3817d37af0ad"


    apiKey: "AIzaSyABIhi0uBbFttP-cN_kGxUCG6IKqAIAOi0",
    authDomain: "appmovilcontinental.firebaseapp.com",
    databaseURL: "https://appmovilcontinental.firebaseio.com",
    projectId: "appmovilcontinental",
    storageBucket: "appmovilcontinental.appspot.com",
    messagingSenderId: "133279053492",
    appId: "1:133279053492:web:920680468ac98d74a0c9e1",
    measurementId: "G-NQGSYNMGLM"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

const dbRef = ref(database);
const storage = getStorage(firebase);

export { 
        firebase, 
        database, 
        dbRef, 
        storage, 
        getDownloadURL, 
        push, 
        ref, 
        get,
        uploadBytesResumable, 
        onChildAdded, 
        child, 
        update, 
        DataSnapshot, 
        set, 
        onValue, 
        onChildChanged, 
        serverTimestamp 
    }; 