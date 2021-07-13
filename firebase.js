import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAuW-5oIDWGXs6Cvk310V7wqHesQGv8NZI",
    authDomain: "docs-clone-b4fe7.firebaseapp.com",
    projectId: "docs-clone-b4fe7",
    storageBucket: "docs-clone-b4fe7.appspot.com",
    messagingSenderId: "92841042913",
    appId: "1:92841042913:web:b5402b0436722a471a28a0"
  };
const app = (!firebase.apps.length )
            ? firebase.initializeApp(firebaseConfig) 
            : firebase.app();

const db=app.firestore();

export {db}
