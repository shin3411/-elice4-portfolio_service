import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const AwardAddForm = ({ setAdd }) => {
  const [awardDescription, setAwardDescription] = useState();
  //useState로 description 상태를 생성함.
  const [detailDescription, setDetailDescription] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAdd(false);
  };

  return (
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
  );
};

export default AwardAddForm;
