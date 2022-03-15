import { Card, Row, Button, Col } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import { useState } from "react";
import AwardList from "./AwardList";

function AwardCard({ user, setIsEditing, isEditable }) {
  const [add, setAdd] = useState(false);
  const [list, setList] = useState({ award: "", detail: "" });
  return (
    <Card className="mb-2 mr-5">
      <Card.Body>
        <Row className="justify-content-md-center">
          <h5>수상이력</h5>
          <AwardList
            list={list}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
          ></AwardList>
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
                {add ? <AwardAddForm setList={setList} setAdd={setAdd} /> : ""}
              </Col>
            </Row>
          </Col>
        )}
      </Card.Body>
    </Card>
  );
}

export default AwardCard;
