import React, { useContext } from "react";
import { Card, Tabs } from "antd";
import Poligigiumum from "./poligigiumum";
import Poligigiortho from "./poligigiortho";
import Poligigianak from "./poligigianak";
// import { PasienContext } from "../../context/PasienContext";
import Odontogram from "./Components/Odontogram";
import { LoginContext } from "../../context";
const { TabPane } = Tabs;
const Poligigi = () => {
  // const { curpas } = useContext(PasienContext);
  const { namauser } = useContext(LoginContext);
  return (
    <div>
      <Tabs defaultActiveKey="1" tabPosition="left" type="card">
        <TabPane tab="Gigi Umum" key="1">
          <Card size="small">
            <Poligigiumum />
          </Card>
        </TabPane>
        <TabPane tab="Gigi Anak" key="4">
          <Card size="small">
            <Poligigianak />
          </Card>
        </TabPane>
        <TabPane tab="Orthodonti" key="2">
          <Card size="small">
            <Poligigiortho />
          </Card>
        </TabPane>
        {namauser === "NUGRAHA" ? (
          <TabPane tab="Odontogram" key="3">
            <Card size="small">
              <Odontogram />
            </Card>
          </TabPane>
        ) : null}
      </Tabs>
    </div>
  );
};

export default Poligigi;
