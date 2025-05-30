import React, { Component } from 'react';
import { Modal, 
    Button, 
    // Input, 
    // Row, 
    // Col, 
    // Radio, 
    Card
    } from 'antd';
import Cariprosedur from './Cariprosedur';

class Buttonprosedur extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    state = {
        value: 1,
    };

    onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    };
    render() {
        return (
            <div>
                <Button type="primary" size="small" onClick={this.showModal}>
                    Tambah Prosedur
                </Button>
                <Modal
                    width="1200px"
                    title="Procedures (ICD9)"
                    visible={this.state.visible}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Tutup
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Ambil
                        </Button>,
                    ]}
                >
                    <Card>
                         <Cariprosedur/>
                    </Card>
                </Modal>
            </div>
        );
    }
}

export default Buttonprosedur;