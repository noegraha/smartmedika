import React, { useContext, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Slider,
  Space,
  Row,
  Col,
  DatePicker,
  Table,
  Alert,
  Popconfirm,
} from "antd";
import { PengkajianContext } from "../context/PengkajianContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";
import { AssesmentRIContext } from "../context/AssesmentRIContext";
const { TextArea, Search } = Input;

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const FormFaktorRisiko = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const {
    faktorKejang,
    setfaktorKejang,
    faktorDehidrasi,
    setfaktorDehidrasi,
    faktorSepsis,
    setfaktorSepsis,
    setfaktorPersalinan1,
    faktorPersalinan1,
    faktorPersalinan2,
    setfaktorPersalinan2,
    faktorIntrapartum,
    setfaktorPIntrapartum,
    faktorHipotermia,
    setfaktorPHipotermia,
    faktorHipoglikemia,
    setfaktorPHipoglikemia,
    faktorHiperbil,
    setfaktorPHiperbil,
    modalRisiko,
    setmodalRisiko,
    faktorRisikoId,
    setfaktorRisikoId,
    tglFaktorRisiko,
    settglFaktorRisiko,
    insertFaktorRisiko,
    getRisiko,
  } = useContext(PengkajianContext);
  const { tglTTV } = useContext(AssesmentRIContext);

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Form.Item label="Faktor Risiko Kejang" {...formItemLayout}>
            <Select
              value={faktorKejang}
              style={{ width: "100%" }}
              onChange={(value) => {
                setfaktorKejang(value);
              }}
              placeholder="Select a risk factor"
              mode="multiple"
              tokenSeparators={[","]}
            >
              <Option value={1}>
                Masalah metabolik (Hipoglikemia, Hipokalsemia, Hipomagnesemia,
                Hiponatremia/Hipernatremia, Defisiensi piridoksin)
              </Option>
              <Option value={2}>Infeksi Susunan Saraf Pusat</Option>
              <Option value={3}>Hypoxic Ischemic Encephalopathy (HIE)</Option>
              <Option value={4}>
                Perdarahan intrakranial dan trauma Susunan Saraf Pusat
              </Option>
              <Option value={5}>
                Stroke cedera iskemik fokal, stroke neonatus, thrombosis vena
                serebral
              </Option>
              <Option value={6}>Inborn Errors of Metabolism</Option>
              <Option value={7}>Developmental Malformations</Option>
              <Option value={8}>Kejang disebabkan obat-obatan</Option>
              <Option value={9}>Sindrom epilepsi neonatus</Option>
              <Option value={10}>
                Riwayat ibu dan obstetrik (infeksi ibu, perdarahan antepartum,
                persalinan yang sulit atau gangguan janin, nilai APGAR rendah,
                dan paparan obat)
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="Faktor Risiko Dehidrasi" {...formItemLayout}>
            <Select
              value={faktorDehidrasi}
              style={{ width: "100%" }}
              onChange={(value) => {
                setfaktorDehidrasi(value);
              }}
              mode="multiple"
              tokenSeparators={[","]}
              placeholder="Select a risk factor"
            >
              <Option value={1}>
                Adanya kehilangan cairan (muntah atau diare)
              </Option>
              <Option value={2}>
                Adanya kelainan gastrointestinal (gangguan pencernaan)
              </Option>
              <Option value={3}>Gangguan pada saluran kencing</Option>
              <Option value={4}>Cystic fibrosis</Option>
              <Option value={5}>Penggunaan obat seperti obat diuretik</Option>
              <Option value={6}>
                Kelainan metabolik (hernia atas, ileostomy, colostomy, penyakit
                Hirschsprung)
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="Faktor Risiko Sepsis" {...formItemLayout}>
            <Select
              value={faktorSepsis}
              style={{ width: "100%" }}
              onChange={(value) => {
                setfaktorSepsis(value);
              }}
              mode="multiple"
              tokenSeparators={[","]}
              placeholder="Select a risk factor"
            >
              <Option value={1}>
                Adanya KPD &gt;18 jam atau ketuban rembes
              </Option>
              <Option value={2}>
                Adanya demam &gt; 38°C pada 2 minggu terakhir
              </Option>
              <Option value={3}>
                Adanya ketuban berbau dan/atau nyeri pada perut bagian bawah
              </Option>
              <Option value={4}>Adanya bukti infeksi saluran kemih</Option>
              <Option value={5}>
                Kontraksi dini yang menyebabkan partus prematurus
              </Option>
              <Option value={6}>
                Riwayat ISK, diare, atau infeksi lain saat trimester 3
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Anamnesis Janin Sebelum Persalinan"
            {...formItemLayout}
            labelStyle={{ wordBreak: "break-word" }}
          >
            <Select
              value={faktorPersalinan1}
              style={{ width: "100%" }}
              onChange={(value) => {
                setfaktorPersalinan1(value);
              }}
              mode="multiple"
              tokenSeparators={[","]}
              placeholder="Select a risk factor"
            >
              <Option value={1}>Perdarahan pada trimester 2 atau 3</Option>
              <Option value={2}>Hipertensi pada Kehamilan</Option>
              <Option value={3}>Konsumsi obat-obatan</Option>
              <Option value={4}>Diabetes Melitus</Option>
              <Option value={5}>
                Penyakit kronis pada ibu (TB, penyakit jantung, hipertensi
                kronis)
              </Option>
              <Option value={6}>Kehamilan grande multipara</Option>
              <Option value={7}>
                Korioamnionitis (bila ada 1-2 gejala klinis seperti KPD &gt;18
                jam, leukosit &gt;15.000/mm³, CRP &gt;9, ibu ada riwayat demam
                suhu &gt;38 derajat celcius)
              </Option>
              <Option value={8}>Riwayat kematian janin sebelumnya</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Anamnesis Janin Sebelum Persalinan"
            labelStyle={{ wordBreak: "break-word" }}
            {...formItemLayout}
          >
            <Select
              value={faktorPersalinan2}
              style={{ width: "100%" }}
              onChange={(value) => {
                setfaktorPersalinan2(value);
              }}
              mode="multiple"
              tokenSeparators={[","]}
              placeholder="Select a risk factor"
            >
              <Option value={1}>Kehamilan multiple</Option>
              <Option value={2}>Prematur</Option>
              <Option value={3}>Besar masa kehamilan</Option>
              <Option value={4}>Pertumbuhan janin terhambat</Option>
              <Option value={5}>Penyakit hemolitik autoimun</Option>
              <Option value={6}>Polihidramnion atau oligohidramnion</Option>
              <Option value={7}>
                Gerakan janin berkurang sebelum persalinan
              </Option>
              <Option value={8}>Kelainan kongenital</Option>
              <Option value={9}>Hidrop fetalis</Option>
              <Option value={10}>Gawat janin (deselerasi CTG)</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Ibu Waktu Persalinan/Intrapartum"
            labelStyle={{ wordBreak: "break-word" }}
            {...formItemLayout}
          >
            <Select
              value={faktorIntrapartum}
              style={{ width: "100%" }}
              onChange={(value) => {
                setfaktorPIntrapartum(value);
              }}
              mode="multiple"
              tokenSeparators={[","]}
              placeholder="Select a risk factor"
            >
              <Option value={1}>
                Pola denyut jantung meragukan pada kardiotografi
              </Option>
              <Option value={2}>Presentasi abnormal</Option>
              <Option value={3}>Prolaps tali pusat</Option>
              <Option value={4}>Perdarahan antepartum</Option>
              <Option value={5}>Kelahiran forsep</Option>
              <Option value={6}>Kelahiran vakum</Option>
              <Option value={7}>Penerapan anestesi umum pada ibu</Option>
              <Option value={8}>Kala 2 memanjang</Option>
              <Option value={9}>Ketuban bercampur mekonium</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Faktor Risiko Hipotermia" {...formItemLayout}>
            <Select
              value={faktorHipotermia}
              style={{ width: "100%" }}
              onChange={(value) => {
                setfaktorPHipotermia(value);
              }}
              mode="multiple"
              tokenSeparators={[","]}
              placeholder="Select a risk factor"
            >
              <Option value={1}>
                Bayi preterm dan bayi kecil lainnya dibandingkan dengan berat
                badannya
              </Option>
              <Option value={2}>
                Bayi dengan kelainan bawaan, khususnya dengan penutupan kulit
                yang tidak sempurna
              </Option>
              <Option value={3}>
                BBL dengan gangguan saraf sentral seperti pada perdarahan
                intrakranial, obat-obatan, dan asfiksia
              </Option>
              <Option value={4}>Bayi dengan sepsis</Option>
              <Option value={5}>
                Bayi dengan tindakan resusitasi yang lama
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="Faktor Risiko Hipoglikemia" {...formItemLayout}>
            <Select
              value={faktorHipoglikemia}
              style={{ width: "100%" }}
              onChange={(value) => {
                setfaktorPHipoglikemia(value);
              }}
              mode="multiple"
              tokenSeparators={[","]}
              placeholder="Select a risk factor"
            >
              <Option value={1}>Bayi dari ibu diabetes</Option>
              <Option value={2}>Bayi besar masa kehamilan (KMK)</Option>
              <Option value={3}>Bayi kurang bulan dan lewat waktu</Option>
              <Option value={4}>Bayi sakit atau stres</Option>
              <Option value={5}>Bayi puasa</Option>
              <Option value={6}>Bayi dengan polisitemia</Option>
              <Option value={7}>Bayi dengan eritroblastosis</Option>
              <Option value={8}>
                Obat-obatan yang dikonsumsi ibu, misalnya steroid
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="Faktor Risiko Hiperbil" {...formItemLayout}>
            <Select
              value={faktorHiperbil}
              style={{ width: "100%" }}
              onChange={(value) => {
                setfaktorPHiperbil(value);
              }}
              mode="multiple"
              tokenSeparators={[","]}
              placeholder="Select a risk factor"
            >
              <Option value={1}>Riwayat keluarga ikterus, anemia</Option>
              <Option value={2}>Riwayat keluarga dengan penyakit hati</Option>
              <Option value={3}>
                Riwayat keluarga dengan ikterus atau anemia
              </Option>
              <Option value={4}>Golongan darah dan rhesus ibu</Option>
              <Option value={5}>Riwayat sakit selama kehamilan</Option>
              <Option value={6}>
                Riwayat obat-obatan yang dikonsumsi ibu (sulfonamida,
                nitrofurantonin, antimalaria)
              </Option>
              <Option value={7}>
                Riwayat persalinan traumatik yang berpotensi menyebabkan
                perdarahan atau hemolisis
              </Option>
              <Option value={8}>Pemberian nutrisi parenteral total</Option>
              <Option value={9}>Pemberian ASI</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} style={{ textAlign: "right" }}>
          <Space>
            <Button
              // type="primary"
              onClick={() => {
                setfaktorRisikoId(0);
                settglFaktorRisiko(dayjs(tglTTV));
                setfaktorKejang("");
                setfaktorDehidrasi("");
                setfaktorSepsis("");
                setfaktorPersalinan1("");
                setfaktorPersalinan2("");
                setfaktorPIntrapartum("");
                setfaktorPHipotermia("");
                setfaktorPHipoglikemia("");
                setfaktorPHiperbil("");
              }}
            >
              Batal
            </Button>
            <Button
              type="primary"
              onClick={() => {
                const inputData = [
                  { kejang: faktorKejang },
                  { dehidrasi: faktorDehidrasi },
                  { sepsis: faktorSepsis },
                  { anamnesis1: faktorPersalinan1 },
                  { anamnesis2: faktorPersalinan2 },
                  { intrapartum: faktorIntrapartum },
                  { hipotermia: faktorHipotermia },
                  { hipoglikemia: faktorHipoglikemia },
                  { hiperbil: faktorHiperbil },
                ];

                // Find the maximum length of arrays in the input
                const maxLength = Math.max(
                  ...inputData.map((item) => Object.values(item)[0].length)
                );

                const detailEntries = [];

                // Loop through each index up to the maxLength
                for (let i = 0; i < maxLength; i++) {
                  const detailItem = {
                    kejang:
                      inputData[0].kejang &&
                      inputData[0].kejang[i] !== undefined
                        ? inputData[0].kejang[i]
                        : null,
                    dehidrasi:
                      inputData[1].dehidrasi &&
                      inputData[1].dehidrasi[i] !== undefined
                        ? inputData[1].dehidrasi[i]
                        : null,
                    sepsis:
                      inputData[2].sepsis &&
                      inputData[2].sepsis[i] !== undefined
                        ? inputData[2].sepsis[i]
                        : null,
                    anamnesis1:
                      inputData[3].anamnesis1 &&
                      inputData[3].anamnesis1[i] !== undefined
                        ? inputData[3].anamnesis1[i]
                        : null,
                    anamnesis2:
                      inputData[4].anamnesis2 &&
                      inputData[4].anamnesis2[i] !== undefined
                        ? inputData[4].anamnesis2[i]
                        : null,
                    intrapartum:
                      inputData[5].intrapartum &&
                      inputData[5].intrapartum[i] !== undefined
                        ? inputData[5].intrapartum[i]
                        : null,
                    hipotermia:
                      inputData[6].hipotermia &&
                      inputData[6].hipotermia[i] !== undefined
                        ? inputData[6].hipotermia[i]
                        : null,
                    hipoglikemia:
                      inputData[7].hipoglikemia &&
                      inputData[7].hipoglikemia[i] !== undefined
                        ? inputData[7].hipoglikemia[i]
                        : null,
                    hiperbil:
                      inputData[8].hiperbil &&
                      inputData[8].hiperbil[i] !== undefined
                        ? inputData[8].hiperbil[i]
                        : null,
                  };

                  detailEntries.push(detailItem);
                }

                // Create the datarisiko object
                const datarisiko = {
                  pengkajianRisikoId: faktorRisikoId,
                  registrasiId: curpasRI.registrasiId,
                  ruangId: curpasRI.ruangId,
                  tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
                  flagAssesment: "AWAL",
                  userId: namauser,
                  hapus: false,
                  clientHost: host,
                  dateEntry: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
                  clientIp: ip,
                  detail: detailEntries,
                };

                // Log the datarisiko to see the result
                insertFaktorRisiko(datarisiko);
              }}
            >
              Simpan
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default FormFaktorRisiko;
