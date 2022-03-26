import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

// + 버튼 클릭했을 때 + 버튼 하단에 나타나는 폼 컴포넌트
const CertificateAddForm = ({ setIsAdding, setCertificateList }) => {
  const defaultDate = new Date().toISOString().substring(0, 10);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(defaultDate);
  const [errorMessage, setErrorMessage] = useState("");

  const isTitleValid = title.length > 0;
  const isDescriptionValid = description.length > 0;
  const isFormValid = isTitleValid && isDescriptionValid;

  // 폼 제출시 실행되는 함수. 입력받은 정보를 post하고 certificateList에 합침
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { title, description, date };

    try {
      const res = await Api.post("certificate/create", data);
      const createdData = res.data;

      setCertificateList((current) => {
        return [...current, createdData];
      });
      setIsAdding(false);
    } catch (e) {
      setErrorMessage(e.response.data.errorMessage);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className="mt-3"
          type="text"
          placeholder="자격증 제목"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErrorMessage("");
          }}
        />
        {!isTitleValid && (
          <Form.Text className="text-success">필수 입력사항입니다.</Form.Text>
        )}
        <Form.Text className="text-success">{errorMessage}</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Control
          className="mt-3"
          type="text"
          placeholder="상세내역"
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
            onClick={() => setIsAdding(false)}
          >
            취소
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CertificateAddForm;
