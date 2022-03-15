import { Button, Col } from "react-bootstrap";

const AwardList = ({ list, setIsEditing, isEditable }) => {
  console.log(list);
  return (
    <>
      <span>{list.award}</span>
      <span>{list.detail}</span>
      {isEditable && (
        <Col sm={{ span: 20 }}>
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            편집
          </Button>
        </Col>
      )}
    </>
  );
};

export default AwardList;
