import React, { useContext } from "react";
import { Result, Button } from "antd";
import { LoginContext } from "../rawatjalan/context";
const SuccessGanti = () => {
  const { signOut } = useContext(LoginContext);
  return (
    <div>
      <Result
        status="success"
        title="Password Berhasil Diganti !"
        subTitle="Silahkan login ulang kembali dengan password baru."
        extra={[
          <Button type="primary" key="console" onClick={() => signOut()}>
            Kembali
          </Button>,
        ]}
      />
      ,
    </div>
  );
};

export default SuccessGanti;
