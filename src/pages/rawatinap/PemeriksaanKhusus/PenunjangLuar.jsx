import {
  Button,
  Card,
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  message,
} from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import FileResizer from "react-image-file-resizer";
import dayjs from "dayjs";
import { PasienRIContext } from "../context/PasienRIContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { PemeriksaanLainContext } from "../../rawatjalan/context/pemeriksaancontext/PemeriksaanLainContext";
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const PenunjangLuar = () => {
  const { curpasRI } = useContext(PasienRIContext);
  const { dokterall } = useContext(PelayananContext);
  const { listpenunjanglain, listPemeriksaanLain } = useContext(
    PemeriksaanLainContext
  );
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(
    "iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAJFBMVEXw8PDZ2dnb29vs7Ozu7u7a2trk5OTh4eHn5+ff39/m5ubW1tZgd3wLAAADEUlEQVR4nO2d7XaCMAxAgZaPsvd/38nUUdq0eATElHvPfjhFpHehSYq6qgIAAAAAAAAAAAAAAAAAAAAAAAAAAAD4UszP2ZizFVSmPhsc4AAHOMABDnCAAxzgAAc4wIEqB4f3ygocVPZYKg0OjgYHOJjAAQ4mVDswY+9c3w122ysqdjC49rFF0216RbUOrPNrm3bY8IpaHdgm2GpDKCh1ECnYIkGpAxcpqOu3TwedDgZBQe3W923FDKLTgRQGdT2u7rsTPal0kFhiWA+EVhyfSged7GC1ohxlTyod9AkHawc/nULCzKnSgTwdrGaGv5m0je9X6SAuDl5ycFcX1xEqHaTiIH/wjx23UX5U6SAxH/zk+8fns/rwAZUOxBJJPNXF/YZjVOlA6BbEP/CCOXjC/KjSgXwytNljt+28ZbChTgdWcpBvHP26qlk+pNPBVPGFNPkZcXH6LJOoUgdxudzkj3wpbRkIWh2EU8KKgrCkWLSYah1Ugx/d+ZQQZ9PF/KnXwS2+HwvLTb961FFl6UvT7OCWH8wwDi8csomur/sD1e3gVYR6wiuULuHAtOE+az8/XsKBWFbO+fESDiQFXiBcwUFi+dE9C8sLOEh0mXNxfQEHQm9xOQep1ceCHQxBD51YdCrYwdRFLJuH1AJsqQ7Ge9z7EpJhUKaDuZP0JCTDoEQHxh/tv4TMO8CLc2CDevg5MaYuTRbowEQJ8C7BSt1SmQ6kavhPQiYMCnMgj3RMl8nFOUgOtEu+WaM0Bzad/br0Q0U4sM/3mGXHWbAD0zc33LSenA33gh14l5DfV6DbwYZxl+Ig3QVdxsFunwHV6yBb9lzEwdupsBwHuQbgIg52SgmaHeyVEhQ72PdrAVQ62C8l6HWwrwKVDrrmiZt+3P3GfPPxy+Om87dt5nv/n9Zc6ZrrKjjAwQQOcDCBAxxMKHBgzbFEH4b4QgfN0Shw8HFwgAMc4AAHOMABDnCAAxzg4IsdxJ/H/Czf8L+J2sOb5Tz575L4kISzOVsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQJJfX084wDL8aVYAAAAASUVORK5CYII="
  );

  const [tanggal, setTanggal] = useState(dayjs().format("YYYY-MM-DD"));
  const [kodeHasil, setKodeHasil] = useState(null);
  const [hasilPemeriksaan, setHasilPemeriksaan] = useState(null);
  const [pelaksanaId, setPelaksanaId] = useState(null);

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

  const handleFileUpload = () => {
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

      formData.append("penunjang.RegistrasiId", curpasRI.registrasiId); // Replace with the actual value
      formData.append("penunjang.Tanggal", tanggal); // Replace with the actual value
      formData.append("penunjang.RuangId", curpasRI.ruangId); // Replace with the actual value
      formData.append("penunjang.KodeHasil", kodeHasil); // Replace with the actual value
      formData.append("penunjang.HasilPemeriksaan", hasilPemeriksaan); // Replace with the actual value
      formData.append(
        "penunjang.PelaksanaId",
        pelaksanaId === null ? curpasRI.dokterId : pelaksanaId
      ); // Replace with the actual value
      formData.append("penunjang.UserID", petugas); // Replace with the actual username
      formData.append("penunjang.ClientIP", ip); // Replace with the actual IP
      formData.append("penunjang.ClientHost", host); // Replace with the actual ID
      formData.append("file", file); // Append other JSON data to the FormData

      axios
        .post(
          `${apiku}/SisSendFile/${curpasRI.pasienId}/${curpasRI.registrasiId}`,
          formData,
          options
        )
        .then((res) => {
          if (res.data.statusCode === 200) {
            message.success("Berhasil Upload!");
            listPemeriksaanLain(curpasRI.registrasiId);
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
          console.log(err);
        });
    }
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
              value={pelaksanaId === null ? curpasRI.dokterId : pelaksanaId}
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
          <Form.Item labelAlign="left" label="Upload Gambar">
            <Input
              type="file"
              id="file"
              accept="image/*"
              onChange={onFileResize}
            />
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center" }}>
          <Image width={200} src={`data:image/jpeg;base64,` + filePreview} />
          {file && (
            <div>
              <h2>Selected File:</h2>
              <p>File Name: {file.name}</p>
              <p>File Size: {file.size} bytes</p>
            </div>
          )}
        </div>
        <br />
        <Button type="primary" onClick={handleFileUpload} block>
          Upload File
        </Button>
      </Card>
    </div>
  );
};

export default PenunjangLuar;
