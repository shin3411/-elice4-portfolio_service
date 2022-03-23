import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

const AwardList = ({ award }) => {
  const navigate = useNavigate();

  return (
    <Col xs={7} className="mb-4">
      <Card>
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <Card.Title>{award.title}</Card.Title>
              <Card.Text>{award.description}</Card.Text>
            </Col>
            <Col xs={1}>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/users/${award.user_id}`)}
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

export default AwardList;
