import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm";

// certificate 목록 중 하나를 나타내는 컴포넌트
// 편집 버튼을 누르면 편집폼(CertificateEditForm)이 나타남
const CertificateCard = ({ certificate, isEditable, setCertificateList }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="mb-3">
      <Row>
        {isEditing ? (
          <CertificateEditForm
            certificate={certificate}
            setCertificateList={setCertificateList}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Col>
            <div>{certificate.title}</div>
            <div className="text-muted">{certificate.description}</div>
            <div className="text-muted">
              {certificate.date.substring(0, 10)}
            </div>
          </Col>
        )}

        {isEditable ? (
          <Col xs={1}>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              편집
            </Button>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default CertificateCard;
