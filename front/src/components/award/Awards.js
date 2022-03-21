import { useState } from "react";
import { Card, Button, Row, Col, Modal } from "react-bootstrap";
import AwardEditForm from "./AwardEditForm";
import * as Api from "../../api";

//이력들중 하나의 편집버튼을 클릭하여 편집기능으로 넘어가는 컴포넌트
const Awards = ({ award, setList, list, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleDelete = async () => {
    try {
      await Api.delete("awards", award._id);
      setList((current) => {
        const deleted = current.filter((i) => i._id !== award._id);
        return deleted;
        //splice를 이용하여 구현했을경우 두개씩 지워집니다. 이유를 모르겠습니다.
        // setList((current) => {
        // const deletedIndex = current.findIndex((i) => i._id === award._id);
        // current.splice(deletedIndex,1)
        // return [...current];
        // });
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
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
              <Col className="text-center col-2">
                <Button
                  onClick={handleEdit}
                  className="me-2"
                  variant="outline-info"
                  size="sm"
                >
                  편집
                </Button>
                <Button
                  onClick={() => setShow(true)}
                  variant="outline-danger"
                  size="sm"
                >
                  삭제
                </Button>
              </Col>
            )}
          </>
        )}

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>수상이력 삭제</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>정말로 삭제하시겠습니까?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              닫기
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              삭제
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </div>
  );
};

export default Awards;
