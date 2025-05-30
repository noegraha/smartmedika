import { Button, Card, Col, Input, Modal, Row, Select, Space, Table, Tooltip } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatOrganizationContext } from '../context/SatuSehatOrganizationContext'
import { EditOutlined, PlusOutlined, ReadOutlined, SaveOutlined, SyncOutlined } from "@ant-design/icons";
import SSPostOrganization from './SSPostOrganization';
import SSEditOrganization from './SSEditOrganization';
import dayjs from 'dayjs';

const { Option } = Select;

const SSListOrganization = () => {
    const {
        // state
        SSToken,
        OrgListPartOf,
        OrgPartOfGet, setOrgPartOfGet,
        OrgListGetPartOf, setOrgListGetPartOf,
        // list
        listOrg,
        // create
        setOrgType,
        ipKomp,
        hostKomp,
        // edit
        setOrgEditId,
        setOrgIdentValue,
        setOrgIdentActive,
        setOrgName,
        setOrgPartOf,
        // spin
        spGetOrganization,
        //func
        getOrganization,
        SatuSehatGetToken,
        simpanOrgDb,
        // modal
        mdCreateOrg, setmdCreateOrg,
        mdEditOrg, setmdEditOrg,
    } = useContext(SatuSehatOrganizationContext)

    const partOf = '10000060'

    const data = [
        {
            fullUrl: "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Organization/4617a1d4-9360-41f0-857d-be88a07d6bb5",
            resource: {
                active: true,
                address: [
                    {
                        city: "Purwokerto",
                        country: "ID",
                        extension: [
                            {
                                extension: [
                                    {
                                        url: "province",
                                        valueCode: "33"
                                    },
                                    {
                                        url: "city",
                                        valueCode: "3302"
                                    },
                                    {
                                        url: "district",
                                        valueCode: "330224"
                                    },
                                    {
                                        url: "village",
                                        valueCode: "3302241003"
                                    }
                                ],
                                url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode"
                            }
                        ],
                        line: [
                            "Jl. Dr. Gumbreg No.1, Kebontebu, Berkoh, Kec. Purwokerto Selatan, Kab. Banyumas, Jawa Tengah 53146"
                        ],
                        postalCode: "53146",
                        type: "both",
                        use: "work"
                    }
                ],
                id: "4617a1d4-9360-41f0-857d-be88a07d6bb5",
                identifier: [
                    {
                        system: "http://sys-ids.kemkes.go.id/organization/10000060",
                        use: "official",
                        value: "RSMSSO0010"
                    }
                ],
                meta: {
                    lastUpdated: "2022-11-14T04:05:28.255608+00:00",
                    profile: [
                        "https://fhir.kemkes.go.id/r4/StructureDefinition/Organization|4.0.1"
                    ],
                    versionId: "MTY2ODM5ODcyODI1NTYwODAwMA"
                },
                name: "WADIR UMUM DAN KEUANGAN",
                partOf: {
                    reference: "Organization/10000060"
                },
                resourceType: "Organization",
                telecom: [
                    {
                        system: "phone",
                        use: "work",
                        value: "0281 - 632708"
                    },
                    {
                        system: "email",
                        use: "work",
                        value: "rsmargono@jatengprov.go.id"
                    },
                    {
                        system: "url",
                        use: "work",
                        value: "rsmargono.go.id"
                    }
                ],
                type: [
                    {
                        coding: [
                            {
                                code: "dept",
                                display: "Hospital Department",
                                system: "http://terminology.hl7.org/CodeSystem/organization-type"
                            }
                        ]
                    }
                ]
            },
            search: {
                mode: "match"
            }
        },
        {
            fullUrl: "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Organization/2f0ce486-27bd-4850-8acf-909f7d96f029",
            resource: {
                active: true,
                address: [
                    {
                        city: "Purwokerto",
                        country: "ID",
                        extension: [
                            {
                                extension: [
                                    {
                                        url: "province",
                                        valueCode: "33"
                                    },
                                    {
                                        url: "city",
                                        valueCode: "3302"
                                    },
                                    {
                                        url: "district",
                                        valueCode: "330224"
                                    },
                                    {
                                        url: "village",
                                        valueCode: "3302241003"
                                    }
                                ],
                                url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode"
                            }
                        ],
                        line: [
                            "Jl. Dr. Gumbreg No.1, Kebontebu, Berkoh, Kec. Purwokerto Selatan, Kab. Banyumas, Jawa Tengah 53146"
                        ],
                        postalCode: "53146",
                        type: "both",
                        use: "work"
                    }
                ],
                id: "2f0ce486-27bd-4850-8acf-909f7d96f029",
                identifier: [
                    {
                        system: "http://sys-ids.kemkes.go.id/organization/10000060",
                        use: "official",
                        value: "RSMSSO0010"
                    }
                ],
                meta: {
                    lastUpdated: "2022-11-14T04:03:45.875437+00:00",
                    profile: [
                        "https://fhir.kemkes.go.id/r4/StructureDefinition/Organization|4.0.1"
                    ],
                    versionId: "MTY2ODM5ODYyNTg3NTQzNzAwMA"
                },
                name: "WADIR PENUNJANG DAN PENDIDIKAN",
                partOf: {
                    reference: "Organization/10000060"
                },
                resourceType: "Organization",
                telecom: [
                    {
                        system: "phone",
                        use: "work",
                        value: "0281 - 632708"
                    },
                    {
                        system: "email",
                        use: "work",
                        value: "rsmargono@jatengprov.go.id"
                    },
                    {
                        system: "url",
                        use: "work",
                        value: "rsmargono.go.id"
                    }
                ],
                type: [
                    {
                        coding: [
                            {
                                code: "dept",
                                display: "Hospital Department",
                                system: "http://terminology.hl7.org/CodeSystem/organization-type"
                            }
                        ]
                    }
                ]
            },
            search: {
                mode: "match"
            }
        },
        {
            fullUrl: "https://api-satusehat-dev.dto.kemkes.go.id/fhir-r4/v1/Organization/180c89a8-7086-44be-a530-d68e207d0a3f",
            resource: {
                active: true,
                address: [
                    {
                        city: "Purwokerto",
                        country: "ID",
                        extension: [
                            {
                                extension: [
                                    {
                                        url: "province",
                                        valueCode: "33"
                                    },
                                    {
                                        url: "city",
                                        valueCode: "3302"
                                    },
                                    {
                                        url: "district",
                                        valueCode: "330224"
                                    },
                                    {
                                        url: "village",
                                        valueCode: "3302241003"
                                    }
                                ],
                                url: "https://fhir.kemkes.go.id/r4/StructureDefinition/administrativeCode"
                            }
                        ],
                        line: [
                            "Jl. Dr. Gumbreg No.1, Kebontebu, Berkoh, Kec. Purwokerto Selatan, Kab. Banyumas, Jawa Tengah 53146"
                        ],
                        postalCode: "53146",
                        type: "both",
                        use: "work"
                    }
                ],
                id: "180c89a8-7086-44be-a530-d68e207d0a3f",
                identifier: [
                    {
                        system: "http://sys-ids.kemkes.go.id/organization/10000060",
                        use: "official",
                        value: "RSMSSO0010"
                    }
                ],
                meta: {
                    lastUpdated: "2022-11-14T03:57:44.770774+00:00",
                    profile: [
                        "https://fhir.kemkes.go.id/r4/StructureDefinition/Organization|4.0.1"
                    ],
                    versionId: "MTY2ODM5ODI2NDc3MDc3NDAwMA"
                },
                name: "WADIR PELAYANAN DAN KERJASAMA",
                partOf: {
                    reference: "Organization/10000060"
                },
                resourceType: "Organization",
                telecom: [
                    {
                        system: "phone",
                        use: "work",
                        value: "0281 - 632708"
                    },
                    {
                        system: "email",
                        use: "work",
                        value: "rsmargono@jatengprov.go.id"
                    },
                    {
                        system: "url",
                        use: "work",
                        value: "rsmargono.go.id"
                    }
                ],
                type: [
                    {
                        coding: [
                            {
                                code: "dept",
                                display: "Hospital Department",
                                system: "http://terminology.hl7.org/CodeSystem/organization-type"
                            }
                        ]
                    }
                ]
            },
            search: {
                mode: "match"
            }
        }
    ]

    const columns = [
        {
            title: 'Nama',
            dataIndex: 'resourcename',
            key: 'resourcename',
            ellipsis: true,
        },
        {
            title: 'Status Aktif',
            dataIndex: 'resourceactive',
            key: 'resourceactive',
            ellipsis: true,
            render: text => <div>{text ? 'Ya' : 'Tidak'}</div>,
        },
        {
            title: 'Alamat',
            dataIndex: 'resourceaddress',
            key: 'resourceaddress',
            ellipsis: true,
        },
        {
            title: 'Id Resource',
            dataIndex: 'resourceid',
            key: 'resourceid',
            ellipsis: true,
        },
        {
            title: 'Id Internal',
            dataIndex: 'resourceidentvalue',
            key: 'resourceidentvalue',
            ellipsis: true,
        },
        {
            title: 'Tipe',
            dataIndex: 'resourcetype',
            key: 'resourcetype',
            ellipsis: true,
        },
        {
            title: 'Last Updated',
            dataIndex: 'resourceupdate',
            key: 'resourceupdate',
            ellipsis: true,
            render: (text) => <div>{dayjs(text).format('DD/MM/YYYY HH:mm')}</div>,
        },
        {
            title: 'Part of',
            dataIndex: 'resourcepartof',
            key: 'resourcepartof',
            ellipsis: true,
        },
        {
            title: 'Telepon',
            dataIndex: 'resourcetelephone',
            key: 'resourcetelephone',
            ellipsis: true,
        },
        {
            title: 'Email',
            dataIndex: 'resourceteleemail',
            key: 'resourceteleemail',
            ellipsis: true,
        },
        {
            title: 'Website',
            dataIndex: 'resourceteleurl',
            key: 'resourceteleurl',
            ellipsis: true,
        },
        {
            title: 'Aksi',
            key: 'operation',
            fixed: 'right',
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        onClick={() => klikEdit(index)}
                        icon={<EditOutlined />}
                        size='small'
                        style={{ width: '25px' }}
                    />
                    <Button
                        type='primary'
                        onClick={() => klikSimpanDb(record)}
                        icon={<SaveOutlined />}
                        size='small'
                        style={{ width: '25px', marginLeft: '2px' }}
                    />
                </div>
        },
    ];

    const columnsa = [
        {
            title: 'No',
            dataIndex: 'id',
            key: 'id',
            width: 30,
            render: (text, record, index) => <div>{index + 1}</div>,
        },
        {
            title: 'Id Resource',
            dataIndex: 'id',
            key: 'id',
            // ellipsis: true,
            width: 'auto',
        },
        {
            title: 'Nama',
            dataIndex: 'name',
            key: 'name',
            // ellipsis: true,
            width: 'auto',
        },
        {
            title: 'Aktif',
            dataIndex: 'active',
            key: 'active',
            // ellipsis: true,
            width: 50,
            render: (text, record) => (
                <div style={{ color: record.active ? 'green' : 'red' }}>{text ? 'Ya' : 'Tidak'}</div>
            ),
        },
        {
            title: 'Part of',
            dataIndex: 'partOfName',
            key: 'partOfName',
            // ellipsis: true,
            width: 'auto',
        },
        {
            title: 'Alamat',
            dataIndex: 'address',
            key: 'address',
            // ellipsis: true,
            width: 'auto',
        },
        {
            title: 'Id Internal',
            dataIndex: 'value',
            key: 'value',
            // ellipsis: true,
            width: 'auto',
        },
        {
            title: 'Tipe',
            dataIndex: 'typeName',
            key: 'typeName',
            // ellipsis: true,
            width: 'auto',
        },
        {
            title: 'Last Updated',
            dataIndex: 'lastUpdate',
            key: 'lastUpdate',
            // ellipsis: true,
            width: 'auto',
            render: (text) => <div>{dayjs(text).format('DD/MM/YYYY HH:mm')}</div>,
        },
        {
            title: 'Telepon',
            dataIndex: 'phone',
            key: 'phone',
            // ellipsis: true,
            width: 'auto',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            // ellipsis: true,
            width: 'auto',
        },
        {
            title: 'Website',
            dataIndex: 'url',
            key: 'url',
            // ellipsis: true,
            width: 'auto',
        },
        {
            title: 'Aksi',
            key: 'operation',
            align: 'center',
            fixed: 'right',
            width: 65,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        onClick={() => klikEdit(record)}
                        icon={<EditOutlined />}
                        size='small'
                        style={{ width: '25px' }}
                    />
                    {/* <Button
                        type='primary'
                        // onClick={() => klikSimpanDb(record)}
                        icon={<SaveOutlined />}
                        size='small'
                        style={{ width: '25px', marginLeft: '2px' }}
                    /> */}
                </div>
        },
    ];

    const getList = (data) => {
        getOrganization(data)
    }

    const klikResetGetPartOf = () => {
        setOrgPartOfGet('10000060')
        setOrgListGetPartOf([
            {
                resourceid: '10000060',
                resourcename: 'RSUD Prof. Dr. Margono Soekarjo Purwokerto'
            }
        ])
    }

    const klikCreateOrg = () => {
        setmdCreateOrg(true)

        setOrgIdentValue('')
        setOrgIdentActive('')
        setOrgType('')
        setOrgName('')
        setOrgPartOf('')
    }

    const klikEdit = (data) => {
        setmdEditOrg(true)
        console.log('klikEdit : ', data);

        setOrgEditId(data.id)
        setOrgIdentValue(data.value)
        setOrgIdentActive(data.active)
        setOrgName(data.name)
        setOrgPartOf(data.partOf)
        // setmdEditOrg(true)

        // let temp = OrgListPartOf[data]

        // console.log('temp : ', temp);
        // setOrgEditId(temp.resourceid)
        // setOrgIdentValue(temp.resourceidentvalue)
        // setOrgIdentActive(temp.resourceactive)
        // setOrgName(temp.resourcename)
        // setOrgPartOf(temp.resourcepartof)
    }

    const klikSimpanDb = (record) => {
        console.log('record : ', record);

        let data = {}
        data.id = record.resourceid;
        data.system = '10000060';
        data.value = record.resourceidentvalue;
        data.active = record.resourceactive;
        data.type = record.resourcetypecode;
        data.name = record.resourcename;
        data.partOf = record.resourcepartof;
        data.phone = record.resourcetelephone;
        data.email = record.resourceteleemail;
        data.url = record.resourceteleurl;
        data.address = record.resourceaddress;
        data.lastUpdate = dayjs(record.resourceupdate).format('YYYY-MM-DDTHH:mm:ss');
        data.clientHost = ipKomp;
        data.clientIP = hostKomp;

        console.log('data : ', data);
        simpanOrgDb(data);
    }

    return (
        <div>
            <Card
                title='Master Organization'
                // size='small'
                headStyle={{ backgroundColor: '#36cfc9' }}
                style={{ marginTop: '5px' }}>
                <Row>
                    <Col span={12}>
                        {/* <Button
                            onClick={() => SatuSehatGetToken()}
                            type='primary'
                            style={{ marginRight: '5px', width: '150px' }}>
                            GET TOKEN
                        </Button> */}
                        <Button
                            onClick={() => klikCreateOrg()}
                            // disabled={!SSToken ? true : false}
                            type='primary'
                            icon={<PlusOutlined />}
                            style={{ width: '150px' }}
                        >
                            Tambah
                        </Button>
                    </Col>
                </Row>
                <hr />

                <Table
                    bordered
                    loading={spGetOrganization}
                    columns={columnsa}
                    dataSource={listOrg}
                    size='small'
                    scroll={{ x: 1500, y: 430 }}
                    pagination={false}
                />

                <hr />

                {/* Data dari SatuSehat
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={3}>
                        <Button
                            onClick={() => getList(OrgPartOfGet)}
                            disabled={!SSToken ? true : false}
                            type='primary'
                            style={{ width: '150px' }}>
                            GET LIST
                        </Button>
                    </Col>
                    <Col span={9}>
                        <Input.Group compact>
                            <Select
                                value={OrgPartOfGet}
                                onChange={(e) => setOrgPartOfGet(e)}
                                // onFocus={() => getLoadDokter('1,2', '9404')}
                                // size='small'
                                style={{ width: '90%', marginLeft: '2px' }}>
                                {OrgListGetPartOf.map((item, index) => (
                                    <Option key={index} value={item.resourceid}>{item.resourcename}</Option>
                                ))}
                            </Select>
                            <Tooltip title='klik disini untuk RESET.'>
                                <Button
                                    onClick={() => klikResetGetPartOf()}
                                    type="primary"
                                // size="small"
                                >
                                    <SyncOutlined />
                                </Button>
                            </Tooltip>
                        </Input.Group>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Table
                            bordered
                            loading={spGetOrganization}
                            columns={columns}
                            dataSource={OrgListPartOf}
                            size='small'
                        />
                    </Col>
                </Row> */}

            </Card>

            <Modal
                visible={mdCreateOrg}
                onCancel={() => setmdCreateOrg(false)}
                width={1200}
                centered
                footer={null}
            // style={{ top: 20 }}
            >
                <SSPostOrganization />
            </Modal>

            <Modal
                visible={mdEditOrg}
                onCancel={() => setmdEditOrg(false)}
                width={1200}
                centered
                footer={null}
            // style={{ top: 20 }}
            >
                <SSEditOrganization />
            </Modal>
        </div>
    )
}

export default SSListOrganization