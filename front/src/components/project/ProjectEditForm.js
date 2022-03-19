import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as Api from "../../api";

// project 편집 폼 컴포넌트
const ProjectEditForm = ({ project, setProjectList, setIsEditing }) => {
  // 폼 제출 시 실행되는 함수. 입력받은 정보를 put하고 projectList에 적용
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 입력받은 정보 가져옴
    const title = e.target.title.value;
    const description = e.target.description.value;
    const from_date = e.target.fromDate.value;
    const to_date = e.target.toDate.value;

    try {
      const res = await Api.put(`projects/${project.id}`, {
        title,
        description,
        from_date,
        to_date,
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
      <Form.Control
        className="mt-3"
        type="text"
        name="title"
        defaultValue={project.title}
      />
      <Form.Control
        className="mt-3"
        type="text"
        name="description"
        defaultValue={project.description}
      />
      <Row>
        <Col>
          <Form.Control
            className="mt-3"
            type="date"
            name="fromDate"
            defaultValue={project.fromDate}
          />
        </Col>
        <Col>
          <Form.Control
            className="mt-3"
            type="date"
            name="toDate"
            defaultValue={project.toDate}
          />
        </Col>
      </Row>
      <Row className="text-center mt-3">
        <Col>
          <Button variant="primary" type="submit">
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
