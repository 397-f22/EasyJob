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

//WHAT'S NEW:
//Error: Users do not get a joblist upon being created, check addUser function
//Added in AddJob function for the form

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
  measurementId: "G-5RHL6NV3BY",
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
    phoneNumber: user.phoneNumber,
  };

  set(ref(database, "users/" + user.uid), newUser);
};

export const updateStatus = (uid, jobid, newStatus) => {
  set(ref(database, "/users/" + uid + "/jobs/" + jobid + "/status"), newStatus);
};

//AddJob Function
export const addJob = (
    company,
    jobTitle,
    appliedOn,
    deadline,
    status,
    uid,
  ) => {
    const newJob = {
      company: company,
      jobTitle: jobTitle,
      appliedOn: appliedOn,
      deadline: deadline,
      status: status,
    };

    const path = `/users/${uid}`;
    const key = push(child(ref(database), "jobs")).key;

    const updates = {};
    updates[path + "/jobs/" + key] = newJob;

    return update(ref(database), updates);
};
