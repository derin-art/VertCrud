import { type } from "os";
import DeleteIcon from "../public/Icons/deleteIcon";
import EditIcon from "../public/Icons/editIcon";
import Link from "next/link";

type ShoppingItemLinkProps = {
  name: string;
  price: number;
  collection: string;
  id: string;
};

export default function ShoppingItemLink(props: ShoppingItemLinkProps) {
  const data = [props.name, props.price, props.collection];
  return (
    <div className="flex w-full border-t border-x font-Poppins md:text-base text-xs border-black ">
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
        {DeleteIcon(
          "border rounded-full p-1 hover:border-gray-700 duration-300",
          "30",
          "30"
        )}
      </div>
    </div>
  );
}
