import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyDfN2Qe0KJ1pvVuEcfJwbT5C_JKnWLiaME",
    authDomain: "allayya-app-5806d.firebaseapp.com",
    projectId: "allayya-app-5806d",
    storageBucket: "allayya-app-5806d.appspot.com",
    messagingSenderId: "170776880845",
    appId: "1:170776880845:web:e8307583f1030f1df1eb84",
    measurementId: "G-E1TT2Y0ZNR"
})


export const auth = app.auth()
export default app;