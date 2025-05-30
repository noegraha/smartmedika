import {
    Button,
    Card,
    Checkbox,
    Col,
    DatePicker,
    Descriptions,
    Divider,
    Form,
    Image,
    Input,
    Modal,
    Popover,
    Row,
    Select,
    Space,
    Table,
} from "antd";
import Search from "antd/lib/input/Search";
import Iframe from "react-iframe";
import React, { useContext, useState, useRef } from "react";
import { PasienRIContext } from "../rawatinap/context/PasienRIContext";
const { Option } = Select;
const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
    marginBottom: 0,
};

const IframeAskep = () => {
    const namauser = sessionStorage.getItem("userId");
    const { viewaskep, setviewaskep } = useContext(PasienRIContext);
    return (
        <div>
            <Row gutter={[8, 8]}>
                <Col span={24}>
                    <Iframe
                        url={viewaskep}
                        width="100%"
                        height="750px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative"
                    />
                </Col>
            </Row>
        </div>
    )
}

export default IframeAskep