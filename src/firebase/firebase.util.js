import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: "AIzaSyBP8Lwbu1sd6uQmM159z4osv1naN2Rh1pY",
	authDomain: "crwn-db-a49ba.firebaseapp.com",
	databaseURL: "https://crwn-db-a49ba.firebaseio.com",
	projectId: "crwn-db-a49ba",
	storageBucket: "crwn-db-a49ba.appspot.com",
	messagingSenderId: "1099182329333",
	appId: "1:1099182329333:web:c4d9dd09a7f1f45d9764bc",
	measurementId: "G-C8LKK78EE3",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;