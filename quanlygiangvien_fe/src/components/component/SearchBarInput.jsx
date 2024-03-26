import { Select } from "antd";

const SearchBar = ({ setDataTimKiem, dataTimKiem, nameField }) => {
  const handleChange = (e) => {
    // setListTenCoSo(value);
    // console.log(listTenCoSo)
    console.log(e);
    setDataTimKiem({ ...dataTimKiem, [nameField]: e });
    console.log(dataTimKiem);
  };

  return (
    <div>
      <h3 className={"ps-3 pb-3 d-flex align-items-center gap-2"}>Tìm kiếm</h3>
      <div className={"px-4"}>
        <Select
          mode="tags"
          style={{ width: "97%" }}
          placeholder="Tags Mode"
          onChange={(e) => handleChange(e)}
          // options={options}
        />
      </div>
    </div>
  );
};
export default SearchBar;
