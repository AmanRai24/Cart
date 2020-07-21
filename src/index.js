import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYEW__ocEaJEYm8UE_fWRyCfQVYXEplq8",
    authDomain: "cart-5de28.firebaseapp.com",
    databaseURL: "https://cart-5de28.firebaseio.com",
    projectId: "cart-5de28",
    storageBucket: "cart-5de28.appspot.com",
    messagingSenderId: "130473772987",
    appId: "1:130473772987:web:2ac4f3cad957246364669e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />,document.getElementById('root'));

