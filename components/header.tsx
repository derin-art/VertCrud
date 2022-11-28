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
      className={`w-full relative h-4 flex ${
        pathName === "/" && "hidden"
      } p-1 z-40`}
    >
      <div
        className={`font-CorUp text-6xl ml-4 ${
          isOnCreateItems ? "text-white" : "text-black"
        }`}
      >
        Vert
      </div>
      <div className="flex absolute right-10 p-1">
        {links.map((item) => {
          return (
            <Link
              href={item.to}
              className="ml-4 font-Poppins text-sm text-black"
              key={item.name}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
