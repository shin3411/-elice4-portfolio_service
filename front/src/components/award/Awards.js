import { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import AwardEditForm from "./AwardEditForm";

//이력들중 하나의 편집버튼을 클릭하여 편집기능으로 넘어가는 컴포넌트
const Awards = ({ award, setList, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Card.Text>
      <Row className="align-items-center">
        {isEditing ? (
          <AwardEditForm
            award={award}
            setList={setList}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            <Col>
              <span>{award.title}</span>
              <br></br>
              <span className="text-muted">{award.description}</span>
            </Col>
            {isEditable && (
              <Col className="col-lg-1">
                <Button
                  onClick={handleEdit}
                  className="mr-3"
                  variant="outline-info"
                  size="sm"
                >
                  편집
                </Button>
              </Col>
            )}
          </>
        )}
      </Row>
    </Card.Text>
  );
};

export default Awards;
