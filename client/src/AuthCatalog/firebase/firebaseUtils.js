import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onIdTokenChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,            // example for Vite
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_PROJECTID,
  storageBucket: import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


export function logOut(afterLogOut) {
  signOut(auth).then(() => {
    afterLogOut()
  }).catch((error) => {
    console.log(error);
  });
};



export function createUser(email, password, dothen) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      dothen(userCredential)
    })
    .catch((error) => {
      console.log(error)
    });
}

export function existingSignIn(email, password, dothen) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      dothen(userCredential);
    })
    .catch((error) => {
      
      console.log(error);
    });
}


