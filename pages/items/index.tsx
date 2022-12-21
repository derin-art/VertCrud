import { useState, useEffect } from "react";
import ImageTest from "@/components/ImageTest";
import { type } from "os";
import { useRouter } from "next/router";
import { useAuth } from "../../context/firebaseUserContext";
import absoluteUrl from "next-absolute-url";
import axios from "axios";
import ShoppingItemLink from "../../components/ShoppingItemLink";

type ItemsProps = {
  allItems: {
    data: [];
    status: any;
  };
};

export default function Items(props: ItemsProps) {
  const headingRows = ["Name", "Price(USD)", "Collection", "Utility"];

  const router = useRouter();
  const basePath = router.basePath;

  const [itemArrayData, setItemArrayData] = useState({
    data: props.allItems.data,
    status: props.allItems.status,
  });
  return (
    <div className="w-full md:p-8 p-2 relative">
      <div className="mt-10 font-Poppins -ml-4 w-full h-fit">
        {itemArrayData.data.length === 0 && (
          <div className="text-5xl border-b border-black w-full">
            No Items Created.
          </div>
        )}
      </div>

      <div
        className={`w-full flex  ${
          itemArrayData.data.length > 0 && "border-t"
        } border-x stickyheader z-40 bg-black text-white border-black font-Poppins `}
      >
        {itemArrayData.data.length > 0 &&
          headingRows.map((item, index) => {
            return (
              <div
                className={`w-1/4 ${
                  headingRows.length - 1 === index
                    ? ""
                    : "border-r border-white"
                } border-black truncate p-4`}
                key={index}
              >
                {item}
              </div>
            );
          })}
      </div>
      <div className="">
        {itemArrayData.data &&
          itemArrayData.data.map((item: any, index) => {
            return (
              <ShoppingItemLink
                setFunct={setItemArrayData}
                collection={item.itemCollection}
                id={item._id}
                name={item.name}
                price={item.price}
                key={item._id}
                isLastItem={itemArrayData.data.length - 1 === index}
              ></ShoppingItemLink>
            );
          })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { req, query, res, asPath, pathname } = context;
  const host = req.headers.host;

  const data: any = await axios
    .get(`http://${host}/api/Images`)
    .catch((err) => {
      console.log(err);
      return;
    });

  return { props: { allItems: { data: data.data, status: data.status } } };
}
