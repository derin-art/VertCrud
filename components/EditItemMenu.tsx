import { type } from "os";
import useCollection from "../Hooks/useCollections";

type EditItemMenuProps = {
  name: string;
  price: number;
  Description: string;
  itemCollection: string;
  _id: string;
  setItemData: any;
};

export default function EditItemMenu(props: EditItemMenuProps) {
  const collection = useCollection();
  const inputs = [
    { name: "name", originalVal: props.name },
    { name: "price", originalVal: props.price },
    { name: "Description", originalVal: props.Description, type: "Textbox" },
  ];

  return (
    <div className="flex flex-col text-white p-2 font-Poppins">
      <div>
        {inputs.map((item) => {
          return (
            <div
              key={item.name}
              className="w-full flex flex-col mb-4 lg:text-lg"
            >
              <p className="font-CorUp capitalize">{item.name}</p>
              {item.type === "Textbox" ? (
                <textarea
                  onChange={(e) => {
                    props.setItemData((prev: any) => {
                      return {
                        ...prev,
                        [e.target.name]: {
                          ...prev[e.target.name],
                          changed: e.target.value,
                        },
                      };
                    });
                  }}
                  className=" p-2 text-black rounded"
                  name={item.name}
                  key={item.name}
                  defaultValue={item.originalVal}
                ></textarea>
              ) : (
                <input
                  name={item.name}
                  onChange={(e) => {
                    props.setItemData((prev: any) => {
                      return {
                        ...prev,
                        [e.target.name]: {
                          ...prev[e.target.name],
                          changed:
                            item.name === "price"
                              ? parseInt(e.target.value)
                              : e.target.value,
                        },
                      };
                    });
                  }}
                  key={item.name}
                  defaultValue={item.originalVal}
                  className=" p-2 text-black rounded"
                ></input>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex mt-4 lg:text-lg relative">
        <p className="font-CorUp">Collection:</p>
        <select
          onChange={(e) => {
            props.setItemData((prev: any) => {
              return {
                ...prev,
                [e.target.name]: {
                  ...prev[e.target.name],
                  changed: e.target.value,
                },
              };
            });
          }}
          name="itemCollection"
          className="p-2 text-black absolute right-0 text-base rounded"
          placeholder="collection"
        >
          {collection.map((item) => {
            return (
              <option className="" key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex text-white truncate mt-20 text-lg font-CorUp">
        <span>id:</span>
        {props._id}
      </div>
    </div>
  );
}
