import React, { useContext, useState } from 'react';
import HdContext from '../../HdContext';
import { Button, Col, Input, Modal, Row, Select, Table } from 'antd';
import { SatuSehatModulContext } from '../../../../satusehat/componentsatusehatmodul/context/SatuSehatModulContext';
import { CloudDownloadOutlined } from '@ant-design/icons';

const { PasiensContext } = HdContext;
const { Option } = Select;

const EdukasiHD = () => {
    const props = useContext(PasiensContext);

    return (
        <div>
            <Row>
                <Col>
                    Edukasi Pasien Pulang :
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        // placeholder="Pilih.."
                        value={props.kompIntradialisis}
                    // onChange={props.changeKompIntradialisis}
                    // size='small'
                    // showSearch={true}
                    // filterOption={(input, option) =>
                    //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    // }
                    >
                        {props.optDialisisKompIntra.map((optDialKomp, index) => (
                            <Option key={index} value={optDialKomp.komplikasiIntraId}>{optDialKomp.deskripsi}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>
        </div>
    )
}

export default EdukasiHD