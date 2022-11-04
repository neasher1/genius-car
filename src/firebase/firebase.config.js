// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_apiKey,
//     authDomain: process.env.REACT_APP_authDomain,
//     projectId: process.env.REACT_APP_projectId,
//     storageBucket: process.env.REACT_APP_storageBucket,
//     messagingSenderId: process.env.REACT_APP_messagingSenderId,
//     appId: process.env.REACT_APP_appId,
// };
const firebaseConfig = {
    apiKey: "AIzaSyBc4cB83vTcsweoDVgcSe985eWhTvXxDYA",
    authDomain: "genius-car-9a289.firebaseapp.com",
    projectId: "genius-car-9a289",
    storageBucket: "genius-car-9a289.appspot.com",
    messagingSenderId: "438845811554",
    appId: "1:438845811554:web:375ef0ae58957b135f5a3b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;