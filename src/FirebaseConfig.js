import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyDPas7EeeQa0LGKP0zmU6Qb86AFko2w0-s",
    authDomain: "fir-sbs-1f96b.firebaseapp.com",
    projectId: "fir-sbs-1f96b",
    storageBucket: "fir-sbs-1f96b.appspot.com",
    messagingSenderId: "350952144870",
    appId: "1:350952144870:web:b081de6462013d42aea027",
    measurementId: "G-GZP9Z88XQT",
    databaseURL : "https://fir-sbs-1f96b-default-rtdb.firebaseio.com"
  };

  export const app = initializeApp(firebaseConfig);
