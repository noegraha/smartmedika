import React, { useContext, useState } from "react";
import { Modal, Button } from "antd";
import FormGeneralConsent from "./FormGeneralConsent";
import { PasienContext } from "../context/PasienContext";

const ButtonGeneralConsent = () => {
  const { getPasienDetail } = useContext(PasienContext);
  const [modal1Visible, setModal1Visible] = useState(false);
  const pasienid = sessionStorage.getItem("norm");
  return (
    <div>
      <Button size="small" onClick={() => setModal1Visible(true)}>
        General Consent
      </Button>
      <Modal
        closable={false}
        footer={null}
        width="800px"
        centered={true}
        visible={modal1Visible}
        onCancel={() => setModal1Visible(false)}
      >
        <FormGeneralConsent />
      </Modal>
    </div>
  );
};

export default ButtonGeneralConsent;
