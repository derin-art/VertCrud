import firebaseApp from "../pages/api/firebase";
import { useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data";
import { ItemDataType } from "@/pages/items/[editItem]";
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
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("authState", null);
      }
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("authState", formattedUser);
    }
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

    return signInWithEmailAndPassword(auth, email, password);
  };

  const getItems = async () => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const data = await axios.get("/api/Images", config).catch((err) => {
      console.log(err);
    });
    if (data) {
      console.log(data);
      return data;
    }
  };

  const CreateItem = async (items) => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    const formdata = new FormData();
    formdata.append("Main", items.Main);
    formdata.append("Sec", items.Sec);
    formdata.append("Alt", items.Alt);
    formdata.append("name", items.name);
    formdata.append("price", items.price);
    formdata.append("collection", items.collection);
    formdata.append("Description", items.Description);
    const data = await axios.post("/api/Images", formdata).catch((err) => {
      console.log(err);
    });
    if (data) {
      console.log(data);
      return data;
    }
  };

  const EditItem = async (items, id) => {
    const formdata = new FormData();
    formdata.append("name", items.name.changed);
    formdata.append("price", items.price.changed);
    formdata.append("collection", items.itemCollection.changed);
    formdata.append("Description", items.Description.changed);
    items.urls.forEach((url) => {
      if (url.actFile) {
        formdata.append(url.imgType, url.actFile);
      }
    });
    const forDeletionArr = items.urls.map((url) => {
      if (url.forDeletion) {
        console.log(url.imgType);
        return url.imgType;
      } else return;
    });

    const filteredForDeleteArr = forDeletionArr.filter((imgType) => {
      if (imgType) {
        return imgType;
      } else return;
    });

    console.log(filteredForDeleteArr);

    formdata.append("forDeletionArr", filteredForDeleteArr);
    const data = await axios
      .patch(`/api/editItem?id=${id}`, formdata)
      .catch((err) => {
        console.log(err);
      });
    if (data) {
      console.log("200", data);
    }
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
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem("authState", null);
      }
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
    getItems,
    EditItem,
    loading,
    SignOut,
    SignInWithEmailAndPassword,
    CreateUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    SignIn,
    sign,
    CreateItem,
  };
}
