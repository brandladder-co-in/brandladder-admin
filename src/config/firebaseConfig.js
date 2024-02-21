import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCC0sAbeksXVPTP1SBYdXSskcSH0hbB9eE",
    authDomain: "brandladder-webapp.firebaseapp.com",
    projectId: "brandladder-webapp",
    storageBucket: "brandladder-webapp.appspot.com",
    messagingSenderId: "472889019198",
    appId: "1:472889019198:web:3382d07726002a93d13a6f",
    measurementId: "G-YX42L7G1XB"
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };
