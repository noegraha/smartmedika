import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Modal,
  Select,
  InputNumber,
  TimePicker,
  Image,
  Button,
  Layout,
  message,
} from "antd";
import { SuratKeteranganRJContext } from "../../context/SuratKeteranganRJContext";
import { LoginContext } from "../../context/LoginContext";

const VerifikasiSuketRJ = () => {
  const [loadings, setLoadings] = useState(false);

  const {
    readsuratrj,
    viewsprp,
    tandatangan,
    setTandaTangan,
    listdokter,
    verifikasiSuketRJ,
    getListSuketRJ,
    setVerSuRJ,
  } = useContext(SuratKeteranganRJContext);
  const { namauser, pegawai, namaLengkap } = useContext(LoginContext);

  const onTtd = () => {
    // setVerified(true);
    setTandaTangan(sessionStorage.getItem("ttd"));
    // setVerifiedTime(dayjs().format("YYYY-MM-DDTHH:mm:ss"));
  };

  const onVerified = () => {
    readsuratrj.dokterPenanggungJawab === pegawai
      ? verifikasiSuketRJ(readsuratrj.registrasiId, readsuratrj.jenisKeterangan)
      : message.warning("Bukan DPJP");
    getListSuketRJ(readsuratrj.registrasiId);
    setTimeout(() => {
      setVerSuRJ(false);
    }, 2200);
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
    }, 2200);
  };

  const onVerified2 = () => {
    readsuratrj.dokterPenanggungJawab === pegawai
      ? verifikasiSuketRJ(readsuratrj.registrasiId, readsuratrj.jenisKeterangan)
      : message.warning("Bukan DPJP");
    setTimeout(() => {
      getListSuketRJ(readsuratrj.registrasiId);
    }, 200);
    setTimeout(() => {
      setVerSuRJ(false);
    }, 2200);
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
    }, 2200);
  };

  // const enterLoading = (index) => {
  //   setLoadings(({ loadings }) => {
  //     const newLoadings = [...loadings];
  //     newLoadings[index] = true;

  //     return {
  //       loadings: newLoadings,
  //     };
  //   });
  //   setTimeout(() => {
  //     setLoadings(({ loadings }) => {
  //       const newLoadings = [...loadings];
  //       newLoadings[index] = false;

  //       return {
  //         loadings: newLoadings,
  //       };
  //     });
  //   }, 3000);
  // };

  return (
    <div>
      {viewsprp === "nonaktif" ? (
        <div>
          <Descriptions bordered>
            <Descriptions.Item label="No. Surat">
              {readsuratrj.noSurat}
            </Descriptions.Item>
            <Descriptions.Item label="Nama Pasien">
              <b>{readsuratrj.namaPasien}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Jenis Surat">
              <b>{readsuratrj.jenisKeterangan}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Dokter">
              {
                listdokter.map((d) => d.namaDokter)[
                  listdokter
                    .map((d) => d.dokterId)
                    .indexOf(String(readsuratrj.dokterPenanggungJawab))
                ]
              }
            </Descriptions.Item>
            <Descriptions.Item label="Hasil">
              {readsuratrj.hasilPemeriksaan}
            </Descriptions.Item>
            <Descriptions.Item label="Keperluan">
              {readsuratrj.keterangan}
            </Descriptions.Item>
            <Descriptions.Item label="Catatan">
              {readsuratrj.catatan}
            </Descriptions.Item>
          </Descriptions>
          <Form.Item style={{ marginTop: 10, marginBottom: 0 }}>
            {/* Tanda Tangan */}
            <br />
            {/* <img
              style={{
                width: 200,
                height: 90,
                backgroundColor: "#fff",
                borderStyle: "solid",
                borderRadius: 10,
                borderWidth: 1,
              }}
              src={tandatangan}
              onClick={onVerified2}
              alt="Klik Disini untuk validasi"
            /> */}
            <Button
              style={{ float: "right" }}
              size={"large"}
              type="primary"
              onClick={onVerified2}
              loading={loadings}
            >
              Validasi
            </Button>
          </Form.Item>
        </div>
      ) : (
        <div>
          <Descriptions bordered>
            <Descriptions.Item label="No. Surat">
              {readsuratrj.noSurat}
            </Descriptions.Item>
            <Descriptions.Item label="Nama Pasien">
              <b>{readsuratrj.namaPasien}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Jenis Surat">
              <b>{readsuratrj.jenisKeterangan}</b>
            </Descriptions.Item>
            <Descriptions.Item label="Dokter">
              {
                listdokter.map((d) => d.namaDokter)[
                  listdokter
                    .map((d) => d.dokterId)
                    .indexOf(String(readsuratrj.dokterPenanggungJawab))
                ]
              }
            </Descriptions.Item>
          </Descriptions>
          <Form.Item style={{ marginTop: 10, marginBottom: 0 }}>
            {/* Tanda Tangan */}
            <br />
            {/* <img
              style={{
                width: 200,
                height: 90,
                backgroundColor: "#fff",
                borderStyle: "solid",
                borderRadius: 10,
                borderWidth: 1,
              }}
              src={tandatangan}
              onClick={onVerified}
              alt="Klik Disini untuk Tanda Tangan"
            /> */}
            <Button
              style={{ float: "right" }}
              size={"large"}
              type="primary"
              onClick={onVerified}
              loading={loadings}
            >
              Validasi
            </Button>
          </Form.Item>
        </div>
      )}
    </div>
  );
};

export default VerifikasiSuketRJ;
