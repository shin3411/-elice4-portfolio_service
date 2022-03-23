import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

const ProjectList = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Col xs={7} className="mb-4">
      <Card>
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <Card.Title>{project.title}</Card.Title>
              <Card.Text>{project.description}</Card.Text>
              <Card.Text className="text-muted">
                {project.fromDate.substring(0, 10)} ~{" "}
                {project.toDate.substring(0, 10)}
              </Card.Text>
            </Col>
            <Col xs={1}>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => navigate(`/users/${project.userId}`)}
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

export default ProjectList;
