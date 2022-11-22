import UserHead from "../public/Icons/userHead";

export default function LoginInput() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <section className="flex flex-col mb-32">
        <div className=" flex items-center justify-center mb-4">
          {UserHead("border rounded-full border-gray-300 p-2", "100", "100")}
        </div>
        <div>
          <input type="email" className="border-black p-4 border mb-4"></input>
        </div>
        <div>
          <input
            name="password"
            placeholder="Input Password"
            type="password"
            className="border-black p-4 border mb-4"
          ></input>
        </div>
        <div className="flex w-full">
          <button className="border p-4 border-black text-white bg-black w-full">
            Login
          </button>
        </div>
      </section>
    </div>
  );
}
