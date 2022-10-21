import React from "react";

function Prevent() {
  return (
    <div
      style={{
        backgroundColor: "black",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <label style={{ color: "white", fontSize: "50px" }} htmlFor="">
        GET OUT{" "}
      </label>
    </div>
  );
}

export default Prevent;
