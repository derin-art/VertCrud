import { type } from "os";
import MainView from "../components/MainView";
import Header from "../components/header";

type WrapperProps = {
  children?: any;
};

export default function Wrapper(props: WrapperProps) {
  return (
    <div className="h-screen w-screen">
      <Header></Header>
      {props.children}
    </div>
  );
}
