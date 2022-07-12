import { Button, Modal, Typography } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import OtpInput from "react-otp-input";

interface Props {
  visible: any;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const OTPModal: React.FC<Props> = ({ visible, setVisible }) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");
  useEffect(() => {
    setIsError(false);
    setOtp("");
  }, [visible]);
  //   const [visible, setVisible] = useState(false);
  const handleChange = (otp: any) => {
    if (otp != "") {
      setIsError(false);
    }
    setOtp(otp);
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    if (otp == "") {
      setIsError(true);
      setMessageError("Please enter the verification code!");
    } else {
      if (otp.length != 6) {
        setIsError(true);
        setMessageError("Please enter full verification code!");
      } else {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setVisible(false);
        }, 3000);
      }
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <>
        <Modal
          visible={visible}
          // title="Enter verification code"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Submit
            </Button>,
            <Button danger key="back" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
        >
          <Typography.Title
            style={{ margin: "30px 0", textAlign: "center" }}
            level={2}
          >
            Enter verification code{" "}
          </Typography.Title>
          <Typography.Text>
            We have sent a 6-digit verification code to your email!
          </Typography.Text>
          <br />
          <Typography.Text>
            Note**: Code is valid for 2 minutes!
          </Typography.Text>
          <div style={{ marginBottom: "30px", margin: "40px auto" }}>
            <OtpInput
              value={otp}
              onChange={handleChange}
              numInputs={6}
              separator={<span className="otp-span">-</span>}
              inputStyle="input-otp"
            />
          </div>
          {isError && (
            <Typography.Text type="danger" strong>
              {messageError}{" "}
            </Typography.Text>
          )}
        </Modal>
      </>
    </div>
  );
};

export default OTPModal;
