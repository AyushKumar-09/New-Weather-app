// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPoaTGnRVPJPC1jtCY3SYff91YtLEydY8",
  authDomain: "weatherapp-7cdbd.firebaseapp.com",
  projectId: "weatherapp-7cdbd",
  storageBucket: "weatherapp-7cdbd.appspot.com",
  messagingSenderId: "561819621298",
  appId: "1:561819621298:web:e368b9866a7134faa7f6ab",
  measurementId: "G-8WWF9PWHYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();