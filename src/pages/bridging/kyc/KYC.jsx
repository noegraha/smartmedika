import { Button, Card } from "antd";
import React from "react";
import Iframe from "react-iframe";
const KYC = () => {
  const OpenNewTabButton = ({ url, label }) => {
    const handleClick = () => {
      window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
      <Button type="primary" onClick={handleClick}>
        {label}
      </Button>
    );
  };
  return (
    <div>
      <Card
        title="Verifikasi KYC Satu Sehat"
        style={{ margin: "20px", borderRadius: "8px" }}
        bordered
      >
        <OpenNewTabButton
          url="http://172.16.99.119:8080/"
          label="Buka Login Verifikator"
        />
        <Iframe
          src="https://api-satusehat.kemkes.go.id/kyc/v1/validation-web/a8ce6b17-be18-44a1-8011-7a9c474fc5a2"
          title="Iframe Example"
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Card>
    </div>
  );
};

export default KYC;
