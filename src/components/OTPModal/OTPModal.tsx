import { Button, Modal } from "antd";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

interface Props {
  visible: any;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const OTPModal: React.FC<Props> = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  //   const [visible, setVisible] = useState(false);
  const handleChange = (otp: any) => {
    console.log(otp);
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <>
        <Button type="primary" onClick={showModal}>
          Open Modal with customized footer
        </Button>
        <Modal
          visible={visible}
          title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Submit
            </Button>,
            <Button
              key="link"
              href="https://google.com"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Search on Google
            </Button>,
          ]}
        >
          <OtpInput
            value={"1"}
            onChange={handleChange}
            numInputs={6}
            separator={<span>-</span>}
          />
        </Modal>
      </>
    </div>
  );
};

export default OTPModal;
