import { request } from "http";
import Head from "next/head";
import Image from "next/image";
import { NextFetchEvent } from "next/server";
import styles from "../styles/Home.module.css";
import Login from "../components/Login";
import axios from "axios";
import { useAuth } from "context/firebaseUserContext";

export default function Home() {
  return (
    <div className="h-full w-full">
      <Login></Login>
    </div>
  );
}

/*   <button
        onClick={async () => {
          const data = await axios.get("./api/getAllItems").catch((err) => {
            console.log(err);
          });
          console.log(data);
        }}
      >
        BRING ON IT
      </button> */
