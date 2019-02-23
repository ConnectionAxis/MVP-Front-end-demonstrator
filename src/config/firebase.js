import firebase from 'firebase/app';

export const init = () => {
	// Initialize Firebase
	// account: mailluifruti@gmail.com
	// console: https://console.firebase.google.com/
	// project: conax-tool

	const config = {
	  apiKey: "AIzaSyByCgAptqzKiP9kwEnnEfm2bQBNPIEssJo",
	  authDomain: "conax-tool.firebaseapp.com",
	  databaseURL: "https://conax-tool.firebaseio.com",
	  projectId: "conax-tool",
	  storageBucket: "conax-tool.appspot.com",
	  messagingSenderId: "255233410718"
	};

	firebase.initializeApp(config);
}