import React from 'react';
import {
    Card,
} from 'antd';
import IntraHd from './IntraHd';
import PostHd from './PostHd';

function MonitoringDialisis() {
    return (
        <div>
            <Card
                style={{
                    marginBottom: "8px",
                    backgroundColor: "#e6fffb"
                }} >
                <IntraHd />
                <PostHd />
            </Card>
        </div>
    )
}

export default MonitoringDialisis
