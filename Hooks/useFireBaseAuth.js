import firebaseApp from "../pages/api/firebase";
import { useState, useEffect } from "react";
import { type } from "os";
import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { async } from "@firebase/util";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const auth = getAuth();
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setLoading(false);
  };

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe =
      getAuth(firebaseApp).onAuthStateChanged(authStateChanged);

    return () => unsubscribe();
  }, []);

  const CreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const SignInWithEmailAndPassword = async (email, password) => {
    console.log("Sent");

    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Signed In");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function SignIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("Signed In");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const SignOut = () => {
    return signOut(auth).then(() => {
      clear();
    });
  };

  const variants = {
    out: {
      opacity: 0,
      x: 40,
      transition: {
        duration: 0.75,
      },
    },
    in: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.75,
        delay: 0.3,
      },
    },
  };

  const sign = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  return {
    authUser,
    variants,
    loading,
    SignOut,
    SignInWithEmailAndPassword,
    CreateUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    SignIn,
    sign,
  };
}
