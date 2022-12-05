import { type } from "os";
import AddImageIcon from "public/Icons/addImageIcon";
import Image from "next/image";

type ImageProps = {
  img?: any;
};

export default function ImageView(props: ImageProps) {
  return (
    <div>
      <Image
        height="400"
        width="300"
        alt="TestImage"
        unoptimized={true}
        src={props.img.src}
      ></Image>
    </div>
  );
}
