import React from 'react'
import { useForm } from '../context/FormContext';
import axios from 'axios';
import { Alert, Button, Col, List, Row, Spin, Table } from 'antd';

const DataDisplay = () => {
    const {
        state,
        dispatch,
        ws,
        optToken,
    } = useForm();

    const columns = [
        {
            title: 'Id',
            dataIndex: 'dokterId',
            key: 'dokterId',
        },
        {
            title: 'Nama',
            dataIndex: 'namaDokter',
            key: 'namaDokter',
        },
        {
            title: 'Ruangan',
            dataIndex: 'deskripsi',
            key: 'deskripsi',
        }
    ];

    const fetchData = async () => {
        try {
            dispatch({ type: 'FETCH_START' });
            const response = await axios.get(`${ws}/MstDokterSpesialisDetail/LookupPerawat/%20`, optToken);
            console.log(response.data); // Menampilkan hasil di console
            dispatch({ type: 'FETCH_SUCCESS', payload: response.data.result });
        } catch (error) {
            dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
    };

    // if (state.api.loading) return <Spin tip="Memuat data..." />;

    if (state.api.error) return (
        <Alert
            message="Error"
            description={state.api.error}
            type="error"
            action={
                <Button size="small" onClick={fetchData}>
                    Coba Lagi
                </Button>
            }
        />
    );

    return (
        <>
            <Spin spinning={state.api.loading} tip="Memuat data...">
                <Row style={{ marginTop: 20, marginBottom: 5 }}>
                    <Col span={24}>
                        <Button
                            type='primary'
                            onClick={() => fetchData()}>
                            Ambil Data
                        </Button>
                    </Col>
                </Row>
                {/* <Row>
                <Col span={24}>
                    <h3>Data dari API:</h3>
                    <List
                        bordered
                        dataSource={state.api.data}
                        renderItem={item => (
                            <List.Item>
                                {item.id} - {item.thumbnailUrl} - {item.title}
                            </List.Item>
                        )}
                    />
                </Col>
            </Row> */}

                <Table
                    columns={columns}
                    dataSource={state.api.data}
                // pagination={false}
                />

            </Spin>
        </>
    )
}

export default DataDisplay