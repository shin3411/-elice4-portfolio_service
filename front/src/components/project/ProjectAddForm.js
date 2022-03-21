import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

// + 버튼 클릭했을 때 + 버튼 하단에 나타나는 폼 컴포넌트
const ProjectAddForm = ({ setIsAdding, setProjectList }) => {
  const defaultDate = new Date().toISOString().substring(0, 10);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState(defaultDate);
  const [toDate, setToDate] = useState(defaultDate);

  const isTitleValid = title.length > 0;
  const isDescriptionValid = description.length > 0;
  const isDateValid = new Date(fromDate) <= new Date(toDate);
  const isFormValid = isTitleValid && isDescriptionValid && isDateValid;

  // 폼 제출시 실행되는 함수. 입력받은 정보를 post하고 projectList에 합침
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 입력받은 정보 가져옴

    const data = {
      title,
      description,
      from_date: fromDate,
      to_date: toDate,
    };

    try {
      const res = await Api.post("project/create", data);
      const createdData = res.data;

      setProjectList((current) => {
        return [...current, createdData];
      });
    } catch (e) {
      console.log(e);
    }

    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control
          className="mt-3"
          type="text"
          placeholder="프로젝트 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {!isTitleValid && (
          <Form.Text className="text-danger">필수 입력 내용입니다.</Form.Text>
        )}
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
          <Form.Text className="text-danger">필수 입력 내용입니다.</Form.Text>
        )}
      </Form.Group>
      <Form.Group>
        <Row>
          <Col>
            <Form.Control
              className="mt-3"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              className="mt-3"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </Col>
        </Row>
        {!isDateValid && (
          <Form.Text className="text-danger">
            입력기간을 확인해주세요.
          </Form.Text>
        )}
      </Form.Group>
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

export default ProjectAddForm;
