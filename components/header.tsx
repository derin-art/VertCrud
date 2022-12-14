import { useRouter } from "next/router";
import { useAuth } from "context/firebaseUserContext";
import Link from "next/link";

export default function Header() {
  const links = [
    { name: "items", to: "/items" },
    { name: "create", to: "/CreateItem" },
  ];
  const router = useRouter();

  const { SignOut } = useAuth();

  const pathName = router.pathname;
  const isOnCreateItems = pathName === "/CreateItem";
  const isOnEditItems = pathName === "/items/[editItem]";

  return (
    <div
      className={`w-full fixed  ${
        pathName === "/items" ? " h-16 bg-white " : "h-4"
      } justify-center md:justify-start  flex  pt-2 ${
        pathName === "/" && "hidden"
      } p-1 z-40`}
    >
      <div
        className={`font-CorUp text-3xl md:relative absolute left-2 flex flex-col md:flex-row md:items-center  block md:text-6xl md:ml-4 md:mt-0 -mt-1 ${
          isOnCreateItems || isOnEditItems
            ? "text-white md:opacity-100 opacity-0 top-8"
            : "text-black"
        }  `}
      >
        <a
          rel="noreferrer"
          target={"_blank"}
          href="https://vert-front.vercel.app/"
        >
          Vert
        </a>

        <p
          className={`text-sm ml-2 ${isOnEditItems && "hidden"} ${
            isOnCreateItems && "hidden"
          }`}
        >
          Click on &quot;Vert&quot; to access the store of this backend
        </p>
      </div>
      <div className="flex absolute md:right-8 right-4 right p-1 font-Poppins text-sm text-black">
        {links.map((item) => {
          return (
            <Link
              href={item.to}
              className="lg:ml-8 ml-4  hover:text-gray-500 duration-300"
              key={item.name}
            >
              {item.name}
            </Link>
          );
        })}
        <button
          onClick={async () => {
            SignOut();
          }}
          className="ml-4 lg:ml-8 hover:text-gray-700 duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
