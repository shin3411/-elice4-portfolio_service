import React from "react";
import CertificateCard from "./CertificateCard";

// certificate 목록을 담는 컴포넌트
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
