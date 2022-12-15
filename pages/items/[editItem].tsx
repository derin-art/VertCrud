import axios from "axios";
import { type } from "os";
import multiparty from "multiparty";
import { useRouter } from "next/router";
import EditItemMenu from "../../components/EditItemMenu";
import { useAuth } from "context/firebaseUserContext";
import { useState } from "react";
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

  console.log("lde", stateItemData);

  return (
    <div className="w-full bg-white h-screen -mt-4 flex p-8 ">
      <div className="w-1/4 bg-black h-full pt-24 absolute left-0 top-0 z-30">
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
      <button
        className=""
        onClick={async () => {
          await EditItem(stateItemData, props.itemData.data._id).catch(
            (err) => {
              console.log(err);
            }
          );
        }}
      >
        Save
      </button>
      <div className="flex pt-20 space-x-4 justify-end border w-full">
        {stateItemData.urls.map((item, index) => {
          return (
            <EditImageCreate
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
  );
}

export type { ItemDataType };

export async function getServerSideProps(context: any) {
  const id = context.query.editItem;
  console.log("ss", context.query);
  const data: any = await axios
    .get(`http://localhost:3000/api/editItem?id=${id}`)
    .catch((err) => {
      console.log(err);
    });

  return { props: { itemData: { data: data.data, status: data.status } } };
}
