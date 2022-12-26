import { type } from "os";
import useCollections from "../Hooks/useCollections";

type CreateItemMenuProps = {
  setProductDetails?: any;
  productDetails: {
    name: string;
    price: number;
    collection: string;
    Description: string;
    CollectionDate?: any;
  };
};

export default function CreateItemMenu(props: CreateItemMenuProps) {
  const inputs = [
    {
      Name: "Name",
      type: "String",
      placeholder: "Input Name",
      propVal: props.productDetails.name,
    },
    {
      Name: "Price",
      type: "Number",
      placeholder: "Input Item Price",
      propVal: props.productDetails.price,
    },
    {
      Name: "Description",
      type: "Textbox",
      placeholder: "Input Description",
      propVal: props.productDetails.Description,
    },
  ];

  const collection = useCollections();
  return (
    <div className="flex flex-col text-white font-Poppins p-2 ">
      {inputs.map((item) => {
        return (
          <div key={item.Name} className="mb-4 lg:text-lg relative ">
            <div className="flex flex-col relative" key={item.Name}>
              <p className="font-CorUp"> {item.Name}:</p>
              {item.type === "Textbox" ? (
                <textarea
                  onChange={(e) => {
                    props.setProductDetails((prev: any) => {
                      return { ...prev, Description: e.target.value };
                    });
                  }}
                  value={item.propVal}
                  className="text-black p-2 w-full right-2  rounded text-base bg-white"
                  placeholder={item.placeholder}
                ></textarea>
              ) : (
                <input
                  name={item.Name}
                  value={item.propVal}
                  onChange={(e) => {
                    if (e.target.name === "Name") {
                      props.setProductDetails((prev: any) => {
                        return { ...prev, name: e.target.value };
                      });
                    } else if (e.target.name === "Price") {
                      props.setProductDetails((prev: any) => {
                        return { ...prev, price: e.target.value };
                      });
                    }
                  }}
                  placeholder={item.placeholder}
                  type={`${item.type === "Number" && "number"}`}
                  className="text-black p-2 w-full right-2  rounded text-base bg-white"
                ></input>
              )}
            </div>
          </div>
        );
      })}
      <div className="flex lg:flex-row flex-col  mt-4 lg:text-lg relative">
        <p className="font-CorUp">Collection:</p>
        <select
          placeholder="Collection"
          name="collection"
          className="lg:absolute right-0 p-2 font-Poppins text-base text-black rounded bg-white"
          id="col"
          value={props.productDetails.collection}
          onChange={(e) => {
            props.setProductDetails((prev: any) => {
              return { ...prev, collection: e.target.value };
            });
          }}
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
      <div className=" w-full flex md:flex-row flex-col h-fit md:mt-12 mt-10 relative hidden">
        <p className="font-CorUp md:text-lg">Collection Date:</p>
        <input
          onChange={(e) => {
            props.setProductDetails((prev: any) => {
              return { ...prev, CollectionDate: e.target.value };
            });
          }}
          className="text-black p-2 rounded md:absolute right-0 bg-white"
          type={"date"}
        ></input>
      </div>
    </div>
  );
}
