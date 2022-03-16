import React, { useState, useEffect } from "react";
import CertificateCard from "./CertificateCard";

const Certificate = ({ isEditable, certificateList, setCertificateList }) => {
  console.log(certificateList);
  return (
    <>
      {certificateList.map((certificate) => (
        <CertificateCard
          certificate={certificate}
          isEditable={isEditable}
          setCertificateList={setCertificateList}
        />
      ))}
    </>
  );
};

export default Certificate;
