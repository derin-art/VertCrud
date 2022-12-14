import AddImageIcon from "public/Icons/addImageIcon";
import P1 from "public/ImagePlaceholder/P4.png";
import Image from "next/image";
import { useState } from "react";
import EditIcon from "public/Icons/editIcon";
import { type } from "os";

type ImageCreateProps = {
  n?: string;
  setFunc?: any;
  imgFile?: any;
  altOnChange?: any;
  setMain?: any;
  setAlt?: any;
  setSec?: any;
  changeFun: any;
};

export default function ImageCreate(props: ImageCreateProps) {
  const [imageSrc, setImageSrc] = useState("");
  return (
    <div>
      <div className="border-black relative border group cursor-pointer h-full flex shadow-md items-center justify-center duration-300">
        <p className="absolute -top-[1px] right-0 text-sm p-2 bg-black text-white rounded-bl-lg z-20">
          {props.n} Img
        </p>
        <label
          htmlFor={props.n}
          className="flex w-fit items-center justify-center cursor-pointer relative"
        >
          {AddImageIcon(
            `absolute border p-1 hidden border-gray-400 rounded-full ${
              imageSrc && "hidden"
            } group-hover:fill-black   fill-gray-400 duration-300`,
            "40",
            "40"
          )}
          {EditIcon(
            `absolute border ${
              imageSrc
                ? "fill-white opacity-0 group-hover:opacity-100 duration-300 border-white"
                : "border-black"
            } `
          )}
          <Image
            height="400"
            width="300"
            alt="TestImage"
            className="object-cover w-[300px] h-[400px]"
            unoptimized={true}
            src={imageSrc ? imageSrc : P1.src}
          ></Image>
        </label>
        <input
          onChange={(e: any) => {
            props.changeFun((prev: any) => {
              let src;
              function createImageUrl(e: any) {
                var selectedFile = e.target.files[0];
                if (!e.target.files[0]) {
                  setImageSrc("");
                  return;
                }
                var reader = new FileReader();

                reader.onload = function (event: any) {
                  src = event.target.result;
                  setImageSrc(src);
                };

                reader.readAsDataURL(selectedFile);
              }

              createImageUrl(e);

              return { ...prev, file: e.target.files[0] };
            });
          }}
          id={props.n}
          className="hidden"
          type="file"
          accept="image/*"
        ></input>
      </div>
    </div>
  );
}
