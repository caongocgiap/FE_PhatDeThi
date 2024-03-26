import React, { useState } from "react";
import axios from "../../utils/axiosCustomize";
import { Button, Select } from "antd";
import { toast } from "react-toastify";

const FileUpload = ({ setIsModalImportExcelOpen }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData);
      setData(response.data);
      console.log(data);
    } catch (error) {
      // Handle error
    }
  };

  const handleSaveFile = async () => {
    try {
      const response = await axios.post("/api/upload-file", data);
      if (response.data.httpStatus === "CREATED") {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
        setIsModalImportExcelOpen(false);
      } else if (response.data.httpStatus === "NOT_ACCEPTABLE") {
        toast.warning(response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Handle error
    }
    setData(null);
  };

  return (
    <div className="mt-3">
      <div className="d-flex mb-4">
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
        />
        <button className="btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
      <div className="d-flex mb-4">
        <p>Danh sách cơ sở:</p>
        <Select
          style={{ width: "320px", marginLeft: "38px" }}
          //   onChange={onGenderChange}
          allowClear
        >
          {data &&
            data.map((option) => (
              <Select.Option
                key={option.ten}
                value={option.ten}
                className={"w-100"}
              >
                {option.ten}
              </Select.Option>
            ))}
        </Select>
      </div>
      <div className="d-flex justify-content-center">
        <Button onClick={handleSaveFile}>Save</Button>
      </div>
    </div>
  );
};

export default FileUpload;
