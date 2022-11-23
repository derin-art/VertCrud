import { useRouter } from "next/router";

export default function Header() {
  const links = [{ name: "items" }, { name: "create" }];
  const router = useRouter();
  const pathName = router.pathname;
  return (
    <div
      className={`w-full relative h-4 flex ${pathName === "/" && "hidden"} p-1`}
    >
      <div className="font-CorUp text-6xl ml-4">Vert</div>
      <div className="flex absolute right-10 p-1">
        {links.map((item) => {
          return (
            <button className="ml-4 font-Poppins text-sm text-black">
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
