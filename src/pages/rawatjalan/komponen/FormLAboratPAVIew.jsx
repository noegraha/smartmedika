import React, { useState, useContext } from "react";
import { Modal, Button, Col, Row, Tree, Typography, Space, Spin, message } from "antd";
import Iframe from "react-iframe";
import Formhasillab from "./FormHasilLabKlinik";
import { DownOutlined } from "@ant-design/icons";
import { PasienContext } from "../context/PasienContext";
import { HasilLabContext } from "../context/HasilLabContext";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { ChatContext } from "../../chat/Chatcontext";

const { Text, Link, Title } = Typography;
const { DirectoryTree } = Tree;

const FormLAboratPAVIew = () => {
    const norm = sessionStorage.getItem("norm");
    const namaPasien = sessionStorage.getItem("namaPasienRawat");
    const [keyExpandLab, setkeyExpandLab] = useState("");
    const [keySelectedLab, setkeySelectedLab] = useState("");
    const { curpas } = useContext(PasienContext);
    const { loading, setLoading } = useContext(ChatContext);
    const {
        modalLabPA, setmodalLabPA,
        listLabPAByPasienId, setListLabPAByPasienId,
        getListLAbPAByPasienId
    } = useContext(HasilLabContext);
    const { printLabPa, setprintLabPa,
        getPrintLabPa,
        loadDelay, setloadDelay } =
        useContext(PrintOutContext);

    return (
        <div>
            <Spin spinning={loadDelay}>
                <Row>
                    <Col span={24}>
                        <Text keyboard>Data Hasil Laborat PA Pasien</Text>
                        {/* <Title level={4}></Title> */}
                    </Col>
                    <Col span={3}>
                        <Space direction="vertical">
                            <Title level={3} style={{ marginBottom: "0", marginTop: "0" }}>
                                {" "}
                                {namaPasien}
                            </Title>
                            <Text code style={{ marginBottom: "0", marginTop: "0" }}>
                                {norm}
                            </Text>
                            <DirectoryTree
                                height={500}
                                // expandedKeys={[keyExpandLab]}
                                selectedKeys={[keySelectedLab]}
                                // showLine
                                // switcherIcon={<DownOutlined />}
                                onSelect={(e) => {
                                    if (e[0].length === 10) {
                                        setloadDelay(true);
                                        setkeySelectedLab(
                                            listLabPAByPasienId[
                                                listLabPAByPasienId
                                                    .map((c) => c.registrasiId)
                                                    .indexOf(e[0])
                                            ].listNoLab[
                                                listLabPAByPasienId[
                                                    listLabPAByPasienId
                                                        .map((c) => c.registrasiId)
                                                        .indexOf(e[0])
                                                ].listNoLab.length - 1
                                            ].noUrutPMR + "+" + e[0]
                                        );

                                        // setkeySelectedLab(e[0]);
                                        getPrintLabPa(
                                            listLabPAByPasienId[
                                                listLabPAByPasienId
                                                    .map((c) => c.registrasiId)
                                                    .indexOf(e[0])
                                            ].listNoLab[
                                                listLabPAByPasienId[
                                                    listLabPAByPasienId
                                                        .map((c) => c.registrasiId)
                                                        .indexOf(e[0])
                                                ].listNoLab.length - 1
                                            ].noUrutPMR, e[0]
                                        )

                                    } else {
                                        setloadDelay(true);
                                        getPrintLabPa(e[0].split('+').shift(), e[0].split('+').pop());
                                        // setkeyExpandLab(e[0]);
                                        setkeySelectedLab(e[0]);
                                        console.log(e[0])
                                    }
                                }}
                                treeData={listLabPAByPasienId.map((b) => ({
                                    title: b.registrasiId,
                                    key: b.registrasiId,
                                    children: b.listNoLab.map((c) => ({
                                        title: c.noUrutPMR,
                                        key: c.noUrutPMR + "+" + b.registrasiId,
                                        isLeaf: true,
                                    })),
                                }))}
                            />
                        </Space>
                    </Col>
                    <Col span={21}>
                        <Iframe
                            onLoad={() => {
                                setloadDelay(false);
                            }}
                            url={printLabPa}
                            width="100%"
                            height="750px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                            position="relative"
                        />
                    </Col>
                </Row>
                {/* <Formhasillab /> */}
            </Spin>
        </div>
    )
}

export default FormLAboratPAVIew
