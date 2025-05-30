import { Card, Col, Row } from "antd";
import Search from "antd/lib/input/Search";
import Iframe from "react-iframe";
import React, { useContext, useState } from "react";
import { PasienRIContext } from "../rawatinap/context/PasienRIContext";

const AskepEditData = () => {
  const namauser = sessionStorage.getItem("userId");
  const { viewaskep, setviewaskep } = useContext(PasienRIContext);

  const [random, setRandom] = useState(0);
  function reloadFrame() {
    setRandom(random + 1);
  }
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card
            size="small"
            style={{ margin: 3 }}
            title="Pencarian Data Pasien"
            headStyle={{ fontWeight: "bold", fontSize: "14" }}
          >
            <Search
              placeholder="Masukan Nomor Registrasi Pasien"
              enterButton
              onSearch={(e) => {
                setviewaskep(
                  "http://182.168.7.119:8080/#/" + e + "/" + namauser
                );
                reloadFrame();
              }}
            />
          </Card>
        </Col>
        <Col span={24}>
          <Iframe
            key={random}
            id="myIfr"
            url={viewaskep}
            width="100%"
            height="750px"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Col>
      </Row>
    </div>
  );
};

export default AskepEditData;
