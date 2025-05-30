import {
  Button,
  Card,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Upload,
  message,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import FileResizer from "react-image-file-resizer";
import { PasienContext } from "../context/PasienContext";
import dayjs from "dayjs";
import { PelayananContext } from "../context/Pelayanancontext";
import { PemeriksaanLainContext } from "../context/pemeriksaancontext/PemeriksaanLainContext";
import { UploadOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const ButtonUploadFile = () => {
  const { curpas } = useContext(PasienContext);
  const { dokterall } = useContext(PelayananContext);
  const { listpenunjanglain, listPemeriksaanLain } = useContext(
    PemeriksaanLainContext
  );
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(
    "iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAJFBMVEXw8PDZ2dnb29vs7Ozu7u7a2trk5OTh4eHn5+ff39/m5ubW1tZgd3wLAAADEUlEQVR4nO2d7XaCMAxAgZaPsvd/38nUUdq0eATElHvPfjhFpHehSYq6qgIAAAAAAAAAAAAAAAAAAAAAAAAAAAD4UszP2ZizFVSmPhsc4AAHOMABDnCAAxzgAAc4wIEqB4f3ygocVPZYKg0OjgYHOJjAAQ4mVDswY+9c3w122ysqdjC49rFF0216RbUOrPNrm3bY8IpaHdgm2GpDKCh1ECnYIkGpAxcpqOu3TwedDgZBQe3W923FDKLTgRQGdT2u7rsTPal0kFhiWA+EVhyfSged7GC1ohxlTyod9AkHawc/nULCzKnSgTwdrGaGv5m0je9X6SAuDl5ycFcX1xEqHaTiIH/wjx23UX5U6SAxH/zk+8fns/rwAZUOxBJJPNXF/YZjVOlA6BbEP/CCOXjC/KjSgXwytNljt+28ZbChTgdWcpBvHP26qlk+pNPBVPGFNPkZcXH6LJOoUgdxudzkj3wpbRkIWh2EU8KKgrCkWLSYah1Ugx/d+ZQQZ9PF/KnXwS2+HwvLTb961FFl6UvT7OCWH8wwDi8csomur/sD1e3gVYR6wiuULuHAtOE+az8/XsKBWFbO+fESDiQFXiBcwUFi+dE9C8sLOEh0mXNxfQEHQm9xOQep1ceCHQxBD51YdCrYwdRFLJuH1AJsqQ7Ge9z7EpJhUKaDuZP0JCTDoEQHxh/tv4TMO8CLc2CDevg5MaYuTRbowEQJ8C7BSt1SmQ6kavhPQiYMCnMgj3RMl8nFOUgOtEu+WaM0Bzad/br0Q0U4sM/3mGXHWbAD0zc33LSenA33gh14l5DfV6DbwYZxl+Ig3QVdxsFunwHV6yBb9lzEwdupsBwHuQbgIg52SgmaHeyVEhQ72PdrAVQ62C8l6HWwrwKVDrrmiZt+3P3GfPPxy+Om87dt5nv/n9Zc6ZrrKjjAwQQOcDCBAxxMKHBgzbFEH4b4QgfN0Shw8HFwgAMc4AAHOMABDnCAAxzg4IsdxJ/H/Czf8L+J2sOb5Tz575L4kISzOVsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQJJfX084wDL8aVYAAAAASUVORK5CYII="
  );

  //   const [noreg, setRegistrasiId] = useState(curpas.registrasiId);
  //   const [noid, setPasienId] = useState(curpas.pasienId);
  //   const [ruangId, setRuangId] = useState(curpas.ruangId);
  const [tanggal, setTanggal] = useState(dayjs().format("YYYY-MM-DD"));
  const [kodeHasil, setKodeHasil] = useState(null);
  const [hasilPemeriksaan, setHasilPemeriksaan] = useState(null);
  const [pelaksanaId, setPelaksanaId] = useState(null);
  const [files, setFiles] = useState([]); // Menggunakan array untuk menyimpan banyak file
  const [filePreviews, setFilePreviews] = useState([]); // Menyimpan pratinjau file

  const petugas = sessionStorage.getItem("userId");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const apiku = sessionStorage.getItem("api");

  const onFileResize = (e) => {
    const file = e.target.files[0];
    FileResizer.imageFileResizer(
      file, // the file from input
      1028, // width
      1028, // height
      "PNG", // compress format WEBP, JPEG, PNG
      100, // quality
      0, // rotation
      (uri) => {
        setFilePreview(uri.substr(22));
      }
    );
    setFile(file);
  };

  const beforeUploadOLD = (file) => {
    FileResizer.imageFileResizer(file, 1028, 1028, "PNG", 100, 0, (uri) => {
      setFilePreview(uri.substr(22));
    });
    setFile(file);
    return false; // prevent automatic upload
  };

  const handleFileUploadOld = () => {
    if (
      filePreview ===
      "iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAJFBMVEXw8PDZ2dnb29vs7Ozu7u7a2trk5OTh4eHn5+ff39/m5ubW1tZgd3wLAAADEUlEQVR4nO2d7XaCMAxAgZaPsvd/38nUUdq0eATElHvPfjhFpHehSYq6qgIAAAAAAAAAAAAAAAAAAAAAAAAAAAD4UszP2ZizFVSmPhsc4AAHOMABDnCAAxzgAAc4wIEqB4f3ygocVPZYKg0OjgYHOJjAAQ4mVDswY+9c3w122ysqdjC49rFF0216RbUOrPNrm3bY8IpaHdgm2GpDKCh1ECnYIkGpAxcpqOu3TwedDgZBQe3W923FDKLTgRQGdT2u7rsTPal0kFhiWA+EVhyfSged7GC1ohxlTyod9AkHawc/nULCzKnSgTwdrGaGv5m0je9X6SAuDl5ycFcX1xEqHaTiIH/wjx23UX5U6SAxH/zk+8fns/rwAZUOxBJJPNXF/YZjVOlA6BbEP/CCOXjC/KjSgXwytNljt+28ZbChTgdWcpBvHP26qlk+pNPBVPGFNPkZcXH6LJOoUgdxudzkj3wpbRkIWh2EU8KKgrCkWLSYah1Ugx/d+ZQQZ9PF/KnXwS2+HwvLTb961FFl6UvT7OCWH8wwDi8csomur/sD1e3gVYR6wiuULuHAtOE+az8/XsKBWFbO+fESDiQFXiBcwUFi+dE9C8sLOEh0mXNxfQEHQm9xOQep1ceCHQxBD51YdCrYwdRFLJuH1AJsqQ7Ge9z7EpJhUKaDuZP0JCTDoEQHxh/tv4TMO8CLc2CDevg5MaYuTRbowEQJ8C7BSt1SmQ6kavhPQiYMCnMgj3RMl8nFOUgOtEu+WaM0Bzad/br0Q0U4sM/3mGXHWbAD0zc33LSenA33gh14l5DfV6DbwYZxl+Ig3QVdxsFunwHV6yBb9lzEwdupsBwHuQbgIg52SgmaHeyVEhQ72PdrAVQ62C8l6HWwrwKVDrrmiZt+3P3GfPPxy+Om87dt5nv/n9Zc6ZrrKjjAwQQOcDCBAxxMKHBgzbFEH4b4QgfN0Shw8HFwgAMc4AAHOMABDnCAAxzg4IsdxJ/H/Czf8L+J2sOb5Tz575L4kISzOVsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQJJfX084wDL8aVYAAAAASUVORK5CYII="
    ) {
      message.warning("Gambar tidak boleh kosong!");
    } else {
      //   const binaryString = await readFileAsBinaryString(file);

      const tok = sessionStorage.getItem("userData");
      const options = {
        headers: { Authorization: "Bearer " + tok },
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();

      formData.append("penunjang.RegistrasiId", curpas.registrasiId); // Replace with the actual value
      formData.append("penunjang.Tanggal", tanggal); // Replace with the actual value
      formData.append("penunjang.RuangId", curpas.ruangId); // Replace with the actual value
      formData.append("penunjang.KodeHasil", kodeHasil); // Replace with the actual value
      formData.append("penunjang.HasilPemeriksaan", hasilPemeriksaan); // Replace with the actual value
      formData.append(
        "penunjang.PelaksanaId",
        pelaksanaId === null
          ? curpas.ruangKonsul !== null
            ? null
            : curpas.dokterId
          : pelaksanaId
      ); // Replace with the actual value
      formData.append("penunjang.UserID", petugas); // Replace with the actual username
      formData.append("penunjang.ClientIP", ip); // Replace with the actual IP
      formData.append("penunjang.ClientHost", host); // Replace with the actual ID
      formData.append("file", file); // Append other JSON data to the FormData

      axios
        .post(
          `${apiku}/SisSendFile/${curpas.pasienId}/${curpas.registrasiId}`,
          formData,
          options
        )
        .then((res) => {
          if (res.data.statusCode === 200) {
            message.success("Berhasil Upload!");
            listPemeriksaanLain(curpas.registrasiId);
            setKodeHasil(null);
            setHasilPemeriksaan(null);
            setPelaksanaId(null);
            setFile(null);
            setFilePreview(
              "iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAJFBMVEXw8PDZ2dnb29vs7Ozu7u7a2trk5OTh4eHn5+ff39/m5ubW1tZgd3wLAAADEUlEQVR4nO2d7XaCMAxAgZaPsvd/38nUUdq0eATElHvPfjhFpHehSYq6qgIAAAAAAAAAAAAAAAAAAAAAAAAAAAD4UszP2ZizFVSmPhsc4AAHOMABDnCAAxzgAAc4wIEqB4f3ygocVPZYKg0OjgYHOJjAAQ4mVDswY+9c3w122ysqdjC49rFF0216RbUOrPNrm3bY8IpaHdgm2GpDKCh1ECnYIkGpAxcpqOu3TwedDgZBQe3W923FDKLTgRQGdT2u7rsTPal0kFhiWA+EVhyfSged7GC1ohxlTyod9AkHawc/nULCzKnSgTwdrGaGv5m0je9X6SAuDl5ycFcX1xEqHaTiIH/wjx23UX5U6SAxH/zk+8fns/rwAZUOxBJJPNXF/YZjVOlA6BbEP/CCOXjC/KjSgXwytNljt+28ZbChTgdWcpBvHP26qlk+pNPBVPGFNPkZcXH6LJOoUgdxudzkj3wpbRkIWh2EU8KKgrCkWLSYah1Ugx/d+ZQQZ9PF/KnXwS2+HwvLTb961FFl6UvT7OCWH8wwDi8csomur/sD1e3gVYR6wiuULuHAtOE+az8/XsKBWFbO+fESDiQFXiBcwUFi+dE9C8sLOEh0mXNxfQEHQm9xOQep1ceCHQxBD51YdCrYwdRFLJuH1AJsqQ7Ge9z7EpJhUKaDuZP0JCTDoEQHxh/tv4TMO8CLc2CDevg5MaYuTRbowEQJ8C7BSt1SmQ6kavhPQiYMCnMgj3RMl8nFOUgOtEu+WaM0Bzad/br0Q0U4sM/3mGXHWbAD0zc33LSenA33gh14l5DfV6DbwYZxl+Ig3QVdxsFunwHV6yBb9lzEwdupsBwHuQbgIg52SgmaHeyVEhQ72PdrAVQ62C8l6HWwrwKVDrrmiZt+3P3GfPPxy+Om87dt5nv/n9Zc6ZrrKjjAwQQOcDCBAxxMKHBgzbFEH4b4QgfN0Shw8HFwgAMc4AAHOMABDnCAAxzg4IsdxJ/H/Czf8L+J2sOb5Tz575L4kISzOVsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQJJfX084wDL8aVYAAAAASUVORK5CYII="
            );
          } else {
            message.warning(res.data.message);
          }
        })
        .catch((err) => {
          message.warning("Gagal Upload!");
          console.log(err.response);
          // console.log(
          //   curpas.registrasiId,
          //   tanggal,
          //   curpas.ruangId,
          //   kodeHasil,
          //   hasilPemeriksaan,
          //   curpas.dokterId,
          //   petugas,
          //   ip,
          //   host
          // );
        });
    }
  };

  const beforeUpload = (file) => {
    // Menambahkan file ke array state files dan membuat pratinjau
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreviews((prev) => [...prev, reader.result]);
    };
    reader.readAsDataURL(file);

    setFiles((prev) => [...prev, file]);
    return false; // prevent automatic upload
  };

  const handleFileUploadNew = () => {
    if (filePreviews.length === 0) {
      return;
    }

    const promises = files.map((file, index) => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          const formData = new FormData();
          formData.append("penunjang.RegistrasiId", curpas.registrasiId); // Replace with the actual value
          formData.append("penunjang.Tanggal", tanggal); // Replace with the actual value
          formData.append("penunjang.RuangId", curpas.ruangId); // Replace with the actual value
          formData.append("penunjang.KodeHasil", kodeHasil); // Replace with the actual value
          formData.append("penunjang.HasilPemeriksaan", hasilPemeriksaan); // Replace with the actual value
          formData.append(
            "penunjang.PelaksanaId",
            pelaksanaId === null
              ? curpas.ruangKonsul !== null
                ? null
                : curpas.dokterId
              : pelaksanaId
          ); // Replace with the actual value
          formData.append("penunjang.UserID", petugas); // Replace with the actual username
          formData.append("penunjang.ClientIP", ip); // Replace with the actual IP
          formData.append("penunjang.ClientHost", host); // Replace with the actual ID
          // formData.append("file", reader.result.substr(22)); // Append other JSON data to the FormData
          files.forEach((file) => {
            formData.append("files", file); // Menambahkan setiap file ke FormData sebagai bagian dari array
          });
          axios
            .post(
              `${apiku}/SisSendFile/PenunjangLuar/${curpas.pasienId}/${curpas.registrasiId}`,
              formData,
              {
                headers: { "Content-Type": "multipart/form-data" },
              }
            )
            .then((res) => {
              if (res.data.statusCode === 200) {
                resolve();
              } else {
                reject();
                message.warning(
                  {
                    style: { marginTop: 30 },
                    content: (
                      <>
                        {/* {res.data.message} */}
                        StatusCode : {res.data.statusCode} <br />
                        {res.data.message}
                      </>
                    ),
                  },
                  5
                );
                console.log(res.data);
              }
            })
            .catch((err) => {
              message.error("Gagal Upload!");
              console.log(err.response, formData);
            });
        };
      });
    });

    Promise.all(promises)
      .then(() => {
        message.success("Data berhasil disimpan");
        setFiles([]);
        setFilePreviews([]);
        setFilePreview([]);
        setTanggal(dayjs().format("YYYY-MM-DD"));
        setKodeHasil(null);
        setHasilPemeriksaan(null);
        setPelaksanaId(null);
        listPemeriksaanLain(curpas.registrasiId);
      })
      .catch(() => {
        message.warning("Data gagal disimpan");
      });
  };

  return (
    <div>
      <Card
        title="Upload File Penunjang Luar"
        size="small"
        headStyle={{ backgroundColor: "#f9d1b9" }}
      >
        <Form labelWrap {...formItemLayout}>
          <Form.Item labelAlign="left" label="Jenis Periksa">
            <Select
              dataSource={listpenunjanglain}
              showSearch
              value={kodeHasil}
              style={{ width: "100%" }}
              placeholder="Pilih Pelayanan"
              optionFilterProp="children"
              onChange={(e) => {
                setKodeHasil(e);
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {listpenunjanglain.map((p) => (
                <Option key={p.hasilPenunjangId}>
                  {p.deskripsiHasilPenunjang}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item labelAlign="left" label="Dokter Pemeriksa">
            <Select
              dataSource={dokterall}
              showSearch
              value={
                pelaksanaId === null
                  ? curpas.ruangKonsul !== null
                    ? null
                    : curpas.dokterId
                  : pelaksanaId
              }
              style={{ width: "100%" }}
              placeholder="Pilih Pemeriksa"
              optionFilterProp="children"
              onChange={(e) => setPelaksanaId(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {dokterall.map((p) => (
                <Option key={p.dokterId}>
                  {p.dokterId + " - " + p.namaDokter}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item labelAlign="left" label="Ket. Hasil Pemeriksaan">
            <TextArea
              rows={8}
              value={hasilPemeriksaan}
              onChange={(e) => setHasilPemeriksaan(e.target.value)}
            />
          </Form.Item>
          <Form.Item labelAlign="left" label="Tanggal">
            <DatePicker
              value={dayjs(tanggal)}
              style={{ width: "100%" }}
              format={"YYYY-MM-DD"}
              onChange={(date, dateString) => {
                setTanggal(dateString);
              }}
            />
          </Form.Item>
          <Form.Item labelAlign="left" label="Upload File">
            <Upload
              beforeUpload={beforeUpload}
              multiple // Mengaktifkan fitur multiple upload
              // showUploadList={false}
              fileList={[]}
              listType="picture"
              maxCount={5}
            >
              <Button icon={<UploadOutlined />}>Pilih File</Button>
            </Upload>{" "}
            *Bisa upload lebih dari 1 file (format .jpg)
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          {filePreviews.map((preview, index) => (
            <Image
              key={index}
              src={preview}
              alt={`File Preview ${index + 1}`}
              width={200}
              style={{ marginTop: 10 }}
            />
          ))}
          {/* <Image width={200} src={`data:image/jpeg;base64,` + filePreview} />
          {file && (
            <div>
              <h2>Selected File:</h2>
              <p>File Name: {file.name}</p>
              <p>File Size: {file.size} bytes</p>
            </div>
          )} */}
        </div>
        <br />
        <Button type="primary" onClick={handleFileUploadNew} block>
          Upload File
        </Button>
      </Card>
    </div>
  );
};

export default ButtonUploadFile;
