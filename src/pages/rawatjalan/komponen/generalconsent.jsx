import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const Generalconsent = () => {
    const [modal1Visible, setModal1Visible] = useState(false);

    const setMV = (e) => {
        setModal1Visible(e);
    }
    return (
            <div>
                <Button 
                style={{ background: "coral", borderColor: "coral" }} 
                type="danger" size="small" onClick={() => setMV(true)}>General Consent</Button>
                    <Modal
                        title="General Consent"
                        style={{ top: 5 }}
                        visible={modal1Visible}
                        onOk={() => setMV(false)}
                        onCancel={() => setMV(false)}
                    >

                    </Modal>
            </div>
        );
}

export default Generalconsent;