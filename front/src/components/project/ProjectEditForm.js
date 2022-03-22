import React, { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as Api from "../../api";

// project 편집 폼 컴포넌트
const ProjectEditForm = ({ project, setProjectList, setIsEditing }) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [fromDate, setFromDate] = useState(project.fromDate.substring(0, 10));
  const [toDate, setToDate] = useState(project.toDate.substring(0, 10));

  const isTitleValid = title.length > 0;
  const isDescriptionValid = description.length > 0;
  const isDateValid = new Date(fromDate) <= new Date(toDate);
  const isFormValid = isTitleValid && isDescriptionValid && isDateValid;

  // 폼 제출 시 실행되는 함수. 입력받은 정보를 put하고 projectList에 적용
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`projects/${project.id}`, {
        title,
        description,
        from_date: fromDate,
        to_date: toDate,
      });
      const editedProject = res.data;

      setIsEditing(false);

      setProjectList((current) => {
        const newProject = current.map((i) => {
          if (i.id === project.id) {
            return editedProject;
          } else {
            return i;
          }
        });
        return newProject;
      });
    } catch (e) {
      console.log(e);
    }
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
          <Form.Text className="text-success">필수 입력사항입니다.</Form.Text>
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
          <Form.Text className="text-success">필수 입력사항입니다.</Form.Text>
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
          <Form.Text className="text-success">
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
            onClick={() => setIsEditing(false)}
          >
            취소
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProjectEditForm;
