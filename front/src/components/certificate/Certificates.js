import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";
import * as Api from "../../api";

const Certificates = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <Certificate />
        <Row className="text-center">
          <Col>
            <Button variant="primary">+</Button>
          </Col>
        </Row>
        {isAdding ? <CertificateAddForm /> : null}
      </Card.Body>
    </Card>
  );
};

export default Certificates;
