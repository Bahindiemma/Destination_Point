/*
* This file stores the google auth functionaly
*
* this imports the auth_state to store the authentication state of the user
* */

//import firebase from 'firebase/app';
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from "firebase/auth";

// store user state
import auth_state from "./auth_state.js";


/*
// Config file
import * as firebase from "firebase";

const config = {...};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
*/

/*
const { initializeApp } = await import('firebase/app');
const { getAnalytics } = await import('firebase/analytics');

// add authentication
const { GoogleAuthProvider, signInWithPopup, signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } = await import("firebase/auth");

* */

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCvJt_ZhP5ZTF67lpYXODLybc0qL2i9W1U",
    authDomain: "destination-point-28abd.firebaseapp.com",
    projectId: "destination-point-28abd",
    storageBucket: "destination-point-28abd.appspot.com",
    messagingSenderId: "353365284984",
    appId: "1:353365284984:web:db1d83b0765cf4e634f58d",
    measurementId: "G-C7JBRQ3M4P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

const auth = getAuth();

const login = () => {
    signInWithPopup(auth, provider)
        .then((result) => {

            console.log(result)

            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);

            const token = credential.accessToken;

            // The signed-in user info.
            const user = {
                name: result.user.displayName,
                email: result.user.email,
                emailVerified: result.user.emailVerified,
                isAnonymous: result.user.isAnonymous,
                lastLoginAt: result.user.lastLoginAt,
                photoURL: result.user.photoURL,
                phone: result.user.providerData[0].phoneNumber,
                providerId: result.user.providerData[0].providerId,
                uid: result.user.providerData[0].uid,
            };

            // store user details in session store
            onAuthStateChanged( user => {
                auth_state.set({
                    isLoggedIn: user !== null,
                    user,
                    firebaseControlled: true,
                });
            });

            console.log("auth:")
            console.log(token)
            console.log(user)
        }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        console.log("Errors:")
        console.log(errorCode)
        console.log(errorMessage)
        console.log(email)
        console.log(credential)
    });
}

const logout = () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        auth_state.set({
            isLoggedIn: false,
            firebaseControlled: false,
        });
    }).catch((error) => {
        // An error happened.
    });
}

export default {
    login: login,
    logout: logout,
};
