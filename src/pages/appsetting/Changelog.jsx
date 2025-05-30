import { Card, Col, Row, Statistic, Timeline, Typography } from "antd";
import React from "react";
const { Title, Text, Paragraph } = Typography;
const Changelog = () => {
  // var OS = "Unknown";
  // if (navigator.userAgent.indexOf("Win") != -1) OS = "Windows";
  // if (navigator.userAgent.indexOf("Mac") != -1) OS = "MacOS";
  // if (navigator.userAgent.indexOf("X11") != -1) OS = "UNIX";
  // if (navigator.userAgent.indexOf("Linux") != -1) OS = "Linux";

  // let userAgent = navigator.userAgent;
  // let browserName;

  // if (userAgent.match(/chrome|chromium|crios/i)) {
  //   browserName = "Chrome";
  // } else if (userAgent.match(/firefox|fxios/i)) {
  //   browserName = "Firefox";
  // } else if (userAgent.match(/safari/i)) {
  //   browserName = "Safari";
  // } else if (userAgent.match(/opr\//i)) {
  //   browserName = "Opera";
  // } else if (userAgent.match(/edg/i)) {
  //   browserName = "Edge";
  // } else {
  //   browserName = "No browser detection";
  // }

  return (
    <div style={{ margin: 20 }}>
      {/* <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic
              title="OS"
              value={OS}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic
              title="Browser"
              value={browserName}
              valueStyle={{
                color: "#cf1322",
              }}
            />
          </Card>
        </Col>
      </Row> */}

      <Timeline>
        <Timeline.Item color="red">
          <Title level={3}>V 3.0.1</Title>
          <Text code>2022-12-31</Text>
          <br />
          Create a services site 2022-12-31
          <Paragraph>
            <ul>
              <li>🐞 RME Kemoterapi</li>
            </ul>
          </Paragraph>
        </Timeline.Item>
        <Timeline.Item color="red">
          <Title level={3}>V 3.0.0</Title>
          <Text code>2022-12-31</Text>
          <br />
          Create a services site 2022-12-31
          <button onClick={() => window.location.reload()}>Refresh Page</button>
          <Paragraph>
            <ul>
              <li>🆕 RME Kemoterapi</li>
              <li>🆕 RME Radioterapi</li>
              <li>🆕 Resume Medis Rawat Jalan</li>
            </ul>
          </Paragraph>
        </Timeline.Item>
      </Timeline>
    </div>
  );
};

export default Changelog;
