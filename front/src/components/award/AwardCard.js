import { Card, Row, Button, Col } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import { useState } from "react";
import AwardList from "./AwardList";

//수상이력리스트가 렌더링되는 부분, 추가 버튼이 있음
function AwardCard({ isEditable }) {
  const [add, setAdd] = useState(false);
  const [list, setList] = useState([]);
  return (
    <Col>
      <Card>
        <Card.Body>
          <Card.Title>수상이력</Card.Title>
          <AwardList
            list={list}
            isEditable={isEditable}
            setList={setList}
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
