import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

//수상내역, 상세내역의 input을 받는 이력 추가 폼
const AwardAddForm = ({ setAdd, setList }) => {
  const [awardDescription, setAwardDescription] = useState();
  const [detailDescription, setDetailDescription] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // "award/create" 엔드포인트로 post요청함.
    try {
      const { data } = await Api.post("award/create", {
        title: awardDescription,
        description: detailDescription,
      });
      setList((current) => {
        return [...current, data];
      });
      setAdd(false);
    } catch (e) {
      setErrorMsg("수상이력을 생성할 수 없습니다.");
    }
  };
  const isFormValid = awardDescription && detailDescription;
  return (
    <Card className="mt-2 mb-2  text-left" border="light">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="awardDescription" className="mb-3">
            <Form.Control
              type="text"
              placeholder="수상내역"
              value={awardDescription}
              onChange={(e) => setAwardDescription(e.target.value)}
            />
            {!awardDescription && (
              <Form.Text className="text-success text-left">
                필수 입력사항입니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="detailDescription">
            <Form.Control
              type="text"
              placeholder="상세내역"
              value={detailDescription}
              onChange={(e) => setDetailDescription(e.target.value)}
            />
            {!detailDescription && (
              <Form.Text className="text-success">
                필수 입력사항입니다.
              </Form.Text>
            )}
          </Form.Group>
          <Form.Text className="text-success text-left">{errorMsg}</Form.Text>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button
                variant="primary"
                type="submit"
                disabled={!isFormValid}
                className="me-3"
              >
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
