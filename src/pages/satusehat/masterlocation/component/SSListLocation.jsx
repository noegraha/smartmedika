import { Button, Card, Col, Input, Modal, Row, Select, Space, Table } from 'antd'
import React, { useContext } from 'react'
import SSCreateLocation from './SSCreateLocation'
import { CloudDownloadOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { SatuSehatLocationContext } from '../context/SatuSehatLocationContext';
import SSEditLocation from './SSEditLocation';

const { Option } = Select;

const SSListLocation = () => {
    const {
        sstoken,
        listGrpLayanan,
        groupLayananList, setgroupLayananList,
        listSSIdRuang,
        setgroupLayanan,
        setruangId,
        setnamaRuang,
        setstsActive,
        setdeskGedung,
        setgedung,
        setorg,
        setaddr,
        setcity,
        setkodePos,
        setkodeProv,
        setkodeCity,
        setkodeDistrict,
        setkodeVillage,
        // sp
        spbtn,
        spTbLocation,
        // func
        getGroupLayanan,
        getLocation,
        SatuSehatGetToken,
        getLocationbySSId,
        // md
        mdCreate, setmdCreate,
        mdEdit, setmdEdit,
    } = useContext(SatuSehatLocationContext)

    const columns = [
        {
            title: 'Id Ruang',
            dataIndex: 'RuangId',
            key: 'RuangId',
            width: 60,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
            width: 'auto',
        },
        {
            title: 'Id SatuSehat',
            dataIndex: 'SatuSehatId',
            key: 'SatuSehatId',
            width: 'auto',
        },
        {
            title: 'Aksi',
            key: 'operation',
            fixed: 'right',
            width: 45,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        disabled={!sstoken}
                        onClick={() => klikEdit(record.SatuSehatId)}
                        icon={<EditOutlined />}
                        size='small'
                        style={{ width: '25px' }}
                    />
                </div>
        },
    ];

    const getGrp = () => {
        getGroupLayanan()
    }

    const onChangeGroupLayanan = (data) => {
        setgroupLayananList(data)
        getLocation(data)
    }

    const setDefault = () => {
        setgroupLayanan(null)
        setruangId(null)
        setnamaRuang(null)
        setstsActive(null)
        setdeskGedung(null)
        setgedung(null)
        setorg(null)
        setaddr('Jl. Dr. Gumbreg No.1, Kebontebu, Berkoh, Kec. Purwokerto Selatan, Kab. Banyumas, Jawa Tengah')
        setcity('Purwokerto')
        setkodePos('53146')
        setkodeProv('33')
        setkodeCity('3302')
        setkodeDistrict('330224')
        setkodeVillage('3302241003')
    }

    const klikCreate = () => {
        setmdCreate(true)
        setDefault()
    }

    const klikEdit = (data) => {
        console.log('klikEdit : ', data);
        getLocationbySSId(data)
    }

    return (
        <div>
            <Card
                title='Master Location'
                headStyle={{ backgroundColor: '#36cfc9' }}
                style={{ marginTop: '5px' }}>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={2}>
                        Group Layanan :
                    </Col>
                    <Col span={11}>
                        <Input.Group compact>
                            <Select
                                value={groupLayananList}
                                onChange={(e) => onChangeGroupLayanan(e)}
                                // size='small'
                                style={{ width: '50%' }}
                            >
                                {listGrpLayanan.map((item, index) => (
                                    <Option key={index} value={item.Id}>{item.Deskripsi}</Option>
                                ))}
                            </Select>
                            <Button
                                onClick={() => getGrp()}
                                type="primary"
                                htmlType="submit"
                                // size="small"
                                loading={spbtn}
                                icon={<CloudDownloadOutlined />}
                            />
                        </Input.Group>
                    </Col>

                    <Col span={11}>
                        <Space style={{ float: 'right' }}>
                            {/* <Button
                                onClick={() => clearToken()}
                                type='primary'
                                style={{ width: '100px' }}
                            >
                                Clear TOKEN
                            </Button> */}
                            {/* <Button
                                onClick={() => SatuSehatGetToken()}
                                type='primary'
                                style={{ width: '120px' }}
                            >
                                Get TOKEN
                            </Button> */}
                            <Button
                                disabled={!sstoken ? true : false}
                                onClick={() => klikCreate()}
                                type='primary'
                                icon={<PlusOutlined />}
                                style={{ width: '120px' }}
                            >
                                SSId Ruangan
                            </Button>
                        </Space>
                    </Col>
                </Row>

                <Table
                    bordered
                    loading={spTbLocation}
                    columns={columns}
                    dataSource={listSSIdRuang}
                    size='small'
                    // scroll={{ x: 1500 }}
                    pagination={false}
                />
            </Card>

            <Modal
                centered
                open={mdCreate}
                footer={null}
                closable={false}
                width={1000}
            >
                <SSCreateLocation />
            </Modal>

            <Modal
                centered
                open={mdEdit}
                footer={null}
                closable={false}
                width={1000}
            >
                <SSEditLocation />
            </Modal>
        </div>
    )
}

export default SSListLocation