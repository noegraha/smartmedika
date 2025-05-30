import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FormPemeriksaanRTF = () => {
  const [value, setValue] = useState("");

  const handleChange = (value) => {
    setValue(value);
  };

  const handleSave = () => {
    console.log(value);
  };

  return (
    <>
      <ReactQuill theme="snow" value={value} onChange={handleChange} />
      <button onClick={handleSave}>Save</button>
    </>
  );
};

export default FormPemeriksaanRTF;
