import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribr = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedEmail = { email: userEmail };
      setuser(currentUser);
      // console.log("current User", currentUser);
      setLoading(false);
      //if user exists then issues a token
      if (currentUser) {
        axios
          .post("https://serene-stays-server-ten.vercel.app/jwt", loggedEmail, {
            withCredentials: true,
          })
          .then((res) => {
            // console.log("token respons", res.data);
          });
      } else {
        axios
          .post("https://serene-stays-server-ten.vercel.app/logout", loggedEmail, {
            withCredentials: true,
          })
          .then((res) => {
            console.log(res.data);
          });
      }
    });
    return () => {
      return unsubscribr();
    };
  }, []);

  // create user data ami data bes thek anbo

  useEffect(() => {
    if (!user?.displayName) {
      axios
        .get(`https://serene-stays-server-ten.vercel.app/users?email=${user?.email}`)
        .then((res) => {
          // console.log(res.data[0]);
          setUserData(res.data[0]);
        });
    }
  }, [user?.email]);

  const authInfo = {
    user,
    loading,
    userData,
    creatUser,
    SignInUser,
    logOutUser,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
