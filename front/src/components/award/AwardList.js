import { Card, Button, Row, Col, Container } from "react-bootstrap";

const AwardList = ({ list, setIsEditing, isEditable }) => {
  console.log(list);
  return (
    <>
      {list.award && list.detail ? (
        <Card.Text>
          <Row className="align-items-center">
            <Col>
              <span>{list.award}</span>
              <br></br>
              <span className="text-muted">{list.detail}</span>
            </Col>
            <Col>
              <Button className="mr-3" variant="outline-info" size="sm">
                편집
              </Button>
            </Col>
          </Row>
        </Card.Text>
      ) : (
        ""
      )}
    </>
  );
};

export default AwardList;
