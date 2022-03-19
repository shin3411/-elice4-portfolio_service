import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

// + 버튼 클릭했을 때 + 버튼 하단에 나타나는 폼 컴포넌트
const ProjectAddForm = ({ setIsAdding, setProjectList }) => {
  const defaultDate = new Date().toISOString().substring(0, 10);

  // 폼 제출시 실행되는 함수. 입력받은 정보를 post하고 projectList에 합침
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 입력받은 정보 가져옴
    const title = e.target.title.value;
    const description = e.target.description.value;
    const fromDate = e.target.from_date.value;
    const toDate = e.target.to_date.value;

    // 입력받은 정보가 없으면 리턴. 제춡X
    if (!title || !description) return;
    // 프로젝트 시작 날짜가 종료 날짜보다 늦은 날짜면 리턴. 제출X
    if (new Date(fromDate) > new Date(toDate)) return;

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
      <Form.Control
        className="mt-3"
        type="text"
        placeholder="프로젝트 제목"
        name="title"
      />
      <Form.Control
        className="mt-3"
        type="text"
        placeholder="상세내역"
        name="description"
      />
      <Row>
        <Col>
          <Form.Control
            className="mt-3"
            type="date"
            defaultValue={defaultDate}
            name="from_date"
          />
        </Col>
        <Col>
          <Form.Control
            className="mt-3"
            type="date"
            defaultValue={defaultDate}
            name="to_date"
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
