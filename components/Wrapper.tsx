import { type } from "os";
import MainView from "../components/MainView";
import Header from "../components/header";
import { useAuth } from "../context/firebaseUserContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

type WrapperProps = {
  children?: any;
};

export default function Wrapper(props: WrapperProps) {
  const router = useRouter();
  const { authUser, loading } = useAuth();
  useEffect(() => {
    if (router.pathname != "/") {
      console.log(authUser, loading, "NewPage");
      if (!authUser) {
        router.push("/");
      }
    }
  }, [authUser, loading]);

  return (
    <div className="h-screen w-screen">
      <Header></Header>
      {props.children}
    </div>
  );
}
