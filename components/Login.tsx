import LoginInput from "./LoginInput";
import { useAuth } from "context/firebaseUserContext";

export default function Login() {
  const {
    SignOut,
    SignInWithEmailAndPassword,
    CreateUserWithEmailAndPassword,
  } = useAuth();
  return (
    <div className="w-full h-full flex sm:flex-row flex-col items-center justify-center text-black">
      <a
        rel="noreferrer"
        href="https://vert-front.vercel.app/"
        target={"_blank"}
        className="sm:hidden absolute top-0 font-CorUp text-4xl"
      >
        <span className="text-6xl">V</span>
        ert
      </a>
      <div className="w-2/4 h-full bg-black flex items-center justify-center sm:flex hidden">
        <a
          rel="noreferrer"
          href="https://vert-front.vercel.app/"
          target={"_blank"}
          className="text-white font-CorUp"
        >
          <span className="text-[300px]">V</span>
          <span className="text-7xl">ert</span>
        </a>
      </div>
      <div className="w-2/4 h-full md:pt-0 pt-8">
        <LoginInput
          CreateUserWithEmailAndPassword={CreateUserWithEmailAndPassword}
          SignInWithEmailAndPassword={SignInWithEmailAndPassword}
          SignOut={SignOut}
          key={"login"}
        ></LoginInput>
      </div>
    </div>
  );
}
