import React from "react";
import GrafikHd from "./component/GrafikHd";
import DashboardHdContextProvider from "./context/DashboardHdContext";
import { Card } from "antd";
import GrafikInformConsent from "./component/GrafikInformConsent";
import GrafikAksesVaskuler from "./component/GrafikAksesVaskuler";
import DataPasienbyUser from "./component/DataPasienbyUser";
// import { LoginContext } from "../../rawatjalan/context";

const DashboardHD = () => {
  // const { signOut } = useContext(LoginContext);

  return (
    <div>
      <DashboardHdContextProvider>
        {/* <Button
          onClick={() => signOut()}>
          Logout
        </Button> */}
        <Card
          title="Dashboard Hemodialisis"
          headStyle={{ backgroundColor: "#ef476f", color: "white" }}
        >
          <GrafikHd />
          <div style={{ marginBottom: "5px" }}></div>
          {/* <CekTtvHd />
        <div style={{ marginBottom: '5px' }}></div> */}
          <GrafikAksesVaskuler />
          <div style={{ marginBottom: "5px" }}></div>
          <DataPasienbyUser />
          <div style={{ marginBottom: "5px" }}></div>
          <GrafikInformConsent />
        </Card>
      </DashboardHdContextProvider>
    </div>
  );
};

export default DashboardHD;
