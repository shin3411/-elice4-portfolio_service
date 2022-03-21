import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
//이력내용 수정 폼
const AwardEditForm = ({ setIsEditing, setList, award }) => {
  const [awardDescription, setAwardDescription] = useState(award.title);
  const [detailDescription, setDetailDescription] = useState(award.description);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.put(`awards/${award._id}`, {
        title: awardDescription,
        description: detailDescription,
      });

      const editedAwards = res.data;
      setList((current) => {
        const editedIndex = current.findIndex((i) => i._id === award._id);
        current[editedIndex] = editedAwards;
        return [...current];
      });
    } catch (e) {
      console.log(e);
    }
    setIsEditing(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const isFormValid = awardDescription && detailDescription;

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
            {!awardDescription && (
              <Form.Text className="text-success">
                필수 입력사항입니다.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group controlId="detailDescription">
            <Form.Control
              type="text"
              value={detailDescription}
              onChange={(e) => setDetailDescription(e.target.value)}
            />
            {!detailDescription && (
              <Form.Text className="text-success">
                필수 입력사항입니다.
              </Form.Text>
            )}
          </Form.Group>

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
