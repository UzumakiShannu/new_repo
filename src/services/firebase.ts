import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDIqkWjdjoXCJ3Ej1UW1uBahZp6sJqoNMw",
  authDomain: "ectronics-bcd1b.firebaseapp.com",
  databaseURL: "https://ectronics-bcd1b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ectronics-bcd1b",
  storageBucket: "ectronics-bcd1b.firebasestorage.app",
  messagingSenderId: "174344247509",
  appId: "1:174344247509:web:8182513269a2154882ea5c"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);