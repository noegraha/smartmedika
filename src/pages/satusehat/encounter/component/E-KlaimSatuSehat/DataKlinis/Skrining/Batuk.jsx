import { Button, Checkbox, Col, Divider, Input, Row, Space, Table } from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../context/SatuSehatEncounterContext";
import dayjs from "dayjs";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import RiwayatPenyakit from "../Anamnesis/RiwayatPenyakit";

const Batuk = () => {
  const {
    ihsPasien,
    identitasPx,
    paramEncounter,
    postResource,
    waktuPelayanan,
    getRiwRscId,
    spCvg,
    getResourceById,
    setmsRscdetail,
  } = useContext(SatuSehatEncounterContext);

  const [riwayatDemam, setRiwayatDemam] = useState(false);
  const [riwayatBerkeringat, setRiwayatBerkeringat] = useState(false);
  const [riwayatWabah, setRiwayatWabah] = useState(false);
  const [riwayatObat, setRiwayatObat] = useState(false);
  const [riwayatBB, setRiwayatBB] = useState(false);
  const [riwayatPenyakit, setRiwayatPribadi] = useState(null);
  const [riwayatPengobatan, setRiwayatPengobatan] = useState(null);
  const [listRiwayatBatuk, setListRiwayatBatuk] = useState([]);
  const klikRefresh = async (codeGrup) => {
    let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
    if (codeGrup === "6") {
      setRiwayatPribadi(data.lenght !== 0 ? data[0].ResourceID : null);
      console.log(data);
    } else if (codeGrup === "11") {
      setRiwayatPengobatan(data.lenght !== 0 ? data[0].ResourceID : null);
    } else if (codeGrup === "54") {
      setListRiwayatBatuk(data);
    }
  };
  const colTriase = [
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
  const klikDetail = (id, rscType) => {
    setmsRscdetail(true);
    getResourceById(id, rscType);
  };
  const dataBatuk = {
    resourceType: "QuestionnaireResponse",
    questionnaire: "https://fhir.kemkes.go.id/Questionnaire/Q0008",
    status: "completed",
    subject: {
      reference: `Patient/${ihsPasien}`,
      display: identitasPx.Nama,
    },
    encounter: {
      reference: `Encounter/${paramEncounter.ResourceID}`,
    },
    authored: dayjs(waktuPelayanan).subtract(7, "hour").format(),
    author: {
      reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
    },
    source: {
      reference: `Patient/${ihsPasien}`,
      display: identitasPx.Nama,
    },
    item: [
      {
        linkId: "1",
        text: "Apakah memiliki riwayat demam?",
        answer: [
          {
            valueBoolean: riwayatDemam,
            item: [
              {
                linkId: "1.1",
                text: "Jika ya, Riwayat Demam",
                answer: [
                  {
                    valueReference: {
                      reference: `Condition/${riwayatPenyakit}`,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        linkId: "2",
        text: "Apakah berkeringat pada malam hari walaupun tanpa aktivitas?",
        answer: [
          {
            valueBoolean: riwayatBerkeringat,
          },
        ],
      },
      {
        linkId: "3",
        text: "Apakah memiliki riwayat berpergian dari daerah wabah?",
        answer: [
          {
            valueBoolean: riwayatWabah,
          },
        ],
      },
      {
        linkId: "4",
        text: "Apakah memiliki riwayat pemakaian obat jangka panjang?",
        answer: [
          {
            valueBoolean: riwayatObat,
            item: [
              {
                linkId: "4.1",
                text: "Jika ya, Riwayat Pengobatan",
                answer: [
                  {
                    valueReference: {
                      reference: `MedicationStatement/${riwayatPengobatan}`,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        linkId: "5",
        text: "Apakah memiliki riwayat BB turun tanpa sebab yang diketahui?",
        answer: [
          {
            valueBoolean: riwayatBB,
          },
        ],
      },
    ],
  };
  return (
    <div>
      <Divider
        variant="dotted"
        orientation="left"
        style={{
          borderColor: "#7cb305",
        }}
      >
        Batuk
      </Divider>
      <Col span={9}>
        <Button
          type="primary"
          onClick={() => {
            setRiwayatDemam(true);
            setRiwayatBerkeringat(true);
            setRiwayatWabah(true);
            setRiwayatObat(true);
            setRiwayatBB(true);
          }}
          icon={<PlusOutlined />}
        >
          Tambah Skrining Batuk
        </Button>
      </Col>
      <Row>
        <Col span={12}>1. Apakah Memiliki Riwayat Demam :</Col>
        <Col span={12}>
          <Checkbox
            value={riwayatDemam}
            checked={riwayatDemam}
            onChange={(e) => setRiwayatDemam(e.target.checked)}
          />
        </Col>
      </Row>
      {riwayatDemam ? (
        <Row>
          <Col span={12}>1.1 Jika ya, Riwayat Demam :</Col>
          <Col span={12}>
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input value={riwayatPenyakit} />
              <Button type="primary" onClick={() => klikRefresh("6")}>
                Refresh
              </Button>
            </Space.Compact>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Row>
        <Col span={12}>
          2. Apakah berkeringat pada malam hari walaupun tanpa aktivitas? :
        </Col>
        <Col span={12}>
          <Checkbox
            value={riwayatBerkeringat}
            checked={riwayatBerkeringat}
            onChange={(e) => setRiwayatBerkeringat(e.target.checked)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          3. Apakah memiliki riwayat berpergian dari daerah wabah? :
        </Col>
        <Col span={12}>
          <Checkbox
            value={riwayatWabah}
            checked={riwayatWabah}
            onChange={(e) => setRiwayatWabah(e.target.checked)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          4. Apakah memiliki riwayat pemakaian obat jangka panjang? :
        </Col>
        <Col span={12}>
          <Checkbox
            value={riwayatObat}
            checked={riwayatObat}
            onChange={(e) => setRiwayatObat(e.target.checked)}
          />
        </Col>
      </Row>
      {riwayatObat ? (
        <Row>
          <Col span={12}>4.1 Jika ya, Riwayat Pengobatan :</Col>
          <Col span={12}>
            <Space.Compact
              style={{
                width: "100%",
              }}
            >
              <Input value={riwayatPengobatan} />
              <Button type="primary" onClick={() => klikRefresh("11")}>
                Refresh
              </Button>
            </Space.Compact>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Row>
        <Col span={12}>
          5. Apakah memiliki riwayat BB turun tanpa sebab yang diketahui? :
        </Col>
        <Col span={12}>
          <Checkbox
            value={riwayatBB}
            checked={riwayatBB}
            onChange={(e) => setRiwayatBB(e.target.checked)}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              console.log(dataBatuk);
              postResource(dataBatuk, "QuestionnaireResponse", "54");
            }}
            style={{ float: "right", width: "150px" }}
          >
            Post Skrining Batuk
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Button
            onClick={() => {
              klikRefresh("54");
            }}
            style={{ float: "right" }}
          >
            Refresh
          </Button>
        </Col>
      </Row>
      <Row>
        <Table
          bordered
          loading={spCvg}
          columns={colTriase}
          dataSource={listRiwayatBatuk}
          pagination={false}
          size="small"
        />
      </Row>
    </div>
  );
};

export default Batuk;
