import {
  Button,
  Card,
  Col,
  DatePicker,
  Modal,
  Row,
  Space,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatModulContext } from "../context/SatuSehatModulContext";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const FrmEpsOfCare = () => {
  const {
    ihsRS,
    ihsPasien,
    identitasPx,
    regEpsofCare,
    setregEpsofCare,
    paramEpsofCare, setparamEpsofCare,
    spCvg,
    getResourceById,
    postResource,
    postResourcev2,
  } = useContext(SatuSehatModulContext);

  const [tgl, settgl] = useState(dayjs());

  const klikTest = async () => {
    let link = `EpisodeOfCare?type=CKD&status=active&patient=${ihsPasien}`;
    let data = await getResourceById(null, link);
    console.log("klikTest : ", data);

    if (data.total === 0) {
      Modal.warning({
        title: "Perhatian!",
        content: "Pasien belum didaftarkan Episode of Care Hemodialisa.",
      });
    }
  };

  const klikEpsofCare = async () => {
    let link = `EpisodeOfCare?type=CKD&status=active&patient=${ihsPasien}`;

    try {
      let data = await getResourceById("skip", link);
      console.log("klikTest : ", data);
      setparamEpsofCare(null);
      setregEpsofCare(null);

      if (data.total === 0) {
        Modal.warning({
          title: "Perhatian!",
          content: "Pasien belum didaftarkan Episode of Care Hemodialisa.",
        });
      } else {
        setparamEpsofCare(data.entry[0]);

        // Cari value berdasarkan system tertentu
        const registryIdObj = data.entry[0].resource.identifier.find(
          (item) =>
            item.system ===
            "http://sys-ids.kemkes.go.id/episode-of-care/registry-id/"
        );

        const registryId = registryIdObj?.value;
        setregEpsofCare(registryId);
      }
    } catch (error) {
      Modal.error({
        title: "Error",
        content: "Gagal mengambil data Episode of Care.",
      });
    }
  };

  const klikPost = async () => {
    try {
      let data = {};

      data = {
        resourceType: "EpisodeOfCare",
        identifier: [
          {
            system: `http://sys-ids.kemkes.go.id/episode-of-care/${ihsRS}`,
            value: identitasPx.RegistrasiId,
          },
        ],
        status: "active",
        // "statusHistory": [
        //     {
        //         "status": "waitlist",
        //         "period": {
        //             "start": "2024-04-24T08:45:00+00:00"
        //         }
        //     }
        // ],
        type: [
          {
            coding: [
              {
                system:
                  "http://terminology.kemkes.go.id/CodeSystem/episodeofcare-type",
                code: "CKD",
                display: "Chronic Kidney Disease",
              },
            ],
          },
        ],
        patient: {
          reference: `Patient/${ihsPasien}`,
          // "display": "{{Patient_Name}}"
        },
        managingOrganization: {
          reference: `Organization/${ihsRS}`,
        },
        period: {
          start: dayjs(tgl).subtract(7, "hour").format(),
        },
      };

      // postResource(data, "EpisodeOfCare", "112");
      console.log("klikPost : ", data);

      const newResponse = await postResourcev2(data, "EpisodeOfCare", "112");

      if (newResponse === "Sukses") {
        klikEpsofCare();
      }
    } catch (error) {
      Modal.error({
        title: 'Error!',
        content: `Error : ${error}`,
      });
      console.error("Error :", error);
    };


  };

  return (
    <div>
      <Spin spinning={spCvg} tip="Loading... 😁">
        <Row style={{ marginBottom: "2px" }}>
          <Col span={22}>
            <Title level={5} italic>
              Eps of Care Id : {paramEpsofCare && Object.keys(paramEpsofCare).length > 0 ? paramEpsofCare.resource.id : null}
            </Title>
          </Col>
          <Col span={2}>
            <Button
              onClick={() => klikEpsofCare()}
              disabled={!ihsPasien}
              style={{ float: "right" }}
            >
              Ambil Data
            </Button>
          </Col>
        </Row>

        <Card title="Registrasi Uronefrologi">
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Tgl. Mulai Dialisis</Col>
            <Col span={20}>
              <Tooltip title="Isikan tanggal pertama kali pasien dilakukan tindakan dan belum memiliki nomor Registrasi.">
                <Space size="small">
                  <span>:</span>
                  <DatePicker
                    // size="small"
                    // disabled={props.disabledTglPendHd}
                    value={dayjs(tgl)}
                    format={"DD-MM-YYYY HH:mm"}
                    showTime
                    onChange={(e) => settgl(e)}
                    allowClear={false}
                  />
                </Space>
              </Tooltip>
            </Col>
          </Row>

          <hr />
          <Row>
            <Col span={24}>
              <Button
                type="primary"
                onClick={() => klikPost()}
                disabled={regEpsofCare && ihsPasien}
                style={{ width: "150px", float: "right" }}
              >
                POST Eps of Care
              </Button>
            </Col>
          </Row>
        </Card>
      </Spin>

    </div>
  );
};

export default FrmEpsOfCare;
