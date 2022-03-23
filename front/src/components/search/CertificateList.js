import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

const CertificateList = ({ certificate }) => {
  const navigate = useNavigate();

  return (
    <Col xs={7} className="mb-4">
      <Card>
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <Card.Title>{certificate.title}</Card.Title>
              <Card.Text>{certificate.description}</Card.Text>
              <Card.Text className="text-muted">
                {certificate.date.substring(0, 10)}
              </Card.Text>
            </Col>
            <Col xs={1}>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/users/${certificate.user_id}`)}
              >
                ➡
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default CertificateList;
