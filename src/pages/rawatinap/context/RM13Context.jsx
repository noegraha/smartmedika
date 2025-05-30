import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { Input, message, Modal } from "antd";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { AnamnesaRIContext } from "./AnamnesaRIContext";
import { ChatContext } from "../../chat/Chatcontext";
import { ReminderContext } from "../../rawatjalan/context/ReminderContext";
import { PasienRIContext } from "./PasienRIContext";
import Icon from "@ant-design/icons";
import BPJSICO from "../../rawatjalan/komponen/BPJSICO";
import { VClaimContext } from "../../rawatjalan/context/VClaimContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import confirm from "antd/es/modal/confirm";
const { TextArea } = Input;
export const RM13RIContext = createContext();

const RM13ContextProvider = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { getDokterShift } = useContext(PelayananContext);

  const { sendTele } = useContext(LoginContext);
  const namauser = sessionStorage.getItem("userId");

  const { getPrintRm13 } = useContext(PrintOutContext);
  const { detailPasienRI, cariPasienRuangRI, curpasRI, ruangRi } =
    useContext(PasienRIContext);
  const { loading, setLoading } = useContext(ChatContext);
  const [load, setLoad] = useState(false);
  const [loadSimpan, setLoadSimpan] = useState(false);
  const {
    getMappingPoliBPJS,
    listpolibpjs,
    ambilDokterBPJS,
    dokterBPJS,
    mappingDokterBPJS,
    setDokterRSMS,
    dokterrsms,
  } = useContext(VClaimContext);

  // const { keluhanUtama, keluhanTambahan } = useContext(AnamnesaRIContext);
  // const datariwayatpenyakit = keluhanUtama.concat("\n" + keluhanTambahan);
  const [norujukan, setNoRujukan] = useState("");
  const [RM13, setRM13] = useState([]);
  const [emrResumePerawatanId, setemrResumePerawatanId] = useState(0);
  const [diagnosisIdMasuk, setdiagnosisIdMasuk] = useState("");
  const [diagnosisIdPulang, setdiagnosisIdPulang] = useState("");
  const [pembedahan, setpembedahan] = useState("");
  const [riwayatPenyakit, setriwayatPenyakit] = useState("");
  const [pemeriksaanFisik, setpemeriksaanFisik] = useState("");
  const [hasilPenunjang, sethasilPenunjang] = useState("");
  const [perkembangan, setperkembangan] = useState("");
  const [keadaanPasien, setkeadaanPasien] = useState("Sembuh");
  const [pengobatan, setpengobatan] = useState("");
  const [prognosa, setprognosa] = useState("");
  const [anjuran, setanjuran] = useState("");
  const [tanggalKontrol, settanggalKontrol] = useState("");
  const [tipeRujuk, settipeRujuk] = useState("Kontrol");
  const [jenisKontrol, setjenisKontrol] = useState("Rawat Jalan");
  const [ppkTujuan, setppkTujuan] = useState("");
  const [noHp, setNoHp] = useState("");
  const [klinik, setKlinik] = useState("");
  const [poliBpjs, setpoliBpjs] = useState("");
  const [dokterBpjsId, setdokterBpjsId] = useState("");
  const [diagnosarujukan, setdiagnosadiagnosarujukan] = useState("");
  const [catatan, setCatatan] = useState("");
  const [sebab, setSebab] = useState("");
  const [program, setProgram] = useState("KONTROL");
  const [pelaksanaId, setpelaksanaId] = useState("");
  const [rm13ByPasienId, setrm13ByPasienId] = useState([]);
  const [visibleRm13, setVisibleRm13] = useState(false);
  const [printRm13, setPrintRm13] = useState([]);
  const [obatNoreg, setObatNoreg] = useState([]);
  const [labpkNoreg, setlabpkNoreg] = useState([]);

  const ip = sessionStorage.getItem("IP");

  //kepulangan pasien
  const [modal1, setmodal1] = useState(false);
  const [modal2, setmodal2] = useState(false);
  const [modal3, setmodal3] = useState(false);
  const [btn, setbtn] = useState(true);
  const [tglPulang, settglPulang] = useState("");
  const [keadaanPulang, setkeadaanPulang] = useState("");
  const [noSuket, setnoSuket] = useState("");
  const [tglMeninggal, settglMeninggal] = useState("");
  const [namaAkun, setnamaAkun] = useState(namauser);
  const [pasienKll, setpasienKll] = useState(false);
  const [noKll, setnoKll] = useState("");
  const [rsRujuk, setrsRujuk] = useState("");
  const [statusPulang, setstatusPulang] = useState("");
  const [kontrol, setkontrol] = useState(false);

  const [modalInap, setmodalInap] = useState(false);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertRujukan = (datarujukan) => {
    axios
      .post(`${apiku}/EmrRujukan/InsertRujukan`, datarujukan, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          Modal.success({
            title: "Data Berhasil Disimpan!!",
            // content: res.data.message,
          });
          setNoRujukan(res.data.result.rujukanId);
          console.log(res.data.result.rujukanId);
          // insertReminder(datareminder);
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Konek Disimpan !");
      });
  };

  const detailRM13RI = (id) => {
    setLoad(true);
    axios
      .get(`${apiku}/EmrResumePerawatan/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRM13(res.data.result);
          console.log(res.data.result);
          setemrResumePerawatanId(res.data.result.resumePerawatanId);
          setdiagnosisIdMasuk(res.data.result.diagnosaMasuk.trim());
          setdiagnosisIdPulang(res.data.result.diagnosaPulang);
          setpembedahan(res.data.result.tindakan);
          setriwayatPenyakit(res.data.result.riwayatPenyakit);
          setpemeriksaanFisik(res.data.result.pemeriksaanFisik);
          sethasilPenunjang(res.data.result.hasilPenunjang);
          setperkembangan(res.data.result.perkembanganPasien);
          setkeadaanPasien(res.data.result.keadaanPasien);
          setpengobatan(res.data.result.pengobatan);
          setprognosa(res.data.result.prognosa);
          setanjuran(res.data.result.anjuran);
          setpelaksanaId(res.data.result.dokterPenanggungJawab);
          setLoad(false);
          detailRujukanRI(id);
        } else {
          detailRujukanRI(id);
          setRM13([]);
          getRiwayatLabByReg(id);
          getObjekDokter(id, "Dokter Spesialis");
          setemrResumePerawatanId(0);
          setdiagnosisIdMasuk("");
          setdiagnosisIdPulang("");
          setpembedahan("");
          setriwayatPenyakit("");
          // setpemeriksaanFisik("");
          // sethasilPenunjang("");
          setperkembangan("");
          setkeadaanPasien("Sembuh");
          setpengobatan("");
          setprognosa("");
          setanjuran("");
          setCatatan("");
          setpelaksanaId("");
          setLoad(false);
        }
      })
      .catch((err) => {
        message.error("Error Mengambil Data RM 13");
        setLoad(false);
      });
  };

  const getObjekDokter = (regId, profesi) => {
    axios
      .get(
        `${apiku}/EmrCatatanMedis/LookupCatatanMedisRI/${regId}/${profesi}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setpemeriksaanFisik(res.data.result.Objektif);
          console.log(res.data.result.Objektif);
        } else {
          setpemeriksaanFisik("");
        }
      })
      .catch((err) => {
        setpemeriksaanFisik("");
        message.error("Error Mengambil Kepulangan Pasien!");
      });
  };

  const GetRM13ByPasienId = (id) => {
    setLoad(true);
    axios
      .get(`${apiku}/EmrResumePerawatan/ReadByPasienId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setrm13ByPasienId(
            res.data.result.sort((b, a) =>
              a.registrasiId.localeCompare(b.registrasiId)
            )
          );
          console.log(
            res.data.result.sort((b, a) =>
              a.registrasiId.localeCompare(b.registrasiId)
            )
          );
          setVisibleRm13(true);
          setLoading(false);
          setLoad(false);
        } else {
          setrm13ByPasienId([]);
          setLoading(false);
          message.warning("Pasien Belum Pernah Rawat Inap!");
          setLoad(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        message.error("Error Mengambil Data RM 13");
        setLoad(false);
      });
  };

  const detailRujukanRI = (regid) => {
    setLoad(true);
    axios
      .get(`${apiku}/EmrRujukan/GetByRegistrasiId/${regid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settanggalKontrol(dayjs(res.data.result.tanggalRujukan));
          setNoRujukan(res.data.result.rujukanId);
          setCatatan(res.data.result.catatan);
          setSebab(res.data.result.sebabRujuk);
          setProgram(res.data.result.rencanaTindakan);
          setKlinik(
            res.data.result.poliTujuanId + "=" + res.data.result.namaPoli
          );
          setdiagnosadiagnosarujukan(res.data.result.diagnosisId);
          getDokterShift(
            res.data.result.poliTujuanId,
            new Date(res.data.result.tanggalRujukan).getDay() + 1
          );

          getMappingPoliBPJS(res.data.result.poliTujuanId);
          ambilDokterBPJS(
            res.data.result.poliTujuanIdBPJS,
            dayjs(res.data.result.tanggalRujukan).format("YYYY-MM-DD")
          );
          setDokterRSMS(res.data.result.dokterKontrolId);
          setkontrol(true);
          setdokterBpjsId(res.data.result.dokterKontrolBPJS);
          setpoliBpjs(res.data.result.poliTujuanIdBPJS);
          setLoad(false);
        } else {
          setkontrol(false);
          settanggalKontrol("");
          setNoRujukan("");
          setCatatan("");
          setSebab("");
          setProgram("KONTROL");
          setKlinik("");
          setdiagnosadiagnosarujukan("");
          setdokterBpjsId(null);
          setpoliBpjs(null);
          setDokterRSMS(null);
          setLoad(false);
          // console.log("no", res.data, curpas.noJaminan);
        }
      })
      .catch((err) => {
        settanggalKontrol("");
        // setCatatan('');
        setSebab("");
        setProgram("KONTROL");
        setpelaksanaId("");
        setLoad(false);
      });
  };

  const getRiwayatObatByReg = (noreg) => {
    setLoad(true);
    axios
      .get(
        `${apiku}/EmrPasienAktif/RiwayatObatDetail/RegistrasiId/${noreg}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          // let datac = res.data.result.sort((b, a) => a.noResep.localeCompare(b.noResep));
          // datac.forEach(function (row, index) {
          //   row.key = index
          // })
          //setObatNoreg(res.data.result);
          // let dataresep = ((datac.map((e) => (
          //   e.noResep
          // ))));
          // console.log((res.data.result.sort((b, a) => a.noResep.localeCompare(b.noResep))).map((e) => (
          //   e.noResep
          // )).pop())
          // let datac = res.data.result.filter(
          //   (e) =>
          //     e.noResep ==
          //     res.data.result
          //       .sort((b, a) => a.noResep.localeCompare(b.noResep))
          //       .map((e) => e.noResep)
          //       .pop()
          // );
          let datac = res.data.result.sort((b, a) =>
            a.noResep.localeCompare(b.noResep)
          );
          datac.forEach(function (row, index) {
            row.key = index;
          });
          setObatNoreg(datac);
          console.log(res.data.result);
          console.log(datac);
          setLoad(false);
        } else {
          // message.error("Gagal Mengambil Data Riwayat!");
          setObatNoreg([]);
          setLoad(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setObatNoreg([]);
        setLoad(false);
      });
  };

  const getRiwayatLabByReg = (noreg) => {
    setLoad(true);
    axios
      .get(`${apiku}/EmrDialisisHeader/gethasillab/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          let datac = res.data.result.filter(
            (e) =>
              e.labNomor ==
              res.data.result
                .sort((a, b) => a.labNomor.localeCompare(b.labNomor))
                .map((e) => e.labNomor)
                .pop()
          );
          console.log(
            res.data.result.filter(
              (e) =>
                e.labNomor ==
                res.data.result
                  .sort((a, b) => a.labNomor.localeCompare(b.labNomor))
                  .map((e) => e.labNomor)
                  .pop()
            )
          );
          datac.forEach(function (row, index) {
            row.key = index;
          });
          // console.log((datac.map((e) => (
          //   e.labNama + ':  ' + e.labHasil + ' ' + e.labSatuan + ',' + '\n'
          // ))).toString());
          sethasilPenunjang(
            datac
              .map(
                (e) => "\n" + e.labNama + ":  " + e.labHasil + " " + e.labSatuan
              )
              .toString()
          );
          setLoad(false);
        } else {
          // message.error("Gagal Mengambil Data Riwayat!");
          setlabpkNoreg([]);
          setLoad(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setlabpkNoreg([]);
        setLoad(false);
      });
  };

  const insertRM13nonbpjs = (datarm13, datarujukan) => {
    setLoadSimpan(true);
    axios
      .post(`${apiku}/EmrResumePerawatan`, datarm13, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          detailRM13RI(datarm13.registrasiId);
          axios
            .post(`${apiku}/EmrRujukan/InsertRujukan`, datarujukan, options)
            .then((res) => {
              if (res.data.statusCode === 200) {
                console.log(res.data.result);
                setNoRujukan(res.data.result.rujukanId);
                setLoadSimpan(false);
                Modal.success({
                  content: "Berhasil Simpan Data RM 13 Pasien!",
                });
              } else {
                console.log(res.data);
                Modal.warning({
                  title: "Data gagal disimpan!",
                  content: JSON.stringify(res.data),
                });
                setLoadSimpan(false);
              }
            })
            .catch((err) => {
              console.log(err);
              message.error("Gagal Konek Disimpan !");
              setLoadSimpan(false);
            });
        } else {
          Modal.warning({
            title: "Data gagal disimpan!",
            content: JSON.stringify(res.data),
          });
          setLoadSimpan(false);
        }
      })
      .catch((err) => {
        setLoadSimpan(false);
        message.error("Error Saat Menyimpan RM 13");
      });
  };

  const insertRM13Bpjs = async (datarm13, datakontrol, datarujukan) => {
    try {
      setLoadSimpan(true);

      // Panggilan ke /BridgeVClaim/RencanaKontrol/Insert
      let nomorRujukan = null;
      try {
        const kontrolRes = await axios.post(
          `${apiku}/BridgeVClaim/RencanaKontrol/Insert`,
          datakontrol,
          options
        );
        nomorRujukan =
          kontrolRes.data.statusCode === 200
            ? kontrolRes.data.result.noSuratKontrol
            : null;

        // Tampilkan pesan jika statusCode bukan 200
        if (kontrolRes.data.statusCode !== 200) {
          Modal.info({
            title: "INFO!",
            content: (
              <div>
                <p>
                  Gagal membuat rencana kontrol BPJS. Gunakan NO Kontrol RSMS!
                </p>
                <TextArea
                  rows={10}
                  value={JSON.stringify(kontrolRes, null, 2)}
                  readOnly
                />
              </div>
            ),
          });
        }
      } catch (kontrolError) {
        console.error("Error pada Rencana Kontrol:", kontrolError);
        nomorRujukan = null; // Tetap memberikan nilai default
      }

      // Tetap lanjutkan dengan InsertRujukan dan ResumePerawatan
      try {
        const rujukanRes = await axios.post(
          `${apiku}/EmrRujukan/InsertRujukan`,
          {
            rujukanId: nomorRujukan,
            tanggal: datarujukan.tanggal,
            tanggalRujukan: datarujukan.tanggalRujukan,
            noJaminan: datarujukan.noJaminan,
            registrasiId: datarujukan.registrasiId,
            pasienId: datarujukan.pasienId,
            noPolish: datarujukan.noPolish,
            namaPasien: datarujukan.namaPasien,
            tipeRujukan: datarujukan.tipeRujukan,
            jenisPelayanan: datarujukan.jenisPelayanan,
            poliTujuanId: datarujukan.poliTujuanId,
            dokterKontrolId: datarujukan.dokterKontrolId,
            namaPoli: datarujukan.namaPoli,
            poliTujuanIdBPJS: datarujukan.poliTujuanIdBPJS,
            dokterKontrolBPJS: datarujukan.dokterKontrolBPJS,
            diagnosisId: datarujukan.diagnosisId,
            catatan: datarujukan.catatan,
            sebabRujuk: datarujukan.sebabRujuk,
            rencanaTindakan: datarujukan.rencanaTindakan,
            program: datarujukan.program,
            userId: datarujukan.userId,
            clientHost: datarujukan.clientHost,
            clientIp: datarujukan.clientIp,
          },
          options
        );
        if (rujukanRes.data.statusCode === 200) {
          const resumeRes = await axios.post(
            `${apiku}/EmrResumePerawatan`,
            datarm13,
            options
          );
          if (resumeRes.data.statusCode === 200) {
            Modal.success({
              content: "Berhasil Simpan Data RM 13 Pasien!",
            });
            detailRM13RI(datarm13.registrasiId);
            detailRujukanRI(datarm13.registrasiId);
          } else {
            Modal.warning({
              title: "Data Resume Perawatan Gagal Disimpan",
              content: JSON.stringify(resumeRes.data, null, 2),
            });
          }
        } else {
          Modal.warning({
            title: "Data Rujukan Gagal Disimpan",
            content: JSON.stringify(rujukanRes.data, null, 2),
          });
        }
      } catch (rujukanError) {
        Modal.error({
          title: "Kesalahan Sistem",
          content: "Terjadi kesalahan saat menyimpan data rujukan atau resume.",
        });
      }
    } catch (err) {
      Modal.error({
        icon: <Icon component={BPJSICO} />,
        title: "Error Koneksi",
        content: "Terdapat Kesalahan Koneksi!",
      });
    } finally {
      setLoadSimpan(false);
      setLoad(false);
    }
  };

  const insertRM13 = (datarm13) => {
    setLoadSimpan(true);
    axios
      .post(`${apiku}/EmrResumePerawatan`, datarm13)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setLoadSimpan(false);
          Modal.success({
            content: "Berhasil Simpan Data RM 13 Pasien!",
          });
          detailRM13RI(datarm13.registrasiId);
        } else {
          Modal.warning({
            title: "Data gagal disimpan!",
            content: JSON.stringify(res.data),
          });
          setLoadSimpan(false);
        }
      })
      .catch((err) => {
        setLoadSimpan(false);
        message.error("Error Saat Menyimpan RM 13");
      });
  };

  const updateRm13 = (datarm13, datakontrol, datarujukan) => {
    setLoadSimpan(true);

    // Pertama: Panggilan ke /BridgeVClaim/RencanaKontrol/Update

    axios
      .put(`${apiku}/BridgeVClaim/RencanaKontrol/Update`, datakontrol, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200 || res.data.statusCode === 203) {
          setNoRujukan(datarujukan.rujukanId);
          // Kedua: Panggilan ke /EmrRujukan/InsertRujukan
          axios
            .post(
              `${apiku}/EmrRujukan/InsertRujukan`,
              {
                rujukanId: datarujukan.rujukanId,
                tanggal: datarujukan.tanggal,
                tanggalRujukan: datarujukan.tanggalRujukan,
                noJaminan: datarujukan.noJaminan,
                registrasiId: datarujukan.registrasiId,
                pasienId: datarujukan.pasienId,
                noPolish: datarujukan.noPolish,
                namaPasien: datarujukan.namaPasien,
                tipeRujukan: datarujukan.tipeRujukan,
                jenisPelayanan: datarujukan.jenisPelayanan,
                poliTujuanId: datarujukan.poliTujuanId,
                dokterKontrolId: datarujukan.dokterKontrolId,
                namaPoli: datarujukan.namaPoli,
                diagnosisId: datarujukan.diagnosisId,
                poliTujuanIdBPJS: datarujukan.poliTujuanIdBPJS,
                dokterKontrolBPJS: datarujukan.dokterKontrolBPJS,
                catatan: datarujukan.catatan,
                sebabRujuk: datarujukan.sebabRujuk,
                rencanaTindakan: datarujukan.rencanaTindakan,
                program: datarujukan.program,
                userId: datarujukan.userId,
                clientHost: datarujukan.clientHost,
                clientIp: datarujukan.clientIp,
              },
              options
            )
            .then((res) => {
              if (res.data.statusCode === 200) {
                // Ketiga: Panggilan ke /EmrResumePerawatan
                axios
                  .post(`${apiku}/EmrResumePerawatan`, datarm13, options)
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      Modal.success({
                        title:
                          "Success BPJS : Berhasil Generate No Rencana Kontrol BPJS!",
                      });

                      detailRM13RI(datarm13.registrasiId);
                      detailRujukanRI(datarm13.registrasiId);
                      setLoadSimpan(false);
                    } else {
                      Modal.warning({
                        title: "Data gagal disimpan!",
                        content: JSON.stringify(res.data),
                      });
                      setLoadSimpan(false);
                    }
                  })
                  .catch((err) => {
                    message.error("Error Saat Menyimpan RM 13");
                    setLoadSimpan(false);
                  });
              } else {
                Modal.warning({
                  title: "Data Rujukan gagal disimpan!",
                  content: JSON.stringify(res.data),
                });
                setLoadSimpan(false);
              }
            })
            .catch((err) => {
              message.error("Gagal Konek Disimpan!");
              setLoadSimpan(false);
            });
        } else {
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Warning BPJS",
            content: JSON.stringify(res.data),
          });
          sendTele(
            "3",
            "BridgeVclaim - UpdateNoKontrol",
            res.data.statusCode,
            res.data.message,
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi
          );
          setLoadSimpan(false);
        }
      })
      .catch((err) => {
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        console.log(err);
        setLoadSimpan(false);
      });
  };

  // const updateRm13 = (datarm13, datakontrol, datarujukan) => {
  //   setLoadSimpan(true);
  //   axios
  //     .post(`${apiku}/EmrResumePerawatan`, datarm13, options)
  //     .then((res) => {
  //       if (res.data.statusCode === 200) {
  //         detailRM13RI(datarm13.registrasiId);
  //         axios
  //           .put(`${apiku}/BridgeVClaim/RencanaKontrol/Update`, datakontrol, {
  //             headers: options.headers,
  //           })
  //           .then((res) => {
  //             if (res.data.statusCode === 200 || res.data.statusCode === 203) {
  //               setNoRujukan(res.data.result.noSuratKontrol);
  //               axios
  //                 .post(
  //                   `${apiku}/EmrRujukan/InsertRujukan`,
  //                   {
  //                     rujukanId: res.data.result.noSuratKontrol,
  //                     tanggalRujukan: datarujukan.tanggalRujukan,
  //                     noJaminan: datarujukan.noJaminan,
  //                     registrasiId: datarujukan.registrasiId,
  //                     pasienId: datarujukan.pasienId,
  //                     noPolish: datarujukan.noPolish,
  //                     namaPasien: datarujukan.namaPasien,
  //                     tipeRujukan: datarujukan.tipeRujukan,
  //                     jenisPelayanan: datarujukan.jenisPelayanan,
  //                     poliTujuanId: datarujukan.poliTujuanId,
  //                     dokterKontrolId: datarujukan.dokterKontrolId,
  //                     namaPoli: datarujukan.namaPoli,
  //                     diagnosisId: datarujukan.diagnosisId,
  //                     poliTujuanIdBPJS: datarujukan.poliTujuanIdBPJS,
  //                     dokterKontrolBPJS: datarujukan.dokterKontrolBPJS,
  //                     catatan: datarujukan.catatan,
  //                     sebabRujuk: datarujukan.sebabRujuk,
  //                     rencanaTindakan: datarujukan.rencanaTindakan,
  //                     userId: datarujukan.userId,
  //                     clientHost: datarujukan.clientHost,
  //                     clientIp: datarujukan.clientIp,
  //                   },
  //                   options
  //                 )
  //                 .then((res) => {
  //                   if (res.data.statusCode === 200) {
  //                     Modal.success({
  //                       title:
  //                         "Success BPJS : Berhasil Generate No Rencana Kontrol BPJS!",
  //                       // content: res.data.message,
  //                     });

  //                     detailRujukanRI(datarm13.registrasiId);
  //                     setLoadSimpan(false);
  //                   } else {
  //                     Modal.warning({
  //                       title: "Data gagal disimpan!",
  //                       content: JSON.stringify(res.data),
  //                     });
  //                     setLoadSimpan(false);
  //                   }
  //                 })
  //                 .catch((err) => {
  //                   console.log(err);
  //                   message.error("Gagal Konek Disimpan !");
  //                   setLoadSimpan(false);
  //                 });
  //             } else {
  //               Modal.warning({
  //                 icon: <Icon component={BPJSICO} />,
  //                 title: "Warning BPJS",
  //                 content: JSON.stringify(res.data),
  //               });
  //               setLoadSimpan(false);
  //               sendTele(
  //                 "3",
  //                 "BridgeVclaim - UpdateNoKontrol",
  //                 res.data.statusCode,
  //                 res.data.message,
  //                 ip,
  //                 namauser,
  //                 curpasRI.namaPasien,
  //                 curpasRI.ruangDeskripsi
  //               );
  //             }
  //           })
  //           .catch((err) => {
  //             Modal.error({
  //               icon: <Icon component={BPJSICO} />,
  //               title: "Error BPJS",
  //               content: "Terdapat Kesalahan Koneksi!",
  //             });
  //             console.log(err);
  //             setLoadSimpan(false);
  //           });
  //       } else {
  //         Modal.warning({
  //           title: "Data gagal disimpan!",
  //           content: JSON.stringify(res.data),
  //         });
  //         setLoadSimpan(false);
  //       }
  //     })
  //     .catch((err) => {
  //       message.error("Error Saat Menyimpan RM 13");
  //       setLoadSimpan(false);
  //     });
  // };

  const updateNoKontrolBPJS = (datakontrol, datarujukan) => {
    setLoadSimpan(true);
    axios
      .put(`${apiku}/BridgeVClaim/RencanaKontrol/Update`, datakontrol, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setDataKontrolBPJS(res.data.result);
          setNoRujukan(res.data.result.noSuratKontrol);
          insertRujukan({
            rujukanId: res.data.result.noSuratKontrol,
            tanggalRujukan: datarujukan.tanggalRujukan,
            noJaminan: datarujukan.noJaminan,
            registrasiId: datarujukan.registrasiId,
            pasienId: datarujukan.pasienId,
            noPolish: datarujukan.noPolish,
            namaPasien: datarujukan.namaPasien,
            tipeRujukan: datarujukan.tipeRujukan,
            jenisPelayanan: datarujukan.jenisPelayanan,
            poliTujuanId: datarujukan.poliTujuanId,
            dokterKontrolId: datarujukan.dokterKontrolId,
            namaPoli: datarujukan.namaPoli,
            diagnosisId: datarujukan.diagnosisId,
            catatan: datarujukan.catatan,
            sebabRujuk: datarujukan.sebabRujuk,
            rencanaTindakan: datarujukan.rencanaTindakan,
            userId: datarujukan.userId,
            clientHost: datarujukan.clientHost,
            clientIp: datarujukan.clientIp,
          });
          Modal.success({
            title: "Success BPJS : Berhasil Update No Rencana Kontrol BPJS!",
            // content: JSON.stringify(res.data),
          });

          setLoadSimpan(false);
        } else {
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Warning BPJS",
            content: JSON.stringify(res.data),
          });
          setLoadSimpan(false);
          sendTele(
            "3",
            "BridgeVclaim - UpdateNoKontrol",
            res.data.statusCode,
            res.data.message,
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi
          );
        }
      })
      .catch((err) => {
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        console.log(err);
        setLoadSimpan(false);
      });
  };

  const insertNoKontrolBPJS = (datakontrol, datarujukan) => {
    setLoadSimpan(true);
    axios
      .post(`${apiku}/BridgeVClaim/RencanaKontrol/Insert`, datakontrol, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setDataKontrolBPJS(res.data.result);
          setNoRujukan(res.data.result.noSuratKontrol);
          insertRujukan({
            rujukanId: res.data.result.noSuratKontrol,
            tanggalRujukan: datarujukan.tanggalRujukan,
            noJaminan: datarujukan.noJaminan,
            registrasiId: datarujukan.registrasiId,
            pasienId: datarujukan.pasienId,
            noPolish: datarujukan.noPolish,
            namaPasien: datarujukan.namaPasien,
            tipeRujukan: datarujukan.tipeRujukan,
            jenisPelayanan: datarujukan.jenisPelayanan,
            poliTujuanId: datarujukan.poliTujuanId,
            dokterKontrolId: datarujukan.dokterKontrolId,
            namaPoli: datarujukan.namaPoli,
            diagnosisId: datarujukan.diagnosisId,
            catatan: datarujukan.catatan,
            sebabRujuk: datarujukan.sebabRujuk,
            rencanaTindakan: datarujukan.rencanaTindakan,
            userId: datarujukan.userId,
            clientHost: datarujukan.clientHost,
            clientIp: datarujukan.clientIp,
          });
          Modal.success({
            title: "Success BPJS : Berhasil Generate No Rencana Kontrol BPJS!",
            // content: JSON.stringify(res.data),
          });

          setLoadSimpan(false);
          // getSuratKontrolBPJSbyKartu(curpas.noPolish);
        } else if (res.data.statusCode === 208) {
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Warning BPJS",
            content:
              JSON.stringify(res.data) + "\nSilahkan klik Simpan kembali!",
          });
          setLoadSimpan(false);
          sendTele(
            "3",
            "BridgeVclaim - InsertNoKontrol",
            res.data.statusCode,
            res.data.message,
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi
          );
          // setNoSEP(res.data.result);
        } else {
          if (res.data.message.includes("Tujuan")) {
            console.log("ada");
            setLoadSimpan(false);
            // seterrorBpjs(res.data.message);
            // setmodalKontrolBiasa(true);
            Modal.warning({
              icon: <Icon component={BPJSICO} />,
              title: "Warning BPJS",
              content: JSON.stringify(res.data),
            });
          } else {
            console.log("tidak");
            Modal.warning({
              icon: <Icon component={BPJSICO} />,
              title: "Warning BPJS",
              content: JSON.stringify(res.data),
            });
            setLoadSimpan(false);
            sendTele(
              "3",
              "BridgeVclaim - InsertNoKontrol",
              res.data.statusCode,
              res.data.message,
              ip,
              namauser,
              curpasRI.namaPasien,
              curpasRI.ruangDeskripsi
            );
          }
        }
      })
      .catch((err) => {
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        console.log(err);
        setLoadSimpan(false);
      });
  };

  const deleteRm13BPJS = (noSurat, user, noreg, idresume) => {
    setLoadSimpan(true);
    axios
      .delete(
        `${apiku}/BridgeVClaim/RencanaKontrol/Delete/${noSurat}/${user}`,
        { headers: options.headers }
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          axios
            .delete(`${apiku}/EmrRujukan/DeleteRujukan/${noreg}`, {
              headers: options.headers,
            })
            .then((res) => {
              if (res.data.statusCode === 200) {
                axios
                  .delete(`${apiku}/EmrResumePerawatan/${idresume}`, {
                    headers: options.headers,
                  })
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      // detailRM13RI(noreg);
                      // detailRujukanRI(noreg);
                      setNoRujukan("");
                      Modal.success({
                        content: "Berhasil Hapus No Kontrol Pasien!",
                      });

                      setLoadSimpan(false);
                    } else {
                      Modal.warning({
                        icon: <Icon component={BPJSICO} />,
                        title: "Gagal Hapus RM13!",
                        content: JSON.stringify(res.data),
                      });
                      setLoadSimpan(false);
                    }
                  })
                  .catch((err) => {
                    Modal.error({
                      icon: <Icon component={BPJSICO} />,
                      title: "Error BPJS",
                      content: "Terdapat Kesalahan Koneksi!",
                    });
                    console.log(err);
                    setLoadSimpan(false);
                  });
              } else {
                Modal.warning({
                  icon: <Icon component={BPJSICO} />,
                  title: "Warning BPJS",
                  content: JSON.stringify(res.data),
                });
                setLoadSimpan(false);
              }
            })
            .catch((err) => {
              Modal.error({
                icon: <Icon component={BPJSICO} />,
                title: "Error BPJS",
                content: "Terdapat Kesalahan Koneksi!",
              });
              setLoadSimpan(false);
            });
        } else {
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Warning BPJS",
            content: JSON.stringify(res.data),
          });
          setLoadSimpan(false);
        }
      })
      .catch((err) => {
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        console.log(err);
        setLoadSimpan(false);
      });
  };

  const deleterm13nonbpjs = (noreg, idresume) => {
    setLoadSimpan(true);
    axios
      .delete(`${apiku}/EmrRujukan/DeleteRujukan/${noreg}`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(idresume);
          axios
            .delete(`${apiku}/EmrResumePerawatan/${idresume}`, {
              headers: options.headers,
            })
            .then((res) => {
              if (res.data.statusCode === 200) {
                // detailRM13RI(noreg);
                // detailRujukanRI(noreg);
                setNoRujukan("");
                Modal.success({
                  content: "Berhasil Hapus No Kontrol Pasien!",
                });

                setLoadSimpan(false);
              } else {
                Modal.warning({
                  title: "Gagal Hapus RM13!",
                  content: JSON.stringify(res.data),
                });
                setLoadSimpan(false);
              }
            })
            .catch((err) => {
              Modal.error({
                title: "Error BPJS",
                content: "Terdapat Kesalahan Koneksi!",
              });
              console.log(err);
              setLoadSimpan(false);
            });
        } else {
          Modal.warning({
            title: "Gagal Hapus Rujukan!",
            content: JSON.stringify(res.data),
          });
          setLoadSimpan(false);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Konek !");
        setLoadSimpan(false);
      });
  };

  const deleterm13 = (idresume) => {
    setLoadSimpan(true);
    axios
      .delete(`${apiku}/EmrResumePerawatan/${idresume}`, options)
      .then((res) => {
        // if (res.data.statusCode === 200) {
        //   message.success("Berhasil Hapus Data RM13  !");
        //   setLoadSimpan(false);
        // } else {
        Modal.warning({
          // icon: <Icon component={BPJSICO} />,
          title: "Gagal Hapus RM13!",
          content: JSON.stringify(res.data),
        });
        //   setLoadSimpan(false);
        // }
      })
      .catch((err) => {
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        console.log(err);
        setLoadSimpan(false);
      });
  };

  const kosongkanFormRM13 = () => {
    setemrResumePerawatanId(0);
    setNoRujukan("");
    setdiagnosisIdMasuk("");
    setdiagnosisIdPulang("");
    setpembedahan("");
    setriwayatPenyakit("");
    setpemeriksaanFisik("");
    sethasilPenunjang("");
    setperkembangan("");
    setkeadaanPasien("Sembuh");
    setpengobatan("");
    setprognosa("");
    setanjuran("");
    setCatatan("");
    setpelaksanaId(null);
  };

  ///kepulangan pasien
  const udateKepulanganBpjs = (datakepulangan) => {
    setLoadSimpan(true);
    axios
      .put(`${apiku}/BridgeVClaim/UpdateTglPulang`, datakepulangan, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setDataKontrolBPJS(res.data.result);

          Modal.success({
            content: "Success BPJS : Berhasil Update Kepulangan BPJS!",
          });
          setLoadSimpan(false);
        } else {
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Warning BPJS",
            content: JSON.stringify(res.data),
          });
          setLoadSimpan(false);
          sendTele(
            "3",
            "BridgeVclaim - UpdateNoKontrol",
            res.data.statusCode,
            res.data.message,
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi
          );
        }
      })
      .catch((err) => {
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        console.log(err);
        setLoadSimpan(false);
      });
  };

  const insertKepulangan = (datakepulangan, databpjs, pembayaranid) => {
    console.log(datakepulangan, databpjs, pembayaranid);
    setLoadSimpan(true);
    if (pembayaranid === "0050" || pembayaranid === "0051") {
      axios
        .put(`${apiku}/BridgeVClaim/UpdateTglPulang`, databpjs, {
          headers: options.headers,
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            axios
              .post(`${apiku}/EmrKepulanganPasien`, datakepulangan, options)
              .then((res) => {
                if (res.data.statusCode === 200) {
                  detailPasienRI("");
                  cariPasienRuangRI(ruangRi);
                  settglPulang("");
                  setkeadaanPulang("");
                  setLoadSimpan(false);
                  setmodal2(false);
                  setpasienKll(false);
                  setnoKll("");
                  Modal.success({
                    content: "Success BPJS: Berhasil Update Kepulangan BPJS!",
                  });
                } else {
                  Modal.warning({
                    title: "Gagal Menyimpan Data!",
                    content: JSON.stringify(res.data),
                  });
                }
                setLoadSimpan(false);
              })
              .catch((err) => {
                Modal.error({
                  icon: <Icon component={BPJSICO} />,
                  title: "Error BPJS",
                  content: "Terdapat Kesalahan Koneksi!",
                });
                console.log(err);
                setLoadSimpan(false);
              });
          } else {
            console.log("data eror kepulangan");
            Modal.warning({
              icon: <Icon component={BPJSICO} />,
              title: "Warning BPJS",
              content: JSON.stringify(res.data),
            });
            setLoadSimpan(false);
            sendTele(
              "3",
              "BridgeVclaim - UpdateNoKontrol",
              res.data.statusCode,
              res.data.message,
              ip,
              namauser,
              curpasRI.namaPasien,
              curpasRI.ruangDeskripsi
            );
          }
        })
        .catch((err) => {
          Modal.error({
            icon: <Icon component={BPJSICO} />,
            title: "Error BPJS",
            content: "Terdapat Kesalahan Koneksi!",
          });
          console.log(err);
          setLoadSimpan(false);
        });
    } else {
      axios
        .post(`${apiku}/EmrKepulanganPasien`, datakepulangan, options)
        .then((res) => {
          if (res.data.statusCode === 200) {
            detailPasienRI("");
            cariPasienRuangRI(ruangRi);
            settglPulang("");
            setkeadaanPulang("");
            setLoadSimpan(false);
            setmodal2(false);
            setpasienKll(false);
            setnoKll("");
            Modal.success({
              content: "Success BPJS: Berhasil Update Kepulangan BPJS!",
            });
          } else {
            Modal.warning({
              title: "Gagal Menyimpan Data!",
              content: JSON.stringify(res.data),
            });
          }
          setLoadSimpan(false);
        })
        .catch((err) => {
          Modal.error({
            icon: <Icon component={BPJSICO} />,
            title: "Error BPJS",
            content: "Terdapat Kesalahan Koneksi!",
          });
          console.log(err);
          setLoadSimpan(false);
        });
    }
  };

  // const insertKepulangan = (datakepulangan, databpjs, pembayaranid) => {
  //   console.log(datakepulangan, databpjs, pembayaranid);
  //   setLoadSimpan(true);
  //   axios
  //     .post(`${apiku}/EmrKepulanganPasien`, datakepulangan, options)
  //     .then((res) => {
  //       if (res.data.statusCode === 200) {
  //         if (pembayaranid === "0050" || pembayaranid === "0051") {
  //           axios
  //             .put(`${apiku}/BridgeVClaim/UpdateTglPulang`, datakepulangan, {
  //               headers: options.headers,
  //             })
  //             .then((res) => {
  //               if (res.data.statusCode === 200) {
  //                 Modal.success({
  //                   content: "Success BPJS : Berhasil Update Kepulangan BPJS!",
  //                 });
  //                 setLoadSimpan(false);
  //               } else {
  //                 Modal.warning({
  //                   icon: <Icon component={BPJSICO} />,
  //                   title: "Warning BPJS",
  //                   content: JSON.stringify(res.data),
  //                 });
  //                 setLoadSimpan(false);
  //                 sendTele(
  //                   "3",
  //                   "BridgeVclaim - UpdateNoKontrol",
  //                   res.data.statusCode,
  //                   res.data.message,
  //                   ip,
  //                   namauser,
  //                   curpasRI.namaPasien,
  //                   curpasRI.ruangDeskripsi
  //                 );
  //               }
  //             })
  //             .catch((err) => {
  //               Modal.error({
  //                 icon: <Icon component={BPJSICO} />,
  //                 title: "Error BPJS",
  //                 content: "Terdapat Kesalahan Koneksi!",
  //               });
  //               console.log(err);
  //               setLoadSimpan(false);
  //             });
  //         } else {
  //           Modal.success({
  //             content: "Berhasil Menyimpan Data Kepulangan Pasien!",
  //           });
  //           setLoadSimpan(false);
  //         }
  //         detailPasienRI("");
  //         cariPasienRuangRI(ruangRi);
  //         settglPulang("");
  //         setkeadaanPulang("");
  //       } else {
  //         Modal.warning({
  //           title: "Gagal Menyimpan Data!",
  //           content: JSON.stringify(res.data),
  //         });
  //         setLoadSimpan(false);
  //       }
  //     })
  //     .catch((err) => {
  //       Modal.error({
  //         title: "ERROR, BAD REQUST!",
  //         content: JSON.stringify(err.data),
  //       });
  //       setLoadSimpan(false);
  //     });
  // };

  const insertInap = (datakepulangan) => {
    console.log(datakepulangan);
    setLoadSimpan(true);
    axios
      .post(`${apiku}/EmrKepulanganPasien`, datakepulangan, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          cariPasienRuangRI(ruangRi);
          setmodalInap(false);
          Modal.success({
            content: "Berhasil Menyimpan Data Kepulangan Pasien!",
            onOk() {
              cariPasienRuangRI(ruangRi);
            },
          });
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
          setLoadSimpan(false);
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(err.data),
        });
        setLoadSimpan(false);
      });
  };

  return (
    <RM13RIContext.Provider
      value={{
        RM13,
        detailRM13RI,
        setRM13,
        insertRM13Bpjs,
        insertRM13nonbpjs,
        emrResumePerawatanId,
        setemrResumePerawatanId,
        diagnosisIdMasuk,
        setdiagnosisIdMasuk,
        diagnosisIdPulang,
        setdiagnosisIdPulang,
        pembedahan,
        setpembedahan,
        riwayatPenyakit,
        setriwayatPenyakit,
        pemeriksaanFisik,
        setpemeriksaanFisik,
        hasilPenunjang,
        sethasilPenunjang,
        perkembangan,
        setperkembangan,
        keadaanPasien,
        setkeadaanPasien,
        pengobatan,
        setpengobatan,
        prognosa,
        setprognosa,
        anjuran,
        setanjuran,
        tanggalKontrol,
        settanggalKontrol,
        tipeRujuk,
        settipeRujuk,
        jenisKontrol,
        setjenisKontrol,
        ppkTujuan,
        setppkTujuan,
        noHp,
        setNoHp,
        klinik,
        setKlinik,
        diagnosarujukan,
        setdiagnosadiagnosarujukan,
        catatan,
        setCatatan,
        sebab,
        setSebab,
        program,
        setProgram,
        pelaksanaId,
        setpelaksanaId,
        kosongkanFormRM13,
        rm13ByPasienId,
        setrm13ByPasienId,
        GetRM13ByPasienId,
        visibleRm13,
        setVisibleRm13,
        // GetPrintRM13,
        printRm13,
        setPrintRm13,
        poliBpjs,
        setpoliBpjs,
        dokterBpjsId,
        setdokterBpjsId,
        updateRm13,
        deleteRm13BPJS,
        deleterm13nonbpjs,
        deleterm13,
        detailRujukanRI,
        getRiwayatObatByReg,
        obatNoreg,
        setObatNoreg,
        getRiwayatLabByReg,
        labpkNoreg,
        setlabpkNoreg,

        //kepulangan pasien
        modal1,
        setmodal1,
        modal2,
        setmodal2,
        modal3,
        setmodal3,
        btn,
        setbtn,
        tglPulang,
        settglPulang,
        keadaanPulang,
        setkeadaanPulang,
        noSuket,
        setnoSuket,
        tglMeninggal,
        settglMeninggal,
        namaAkun,
        setnamaAkun,
        pasienKll,
        setpasienKll,
        noKll,
        setnoKll,
        rsRujuk,
        setrsRujuk,
        udateKepulanganBpjs,
        insertKepulangan,
        // getKepulangan,
        statusPulang,
        setstatusPulang,
        kontrol,
        setkontrol,
        getObjekDokter,
        insertRM13,
        load,
        setLoad,
        // suketPulang,
        // setsuketPulang,
        insertInap,
        modalInap,
        setmodalInap,
        loadSimpan,
        setLoadSimpan,
        norujukan,
        setNoRujukan,
      }}
    >
      {props.children}
    </RM13RIContext.Provider>
  );
};

export default RM13ContextProvider;
