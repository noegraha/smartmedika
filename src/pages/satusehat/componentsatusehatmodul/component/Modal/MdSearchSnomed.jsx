import { CheckOutlined } from "@ant-design/icons";
import { Button, Col, Input, Modal, Row, Space, Spin, Table, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import { SatuSehatModulContext } from "../../context/SatuSehatModulContext";

const MdSearchSnomed = () => {
  const {
    setkeluhanUtama,
    setriwPenyakit,
    setedukasi,
    flagMdSnomed,
    tempListSnomed,
    LookupSnomed,
    mdLookupSnomed,
    setmdLookupSnomed,
    spCvg
  } = useContext(SatuSehatModulContext);

  const [sSearch, setsSearch] = useState(null);

  const colSnomed = [
    {
      title: "Code",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 150,
    },
    {
      title: "Display",
      dataIndex: ['fsn', 'term'],
      key: "fsnterm",
    },
    {
      title: "Efektive Time",
      dataIndex: "effectiveTime",
      key: "effectiveTime",
      align: 'center',
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
            onClick={() => {
              if (flagMdSnomed === "1") {
                setkeluhanUtama(record);
              }
              else if (flagMdSnomed === "6") {
                setriwPenyakit(record);
              }
              else if (flagMdSnomed === "99") {
                setedukasi(record);
              }

              setmdLookupSnomed(false);
            }}
            // disabled={!sstoken || record.StsKirim === 'true'}
            icon={<CheckOutlined />}
            size="small"
            style={{ backgroundColor: "#73d13d", borderColor: "#73d13d" }}
          />
        </div>
      ),
    },
  ];

  const klikCari = (e) => {
    let url = "http://182.168.6.247:8083/";
    let jnsSearch;

    if (flagMdSnomed === "1" || flagMdSnomed === "99") {
      jnsSearch = e + ' finding'
    }
    else {
      jnsSearch = e + ' disorder'
    }

    let param = `${url}MAIN/concepts?activeFilter=true&term=${encodeURIComponent(jnsSearch)}&termActive=true&limit=500`
    LookupSnomed(param);
  };

  return (
    <div>
      <Modal
        visible={mdLookupSnomed}
        onCancel={() => setmdLookupSnomed(false)}
        title="DAFTAR SNOMED"
        width={1000}
        footer={null}
        closable={false}
        style={{ top: 50 }}
      >
        <Spin
          spinning={spCvg}
          tip="Loading... 😁"
        >
          <Row style={{ marginBottom: "5px" }}>
            <Col span={3}>
              <span>Kolom Cari :</span>
            </Col>
            <Col span={21}>

              <Space.Compact style={{ width: '100%' }}>
                <Tooltip title="Gunakan istilah medis berbahasa inggris untuk mencari SNOMED">
                  <Input
                    value={sSearch}
                    placeholder="Search SNOMED"
                    onChange={(e) => setsSearch(e.target.value)}
                  />
                </Tooltip>
                <Button
                  type="primary"
                  onClick={() => klikCari(sSearch)}
                >
                  Cari
                </Button>
              </Space.Compact>
            </Col>
            {/* <Col span={1} style={{ paddingLeft: '2px' }}>
                            <Button
                                type='primary'
                                onClick={() => onSearchSnomed(sSearch)}
                                icon={<SearchOutlined />}
                                style={{ width: '100%' }}
                            />
                        </Col> */}
          </Row>
          <Table
            bordered
            loading={spCvg}
            columns={colSnomed}
            dataSource={tempListSnomed}
            size="small"
          />
        </Spin>
      </Modal>
    </div>
  );
};

export default MdSearchSnomed;
