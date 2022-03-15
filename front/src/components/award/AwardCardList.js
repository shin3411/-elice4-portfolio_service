import { useState } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";

const AwardCardList = ({ setIsEditing, isEditable }) => {
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <div>수상이력</div>
          <div>{isEditable}</div>
        </Row>
        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
};

export default AwardCardList;
