import { Card, Row, Button, Col } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import { useState } from "react";
import AwardList from "./AwardList";

function AwardCard({ user, setIsEditing, isEditable }) {
  const [add, setAdd] = useState(false);
  const [list, setList] = useState([]);
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>수상이력</Card.Title>
          <AwardList
            list={list}
            setIsEditing={setIsEditing}
            isEditable={isEditable}
          ></AwardList>
          {isEditable && (
            <Row className="mt-3 mb-4 text-center text-info">
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
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AwardCard;
