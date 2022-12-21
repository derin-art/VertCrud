import { motion, AnimatePresence } from "framer-motion";
import ImageView from "@/components/ImageView";
import { useState, useRef } from "react";
import CreateItemMenu from "@/components/CreateItemMenu";
import MobileCreateItemMenu from "@/components/Mobile/MobileCreateItemMenu";
import useCommonToastifyOptions from "Hooks/useCommonToastifyOptions";
import EditIcon from "public/Icons/editIcon";
import useMediaQuery from "Hooks/useMediaQuery";
import ImageCreate from "@/components/ImageCreate";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "context/firebaseUserContext";

export default function CreateItem() {
  const toastOptions = useCommonToastifyOptions();
  const { CreateItem } = useAuth();
  const inputs = ["Main", "Sec", "Alt"];
  const [isItemCreated, setItemCreated] = useState(false);
  const [Main, setMain] = useState({ file: null, name: "Main" });
  const [Sec, setSec] = useState({ file: null, name: "Sec" });
  const [Alt, setAlt] = useState({ file: null, name: "Alt" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [productDetails, setProductDetails] = useState({
    name: "",
    price: 0,
    collection: "Casual",
    Description: "",
    CollectionDate: "",
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

  console.log(productDetails);

  const toastId: any = useRef(null);

  const notify = () => {
    toastId.current = toast("Creating Item 🐸", {
      autoClose: false,
      isLoading: true,
    });
  };

  const update = () => {
    toast.update(toastId.current, {
      type: toast.TYPE.SUCCESS,
      autoClose: 3000,
      isLoading: false,
      render: "Item Created Successfully 👍",
    });
  };

  const ifErrorUpdate = () => {
    toast.update(toastId.current, {
      type: toast.TYPE.ERROR,
      autoClose: 5000,
      isLoading: false,
      render:
        "An error occured. Please check your internet connection and try again 😓",
    });
  };

  return (
    <div className="w-screen md:p-8 pt-12 font-Poppins p-2">
      <ToastContainer></ToastContainer>
      <button
        onClick={() => {
          setIsMobileMenuOpen((prev) => !prev);
        }}
        className={`duration-300 top-4 left-2 fixed z-50 flex items-center justify-center text-xs ${
          isMobileMenuOpen ? "text-white" : "text-black"
        } ${isTablet ? "" : "hidden"}`}
      >
        {EditIcon(
          `${isMobileMenuOpen ? "fill-white" : "fill-black"} duration-300`
        )}{" "}
        {isMobileMenuOpen ? "Close Details" : "Add Details"}
      </button>

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
                      <CreateItemMenu
                        productDetails={productDetails}
                        setProductDetails={setProductDetails}
                      ></CreateItemMenu>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        }

        <motion.div
          className={`fixed top-0 ${
            isMobileMenuOpen ? "left-0" : "-left-[250px]"
          } duration-300 w-[240px] bg-black z-40 h-full pt-14 ${
            isTablet ? "" : "hidden"
          }`}
        >
          <CreateItemMenu
            productDetails={productDetails}
            setProductDetails={setProductDetails}
          ></CreateItemMenu>
        </motion.div>

        <div className="-mt-2 w-full ">
          <div className="flex border-b justify-end border-black mb-2 text-4xl items-center">
            Create Items
          </div>
          <div className="flex justify-end mb-2">
            {mainButtons.map((item) => {
              return (
                <button
                  key={item}
                  onClick={async (e) => {
                    if (!Main.file) {
                      toast.error(
                        "Main Image file required to create item",
                        toastOptions
                      );

                      return;
                    }
                    if (!productDetails.name) {
                      toast.error(
                        "Product name required to create item",
                        toastOptions
                      );
                      return;
                    }
                    if (!productDetails.price) {
                      toast.error(
                        "Product Price required to create item",
                        toastOptions
                      );
                      return;
                    }
                    if (!productDetails.collection) {
                      toast.error(
                        "Product Collection required to create item",
                        toastOptions
                      );
                      return;
                    }
                    setItemCreated(true);
                    notify();
                    await CreateItem({
                      Alt: Alt.file,
                      Main: Main.file,
                      Sec: Sec.file,
                      ...productDetails,
                    })
                      .then(() => {
                        setItemCreated(false);
                        update();
                        /*  toast.clearWaitingQueue();
                        toast.success(
                          "Item created successfully 👍",
                          toastOptions
                        ); */
                      })
                      .catch((err) => {
                        setItemCreated(false);
                        ifErrorUpdate();
                      });
                  }}
                  className="ml-4 px-4 mb-4 md:mb-0 p-2 bg-black text-white text-lg "
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
