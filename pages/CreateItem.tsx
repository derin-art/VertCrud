import { motion, AnimatePresence } from "framer-motion";
import ImageView from "@/components/ImageView";
import { useState } from "react";
import CreateItemMenu from "@/components/CreateItemMenu";
import MobileCreateItemMenu from "@/components/Mobile/MobileCreateItemMenu";
import EditIcon from "public/Icons/editIcon";
import useMediaQuery from "Hooks/useMediaQuery";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    price: null,
    collection: "",
    Description: "",
  });

  const variants = {
    out: {
      opacity: 0,
      x: -400,
      transition: {
        duration: 0.55,
      },
    },
    in: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.55,
      },
    },
  };

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

        break;
      default:
        return;
    }
  };

  const imgFiles: any[] = [Main, Sec, Alt];
  console.log(Main, Sec, Alt);

  const mainButtons = ["Save"];

  const { width, height } = useMediaQuery();

  let isTablet: boolean = false;

  if (width) {
    if (width < 1000) {
      isTablet = true;
    }
  }

  return (
    <div className="w-screen p-8 font-Poppins">
      {isTablet && (
        <button
          onClick={() => {
            setIsMobileMenuOpen((prev) => !prev);
          }}
          className={`duration-300 top-4 left-2 fixed z-50 flex items-center justify-center text-xs ${
            isMobileMenuOpen ? "text-white" : "text-black"
          }`}
        >
          {EditIcon(
            `${isMobileMenuOpen ? "fill-white" : "fill-black"} duration-300`
          )}{" "}
          {isMobileMenuOpen ? "Close Details" : "Add Details"}
        </button>
      )}
      <div className="w-full flex">
        {
          <AnimatePresence>
            <div className="absolute top-0 left-0 w-1/4">
              {!isTablet && (
                <motion.div
                  variants={variants}
                  animate="in"
                  exit={"out"}
                  className="w-1/4 "
                  key={String(isTablet)}
                  initial={{
                    opacity: 0,
                    left: -400,
                  }}
                  whileInView={{
                    opacity: 1,
                    left: 0,
                  }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: false }}
                >
                  <motion.div className="w-full bg-black h-screen absolute top-0 left-0  z-30 min-w-[350px]">
                    <div className="absolute right-4 top-8 flex text-white">
                      <span className="mr-2">Input Details</span>{" "}
                      {EditIcon("border fill-white ")}
                    </div>
                    <div className="pt-24 p-2">
                      <CreateItemMenu></CreateItemMenu>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        }

        {isTablet && (
          <motion.div
            className={`fixed top-0 ${
              isMobileMenuOpen ? "left-0" : "-left-[250px]"
            } duration-300 w-[240px] bg-black z-40 h-full pt-14 `}
          >
            <MobileCreateItemMenu></MobileCreateItemMenu>
          </motion.div>
        )}
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
          <div className="flex md:flex-row flex-col space-y-4 md:space-x-8 md:space-y-0 md:justify-end  justify-center items-center">
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
