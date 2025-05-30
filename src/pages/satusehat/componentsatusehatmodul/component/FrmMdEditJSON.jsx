import { Input, Modal } from 'antd';
import React, { useContext } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';

const { TextArea } = Input;

const FrmMdEditJSON = () => {
    const {
        JSONPost, setJSONPost,
        mdEditJSON, setmdEditJSON,

        postResource,
    } = useContext(SatuSehatModulContext);

    return (
        <div>
            <Modal
                visible={mdEditJSON}
                onCancel={() => setmdEditJSON(false)}
                onOk={() => {
                    let data = JSON.parse(JSONPost);
                    postResource(data, 'Encounter', '5');
                    console.log('editJSON : ', data);
                }
                }
                title="Edit JSON"
                okText='Kirim Ulang...'
                width={750}
                // footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <TextArea
                    rows={15}
                    value={JSONPost}
                    onChange={(e) => setJSONPost(e.target.value)}
                />
            </Modal>
        </div>
    )
}

export default FrmMdEditJSON