import axios from "axios";
import { type } from "os";
import multiparty from "multiparty";
import { useRouter } from "next/router";
import EditItemMenu from "../../components/EditItemMenu";
import { useState } from "react";
import EditImageCreate from "../../components/EditImageCreate";

type EditItemProps = {
  itemData: {
    data: {
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
      }[];
      __v: number;
    };
  };
};

export default function EditItem(props: EditItemProps) {
  console.log(props.itemData);

  const [stateItemData, setItemData] = useState(props.itemData.data);

  return (
    <div className="w-full bg-white h-screen -mt-4 flex">
      <div className="w-1/4 bg-black h-full pt-20">
        <EditItemMenu
          setItemData={setItemData}
          name={stateItemData.name}
          price={stateItemData.price}
          key={"mma"}
          _id={stateItemData._id}
          Description={stateItemData.Description}
          itemCollection={stateItemData.itemCollection}
        ></EditItemMenu>
      </div>
      {stateItemData.urls.map((item, index) => {
        return (
          <EditImageCreate
            imgUrl={item.imgUrl}
            key={index}
            blurUrl={item.blurUrl}
          ></EditImageCreate>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.query.editItem;
  console.log("ss", context.query);
  const data: any = await axios
    .get(`http://localhost:3000/api/editItem?id=${id}`)
    .catch((err) => {
      console.log(err);
    });
  console.log("venom", data);

  return { props: { itemData: { data: data.data, status: data.status } } };
}
