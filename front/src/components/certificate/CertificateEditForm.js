import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as Api from "../../api";

// certificate 편집 폼 컴포넌트
const CertificateEditForm = ({
  certificate,
  setCertificateList,
  setIsEditing,
}) => {
  const [title, setTitle] = useState(certificate.title);
  const [description, setDescription] = useState(certificate.description);
  const [date, setDate] = useState(certificate.date.substring(0, 10));

  const isTitleValid = title.length > 0;
  const isDescriptionValid = description.length > 0;
  const isFormValid = isTitleValid && isDescriptionValid;

  // 폼 제출 시 실행되는 함수. 입력받은 정보를 put하고 certificateList에 적용
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`certificates/${certificate._id}`, {
        title,
        description,
        date,
      });
      const editedCertificate = res.data;

      setIsEditing(false);

      setCertificateList((current) => {
        const newCertificateList = current.map((i) => {
          if (i._id === certificate._id) {
            return editedCertificate;
          } else {
            return i;
          }
        });
        return newCertificateList;
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Col>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            className="mt-3"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {!isTitleValid && (
            <Form.Text className="text-success">필수 입력사항입니다.</Form.Text>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            className="mt-3"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {!isDescriptionValid && (
            <Form.Text className="text-success">필수 입력사항입니다.</Form.Text>
          )}
        </Form.Group>
        <Form.Control
          className="mt-3"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Row className="text-center mt-3">
          <Col>
            <Button variant="primary" type="submit" disabled={!isFormValid}>
              확인
            </Button>
            <Button
              className="ms-3"
              variant="secondary"
              onClick={() => setIsEditing(false)}
            >
              취소
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default CertificateEditForm;
