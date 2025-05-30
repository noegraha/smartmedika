import React, { Fragment, useContext } from 'react';
import { PageHeader, Tag, Space, Card } from 'antd';
import { PasienHDContext } from './context/PasienHDContext';
import DetailPasienHD from './komponen/DetailPasienHD';

const PageheadHD = () => {
    const { curpas } = useContext(PasienHDContext);

    return (
        <Fragment>
            <Card size='small'>
                <PageHeader
                    style={{ border: '1px solid rgb(235, 237, 240)', zIndex: 1, paddingTop: 6, paddingBottom: 6, paddingRight: 6 }}
                    title={curpas.namaPasien}
                    subTitle={curpas.pasienId}
                    tags={<Tag>{curpas.registrasiId}</Tag>}
                    bordered
                    extra={[
                        <Space>
                            <DetailPasienHD />
                        </Space>
                    ]}
                />
            </Card>
        </Fragment >
    );
}

export default PageheadHD;