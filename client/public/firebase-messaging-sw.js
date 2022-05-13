/* eslint-disable no-undef */
/*global firebase*/
 
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');
//importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
//importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Registration successful, scope is:', registration.scope);
      }).catch(function(err) {
       console.log('Service worker registration failed, error:', err);
      });
   }

firebase.initializeApp({
 apiKey: "AIzaSyDd8zEGYjbbwztKcfcRdL4NlTubEUYzcXk",
 authDomain: "react-complete-guide-3768d.firebaseapp.com",
 projectId: "react-complete-guide-3768d",
 storageBucket: "react-complete-guide-3768d.appspot.com",
 messagingSenderId: "413479893328",
 appId: "1:413479893328:web:9a32759ee4434e0f395455"

  })

const initMessaging = firebase.messaging()