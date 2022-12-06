import { useRouter } from "next/router";
import Link from "next/link";

export default function Header() {
  const links = [
    { name: "items", to: "/items" },
    { name: "create", to: "/CreateItem" },
  ];
  const router = useRouter();
  const pathName = router.pathname;
  const isOnCreateItems = pathName === "/CreateItem";
  return (
    <div
      className={`w-full fixed h-4 justify-center md:justify-start flex  pt-2 ${
        pathName === "/" && "hidden"
      } p-1 z-40`}
    >
      <div
        className={`font-CorUp text-3xl md:text-6xl md:ml-4 md:mt-0 -mt-1 ${
          isOnCreateItems ? "text-white" : "text-black"
        }`}
      >
        Vert
      </div>
      <div className="flex absolute md:right-8 right-4 right p-1 font-Poppins text-sm text-black">
        {links.map((item) => {
          return (
            <Link href={item.to} className="lg:ml-8 ml-4" key={item.name}>
              {item.name}
            </Link>
          );
        })}
        <button className="ml-4 lg:ml-8">Logout</button>
      </div>
    </div>
  );
}
