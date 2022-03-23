import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

const EducationList = ({ education }) => {
  const navigate = useNavigate();

  return (
    <Col xs={7} className="mb-4">
      <Card>
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <Card.Title>{education.school}</Card.Title>
              <Card.Text>
                {education.major}({education.position})
              </Card.Text>
            </Col>
            <Col xs={1}>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/users/${education.userId}`)}
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

export default EducationList;
