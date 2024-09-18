import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBe_dMfNAv-BcVEKYym46YNpTT3cOaep7w",
    authDomain: "portal-aa49f.firebaseapp.com",
    projectId: "portal-aa49f",
    storageBucket: "portal-aa49f.appspot.com",
    messagingSenderId: "24297707717",
    appId: "1:24297707717:web:51245073e592c50002f8ac"
};

const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { auth, db };
