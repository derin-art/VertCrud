import LoginInput from "./LoginInput";
export default function Login() {
  return (
    <div className="w-full h-full flex">
      <div className="w-2/4 h-full bg-black flex items-center justify-center">
        <div className="text-white font-CorUp">
          <span className="text-[300px]">V</span>
          <span className="text-7xl">ert</span>
        </div>
      </div>
      <div className="w-2/4 h-full">
        <LoginInput></LoginInput>
      </div>
    </div>
  );
}
