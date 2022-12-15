import { type } from "os";
import DeleteIcon from "../public/Icons/deleteIcon";
import EditIcon from "../public/Icons/editIcon";
import axios from "axios";
import Link from "next/link";

type ShoppingItemLinkProps = {
  name: string;
  price: number;
  collection: string;
  id: string;
  setFunct: any;
  isLastItem: boolean;
};

export default function ShoppingItemLink(props: ShoppingItemLinkProps) {
  const data = [props.name, props.price, props.collection];
  return (
    <div
      className={`flex w-full border-t border-x font-Poppins md:text-base text-xs border-black ${
        props.isLastItem && "border-b"
      }`}
    >
      {data.map((item, index) => {
        return (
          <div className="w-1/4 border-r truncate p-4 border-black" key={index}>
            {item}
          </div>
        );
      })}
      <div className="md:p-4 flex items-center  space-x-4 md:space-x-12  lg:space-x-20 w-1/4">
        <Link href={`/items/${props.id}`}>
          {EditIcon(
            "border rounded-full p-1 hover:border-gray-700 duration-300",
            "30",
            "30"
          )}
        </Link>
        <div className="relative group">
          <button
            onClick={async () => {
              const data = await axios
                .delete(`http://localhost:3000/api/Images?id=${props.id}`)
                .catch((err) => {
                  console.log(err);
                });
              if (data) {
                /*   { data: data.data, status: data.status } */
                console.log(data.data);
                props.setFunct((prev: any) => {
                  const newData = prev.data.filter((item: { _id: string }) => {
                    if (item._id != data.data._id) {
                      return item;
                    }
                  });
                  console.log("", newData);
                  return { ...prev, data: newData };
                });
              }
            }}
            className="w-[30px] h-[30px] bg-transparent absolute rounded-full z-30"
          ></button>
          {DeleteIcon(
            "border rounded-full p-1 group-hover:border-gray-700 duration-300 z-20",
            "30",
            "30"
          )}
        </div>
      </div>
    </div>
  );
}
