import { Divider, Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';
import ProtokolKemoContextProvider from './context/ProtokolKemoContext';
import DaftarProtokolKemo from './component/DaftarProtokolKemo';

const ProtokolKemoterapi = () => {
    return (
        <div>
            <ProtokolKemoContextProvider>
                <Layout>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#40A578', margin: '0px', borderTop: '1px solid white' }}>
                        MASTER PROTOKOL KEMOTERAPI
                    </Divider>

                    <DaftarProtokolKemo />
                </Layout>
            </ProtokolKemoContextProvider>
        </div>
    )
}

export default ProtokolKemoterapi