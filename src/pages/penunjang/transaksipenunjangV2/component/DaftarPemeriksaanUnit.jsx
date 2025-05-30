import React, { useContext, useState, useEffect } from 'react'
import { Space, Select, Input, Table, Row, Col, Button, Tooltip, message, Modal } from 'antd'
import { TransaksiPenunjangContext } from '../context/TransaksiPenunjangContext';
import '../style/styleLookupOrder.css';

const { Option } = Select;

const DaftarPemeriksaanUnit = () => {
    const {
        setmdListPmrUnit,
        listPemeriksaan,
        // main
        listOrderPmr, setListOrderPmr,
        noOrder,
        kodePT,
        unitId,
        kelasRawatId,
        // func
        getListPemeriksaan,
    } = useContext(TransaksiPenunjangContext)

    const [listTabel, setListTabel] = useState([])
    const [srcBy, setSrcBy] = useState('Nama Pemeriksaan')
    const [sSearch, setsSearch] = useState('')
    const [kdPmr, setKdPmr] = useState('')
    const [page, setpage] = useState(1)

    const data = [];
    for (let i = 0; i < 50; i++) {
        data.push({
            key: i,
            kode: 'RDM128',
            pemeriksaan: 'ADMINITRASI PASIEN BARU RAWAT JALAN REGULER',
            klmPmr: 'U',
        });
    }

    const columns = [
        {
            title: 'Kode',
            dataIndex: 'pelayananId',
            key: 'pelayananId',
            align: 'center',
            width: '60px',
            render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        },
        {
            title: 'Pemeriksaan',
            dataIndex: 'deskripsi',
            key: 'deskripsi',
            align: 'center',
            width: '500px',
            render: text => <div style={{ textAlign: 'left' }}>
                <Tooltip
                    title='Klik 2x untuk ambil Pemeriksaan.'>
                    {text}
                </Tooltip>
            </div>,
        },
        {
            title: 'Klm Pmr',
            dataIndex: 'klmPmr',
            key: 'klmPmr',
            align: 'center',
            width: '60px',
        },
    ];

    const changeSearch = (e) => {
        setsSearch(e)
        if (srcBy === 'Kode Pemeriksaan') {
            let temp = listPemeriksaan.filter(a => a.pelayananId.toLowerCase().includes(e.toLowerCase()));
            setListTabel(temp)
        }
        if (srcBy === 'Nama Pemeriksaan') {
            let temp = listPemeriksaan.filter(a => a.deskripsi.toLowerCase().includes(e.toLowerCase()));
            setListTabel(temp)
        }
    }

    const klikDoubleListPmr = (record) => {
        let temp = [...listOrderPmr]

        var aquaticCreatures = temp.filter(function (creature) {
            return creature.pelayananId === record.pelayananId;
        });

        console.log(aquaticCreatures.length);

        if (aquaticCreatures.length === 0) {
            temp.push({
                deskPelayanan: record.deskripsi,
                harga: record.total,
                jumlah: 1,
                noLab: null,
                noOrder: noOrder,
                pelayananId: record.pelayananId,
                pembayaranId: kodePT,
                statusAss: null,
                tipePelayanan: 'B',
                unitId: unitId,
                isCito: record.isCito,
                faktorKali: record.faktorKali,
                jasaSarana: record.jasaSarana,
                jasaPelayanan: record.jasaPelayanan,
            })
            // console.log('temp : ', temp);
            setListOrderPmr(temp)
            Modal.success({
                title: 'Informasi',
                content: `Pemeriksaan dengan kode ${record.pelayananId} berhasil ditambah.`,
            });
        }
        else {
            Modal.warning({
                title: 'Peringatan!',
                content: `Pemeriksaan dengan kode ${record.pelayananId} sudah ada.`,
            });
        }
    }

    const klikRefresh = () => {
        setsSearch('')
        getListPemeriksaan(unitId, kelasRawatId)
    }

    const klikTutup = () => {
        setSrcBy('Nama Pemeriksaan')
        setKdPmr('')
        setsSearch('')
        setpage(1)
        setmdListPmrUnit(false)
    }

    useEffect(() => {
        setListTabel(listPemeriksaan)
    }, [listPemeriksaan])

    return (
        <div>
            <Space style={{ marginBottom: '5px' }}>
                <Select
                    // dataSource={penunjang}
                    value={srcBy}
                    onChange={(e) => setSrcBy(e)}
                    // showSearch
                    defaultValue='Nama Pemeriksaan'
                    style={{ width: '150px' }}
                    placeholder="Pemeriksa"
                    optionFilterProp="children"
                    size='small'
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option key='Kode Pemeriksaan' value='Kode Pemeriksaan'>Kode Pemeriksaan</Option>
                    <Option key='Nama Pemeriksaan' value='Nama Pemeriksaan'>Nama Pemeriksaan</Option>
                </Select>
                <Input
                    value={sSearch}
                    onChange={(e) => changeSearch(e.target.value)}
                    placeholder='...'
                    size='small'
                    style={{ width: '410px' }} />
            </Space>
            <Tooltip
                title='Klik 2x untuk ambil Pemeriksaan.'>
                <Table
                    dataSource={listTabel}
                    columns={columns}
                    // loading={spinLookupOrder}
                    onRow={(record) => {
                        return {
                            onDoubleClick: () => {
                                // setNoOrder(record.NoOrder);
                                klikDoubleListPmr(record)
                            },
                            onClick: () => {
                                setKdPmr(record.pelayananId)
                            }
                        };
                    }}
                    rowClassName={(record) => (
                        record.pelayananId === kdPmr ? "greena" : "non-green"
                    )}
                    className='RCM_two_level_table1'
                    bordered
                    pagination={{
                        size: 'small',
                        pageSize: 100,
                        showSizeChanger: false,
                        current: page,
                        onChange: pageNum => {
                            setpage(pageNum)
                        },
                    }}
                    size='small'
                    scroll={{ x: 600, y: 370 }}
                    style={{ height: '400px' }} />
                <hr
                    style={{
                        color: 'black',
                        backgroundColor: 'black',
                        height: 1
                    }}
                />
            </Tooltip>
            <Row style={{ marginTop: '5px' }}>
                <Col>
                    {/* <Button size='small' style={{ width: '100px', backgroundColor: '#bae7ff' }}>
                        ASKES
                    </Button>
                    <Button size='small' style={{ width: '100px' }}>
                        UMUM
                    </Button> */}
                    <Space>
                        <Button
                            onClick={() => klikTutup(false)}
                            style={{ width: '80px' }}>
                            Tutup
                        </Button>
                        <Button
                            onClick={() => klikRefresh()}
                            style={{ width: '80px', backgroundColor: '#52c41a', color: 'white' }}>
                            Refresh
                        </Button>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}

export default DaftarPemeriksaanUnit
