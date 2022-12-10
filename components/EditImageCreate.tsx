import { type } from "os";
import Image from "next/image";
import { LazyLoadImage } from "react-lazy-load-image-component";
import React, { useState } from "react";
import { Defer, Img } from "react-progressive-loader";

type EditImageCreateProps = {
  blurUrl: string;
  imgUrl: string;
};

export default function EditImageCreate(props: EditImageCreateProps) {
  const [isBlur, setIsBlur] = useState(true);
  return (
    <div className="">
      <LazyLoadImage
        src={props.imgUrl}
        placeholderSrc={props.blurUrl}
        delayTime={300}
        className="h-[400px] w-[300px] object-cover"
        loading={"eager"}
        height={400}
        width={300}
      ></LazyLoadImage>
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
