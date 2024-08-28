
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBX1FGsLag59MhwrsywVVGkaLNd5M81Vck",
  authDomain: "reduxtoolkit-api.firebaseapp.com",
  databaseURL:"https://reduxtoolkit-api-default-rtdb.firebaseio.com/",
  projectId: "reduxtoolkit-api",
  storageBucket: "reduxtoolkit-api.appspot.com",
  messagingSenderId: "586148582239",
  appId: "1:586148582239:web:59f12d4d8f4e5a39b8dcea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);