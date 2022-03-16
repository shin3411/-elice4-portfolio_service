import { Card, Button, Row, Col } from "react-bootstrap";
import AwardEditForm from "./AwardEditForm";

//이력을 모아서 배열에 담고 출력하는 컴포넌트
const AwardList = ({ list, setList, isEditable }) => {
  const handleEdit = (idx) => {
    setList((current) => {
      const newArr = [...current];
      newArr.map((item, id) => {
        if (id === idx) {
          item.edit = true;
        }
      });
      return newArr;
    });
  };
  return (
    <>
      {list.map((item, idx) =>
        item.edit ? (
          <AwardEditForm
            setList={setList}
            idx={idx}
            item={item}
          ></AwardEditForm>
        ) : (
          <Card.Text>
            <Row className="align-items-center">
              <Col>
                <span>{item.award}</span>
                <br></br>
                <span className="text-muted">{item.detail}</span>
              </Col>
              <Col lg="1">
                <Button
                  onClick={() => handleEdit(idx)}
                  className="mr-3"
                  variant="outline-info"
                  size="sm"
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Card.Text>
        )
      )}
    </>
  );
};

export default AwardList;
