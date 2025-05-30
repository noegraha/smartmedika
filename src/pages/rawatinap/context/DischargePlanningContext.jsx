import React, { createContext, useContext, useState } from "react";
import { message, Modal, Alert } from "antd";
import axios from "axios";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "./PasienRIContext";
const { confirm } = Modal;

export const DischargePlanningContext = createContext();

const DischargePlanningContextProvider = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { namauser, sendTele } = useContext(LoginContext);
  const { curpasRI } = useContext(PasienRIContext);
  const [lamarawat, setLamarawat] = useState([]);
  const [dischargeplann, setDischargePlann] = useState([]);
  const [diagnosadp, setdiagnosadp] = useState([]);
  const [risikoKepulangan, setrisikoKepulangan] = useState([]);
  const [dataDp, setdataDp] = useState([]);
  const [dataRM11, setdataRM11] = useState([]);
  const [spinRM11, setspinRM11] = useState(false);
  const [perawat, setperawat] = useState("");
  const [listperawat, setlistperawat] = useState([]);

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getPerawat = () => {
    axios
      .get(`${apiku}/MstDokterSpesialisDetail/LookupPerawat/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistperawat(res.data.result);
          console.log("ini data discharge planning", res.data.result);
        } else {
          setlistperawat([]);
        }
      })
      .catch((err) => {
        setlistperawat([]);
        Modal.error({
          title: "Error",
          content: `Terjadi KEsalahan Koneksi!`,
        });
      });
  };

  const getDPPasien = (regId) => {
    setspinRM11(true);
    axios
      .get(`${apiku}/RiEmrIndikasiDP/Read/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setdiagnosadp(res.data.result.DiagnosisId);
          setLamarawat(parseInt(res.data.result.LamaRawat));
          setperawat(res.data.result.PerawatId);
          console.log("data dpada", res.data.result);
          console.log("data dpada", res.data.result.DiagnosisId);
          //---buat array discharge planning--//
          const datadischargeP = [];
          const dpBaru = [];
          for (var i = 0; i < res.data.result.ListDIndikasi.length; i++) {
            datadischargeP.push({
              dPlanningId: res.data.result.ListDIndikasi[i].DPlanningId.trim(),
              deskripsi: res.data.result.ListDIndikasi[i].Deskripsi,
              flag:
                res.data.result.ListDIndikasi[i].Flag === "true" ? true : false,
            });

            if (res.data.result.ListDIndikasi[i].Flag === "true") {
              dpBaru.push({
                registrasiId: regId,
                dPlanningId:
                  res.data.result.ListDIndikasi[i].DPlanningId.trim(),
                clientHost: host,
                clientIP: ip,
              });
            }
          }
          setDischargePlann(datadischargeP);
          setdataDp(dpBaru);
          //---buat array faktor risiko kepulangan--//
          const faktorRisikoKep = [];
          const rm11 = [];
          for (var j = 0; j < res.data.result.ListDetailRM11.length; j++) {
            faktorRisikoKep.push({
              deskripsi: res.data.result.ListDetailRM11[j].Deskripsi,
              flag:
                res.data.result.ListDetailRM11[j].Flag.trim() === "T"
                  ? false
                  : res.data.result.ListDetailRM11[j].Flag.trim() === "Y"
                  ? true
                  : res.data.result.ListDetailRM11[j].Flag.trim(),
              catatan: res.data.result.ListDetailRM11[j].Catatan.trim(),
              statusCek: res.data.result.ListDetailRM11[j].Status,
            });
            rm11.push({
              registrasiId: regId,
              versi: "RM11",
              diagnosisId: res.data.result.DiagnosisId,
              stdId: "03",
              subStdId: res.data.result.ListDetailRM11[j].SubStdId.trim(),
              flag: res.data.result.ListDetailRM11[j].Flag.trim(),
              noUrut: res.data.result.ListDetailRM11[j].NoUrut,
              catatan: res.data.result.ListDetailRM11[j].Catatan.trim(),
              clientHost: host,
              clientIP: ip,
            });
          }

          setdataRM11(rm11);
          setrisikoKepulangan(faktorRisikoKep);
          setspinRM11(false);
          console.log(datadischargeP);
          console.log(faktorRisikoKep);
        } else {
          getdiagnosarm11(regId);
          setLamarawat("");
          setdataDp([]);
          setperawat("");
          axios
            .get(`${apiku}/RiMstKriteriaDPlanning/LookUp/%20/1/100`, options)
            .then((res) => {
              if (res.data.statusCode === 200) {
                const mstDischaergP = [];
                for (var k = 0; k < res.data.result.length; k++) {
                  mstDischaergP.push({
                    dPlanningId: res.data.result[k].dPlanningId.trim(),
                    deskripsi: res.data.result[k].kriteriaDPlanning,
                    flag: false,
                  });
                }
                setDischargePlann(mstDischaergP);
                console.log(mstDischaergP);
                axios
                  .get(`${apiku}/MstDischargePlanning/Lookup/RM11`, options)
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      const mstFaktorRisiko = [];
                      const rm11new = [];
                      for (var h = 0; h < res.data.result.length; h++) {
                        mstFaktorRisiko.push({
                          deskripsi: res.data.result[h].Deskripsi,
                          flag: false,
                          catatan: "",
                          statusCek: res.data.result[h].Status,
                        });

                        rm11new.push({
                          registrasiId: regId,
                          versi: "RM11",
                          diagnosisId: "",
                          stdId: "03",
                          subStdId:
                            res.data.result[h].KodeSubSTD === 0
                              ? ""
                              : res.data.result[h].KodeSubSTD < 10
                              ? "0" + res.data.result[h].KodeSubSTD.toString()
                              : res.data.result[h].KodeSubSTD.toString(),
                          flag: "T",
                          noUrut: h + 1,
                          catatan: "",
                          clientHost: host,
                          clientIP: ip,
                        });
                      }
                      setdataRM11(rm11new);
                      setrisikoKepulangan(mstFaktorRisiko);
                      console.log(mstFaktorRisiko);
                      console.log(rm11new);
                    } else {
                      setrisikoKepulangan([]);
                      console.log("ini data discharge planning tidak ada");
                    }
                  })
                  .catch((err) => {
                    Modal.error({
                      title: "Error",
                      content: `Terjadi KEsalahan Koneksi!`,
                    });
                  });
              } else {
                setDischargePlann([]);
              }
            })
            .catch((err) => {
              Modal.error({
                title: "Error",
                content: `Terjadi KEsalahan Koneksi!`,
              });
            });
          setspinRM11(false);
          // return confirm({
          //   content: (
          //     <Alert
          //       message={
          //         "Pasien Tersebut Belum Dilakukan Pengisian Discharge Planning, Silahkan Lakukan Pengisian Terlebih Dahulu!"
          //       }
          //       type="warning"
          //       //  showIcon
          //     />
          //   ),
          //   okText: "Ya",
          //   okType: "primary",
          //   cancelButtonProps: {
          //     hidden: true,
          //   },
          //   cancelText: "No",
          //   onOk() {
          //     console.log("Cancel");
          //   },
          //   onCancel() {
          //     console.log("Cancel");
          //   },
          // });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Error",
          content: `Terjadi KEsalahan Koneksi Get DP Pasien!`,
        });
        setspinRM11(false);
      });
  };

  const kosongkarm11 = (regid) => {
    getdiagnosarm11(regid);
    setLamarawat("");
    setdataDp([]);
    setperawat("");
    axios
      .get(`${apiku}/RiMstKriteriaDPlanning/LookUp/%20/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const mstDischaergP = [];
          for (var k = 0; k < res.data.result.length; k++) {
            mstDischaergP.push({
              dPlanningId: res.data.result[k].dPlanningId.trim(),
              deskripsi: res.data.result[k].kriteriaDPlanning,
              flag: false,
            });
          }
          setDischargePlann(mstDischaergP);
          console.log(mstDischaergP);
          axios
            .get(`${apiku}/MstDischargePlanning/Lookup/RM11`, options)
            .then((res) => {
              if (res.data.statusCode === 200) {
                const mstFaktorRisiko = [];
                const rm11new = [];
                for (var h = 0; h < res.data.result.length; h++) {
                  mstFaktorRisiko.push({
                    deskripsi: res.data.result[h].Deskripsi,
                    flag: false,
                    catatan: "",
                    statusCek: res.data.result[h].Status,
                  });

                  rm11new.push({
                    registrasiId: regid,
                    versi: "RM11",
                    diagnosisId: "",
                    stdId: "03",
                    subStdId:
                      res.data.result[h].KodeSubSTD === 0
                        ? ""
                        : res.data.result[h].KodeSubSTD < 10
                        ? "0" + res.data.result[h].KodeSubSTD.toString()
                        : res.data.result[h].KodeSubSTD.toString(),
                    flag: "T",
                    noUrut: h + 1,
                    catatan: "",
                    clientHost: host,
                    clientIP: ip,
                  });
                }
                setdataRM11(rm11new);
                setrisikoKepulangan(mstFaktorRisiko);
                console.log(mstFaktorRisiko);
                console.log(rm11new);
              } else {
                setrisikoKepulangan([]);
                console.log("ini data discharge planning tidak ada");
              }
            })
            .catch((err) => {
              Modal.error({
                title: "Error",
                content: `Terjadi KEsalahan Koneksi!`,
              });
            });
        } else {
          setDischargePlann([]);
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Error",
          content: `Terjadi KEsalahan Koneksi!`,
        });
      });
  };

  const getdiagnosarm11 = (id) => {
    axios
      .get(`${apiku}/EmrDiagnosis/Read/${id}/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setdiagnosadp(res.data.result[0].diagnosisId);
        } else {
          setdiagnosadp("");
        }
      })
      .catch((err) => {
        setdiagnosadp("");
      });
  };

  const insertRM11 = (dataRm11) => {
    setspinRM11(true);
    axios
      .post(`${apiku}/RiEmrIndikasiDP`, dataRm11, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          // getDPPasien(dataRM11.registrasiId);
          Modal.success({
            content: "Berhasil Simpan Data RM11!",
          });
          setspinRM11(false);
        } else {
          sendTele(
            "3",
            "RiEmrIndikasiDP",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataRm11)
          );
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
          setspinRM11(false);
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
        setspinRM11(false);
      });
  };

  return (
    <DischargePlanningContext.Provider
      value={{
        lamarawat,
        setLamarawat,
        dischargeplann,
        setDischargePlann,
        // getDischargePlann,
        diagnosadp,
        setdiagnosadp,
        risikoKepulangan,
        setrisikoKepulangan,
        // getFaktorKepulangan,
        getDPPasien,
        dataDp,
        setdataDp,
        dataRM11,
        setdataRM11,
        insertRM11,
        spinRM11,
        setspinRM11,
        perawat,
        setperawat,
        getPerawat,
        listperawat,
        setlistperawat,
        getdiagnosarm11,
        kosongkarm11,
      }}
    >
      {props.children}
    </DischargePlanningContext.Provider>
  );
};

export default DischargePlanningContextProvider;
