import firebase from 'firebase'
 import  'firebase/database'
 import 'firebase/storage'

const config = {
    apiKey: "AIzaSyDWUmFf1eMMeiUUNdmmS0lFnIzp5Si5zfE",
    authDomain: "react-demo-11faa.firebaseapp.com",
    databaseURL: "https://react-demo-11faa.firebaseio.com",
    projectId: "react-demo-11faa",
    storageBucket: "react-demo-11faa.appspot.com",
    messagingSenderId: "127128525568",
    appId: "1:127128525568:web:3ac4cb5e6fa09a252af1e5",
    measurementId: "G-RTGNC2CV89"
  };

firebase.initializeApp(config)
const firebaseAuth = firebase.auth()
const firebaseDB = firebase.database()
const storage = firebase.storage()

export { storage,firebaseAuth, firebaseDB,firebase };


