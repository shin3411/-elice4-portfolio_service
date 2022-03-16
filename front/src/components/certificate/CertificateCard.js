import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm";

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
            <div class="text-muted">{certificate.description}</div>
            <div class="text-muted">{certificate.when_date}</div>
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
