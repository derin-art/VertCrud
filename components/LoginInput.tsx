import { type } from "os";
import UserHead from "../public/Icons/userHead";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import UserLoginHead from "../public/Icons/userLoginHead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const { SignInWithEmailAndPassword, CreateUserWithEmailAndPassword } =
    useAuth();
  const { height, width } = useMediaQuery();

  const isSmall = width ? width < 550 : false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [newUser, setNewUser] = useState(false);

  const commonToastifyOptions = {
    position: toast.POSITION.BOTTOM_CENTER,
    className: "text-sm",
  };
  const LoginFuc = async (email: string, password: string) => {
    await SignInWithEmailAndPassword(email, password)
      .then((auth) => {
        router.push("/items");
        const functionThatReturnPromise = () =>
          new Promise((resolve) => setTimeout(resolve, 10000));
        toast.promise(functionThatReturnPromise, {
          pending: "Gathering Store Data 🐸",
          success: "👌",
          error: "Please Check your internet and reload this page 😓",
        });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/user-not-found":
            toast.error("User Not found", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
            break;
          case "auth/wrong-password":
            toast.error("Wrong Password", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
            break;
          case "auth/invalid-email":
            toast.error("Invalid Email", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
            break;

          default:
            toast.error("Bad Connection", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
            break;
        }
        return;
      });
  };
  const CreateUserFuc = async (email: string, password: string) => {
    await CreateUserWithEmailAndPassword(email, password)
      .then(() => {
        toast.success("User Created Successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
          className: "text-sm",
        });
      })
      .catch((err) => {
        console.log(err);
        switch (err.code) {
          case "auth/email-already-in-use":
            toast.error("Email Already in use", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
            break;
          default:
            toast.error("Bad connection", {
              position: toast.POSITION.BOTTOM_CENTER,
              className: "text-sm",
            });
        }
      });
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
    <div className="flex flex-col w-full h-full items-center justify-center font-Poppins bg-white text-black">
      <ToastContainer></ToastContainer>
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
                    className="border-black p-4 border mb-6 bg-white max-w-[300px]"
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
                    className="border-black p-4 border mb-6 bg-white max-w-[300px]"
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
                    className="border-black p-4 border mb-6 bg-white max-w-[300px]"
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
                    className="border-black p-4 border mb-6 bg-white max-w-[300px]"
                  ></input>
                </div>
                <div className="flex w-full">
                  <button
                    onClick={() => {
                      if (!registerEmail) {
                        toast.error(
                          "Please Input an Email",
                          commonToastifyOptions
                        );
                        return;
                      }
                      if (!registerPassword) {
                        toast.error(
                          "Please Input a Password",
                          commonToastifyOptions
                        );
                      }
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
        className="mb-30 md:mt-12 mt-32 text-xs "
      >
        {!newUser ? "New User?" : "Previous User?"}
      </button>
      <button
        onClick={async () => {
          await LoginFuc("guy@gmail.com", "password1");
        }}
        className="mb-24 mt-2 md:mt-6  text-xs max-w-[300px] text-black"
      >
        Don&apos;t want to create yet another fake account to check out a
        project? Click here Login With Mock User.
      </button>
    </div>
  );
}
