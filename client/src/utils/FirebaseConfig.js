
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyBq7e9mER6QgLdn1PhQbMNhpcoFdzcRxTY",
    authDomain: "whatsapp-clone-cf46d.firebaseapp.com",
    projectId: "whatsapp-clone-cf46d",
    storageBucket: "whatsapp-clone-cf46d.appspot.com",
    messagingSenderId: "259366170698",
    appId: "1:259366170698:web:52ed6ae3a30b635bcd36b3",
    measurementId: "G-46GMZ084MY"
  };

  const app = initializeApp(firebaseConfig);
  export const firebaseAuth = getAuth(app);