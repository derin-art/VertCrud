import axios from "axios";
import { type } from "os";
import multiparty from "multiparty";
import { useRouter } from "next/router";
import EditItemMenu from "../../components/EditItemMenu";
import { useAuth } from "../../context/firebaseUserContext";
import EditIcon from "public/Icons/editIcon";
import { useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import EditImageCreate from "../../components/EditImageCreate";

type ItemDataType = {
  name: string;
  price: number;
  Description: string;
  _id: string;
  itemCollection: string;
  DateCreated: string;
  urls: {
    blurUrl: string;
    cloudId: string;
    imgUrl: string;
    isMain: boolean;
    _id: string;
    imgType: string;
  }[];
  __v: number;
};

type EditItemProps = {
  itemData: {
    data: ItemDataType;
    status: any;
  };
};

export default function EditItem(props: EditItemProps) {
  console.log(props.itemData);

  const { EditItem } = useAuth();

  const [markedForDeletion, setMarkedForDeletion] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const transformPropsData = (mainData: ItemDataType) => {
    const allUrlTypes = ["Main", "Sec", "Alt"];

    const newUpdatedUrls = allUrlTypes.map((urlTypes) => {
      const isAvailable: any = mainData.urls.find((urlItem) => {
        return urlItem.imgType === urlTypes;
      });
      if (isAvailable) {
        return {
          ...isAvailable,
          changedUrl: isAvailable.imgUrl,
          actFile: "",
          recoverUrl: isAvailable.imgUrl,
          forDeletion: false,
        };
      } else {
        return {
          imgType: urlTypes,
          imgUrl: "",
          changedUrl: "",
          blurUrl: "",
          actFile: "",
          recoverUrl: "",
          forDeletion: false,
        };
      }
    });

    console.log("ofLagos", newUpdatedUrls);
    return {
      ...mainData,
      name: {
        changed: mainData.name,
        original: mainData.name,
      },
      price: {
        changed: mainData.price,
        original: mainData.price,
      },
      Description: {
        changed: mainData.Description,
        original: mainData.Description,
      },
      itemCollection: {
        changed: mainData.itemCollection,
        original: mainData.itemCollection,
      },
      urls: newUpdatedUrls,
    };
  };

  const [stateItemData, setItemData] = useState(
    transformPropsData(props.itemData.data)
  );

  const reverseAction = (name: string, img: boolean) => {
    if (img) {
      setItemData((prev) => {
        const newUrls = prev.urls.map((url: any) => {
          if (name === url.imgType) {
            return { ...url, changedUrl: url.recoverUrl, actFile: "" };
          } else {
            return url;
          }
        });
        return { ...prev, urls: newUrls };
      });
    } else {
      setItemData((prev: any) => {
        const formerObj = prev[name];
        return {
          ...prev,
          [name]: { ...formerObj, changed: formerObj.original },
        };
      });
    }
  };

  const setUpforDelete = (type: string) => {
    setItemData((prev) => {
      const newUrls = prev.urls.map((url: any) => {
        if (type === url.imgType) {
          if (!url.forDeletion) {
            return {
              ...url,
              forDeletion: true,
              changedUrl: "",
              actFile: "",
            };
          } else {
            return { ...url, forDeletion: false };
          }
        } else {
          return url;
        }
      });
      return { ...prev, urls: newUrls };
    });
  };

  function createImageUrl(e: any, imgType: string) {
    var selectedFile = e.target.files[0];

    if (!e.target.files[0]) {
      setItemData((prev) => {
        const newUrls = prev.urls.map((url) => {
          if (url.imgType === imgType) {
            return { ...url, changedUrl: "" };
          } else return url;
        });
        return { ...prev, urls: newUrls };
      });
      return;
    }
    var reader = new FileReader();
    console.log(selectedFile);

    reader.onload = function (event: any) {
      const src = event.target.result;
      setItemData((prev) => {
        const newUrls = prev.urls.map((url) => {
          if (url.imgType === imgType) {
            return { ...url, changedUrl: src, actFile: selectedFile };
          } else return url;
        });
        return { ...prev, urls: newUrls };
      });
    };

    reader.readAsDataURL(selectedFile);
  }

  const onImageChange = (imgType: string, file: any, e: any) => {
    createImageUrl(e, imgType);
  };

  const toastId: any = useRef(null);

  const notify = () => {
    toastId.current = toast("Making Changes to Item 🐸", {
      autoClose: false,
      isLoading: true,
    });
  };

  const update = () => {
    toast.update(toastId.current, {
      type: toast.TYPE.SUCCESS,
      autoClose: 3000,
      isLoading: false,
      render: "Item Edited Successfully 👍",
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
    <div className="bg-white">
      <ToastContainer></ToastContainer>
      <div className="flex flex-col w-full items-end justify-end bg-white">
        <button
          onClick={() => {
            setIsMobileMenuOpen((prev) => !prev);
          }}
          className={`text-xs md:hidden fixed z-50 left-2 top-3 ${
            isMobileMenuOpen ? "text-white" : "text-black"
          }  flex font-Poppins items-center justify-center`}
        >
          {EditIcon(`${isMobileMenuOpen ? "fill-white" : "fill-black"}  `)}{" "}
          {isMobileMenuOpen ? "Edit Details" : "Close Details"}
        </button>
        <div className="md:mr-8 mt-4 font-Poppins flex w-full flex-col justify-end items-end p-2 md:p-0">
          <div className="text-4xl border-b border-black w-full text-right mb-2">
            Edit Item
          </div>
          <button
            className=" px-4 p-2 bg-black text-white text-lg  "
            onClick={async () => {
              notify();
              await EditItem(stateItemData, props.itemData.data._id)
                .then(() => {
                  update();
                })
                .catch((err) => {
                  ifErrorUpdate();
                  console.log(err);
                });
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="w-full bg-white h-full -mt-4 flex p-8 items-center justify-center md:jutify-start md:items-start">
        <div className="w-1/4 bg-black h-full pt-24 absolute hidden md:block left-0 top-0 z-30">
          <div className="">
            <EditItemMenu
              setItemData={setItemData}
              name={stateItemData.name.changed}
              price={stateItemData.price.changed}
              key={"mma"}
              _id={stateItemData._id}
              Description={stateItemData.Description.changed}
              itemCollection={stateItemData.itemCollection.changed}
            ></EditItemMenu>
          </div>
        </div>

        <div
          className={`top-0 fixed ${
            isMobileMenuOpen ? "left-0" : "-left-[250px]"
          }  w-[240px] bg-black h-full pt-24  block md:hidden duration-300  z-30`}
        >
          <div className="">
            <EditItemMenu
              setItemData={setItemData}
              name={stateItemData.name.changed}
              price={stateItemData.price.changed}
              key={"mma"}
              _id={stateItemData._id}
              Description={stateItemData.Description.changed}
              itemCollection={stateItemData.itemCollection.changed}
            ></EditItemMenu>
          </div>
        </div>

        <div className="flex md:flex-row flex-col pt-1 space-y-4  md:space-y-0 md:space-x-4 md:justify-end justify-center items-center md:items-start md:w-full">
          {stateItemData.urls.map((item, index) => {
            return (
              <EditImageCreate
                markedForDeletion={item.forDeletion}
                setUpforDelete={setUpforDelete}
                reverseAction={reverseAction}
                setMarkedForDeletion={setMarkedForDeletion}
                imgUrl={item.imgUrl}
                changeFunc={onImageChange}
                key={index}
                changedUrl={item.changedUrl}
                imgType={item.imgType}
                blurUrl={item.blurUrl}
              ></EditImageCreate>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type { ItemDataType };

export async function getServerSideProps(context: any) {
  const id = context.query.editItem;
  console.log("ss", context.query);
  const { req, query, res, asPath, pathname } = context;
  const host = req.headers.host;
  const data: any = await axios
    .get(`http://${host}/api/editItem?id=${id}`)
    .catch((err) => {
      console.log(err);
    });

  return { props: { itemData: { data: data.data, status: data.status } } };
}
