import { useState } from "react";
import { useAuth } from "context/firebaseUserContext";

export default function ImageTest() {
  const { CreateItem } = useAuth();
  const inputs = ["Main", "Sec", "Alt"];

  const [Main, setMain] = useState();
  const [Sec, setSec] = useState();
  const [Alt, setAlt] = useState();

  return (
    <div>
      <div className="flex flex-col">
        <form
          encType="multipart/form-data"
          action="/api/Images"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          {inputs.map((item) => {
            return (
              <input
                key={item}
                name={item}
                onChange={(e: any) => {
                  switch (item) {
                    case "Main":
                      setMain(e.target.files[0]);
                      break;
                    case "Sec":
                      setSec(e.target.files[0]);
                      break;
                    case "Alt":
                      setAlt(e.target.files[0]);
                      break;
                    default:
                      return;
                  }
                }}
                type={"file"}
                accept="image/*"
              ></input>
            );
          })}
          <button type="submit">Sn</button>
        </form>
      </div>
      <button
        onClick={() => {
          CreateItem({ Main, Sec, Alt });
        }}
        className="border border-black mt-2 p-2"
      >
        Send
      </button>
    </div>
  );
}
