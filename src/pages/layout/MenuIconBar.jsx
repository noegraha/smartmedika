import { Card } from "antd";
import React from "react";
import {
  HomeTwoTone,
  FileTwoTone,
  AppstoreTwoTone,
  DatabaseTwoTone,
  ReconciliationTwoTone,
  ProjectTwoTone,
  ProfileTwoTone,
  FolderOpenTwoTone,
  InteractionTwoTone,
  SettingTwoTone,
} from "@ant-design/icons";
import { Link, Route } from "react-router-dom";
import { StickyContainer } from "react-sticky";
import LaporanPRB from "../laporan/LaporanPRB";
import DashboardAntrol from "../laporan/DashboardAntrol/DashboardAntrol";
const gridStyle = {
  width: "10%",
  textAlign: "center",
  fontSize: "300%",
};
const MenuIconBar = () => {
  return (
    <div>
      <Card size="small" style={{ cursor: "pointer" }}>
        <Link to="/app/iconbar/1" style={gridStyle}>
          <Card.Grid style={{ width: "100%" }}>
            <HomeTwoTone />
          </Card.Grid>
        </Link>
        <Link to="/app/iconbar/2" style={gridStyle}>
          <Card.Grid style={{ width: "100%" }}>
            <FileTwoTone />
          </Card.Grid>
        </Link>
        <Card.Grid style={gridStyle}>
          <AppstoreTwoTone />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <DatabaseTwoTone />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <ReconciliationTwoTone />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <ProjectTwoTone />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <ProfileTwoTone />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <FolderOpenTwoTone />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <InteractionTwoTone />
        </Card.Grid>
        <Card.Grid style={gridStyle}>
          <SettingTwoTone />
        </Card.Grid>
      </Card>
      <StickyContainer>
        <Route path="/app/iconbar/1" exact>
          <LaporanPRB />
        </Route>
        <Route path="/app/iconbar/2" exact>
          <DashboardAntrol />
        </Route>
      </StickyContainer>
    </div>
  );
};

export default MenuIconBar;
