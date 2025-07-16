import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBbcshn9JMXPxm9YOJCdg3tPdWRJm88cEM",
  authDomain: "userlistfb-b03a4.firebaseapp.com",
  projectId: "userlistfb-b03a4",
  storageBucket: "userlistfb-b03a4.firebasestorage.app",
  messagingSenderId: "588446879852",
  appId: "1:588446879852:android:27c99ab47e864987edc849"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();