import { Button, Modal, Spin, message } from "antd";
import React, { useContext, useState } from "react";
import Icon from "@ant-design/icons";
import Iframe from "react-iframe";
import axios from "axios";
import BPJSICO from "./BPJSICO";
import { PasienContext } from "../context/PasienContext";
const ButtonICare = () => {
  const [dataRiwayat, setdataRiwayat] = useState("");
  const [modalBpjs, setmodalBpjs] = useState(false);
  const [loadDelay, setloadDelay] = useState(false);
  const { curpas } = useContext(PasienContext);
  const pegawai = sessionStorage.getItem("pegawai");
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  const mappingDokterBPJSbyDid = (nopolish, kodedokter) => {
    axios
      .get(`${apiku}/MapingDokterBpjs/Read/${kodedokter}`, options)
      .then((res) => {
        // console.log(nodr);
        if (res.data.statusCode === 200) {
          getRiwayatLayananBpjs({
            param: nopolish,
            kodedokter: parseInt(res.data.result.kodeDokterBPJS),
          });
          console.log({
            param: nopolish,
            kodedokter: parseInt(res.data.result.kodeDokterBPJS),
          });
        } else {
          setdataRiwayat("");
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Gagal Mengambil Data!",
          });
        }
      })
      .catch((err) => {
        setdataRiwayat("");
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
      });
  };
  const getRiwayatLayananBpjs = (datakontrol) => {
    axios
      .post(`${apiku}/BridgeVClaim/RiwayatPemeriksaan`, datakontrol, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setdataRiwayat(res.data.result);
          console.log(res.data.result);

          setmodalBpjs(true);
        } else {
          setdataRiwayat("");
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Gagal Mengambil Data!",
          });
        }
      })
      .catch((err) => {
        setdataRiwayat("");
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
      });
  };
  const BPJSSvg = () => (
    <svg
      t="1695098575429"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="10794"
      width="16"
      height="16"
    >
      <path
        d="M388.608 602.624h32.768L481.28 548.352H414.72V474.112h31.232L387.584 420.864l-56.32 52.224h28.672v89.088c0 27.648 4.608 39.936 28.672 40.448zM693.248 550.912h-28.672V461.312c0-27.648-4.608-39.936-28.672-40.448l-33.28 0.512L542.72 475.648h66.56v74.24h-31.232l58.88 53.248 56.32-52.224zM473.088 664.576h89.088c27.648 0 39.936-4.608 40.448-28.672v-33.28L548.352 542.72v66.56H474.112v-31.232l-53.248 58.88 52.224 56.32v-28.672zM603.136 387.072l-52.224-56.32v28.672H461.312c-27.648 0-39.936 4.608-40.448 28.672l0.512 33.28L475.648 481.28V414.72h74.24v31.232l53.248-58.88zM262.656 398.848c14.848-20.48 18.432-46.592 18.432-46.592-13.312 6.144-28.672 9.728-44.544 9.728-19.456 0-38.4-5.632-54.784-15.36C174.08 358.4 167.936 358.4 161.792 410.112c-5.632 51.712 27.136 105.984 27.136 105.984s-3.584-25.088 12.288-45.568c15.872-20.48 47.104-51.2 61.44-71.68z"
        fill="#231815"
        p-id="10795"
      ></path>
      <path
        d="M237.056 256m-76.288 0a76.288 76.288 0 1 0 152.576 0 76.288 76.288 0 1 0-152.576 0Z"
        fill="#231815"
        p-id="10796"
      ></path>
      <path
        d="M338.432 292.352c6.656 0 17.92-1.536 31.744-8.192 20.992-10.24 42.496-27.648 72.192-54.784 29.696-27.136 50.176-49.664 75.264-64.512 25.6-14.336 66.048-17.408 66.048-17.408s-83.968-13.824-142.848-5.632-117.248 50.176-117.248 50.176c12.8 17.408 20.992 39.936 20.992 64 0 12.8-2.048 25.088-6.144 36.352zM413.184 865.792c51.712 5.632 105.984-27.136 105.984-27.136s-25.088 3.584-45.568-12.288c-20.48-15.872-51.2-47.104-71.68-61.44-20.48-14.848-46.592-18.432-46.592-18.432 6.144 13.312 9.728 28.672 9.728 44.544 0 19.456-5.632 38.4-15.36 54.784 12.288 7.68 12.288 13.824 63.488 19.968zM259.072 866.816c41.984 0 76.288-34.304 76.288-76.288s-34.304-76.288-76.288-76.288-76.288 34.304-76.288 76.288c0.512 41.984 34.304 76.288 76.288 76.288zM195.072 704c17.92-12.8 39.936-20.992 64-20.992 12.8 0 25.088 2.048 36.352 6.144 0-6.656-1.536-17.92-8.192-31.744-10.24-20.992-27.648-42.496-54.784-72.192-27.136-29.696-49.664-50.176-64.512-75.264-14.336-25.6-17.408-66.048-17.408-66.048s-13.824 83.968-5.632 142.848 50.176 117.248 50.176 117.248zM761.344 625.152c-14.848 20.48-18.432 46.592-18.432 46.592 13.312-6.144 28.672-9.728 44.544-9.728 19.456 0 38.4 5.632 54.784 15.36 7.68-12.288 13.824-12.288 19.968-63.488 5.632-51.712-27.136-105.984-27.136-105.984s3.584 25.088-12.288 45.568c-15.872 20.48-47.104 51.2-61.44 71.68z"
        fill="#231815"
        p-id="10797"
      ></path>
      <path
        d="M786.944 768m-76.288 0a76.288 76.288 0 1 0 152.576 0 76.288 76.288 0 1 0-152.576 0Z"
        fill="#231815"
        p-id="10798"
      ></path>
      <path
        d="M685.568 732.16c-6.656 0-17.92 1.536-31.744 8.192-20.992 10.24-42.496 27.648-72.192 54.784-29.696 27.136-50.176 49.664-75.264 64.512-25.6 14.336-66.048 17.408-66.048 17.408s83.968 13.824 142.848 5.632 117.248-50.176 117.248-50.176c-13.312-17.92-20.992-40.448-20.992-64 0-12.8 2.048-25.088 6.144-36.352zM550.4 197.632c20.48 15.872 51.2 47.104 71.68 61.44 20.48 14.848 46.592 18.432 46.592 18.432-6.144-13.312-9.728-28.672-9.728-44.544 0-19.456 5.632-38.4 15.36-54.784-12.288-7.68-12.288-13.824-63.488-19.968-51.712-5.632-105.984 27.136-105.984 27.136s25.088-3.584 45.568 12.288zM764.928 309.248c41.984 0 76.288-34.304 76.288-76.288s-34.304-76.288-76.288-76.288-76.288 34.304-76.288 76.288 34.304 76.288 76.288 76.288zM764.928 340.992c-12.8 0-25.088-2.048-36.352-6.144 0 6.656 1.536 17.92 8.192 31.744 10.24 20.992 27.648 42.496 54.784 72.192 27.136 29.696 49.664 50.176 64.512 75.264 14.336 25.6 17.408 66.048 17.408 66.048s13.824-83.968 5.632-142.848-50.176-117.248-50.176-117.248c-17.92 12.8-39.936 20.992-64 20.992z"
        fill="#231815"
        p-id="10799"
      ></path>
    </svg>
  );
  const BPJSIcon = (props) => <Icon component={BPJSSvg} {...props} />;
  return (
    <div>
      <Button
        size="small"
        style={{ backgroundColor: "#87e8de", borderColor: "#13c2c2" }}
        icon={<BPJSIcon />}
        onClick={() =>
          curpas === "null" || curpas === ""
            ? message.warning("Silahkan Pilih Pasien Terlebih Dahulu!")
            : curpas.dokterId === pegawai
            ? mappingDokterBPJSbyDid(curpas.noPolish, curpas.dokterId)
            : message.warning("Bukan DPJP!")
        }
      >
        ICare JKN
      </Button>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        open={modalBpjs}
        onCancel={() => setmodalBpjs(false)}
      >
        <Spin spinning={loadDelay}>
          <Iframe
            onLoad={() => {
              setloadDelay(false);
            }}
            url={dataRiwayat}
            width="100%"
            height="750px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Spin>
      </Modal>
    </div>
  );
};

export default ButtonICare;
