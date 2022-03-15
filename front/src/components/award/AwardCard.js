import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import { useState } from "react";

function AwardCard({ user, setIsEditing, isEditable }) {
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  return (
    <Card className="mb-2 mr-5">
      <Card.Body>
        <Row className="justify-content-md-center">
          <h5>수상이력</h5>
          <div>{isEditable}</div>
        </Row>
        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setAdd(true)}
                >
                  +
                </Button>
                {add ? <AwardAddForm user={user} setAdd={setAdd} /> : ""}
              </Col>
            </Row>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
}

export default AwardCard;
