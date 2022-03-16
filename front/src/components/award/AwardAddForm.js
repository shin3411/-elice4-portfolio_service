import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";

//수상내역, 상세내역의 input을 받는 이력 추가 폼
const AwardAddForm = ({ setAdd, setList }) => {
  const [awardDescription, setAwardDescription] = useState();
  const [detailDescription, setDetailDescription] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setList((current) => {
      const newArr = [...current];
      const newList = {
        award: awardDescription,
        detail: detailDescription,
        edit: false,
      };
      newArr.push(newList);
      return newArr;
    });
    setAdd(false);
  };

  return (
    <>
      <Card className="mt-2 mb-2" border="light">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="awardDescription" className="mb-3">
              <Form.Control
                type="text"
                placeholder="수상내역"
                value={awardDescription}
                onChange={(e) => setAwardDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="detailDescription">
              <Form.Control
                type="text"
                placeholder="상세내역"
                value={detailDescription}
                onChange={(e) => setDetailDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Row} className="mt-3 text-center">
              <Col sm={{ span: 20 }}>
                <Button variant="primary" type="submit" className="me-3">
                  확인
                </Button>
                <Button variant="secondary" onClick={() => setAdd(false)}>
                  취소
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AwardAddForm;
