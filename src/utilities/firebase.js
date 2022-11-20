import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  child,
  getDatabase,
  onValue,
  push,
  ref,
  set,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-R1wmbOLh609jOecQYght3M9tOpJGqa4",
  authDomain: "easyjob-ee2ca.firebaseapp.com",
  databaseURL: "https://easyjob-ee2ca-default-rtdb.firebaseio.com",
  projectId: "easyjob-ee2ca",
  storageBucket: "easyjob-ee2ca.appspot.com",
  messagingSenderId: "640029378298",
  appId: "1:640029378298:web:a6e30401e1edbf90d2eb43",
  measurementId: "G-5RHL6NV3BY"
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);

export const signInWithGoogle = () => {
  signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
};

const firebaseSignOut = () => signOut(getAuth(firebase));

export { firebaseSignOut as signOut };

export const useAuthState = () => {
  const [user, setUser] = useState();

  useEffect(() => onAuthStateChanged(getAuth(firebase), setUser));

  return user;
};

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

export const addUser = (user) => {
  const newUser = {
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    phoneNumber: user.phoneNumber
  };

  set(ref(database, "users/" + user.uid), newUser);
};

// export const addSession = (
//   course,
//   date,
//   duration,
//   location,
//   student,
//   newCredits
// ) => {
//   const newSession = {
//     course: course,
//     date: date,
//     duration: duration,
//     location: location,
//     student: student,
//     tutor: "",
//   };

//   const key = push(child(ref(database), "sessions")).key;

//   const updates = {};
//   updates["/sessions/" + key] = newSession;
//   updates["/users/" + student + "/credits"] = newCredits;

//   return update(ref(database), updates);
// };

// // add user to session as tutor
// export const tutorSession = (tutorid, sessid, newCredits) => {
//   set(ref(database, "/sessions/" + sessid + "/tutor"), tutorid);
//   set(ref(database, "/users/" + tutorid + "/credits"), newCredits);
// };
