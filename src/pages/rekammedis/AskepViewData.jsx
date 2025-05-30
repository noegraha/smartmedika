import { Card, Col, Row, Tabs } from "antd";
import Search from "antd/lib/input/Search";
import Iframe from "react-iframe";
import React, { useContext, useState } from "react";
import { PasienRIContext } from "../rawatinap/context/PasienRIContext";
import FormTandaVitalRJView from "../rawatjalan/form/FormTandaVitalRJView";
import { AnamnesaContext } from "../rawatjalan/context/AnamnesaContext";
import { RJumumContext } from "../rawatjalan/context/RJumumContext";
import { AskepContext } from "../rawatinap/context/AskepContext";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import FormListDiagnosaAskep from "../rawatjalan/AskepRJ/FormListDiagnosaAskep";
import AskepRjView from "./AskepRjView";
import Pagehead from "../rawatjalan/pagehead";
const { TabPane } = Tabs;
const AskepViewData = () => {
    const namauser = sessionStorage.getItem("userId");
    const { viewaskep, setviewaskep } = useContext(PasienRIContext);
    const { detailTV } = useContext(AnamnesaContext);
    const {
        detailPasienReview,
    } = useContext(PasienContext);

    const { detailRJumum } = useContext(RJumumContext);
    const {
        getListAskepByIdByLayanan
    } = useContext(AskepContext);
    const [random, setRandom] = useState(0);
    function reloadFrame() {
        setRandom(random + 1);
    }
    return (
        <div>
            {/* <Tabs defaultActiveKey="1" > */}
            {/* <TabPane tab="Rawat Inap" key="1"> */}
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
                                    "http://182.168.0.119:8082/#/" + e + "/" + namauser
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
            {/* </TabPane>
                <TabPane tab="Rawat Jalan" key="2">
                    <Row>
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
                                        detailPasienReview(e);
                                        detailTV(e);
                                        getListAskepByIdByLayanan(e, 2);
                                    }}
                                />
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Pagehead />
                        </Col>
                        <Col span={24}>
                            <FormTandaVitalRJView />
                        </Col>
                        <Col span={24}>
                            <Card
                                size="small"
                                title="Form Askep"
                                headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                                style={{
                                    marginBottom: 5,
                                    borderWidth: "2px",
                                    borderColor: "darkgray",
                                    borderRadius: "4px",
                                }}
                            >
                                <FormListDiagnosaAskep />
                                <AskepRjView />
                            </Card>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs> */}

        </div>
    );
};

export default AskepViewData;
