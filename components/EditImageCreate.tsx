import { type } from "os";
import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React, { useState } from "react";
import { Defer, Img } from "react-progressive-loader";
import EditIcon from "../public/Icons/editIcon";
import DeleteIcon from "public/Icons/deleteIcon";
import P1 from "public/ImagePlaceholder/P4.png";
import ReverseIcon from "public/Icons/reverseIcon";

type EditImageCreateProps = {
  blurUrl?: string;
  imgUrl?: string;
  imgType: string;
  changedUrl: string;
  changeFunc: (imgType: string, file: any, e: any) => void;
  setMarkedForDeletion: any;
  reverseAction: (name: string, img: boolean) => void;
  setUpforDelete: (type: string) => void;
};

export default function EditImageCreate(props: EditImageCreateProps) {
  const [isBlur, setIsBlur] = useState(true);
  return (
    <div className="">
      <label
        className="flex w-fit items-center justify-center cursor-pointer relative"
        htmlFor={props.imgType}
      >
        <div className="flex absolute top-0 left-0 space-x-2 ">
          <button
            onClick={() => {
              props.setUpforDelete(props.imgType);
            }}
            className=" border border-black relative"
          >
            <div className="h-full w-full bg-gray-300 absolute opacity-0"></div>
            {DeleteIcon("hover:fill-green-400 ")}
          </button>
          <button
            className="border border-black"
            onClick={() => {
              props.reverseAction(props.imgType, true);
            }}
          >
            <div className="h-full w-full bg-gray-300 absolute opacity-0"></div>
            {ReverseIcon("hover:fill-green-400")}
          </button>
        </div>
        <p className="absolute -top-[0px] font-Poppins right-0 text-sm p-2 bg-black text-white rounded-bl-lg z-20">
          {props.imgType} Img
        </p>

        {EditIcon(
          `absolute ${props.changedUrl ? "fill-white" : "fill-black"} border`
        )}
        <LazyLoadImage
          src={props.changedUrl ? props.changedUrl : P1.src}
          placeholderSrc={props.blurUrl}
          delayTime={300}
          className="h-[400px] w-[300px] object-cover border border-black"
          loading={"lazy"}
          height={400}
          width={300}
        ></LazyLoadImage>
      </label>
      <input
        onChange={(e) => {
          props.changeFunc(props.imgType, "", e);
        }}
        id={props.imgType}
        className="hidden absolute"
        type="file"
        accept="image/*"
      ></input>
    </div>
  );
}

/*   <Defer
        className="hidden"
        render={() => {
          return (
            <Image
              height={400}
              blurDataURL={props.blurUrl}
              width={300}
              className="object-cover w-[300px] h-[400px] border-red-500"
              loading="lazy"
              alt="Item Image"
              src={props.imgUrl}
              placeholder={"blur"}
              unoptimized={true}
            ></Image>
          );
        }}
        renderPlaceholder={() => {
          return (
            <Image
              height={400}
              blurDataURL={props.blurUrl}
              className="object-cover w-[300px] h-[400px] border border-red-500"
              width={300}
              loading="lazy"
              alt="Item Image"
              src={props.blurUrl}
              placeholder={"blur"}
              unoptimized={true}
            ></Image>
          );
        }}
      ></Defer> */
