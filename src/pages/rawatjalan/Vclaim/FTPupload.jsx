import React, { useState } from "react";
import axios from "axios";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const upload = () => {
    console.log(file);

    const formData = new FormData();
    formData.append("penunjang.registrasiId", "2303160001");
    formData.append("penunjang.tanggal", "2023-03-16T04:38:09.300Z");
    formData.append("penunjang.ruangId", "9105");
    formData.append("penunjang.ruangRawatId", "9105");
    formData.append("penunjang.kodeHasil", "99");
    formData.append("penunjang.hasilPemeriksaan", "PENUNJANG LUAR");
    formData.append("penunjang.pelaksanaId", "D328");
    formData.append("penunjang.mulai", "2023-03-16T04:38:09.300Z");
    formData.append("penunjang.selesai", "2023-03-16T04:38:09.300Z");
    formData.append("penunjang.userID", "DANU");
    formData.append("penunjang.dateEntry", "2023-03-16T04:38:09.300Z");
    formData.append("penunjang.clientIP", "182.168.0.235");
    formData.append("penunjang.clientHost", "DELL");
    formData.append("file", file, file.name);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post(
        `http://182.168.7.251:5577/SisSendFile/02032547/2303160001`,
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        setMessage("Success!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={upload}>Upload</button>
      {message && <div>{message}</div>}
    </div>
  );
};

export default UploadFile;
