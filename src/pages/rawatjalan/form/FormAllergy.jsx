import React from "react";
import { useState } from "react";
import { Button, Modal, Select, Form, Input } from "antd";
import { AlergiContext } from "../context/AlergiContext";
import { useContext } from "react";
import { PasienContext } from "../context/PasienContext";
import Draggable from "react-draggable";
import { PlusOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const draggleRef = React.createRef();

const FormAllergy = () => {
  const [visible, setVisible] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const [clinicalStatus, setClinicalStatus] = useState("");
  const [verificationStatus, setVerification] = useState("");
  const [type, setType] = useState("");
  const [categori, setCategori] = useState("");
  const [criticality, setCriticality] = useState("");
  // const [code, setCode] = useState('');
  const [encounter, setEncounter] = useState("");
  const [note, setNote] = useState("");
  const [substance, setSubstance] = useState("");
  const [reaction, setReaction] = useState("");
  const {
    allergycategory,
    // allergyclinicalfindings,
    allergyclinicalstatus,
    allergycritical,
    allergyreaction,
    // allergyroute,
    allergysubtance,
    allergytype,
    allergyverification,
    insertAllergy,
    getMasterAllergy,
  } = useContext(AlergiContext);
  const { curpas } = useContext(PasienContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const dataalergi = [
    {
      pasienId: curpas.pasienId,
      clinicalStatus: clinicalStatus,
      verificationStatus: verificationStatus,
      type: type,
      categori: categori,
      criticality: criticality,
      code: substance,
      registrasiId: curpas.registrasiId,
      encounter: encounter,
      note: note,
      reaction: reaction,
      clientHost: host,
      clientIp: ip,
    },
  ];
  const showModal = () => {
    setVisible(true);
    getMasterAllergy();
  };
  const handleOk = () => {
    setVisible(false);
    insertAllergy(dataalergi);
    console.log(dataalergi);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const onCategory = (e) => {
    setCategori(e);
  };
  const onClinicalS = (e) => {
    setClinicalStatus(e);
  };
  const onCritical = (e) => {
    setCriticality(e);
  };
  const onReaction = (e) => {
    setReaction(e);
  };
  // const onRoute = (e) => {
  //     setCode(e);
  // }
  const onSubstance = (e) => {
    setSubstance(e);
  };
  // const onClinicalF = (e) => {
  //     setAllergy.substance(e);
  // }
  const onEncounter = (e) => {
    setEncounter(e.target.value);
  };
  const onVerification = (e) => {
    setVerification(e);
  };
  const onType = (e) => {
    setType(e);
  };
  const onCatatan = (e) => {
    setNote(e.target.value);
  };
  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };
  return (
    <div>
      <Button
        icon={<PlusOutlined />}
        size="small"
        danger
        type="primary"
        onClick={showModal}
      >
        Tambah Alergi
      </Button>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Form Allergi
          </div>
        }
        centered
        //   title="Form Alergi"
        visible={visible}
        okText="Simpan"
        cancelText="Batal"
        cancelButtonProps={{ danger: true }}
        onOk={handleOk}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Form.Item
          {...formItemLayout}
          label="No. Registrasi"
          style={{ marginBottom: 0 }}
        >
          {curpas.registrasiId}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Category"
          style={{ marginBottom: 0 }}
        >
          <Select
            dataSource={allergycategory}
            showSearch
            style={{ width: "100%" }}
            placeholder="Pilih category..."
            optionFilterProp="children"
            onChange={(e) => onCategory(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {allergycategory.map((d) => (
              <Option key={d.code}>{d.display}</Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item {...formItemLayout} label="Clinical Findings" style={{ marginBottom: 0 }}>
                    <Select
                        dataSource={allergyclinicalfindings}
                        showSearch
                        style={{ width: 250 }}
                        placeholder="Pilih clinical findings..."
                        optionFilterProp="children"
                        onChange={(e) => onClinicalF(e)}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {allergyclinicalfindings.map(d => (
                            <Option key={d.code}>{d.display}</Option>
                        ))}
                    </Select>
                </Form.Item> */}
        <Form.Item
          {...formItemLayout}
          label="Clinical Status"
          style={{ marginBottom: 0 }}
        >
          <Select
            dataSource={allergyclinicalstatus}
            showSearch
            style={{ width: "100%" }}
            placeholder="Pilih clinical status..."
            optionFilterProp="children"
            onChange={(e) => onClinicalS(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {allergyclinicalstatus.map((d) => (
              <Option key={d.code}>{d.display}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Critical"
          style={{ marginBottom: 0 }}
        >
          <Select
            dataSource={allergycritical}
            showSearch
            style={{ width: "100%" }}
            placeholder="Pilih critical..."
            optionFilterProp="children"
            onChange={(e) => onCritical(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {allergycritical.map((d) => (
              <Option key={d.code}>{d.display}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Reaction"
          style={{ marginBottom: 0 }}
        >
          <Select
            dataSource={allergyreaction}
            showSearch
            style={{ width: "100%" }}
            placeholder="Pilih reaction..."
            optionFilterProp="children"
            onChange={(e) => onReaction(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {allergyreaction.map((d) => (
              <Option key={d.code}>{d.display}</Option>
            ))}
          </Select>
        </Form.Item>
        {/* <Form.Item {...formItemLayout} label="Route Codes" style={{ marginBottom: 0 }}>
                    <Select
                        dataSource={allergyroute}
                        showSearch
                        style={{ width: 250 }}
                        placeholder="Pilih route codes..."
                        optionFilterProp="children"
                        onChange={(e) => onRoute(e)}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {allergyroute.map(d => (
                            <Option key={d.code}>{d.display}</Option>
                        ))}
                    </Select>
                </Form.Item> */}
        <Form.Item
          {...formItemLayout}
          label="Substance"
          style={{ marginBottom: 0 }}
        >
          <Select
            dataSource={allergysubtance}
            showSearch
            style={{ width: "100%" }}
            placeholder="Pilih substance..."
            optionFilterProp="children"
            onChange={(e) => onSubstance(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {allergysubtance.map((d) => (
              <Option key={d.code}>{d.display}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item {...formItemLayout} label="Type" style={{ marginBottom: 0 }}>
          <Select
            dataSource={allergytype}
            showSearch
            style={{ width: "100%" }}
            placeholder="Pilih type..."
            optionFilterProp="children"
            onChange={(e) => onType(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {allergytype.map((d) => (
              <Option key={d.code}>{d.display}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Verification"
          style={{ marginBottom: 0 }}
        >
          <Select
            dataSource={allergyverification}
            showSearch
            style={{ width: "100%" }}
            placeholder="Pilih verification..."
            optionFilterProp="children"
            onChange={(e) => onVerification(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {allergyverification.map((d) => (
              <Option key={d.code}>{d.display}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Encounter"
          style={{ marginBottom: 0 }}
        >
          <Input style={{ width: "100%" }} onChange={(e) => onEncounter(e)} />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Catatan"
          style={{ marginBottom: 0 }}
        >
          <TextArea
            style={{ width: "100%" }}
            rows={2}
            onChange={(e) => onCatatan(e)}
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default FormAllergy;
