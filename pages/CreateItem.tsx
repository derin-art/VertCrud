import { motion } from "framer-motion";
import ImageView from "@/components/ImageView";
import { useState } from "react";
import CreateItemMenu from "@/components/CreateItemMenu";
import ImageCreate from "@/components/ImageCreate";
import Test1 from "../public/TestImages/Test1.jpg";
import Test2 from "../public/TestImages/Test2.jpg";
import Test3 from "../public/TestImages/Test3.jpg";
import Test4 from "../public/TestImages/Test4.webp";
import Test5 from "../public/TestImages/Test5.png";

export default function CreateItem() {
  const TestImages = [Test1, Test2];
  const inputs = ["Main", "Sec", "Alt"];
  const [Main, setMain] = useState({ file: null, name: "Main" });
  const [Sec, setSec] = useState({ file: null, name: "Sec" });
  const [Alt, setAlt] = useState({ file: null, name: "Alt" });

  const setFunctionForImageCreate = (e: any, item: string) => {
    let urlTobeSet: string;

    function createImageUrl(e: any, condition: string) {
      var selectedFile = e.target.files[0];
      var reader = new FileReader();
      console.log(selectedFile);

      reader.onload = function (event: any) {
        const b = event.target.result;
        switch (condition) {
          case "Main":
            setMain((prev) => {
              return { ...prev, src: b };
            });
            break;
          case "Sec":
            setSec((prev) => {
              return { ...prev, src: b };
            });
            break;
          case "Alt":
            setAlt((prev) => {
              return { ...prev, src: b };
            });
            break;
          default:
            return;
        }
      };

      reader.readAsDataURL(selectedFile);
    }

    console.log(item);

    switch (item) {
      case "Main":
        createImageUrl(e, item);
        setMain((prev) => ({
          ...prev,
          file: e.target.files[0],
        }));
        break;
      case "Sec":
        createImageUrl(e, item);

        setSec((prev) => {
          return { ...prev, file: e.target.files[0] };
        });
        break;
      case "Alt":
        createImageUrl(e, item);
        setAlt((prev) => {
          return { ...prev, file: e.target.files[0] };
        });
        /*  setAlt(e.target.files[0]); */
        break;
      default:
        return;
    }
  };

  const imgFiles: any[] = [Main, Sec, Alt];
  console.log(Main, Sec, Alt);

  const mainButtons = ["Save"];
  return (
    <div className="w-screen p-8 font-Poppins ">
      <div className="w-full flex">
        <div className="w-1/4">
          <motion.div
            initial={{
              opacity: 0,
              left: -100,
            }}
            whileInView={{
              opacity: 1,
              left: 0,
            }}
            transition={{ duration: 0.4 }}
            className="w-1/4 bg-black h-screen absolute top-0 left-0 z-10"
          >
            <div className="pt-40 p-2">
              <CreateItemMenu></CreateItemMenu>
            </div>
          </motion.div>
        </div>
        <div className="-mt-4 w-full ">
          <div className="flex border-b justify-end border-black mb-2 text-4xl items-center">
            Create Items
          </div>
          <div className="flex justify-end mb-2">
            {mainButtons.map((item) => {
              return (
                <button
                  key={item}
                  className="ml-4 px-4 p-2 bg-black text-white text-lg "
                >
                  {item}
                </button>
              );
            })}
          </div>
          <div className="flex space-x-8  justify-center">
            {inputs.map((item, index) => {
              let setAltFunc;
              if (item === "Main") {
                setAltFunc = setMain;
              } else if (item === "Sec") {
                setAltFunc = setSec;
              }
              if (item === "Alt") {
                setAltFunc = setAlt;
              }
              return (
                <ImageCreate
                  changeFun={setAltFunc}
                  n={item}
                  key={item}
                  imgFile={imgFiles[index]}
                ></ImageCreate>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/*  <div className="flex border ">
                {mainButtons.map((item) => {
                  return (
                    <button key={item} className="ml-4 p-2 bg-black text-white">
                      {item}
                    </button>
                  );
                })}
              </div> */
