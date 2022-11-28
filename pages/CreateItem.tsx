import { motion } from "framer-motion";
import ImageView from "@/components/ImageView";
import Test1 from "../public/TestImages/Test1.jpg";
import Test2 from "../public/TestImages/Test2.jpg";
import Test3 from "../public/TestImages/Test3.jpg";
import Test4 from "../public/TestImages/Test4.webp";

export default function CreateItem() {
  const TestImages = [Test1, Test2, Test3];
  return (
    <div className="w-screen p-8 font-Poppins border ">
      <div className="w-full flex">
        <div className="w-1/4">
          <div className="w-1/4 bg-black h-screen absolute top-0 left-0 z-10"></div>
        </div>
        <div className="flex relative border">
          {TestImages.map((item, index) => {
            return <ImageView img={item} key={index}></ImageView>;
          })}
        </div>
      </div>
    </div>
  );
}
