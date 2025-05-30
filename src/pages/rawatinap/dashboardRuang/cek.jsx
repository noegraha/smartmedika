import React from 'react'
import { Tree } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const CetTrheeel = () => {
    return (
        <div>
            <Tree
                showLine
                switcherIcon={<DownOutlined />}
                onSelect={(e) => {
                    console.log(e[0]);
                }}
                treeData={[
                    {
                        title: 'Noreg 1',
                        key: 'noreg1',
                        children: [
                            {
                                title: 'tgl 1',
                                key: 'tgl1',
                            },
                            {
                                title: 'tgl 2',
                                key: 'tgl2',
                            },
                            {
                                title: 'tgl 3',
                                key: 'tgl3',
                            },
                        ],
                    },
                    {
                        title: 'Noreg 2',
                        key: 'noreg2',
                        children: [
                            {
                                title: 'tgl 4',
                                key: 'tgl4',
                            },
                        ],
                    },
                ]}
            />
        </div>
    )
}

export default CetTrheeel
