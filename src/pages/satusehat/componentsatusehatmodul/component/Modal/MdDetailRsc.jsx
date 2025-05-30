import { Input, Modal, Spin } from 'antd'
import React, { useContext } from 'react'
import { SatuSehatModulContext } from '../../context/SatuSehatModulContext';

const { TextArea } = Input;

const MdDetailRsc = () => {
    const {
        textResponseById,
        spGetRsc,
        mdRscDetail, setmdRscDetail,
    } = useContext(SatuSehatModulContext);

    return (
        <div>
            <Modal
                visible={mdRscDetail}
                onCancel={() => setmdRscDetail(false)}
                title='Detail Resource SatuSehat by Id'
                width={1000}
                footer={null}
                style={{ top: 50 }}
            >
                <Spin spinning={spGetRsc} tip="Loading... 😁">
                    <TextArea
                        rows={21}
                        readOnly
                        value={textResponseById}
                    // onChange={(e) => setJSONPost(e.target.value)}
                    />
                </Spin>
            </Modal>
        </div>
    )
}

export default MdDetailRsc