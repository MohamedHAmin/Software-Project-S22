import { initializeApp } from "firebase/app";
//!last config
/* var firebaseConfig = {
  apiKey: "AIzaSyDd8zEGYjbbwztKcfcRdL4NlTubEUYzcXk",
  authDomain: "react-complete-guide-3768d.firebaseapp.com",
  projectId: "react-complete-guide-3768d",
  storageBucket: "react-complete-guide-3768d.appspot.com",
  messagingSenderId: "413479893328",
  appId: "1:413479893328:web:9a32759ee4434e0f395455"
  }; */


  const firebaseConfig = {
    apiKey: "AIzaSyDd8zEGYjbbwztKcfcRdL4NlTubEUYzcXk",
    authDomain: "react-complete-guide-3768d.firebaseapp.com",
    projectId: "react-complete-guide-3768d",
    storageBucket: "react-complete-guide-3768d.appspot.com",
    messagingSenderId: "413479893328",
    appId: "1:413479893328:web:a5945106b559616a395455"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
export default app;