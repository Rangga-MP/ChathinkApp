import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgdU4ic0ueGuj9kzLQpe9llMd88DJzO-M",
  authDomain: "chathink-c2f10.firebaseapp.com",
  projectId: "chathink-c2f10",
  storageBucket: "chathink-c2f10.appspot.com",
  messagingSenderId: "993478382246",
  appId: "1:993478382246:web:76fcc33822f1b801f69a67",
  measurementId: "G-806KMBLFYE"
};

// Inisialisasi Firebase dengan cara standar
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { auth };
