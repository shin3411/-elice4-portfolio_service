import React from "react";
import CertificateCard from "./CertificateCard";

const Certificate = ({ isEditable, certificateList, setCertificateList }) => {
  return (
    <>
      {certificateList.map((certificate) => (
        <CertificateCard
          key={certificate._id}
          certificate={certificate}
          isEditable={isEditable}
          setCertificateList={setCertificateList}
        />
      ))}
    </>
  );
};

export default Certificate;
