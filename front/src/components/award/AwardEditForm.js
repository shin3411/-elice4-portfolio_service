import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";

const AwardEditForm = ({ setList, idx, item, setIsEditing }) => {
  const [awardDescription, setAwardDescription] = useState(item.award);
  //useState로 description 상태를 생성함.
  const [detailDescription, setDetailDescription] = useState(item.detail);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setList((current) => {
      const newArr = [...current];
      newArr[idx].award = awardDescription;
      newArr[idx].detail = detailDescription;
      newArr[idx].edit = false;
      return newArr;
    });
  };
  const handleCancel = () => {
    setList((current) => {
      const newArr = [...current];
      newArr[idx].edit = false;
      return newArr;
    });
  };

  return (
    <Card className=" mb-2" border="light">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="awardDescription" className="mb-3">
            <Form.Control
              type="text"
              value={awardDescription}
              onChange={(e) => setAwardDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="detailDescription">
            <Form.Control
              type="text"
              value={detailDescription}
              onChange={(e) => setDetailDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AwardEditForm;
