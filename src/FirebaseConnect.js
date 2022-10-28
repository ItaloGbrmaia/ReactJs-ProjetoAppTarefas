import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCT9yfEEl0_ZvauJgnARmwEwAQXouoM198",
    authDomain: "projeto-1-3d566.firebaseapp.com",
    projectId: "projeto-1-3d566",
    storageBucket: "projeto-1-3d566.appspot.com",
    messagingSenderId: "891174146644",
    appId: "1:891174146644:web:2c09e2802e6a88b4bad3c1",
    measurementId: "G-Q3QD5X8N9E"
  };

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp)

const auth = getAuth(firebaseApp)

export {db, auth};