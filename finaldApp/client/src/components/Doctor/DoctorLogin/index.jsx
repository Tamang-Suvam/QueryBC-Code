import React from "react";
import Login from "./Login";

function DoctorLogin({doctorContract}) {
  return (
    <>
      <Login contract={doctorContract} />
    </>
  );
}

export default DoctorLogin;
