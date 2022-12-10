import { useState, useEffect } from "react";
import ImageTest from "@/components/ImageTest";
import { type } from "os";
import { useRouter } from "next/router";
import { useAuth } from "../../context/firebaseUserContext";
import absoluteUrl from "next-absolute-url";
import axios from "axios";
import ShoppingItemLink from "../../components/ShoppingItemLink";

type ItemsProps = {
  allItems: [];
};

export default function Items(props: ItemsProps) {
  const headingRows = ["Name", "Price(USD)", "Collection", "Utility"];
  console.log("allItems", props.allItems);
  const router = useRouter();
  const basePath = router.basePath;
  console.log(basePath);
  return (
    <div className="w-full p-8 relative">
      <div className="mt-10 font-Poppins -ml-4 w-full h-fit">
        {props.allItems.length === 0 && (
          <div className="text-5xl border-b border-black w-full">
            No Items Created.
          </div>
        )}
      </div>

      <div className="w-full flex border-t border-x stickyheader bg-white border-black">
        {props.allItems.length > 0 &&
          headingRows.map((item, index) => {
            return (
              <div
                className={`w-1/4 ${
                  headingRows.length - 1 === index ? "" : "border-r "
                } border-black truncate p-4`}
                key={index}
              >
                {item}
              </div>
            );
          })}
      </div>
      <div className="">
        {props.allItems &&
          props.allItems.map((item: any) => {
            return (
              <ShoppingItemLink
                collection={item.itemCollection}
                id={item._id}
                name={item.name}
                price={item.price}
                key={item._id}
              ></ShoppingItemLink>
            );
          })}
      </div>
    </div>
  );
}

export async function getServerSideProps(req: any) {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  console.log(origin);

  const data: any = await axios
    .get(`http://localhost:3000/api/Images`)
    .catch((err) => {
      console.log(err);
    });

  return { props: { allItems: data.data } };
}
