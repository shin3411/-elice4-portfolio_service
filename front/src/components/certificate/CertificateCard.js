import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

const CertificateCard = ({ certificate, isEditable, setCertificateList }) => {
  return (
    <div className="mb-3">
      <Row>
        <Col>
          <div>{certificate.title}</div>
          <div class="text-muted">{certificate.description}</div>
          <div class="text-muted">{certificate.when_date}</div>
        </Col>
        {isEditable ? (
          <Col xs={1}>
            <Button variant="outline-info" size="sm">
              편집
            </Button>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default CertificateCard;
