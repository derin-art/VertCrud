export default function CreateItemMenu() {
  const inputs = [
    { Name: "Name", type: "String", placeholder: "Input Name" },
    { Name: "Price", type: "Number", placeholder: "Input Item Price" },
    { Name: "Description", type: "Textbox", placeholder: "Input Description" },
  ];

  const collection = ["Casual", "Risque", "Varsity", "Christmas"];
  return (
    <div className="flex flex-col text-white font-Poppins p-2 ">
      {inputs.map((item) => {
        return (
          <div key={item.Name} className="mb-4 lg:text-lg relative ">
            <div className="flex flex-col relative" key={item.Name}>
              <p className="font-CorUp"> {item.Name}:</p>
              {item.type === "Textbox" ? (
                <textarea
                  className="text-black p-2 w-full right-2  rounded text-base"
                  placeholder={item.placeholder}
                ></textarea>
              ) : (
                <input
                  placeholder={item.placeholder}
                  type={`${item.type === "Number" && "number"}`}
                  className="text-black p-2 w-full right-2  rounded text-base"
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
          className="lg:absolute right-0 p-2 font-Poppins text-base text-black rounded"
          id="col"
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
    </div>
  );
}
