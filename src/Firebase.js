import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBiETcqbAMjCG-2HS2pYX6O83HK2b-UZew",
    authDomain: "react-todo-8bb6a.firebaseapp.com",
    projectId: "react-todo-8bb6a",
    storageBucket: "react-todo-8bb6a.appspot.com",
    messagingSenderId: "807114519358",
    appId: "1:807114519358:web:e803f1d4f5ebfacbc0326f"
  };

  const app=initializeApp(firebaseConfig)
  const db=getFirestore(app)

  export{db};