import { type } from "os";
import UserHead from "../public/Icons/userHead";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import UserLoginHead from "../public/Icons/userLoginHead";
import useMediaQuery from "../Hooks/useMediaQuery";
import { async } from "@firebase/util";
import { useRouter } from "next/router";
import { useAuth } from "../context/firebaseUserContext";

type LoginProps = {
  SignOut?: any;
  CreateUserWithEmailAndPassword?: any;
  SignInWithEmailAndPassword?: any;
};

export default function LoginInput(props: LoginProps) {
  const router = useRouter();
  const { SignInWithEmailAndPassword } = useAuth();
  const { height, width } = useMediaQuery();

  console.log(useMediaQuery());

  const isSmall = width ? width < 550 : false;
  console.log(isSmall);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [newUser, setNewUser] = useState(false);
  const LoginFuc = async (email: string, password: string) => {
    console.log("senr");
    await SignInWithEmailAndPassword(email, password)
      .then(() => {
        router.push("/items");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const CreateUserFuc = async (email: string, password: string) => {
    return props.CreateUserWithEmailAndPassword(email, password);
  };
  let xDisplacement = isSmall ? 30 : 100;
  const variants = {
    out: {
      opacity: 0,
      x: xDisplacement,
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

  return (
    <div className="flex flex-col w-full h-full items-center justify-center font-Poppins">
      <div className="h-[300px] w-fit flex items-center flex-col justify-center mt-32">
        <AnimatePresence>
          <motion.div
            key={String(newUser)}
            variants={variants}
            animate="in"
            initial="out"
            exit={"out"}
            className="absolute "
          >
            {!newUser ? (
              <section className="flex flex-col ">
                <div className=" flex items-center justify-center mb-4">
                  {UserHead(
                    "border rounded-full border-gray-300 p-2 fill-neutral-200",
                    "100",
                    "100"
                  )}
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="Input Email"
                    type="email"
                    className="border-black p-4 border mb-6"
                  ></input>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    name="password"
                    placeholder="Input Password"
                    type="password"
                    className="border-black p-4 border mb-6"
                  ></input>
                </div>
                <div className="flex w-full">
                  <button
                    onClick={async () => {
                      await LoginFuc(email, password);
                    }}
                    className="border p-4 border-black text-white bg-black w-full"
                  >
                    Login
                  </button>
                </div>
              </section>
            ) : (
              <section className="flex flex-col ">
                <div className=" flex items-center justify-center mb-4">
                  {UserLoginHead(
                    "border rounded-full border-gray-300 p-2 fill-neutral-200",
                    "100",
                    "100"
                  )}
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      setRegisterEmail(e.target.value);
                    }}
                    placeholder="Input Email"
                    type="email"
                    className="border-black p-4 border mb-6"
                  ></input>
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      setRegisterPassword(e.target.value);
                    }}
                    name="password"
                    placeholder="Input Registration Password"
                    type="password"
                    className="border-black p-4 border mb-6"
                  ></input>
                </div>
                <div className="flex w-full">
                  <button
                    onClick={() => {
                      CreateUserFuc(registerEmail, registerPassword);
                    }}
                    className="border p-4 border-black text-white bg-black w-full"
                  >
                    SignUp
                  </button>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={() => {
          setNewUser((prev) => !prev);
        }}
        className="mb-32 mt-8 text-xs "
      >
        {!newUser ? "New User?" : "Previous User?"}
      </button>
    </div>
  );
}
