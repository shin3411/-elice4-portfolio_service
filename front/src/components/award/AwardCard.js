import { Card, Row, Button, Col } from "react-bootstrap";
import AwardAddForm from "./AwardAddForm";
import { useState, useEffect } from "react";
import Awards from "./Awards";
import * as Api from "../../api";

//수상이력들이 렌더링되는 부분, 추가 버튼이 있음

function AwardCard({ portfolioOwnerId, isEditable }) {
  const [add, setAdd] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    // "awardlist" 엔드포인트로 GET 요청을 하고, Awards를 response의 data로 세팅함.
    Api.get("awardlist", portfolioOwnerId).then((res) => setList(res.data));
  }, [portfolioOwnerId]);

  return (
    <Col>
      <Card className="mb-2">
        <Card.Body>
          <Card.Title>수상이력</Card.Title>
          {list.map((award) => (
            <Awards
              key={award._id}
              award={award}
              isEditable={isEditable}
              setList={setList}
              list={list}
            ></Awards>
          ))}
          {isEditable && (
            <Row className="mt-3 mb-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => setAdd(true)}
                >
                  +
                </Button>
              </Col>
            </Row>
          )}
          {add && <AwardAddForm setList={setList} setAdd={setAdd} />}
        </Card.Body>
      </Card>
    </Col>
  );
}

export default AwardCard;
