import { CheckOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Spin,
  Table,
} from "antd";
import { v4 as uuidv4 } from "uuid";

import axios from "axios";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";
import MdDetailResorce from "../MdDetailResorce";

const { TextArea } = Input;

const PemFisik = () => {
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();
  const formItemLayoutdpjp = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  const {
    ihsPasien,
    identitasPx,
    paramEncounter,
    waktuPelayanan,
    getRiwRscId,
    getResourceById,
    kirimBundleV2,
    setmsRscdetail,
    spCvg,
  } = useContext(SatuSehatEncounterContext);

  const [modalTTvrs, setmodalTTvrs] = useState(false);

  const [Kepala, setKepala] = useState("");
  const [Mata, setMata] = useState("");
  const [Telinga, setTelinga] = useState("");
  const [Hidung, setHidung] = useState("");
  const [Rambut, setRambut] = useState("");
  const [Bibir, setBibir] = useState("");
  const [Gigigeligi, setGigigeligi] = useState("");
  const [Lidah, setLidah] = useState("");
  const [Langilangit, setLangilangit] = useState("");
  const [Leher, setLeher] = useState("");
  const [Tenggorokan, setTenggorokan] = useState("");
  const [Tonsil, setTonsil] = useState("");
  const [Dada, setDada] = useState("");
  const [Payudara, setPayudara] = useState("");
  const [Punggung, setPunggung] = useState("");
  const [Perut, setPerut] = useState("");
  const [Genital, setGenital] = useState("");
  const [AnusDubur, setAnusDubur] = useState("");
  const [Lenganatas, setLenganatas] = useState("");
  const [Lenganbawah, setLenganbawah] = useState("");
  const [Jaritangan, setJaritangan] = useState("");
  const [Kukutangan, setKukutangan] = useState("");
  const [Persendiantangan, setPersendiantangan] = useState("");
  const [Tungkaiatas, setTungkaiatas] = useState("");
  const [Tungkaibawah, setTungkaibawah] = useState("");
  const [Jarikaki, setJarikaki] = useState("");
  const [Kukukaki, setKukukaki] = useState("");
  const [Persendiankaki, setPersendiankaki] = useState("");

  const [listdataKepala, setlistdataKepala] = useState([]);

  const bodyPartsinput = [
    { label: "Kepala", value: Kepala, setter: setKepala, code: "21" },
    { label: "Mata", value: Mata, setter: setMata, code: "22" },
    { label: "Telinga", value: Telinga, setter: setTelinga, code: "23" },
    { label: "Hidung", value: Hidung, setter: setHidung, code: "24" },
    { label: "Rambut", value: Rambut, setter: setRambut, code: "25" },
    { label: "Bibir", value: Bibir, setter: setBibir, code: "26" },
    {
      label: "Gigi geligi",
      value: Gigigeligi,
      setter: setGigigeligi,
      code: "27",
    },
    { label: "Lidah", value: Lidah, setter: setLidah, code: "28" },
    {
      label: "Langi-langit",
      value: Langilangit,
      setter: setLangilangit,
      code: "29",
    },
    { label: "Leher", value: Leher, setter: setLeher, code: "30" },
    {
      label: "Tenggorokan",
      value: Tenggorokan,
      setter: setTenggorokan,
      code: "31",
    },
    { label: "Tonsil", value: Tonsil, setter: setTonsil, code: "32" },
    { label: "Dada", value: Dada, setter: setDada, code: "33" },
    { label: "Payudara", value: Payudara, setter: setPayudara, code: "34" },
    { label: "Punggung", value: Punggung, setter: setPunggung, code: "35" },
    { label: "Perut", value: Perut, setter: setPerut, code: "36" },
    { label: "Genital", value: Genital, setter: setGenital, code: "37" },
    { label: "Anus Dubur", value: AnusDubur, setter: setAnusDubur, code: "38" },
    {
      label: "Lengan atas",
      value: Lenganatas,
      setter: setLenganatas,
      code: "39",
    },
    {
      label: "Lengan bawah",
      value: Lenganbawah,
      setter: setLenganbawah,
      code: "40",
    },
    {
      label: "Jari tangan",
      value: Jaritangan,
      setter: setJaritangan,
      code: "41",
    },
    {
      label: "Kuku tangan",
      value: Kukutangan,
      setter: setKukutangan,
      code: "42",
    },
    {
      label: "Persendian tangan",
      value: Persendiantangan,
      setter: setPersendiantangan,
      code: "43",
    },
    {
      label: "Tungkai atas",
      value: Tungkaiatas,
      setter: setTungkaiatas,
      code: "44",
    },
    {
      label: "Tungkai bawah",
      value: Tungkaibawah,
      setter: setTungkaibawah,
      code: "45",
    },
    { label: "Jari kaki", value: Jarikaki, setter: setJarikaki, code: "46" },
    { label: "Kuku kaki", value: Kukukaki, setter: setKukukaki, code: "47" },
    {
      label: "Persendian kaki",
      value: Persendiankaki,
      setter: setPersendiankaki,
      code: "48",
    },
  ];

  const colRiwPenyakit = [
    {
      title: "No",
      dataIndex: "index",
      key: "index",
      align: "center",
      ellipsis: true,
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: "RegistrasiId",
      dataIndex: "RegistrasiId",
      align: "center",
      key: "RegistrasiId",
      width: 150,
    },
    {
      title: "ResourceId",
      dataIndex: "ResourceID",
      key: "ResourceID",
    },
    {
      title: "ResourceType",
      dataIndex: "ResourceType",
      key: "ResourceType",
    },
    {
      title: "DateEntry",
      dataIndex: "DateEntry",
      key: "DateEntry",
      align: "center",
      width: 200,
    },
    {
      title: "Aksi",
      dataIndex: "aksi",
      key: "aksi",
      align: "center",
      width: 70,
      render: (text, record, index) => (
        <div>
          <Button
            type="primary"
            onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
            icon={<SearchOutlined />}
            size="small"
            style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
          />
        </div>
      ),
    },
  ];

  const kirimBudle = async () => {

    let dataKepala = null;
    if (Kepala) {
      dataKepala = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "10199-8",
              display: "Physical findings of Head Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        //   valueString: "Bentuk kepala simetris",
        valueString: Kepala,
      };
    };

    let dataMata = null;
    if (Mata) {
      dataMata = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "10197-2",
              display: "Physical findings of Eye Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Mata,
      };
    };

    let dataTelinga = null;
    if (Telinga) {
      dataTelinga = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "10195-6",
              display: "Physical findings of Ear Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Telinga,
      };
    };

    let dataHidung = null;
    if (Hidung) {
      dataHidung = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "10203-8",
              display: "Physical findings of Nose Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Hidung,
      };
    };

    let dataRambut = null;
    if (Rambut) {
      dataRambut = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "32436-8",
              display: "Physical findings of Hair",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Rambut,
      };
    };

    let dataBibir = null;
    if (Bibir) {
      dataBibir = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "32446-7",
              display: "Physical findings of Lip",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Bibir,
      };
    };

    let dataGigigeligi = null;
    if (Gigigeligi) {
      dataGigigeligi = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "85910-8",
              display: "Physical findings of Teeth and gum Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Gigigeligi,
      };
    };

    let dataLidah = null;
    if (Lidah) {
      dataLidah = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "32483-0",
              display: "Physical findings of Tongue",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Lidah,
      };
    };

    let dataLangitlangit = null;
    if (Langilangit) {
      dataLangitlangit = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "10201-2",
              display: "Physical findings of Mouth and Throat and Teeth Narrative",
            },
          ],
        },
        bodySite: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "72914001",
              display: "Palatal structure",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Langilangit,
      };
    };

    let dataLeher = null;
    if (Leher) {
      dataLeher = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11411-6",
              display: "Physical findings of Neck Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Leher,
      };
    };


    let dataTenggorokan = null;
    if (Tenggorokan) {
      dataTenggorokan = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "56867-5",
              display: "Physical findings of Throat Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Tenggorokan,
      };
    };

    let dataTonsil = null;
    if (Tonsil) {
      dataTonsil = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "10201-2",
              display: "Physical findings of Mouth and Throat and Teeth Narrative",
            },
          ],
        },
        bodySite: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "91636008",
              display: "Bilateral palatine tonsils",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Tonsil,
      };
    };

    let dataDada = null;
    if (Dada) {
      dataDada = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11391-0",
              display: "Physical findings of Chest Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Dada,
      };
    };

    let dataPayudara = null;
    if (Payudara) {
      dataPayudara = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "10193-1",
              display: "Physical findings of Breasts Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Payudara,
      };
    };

    let dataPunggung = null;
    if (Punggung) {
      dataPunggung = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "10192-3",
              display: "Physical findings of Back Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Punggung,
      };
    };

    let dataPerut = null;
    if (Perut) {
      dataPerut = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "10191-5",
              display: "Physical findings of Abdomen Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Perut,
      };
    };

    let dataGenital = null;
    if (Genital) {
      dataGenital = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11400-9",
              display: "Physical findings of Genitalia Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Genital,
      };
    };

    let dataAnusDubur = null;
    if (AnusDubur) {
      dataAnusDubur = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11388-6",
              display: "Physical findings of Buttocks Narrative",
            },
          ],
        },
        bodySite: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "53505006",
              display: "Anal structure",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: AnusDubur,
      };
    };

    let dataLenganatas = null;
    if (Lenganatas) {
      dataLenganatas = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11386-0",
              display: "Physical findings of Upper Arm Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Lenganatas,
      };
    };

    let dataLenganbawah = null;
    if (Lenganbawah) {
      dataLenganbawah = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11398-5",
              display: "Physical findings of Forearm Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Lenganbawah,
      };
    };

    let dataJaritangan = null;
    if (Jaritangan) {
      dataJaritangan = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11404-1",
              display: "Physical findings of Hand Narrative",
            },
          ],
        },
        bodySite: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "7569003",
              display: "Finger structure",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Jaritangan,
      };
    };

    let dataKukutangan = null;
    if (Kukutangan) {
      dataKukutangan = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "32456-6",
              display: "Physical findings of Nail",
            },
          ],
        },
        bodySite: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "770812000",
              display: "Entire nail unit of finger",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Kukutangan,
      };
    };

    let dataPersendiantangan = null;
    if (Persendiantangan) {
      dataPersendiantangan = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11415-7",
              display: "Physical findings of Wrist Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Persendiantangan,
      };
    };

    let dataTungkaiatas = null;
    if (Tungkaiatas) {
      dataTungkaiatas = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11414-0",
              display: "Physical findings of Thigh Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Tungkaiatas,
      };
    };

    let dataTungkaibawah = null;
    if (Tungkaibawah) {
      dataTungkaibawah = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11389-4",
              display: "Physical findings of Calf Narrative",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Tungkaibawah,
      };
    };

    let dataJarikaki = null;
    if (Jarikaki) {
      dataJarikaki = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11397-7",
              display: "Physical findings of Foot Narrative",
            },
          ],
        },
        bodySite: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "29707007",
              display: "Toe structure",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Jarikaki,
      };
    };

    let dataKukukaki = null;
    if (Kukukaki) {
      dataKukukaki = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "32456-6",
              display: "Physical findings of Nail",
            },
          ],
        },
        bodySite: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "770805009",
              display: "Structure of nail unit of toe",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Kukukaki,
      };
    };

    let dataPersendiankaki = null;
    if (Persendiankaki) {
      dataPersendiankaki = {
        resourceType: "Observation",
        status: "final",
        category: [
          {
            coding: [
              {
                system:
                  "http://terminology.hl7.org/CodeSystem/observation-category",
                code: "exam",
                display: "Exam",
              },
            ],
          },
        ],
        code: {
          coding: [
            {
              system: "http://loinc.org",
              code: "11385-2",
              display: "Physical findings of Ankle Narrative",
            },
          ],
        },
        bodySite: {
          coding: [
            {
              system: "http://snomed.info/sct",
              code: "26552008",
              display: "Foot joint structure",
            },
          ],
        },
        subject: {
          reference: `Patient/${ihsPasien}`,
          display: identitasPx.Nama,
        },
        encounter: {
          reference: `Encounter/${paramEncounter.ResourceID}`,
        },
        effectiveDateTime: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        issued: dayjs(waktuPelayanan).subtract(7, "hour").format(),
        performer: [
          {
            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            display: paramEncounter.NamaDPJP,
          },
        ],
        valueString: Persendiankaki,
      };
    };

    const array = [
      dataKepala,
      dataMata,
      dataTelinga,
      dataHidung,
      dataRambut,
      dataBibir,
      dataGigigeligi,
      dataLidah,
      dataLangitlangit,
      dataLeher,
      dataTenggorokan,
      dataTonsil,
      dataDada,
      dataPayudara,
      dataPunggung,
      dataPerut,
      dataGenital,
      dataAnusDubur,
      dataLenganatas,
      dataLenganbawah,
      dataJaritangan,
      dataKukutangan,
      dataPersendiantangan,
      dataTungkaiatas,
      dataTungkaibawah,
      dataJarikaki,
      dataKukukaki,
      dataPersendiankaki,
    ];

    const filteredObjArray = array.filter(obj => obj !== null);

    const newArray = filteredObjArray.map((data) => ({
      fullUrl: `urn:uuid:${uuidv4()}`,
      resource: data,
      request: {
        method: "POST",
        url: "Observation",
      },
    }));

    let dataKirim = {
      resourceType: "Bundle",
      type: "transaction",
      entry: newArray,
    };

    kirimBundleV2(dataKirim, "Observation", "21");
  };

  const klikRefresh = async () => {
    const codeGroups = ["21"];

    try {
      // Jalankan semua permintaan data secara paralel
      const result = await Promise.all(
        codeGroups.map((codeGrup) =>
          getRiwRscId(identitasPx.RegistrasiId, codeGrup)
        )
      );
      setlistdataKepala(result[0]);
      console.log(result);

      console.log("Semua data berhasil dimuat.");
    } catch (error) {
      console.error("Terjadi kesalahan saat memuat data:", error);
    }
  };

  const klikDetail = (id, rscType) => {
    setmsRscdetail(true);
    getResourceById(id, rscType);
  };

  return (
    <div>
      <Row>
        <Col span={24} style={{ paddingRight: "5px" }}>
          <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Pemeriksaan Fisik
          </Divider>
        </Col>
      </Row>

      <Spin spinning={spCvg} tip="Loading... 😁">
        <Row style={{ marginBottom: "5px" }}>
          <Col span={12}>
            <Button
              type="primary"
              onClick={() => {
                // GettvReg(identitasPx.RegistrasiId);
                setKepala("Bentuk kepala simetris");
                setMata("Mata tampak sehat, konjungtiva tidak pucat");
                setTelinga("Bentuk telinga simetris, liang telinga ada serumen, membran timpani utuh");
                setHidung("Septum nasi simetris, lubang hidung tidak ada sekret, dan tidak ada tanda inflamasi");
                setRambut("Rambut dalam batas normal");
                setBibir("Bibir dalam batas normal, tidak ada tanda sianosis");
                setGigigeligi("Tidak ada karies, tidak ada perdarahan");
                setLidah("Lidah dalam batas normal, tidak ada bercak putih");
                setLangilangit("Tidak ada tanda bercak keputihan pada langit- langit mulut");
                setLeher("Tidak ada pembesaran kelenjar limfe, tidak ada pembesaran kelenjar tiroid, tidak ada pembesaran vena jugularis");
                setTenggorokan("Tidak ada kripta, tidak ada tanda inflamasi");
                setTonsil("Tonsil T1-T1, tidak ada tanda inflamasi");
                setDada("Pergerakan dada simetris, suara napas vesikuler, tidak ada ronkhi, tidak ada wheezing");
                setPayudara("Payudara simetris, areola dalam batas normal, tidak ada keluar cairan, dan tidak ada tanda inflamasi");
                setPunggung("Punggung simetris, tidak tampak ada kelainan");
                setPerut("Gerakan dinding perut saat ekspirasi dan insipirasi dalam batas normal, pada auskultasi terdengar suara peristaltik usus dalam batas normal, pada perkusi terdapat timpani seluruh lapang perut");
                setGenital("Pada vagina tidak ada jaringan parut, tanda inflamasi, atau keretakan kulit, tidak ada benjolan. Pada pemeriksaan dalam terdapat darah segar dan gumpalan darah di saluran vagina dan sebagian janin masuk ke peritoneum");
                setAnusDubur("Anus dalam batas normal, tidak ada tanda inflamasi");
                setLenganatas("Lengan atas tidak ada fraktur, tidak ada krepitasi, kekuatan otot normal");
                setLenganbawah("Lengan bawah tidak ada fraktur, tidak ada krepitasi, kekuatan otot normal");
                setJaritangan("Jari tangan dalam batas normal, tidak ada tanda inflamasi");
                setKukutangan("Kuku tangan dalam batas normal, tidak ada tanda sianosis");
                setPersendiantangan("Persendian tangan tidak ada fraktur, tidak ada krepitasi");
                setTungkaiatas("Tungkai atas tidak ada fraktur, tidak ada krepitasi, kekuatan otot baik");
                setTungkaibawah("Tungkai bawah tidak ada fraktur, tidak ada krepitasi, kekuatan otot baik");
                setJarikaki("Jari kaki dalam batas normal, tidak ada tanda inflamasi");
                setKukukaki("Kuku kaki dalam batas normal, tidak ada tanda sianosis");
                setPersendiankaki("Persendian kaki tidak ada fraktur, tidak ada krepitasi");
                setmodalTTvrs(true);
              }}
              icon={<PlusOutlined />}
            >
              Tambah
            </Button>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => {
                klikRefresh("6");
              }}
              style={{ float: "right" }}
            >
              Refresh
            </Button>
          </Col>
        </Row>

        <Row>
          {/* <Divider
            variant="dotted"
            orientation="left"
            style={{
              borderColor: "#7cb305",
            }}
          >
            Data Yang Sudah Terkirim
          </Divider> */}
          <Table
            bordered
            // loading={spCvg}
            columns={colRiwPenyakit}
            dataSource={listdataKepala}
            pagination={false}
            size="small"
          />
        </Row>
      </Spin>

      <Modal
        visible={modalTTvrs}
        onCancel={() => setmodalTTvrs(false)}
        title="Pemeriksaan Fisik Pasien"
        width={1000}
        footer={null}
        closable={false}
        style={{ top: 50 }}
      >
        <Spin spinning={spCvg} tip="Loading... 😁">
          {bodyPartsinput.map((part, index) => (
            <>
              <Row style={{ marginBottom: '2px' }}>
                <Col span={3}>
                  <span>{part.label} :</span>
                </Col>
                <Col span={21}>
                  <Input
                    type="text"
                    placeholder={`Enter ${part.label}`}
                    onChange={(e) => part.setter(e.target.value)}
                    value={part.value}
                    style={{ width: "100%" }}
                  />
                </Col>
              </Row>
            </>
            // <Form.Item
            //   key={index}
            //   {...formItemLayoutdpjp}
            //   label={part.label}
            //   style={{ marginBottom: 5 }}
            // >
            //   <Input.Group compact>
            //     <Input
            //       type="text"
            //       placeholder={`Enter ${part.label}`}
            //       onChange={(e) => part.setter(e.target.value)}
            //       value={part.value}
            //       style={{ width: "90%" }}
            //     />
            //   </Input.Group>
            // </Form.Item>
          ))}

          <hr />
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => {
                  kirimBudle();
                }}
                style={{ float: 'right', width: '150px' }}
              >
                Kirim
              </Button>
            </Col>
          </Row>
        </Spin>
      </Modal>

      {/* <MdDetailResorce /> */}
    </div >
  );
};

export default PemFisik;
