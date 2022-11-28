import { type } from "os";
import Image from "next/image";

type ImageProps = {
  img: any;
};

export default function ImageView(props: ImageProps) {
  return (
    <div>
      <Image
        height="400"
        width="300"
        alt="TestImage"
        src={props.img.src}
      ></Image>
    </div>
  );
}
