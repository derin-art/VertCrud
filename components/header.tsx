import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <div
      className={`fixed w-full bg-black h-4 ${pathName === "/" && "hidden"}`}
    ></div>
  );
}
