import { type } from "os";

type EditItemMenuProps = {
  name: string;
  price: number;
  Description: string;
  itemCollection: string;
  _id: string;
  setItemData: any;
};

export default function EditItemMenu(props: EditItemMenuProps) {
  const inputs = [
    { name: "name", originalVal: props.name },
    { name: "price", originalVal: props.price },
    { name: "Description", originalVal: props.Description },
  ];

  return (
    <div className="flex flex-col text-black p-4 font-Poppins">
      {inputs.map((item) => {
        return (
          <input
            name={item.name}
            onChange={(e) => {
              props.setItemData((prev: any) => {
                return {
                  ...prev,
                  data: { ...prev.data, [e.target.name]: e.target.value },
                };
              });
            }}
            key={item.name}
            defaultValue={item.originalVal}
            className="mb-4 p-2"
          ></input>
        );
      })}
      <div className="flex text-white truncate">
        <span>id:</span>
        {props._id}
      </div>
    </div>
  );
}
