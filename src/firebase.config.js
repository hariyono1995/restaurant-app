import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeLiaW6BJqAEMP9stvlm2UO3BxsxJ1wjQ",
  authDomain: "restaurant-app-69822.firebaseapp.com",
  databaseURL: "https://restaurant-app-69822-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-69822",
  storageBucket: "restaurant-app-69822.appspot.com",
  messagingSenderId: "235248138645",
  appId: "1:235248138645:web:259af2439c27c3948e1e9c",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
