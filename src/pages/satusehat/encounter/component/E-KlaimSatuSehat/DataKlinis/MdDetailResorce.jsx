import { Input, Modal, Spin } from 'antd';
import React, { useContext } from 'react';
import { SatuSehatEncounterContext } from '../../../context/SatuSehatEncounterContext';

const { TextArea } = Input;

const MdDetailResorce = () => {
    const {
        textResponseById,

        spGetRsc,

        msRscdetail, setmsRscdetail,
    } = useContext(SatuSehatEncounterContext);

    return (
        <div>
            <Modal
                visible={msRscdetail}
                onCancel={() => setmsRscdetail(false)}
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

export default MdDetailResorce