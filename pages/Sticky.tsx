import { type } from "os";
import { useRef } from "react";
import testPng from "../public/Background/testPNG.jpg";

type curent = {
  scrollIntoView?: any;
};

export default function Sticky() {
  const ref = useRef(null);
  const handleClick = () => {
    let curent: any = ref.current;
    curent.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="checkSticky">
        <div id="ca">
          <img src={testPng.src}></img>
        </div>
        <div id="cb">Nice</div>
      </div>
      <div className="checkSticky1" ref={ref}></div>
    </div>
  );
}
