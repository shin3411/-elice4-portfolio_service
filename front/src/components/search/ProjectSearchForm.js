import React, { useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import * as Api from "../../api";

const ProjectSearchForm = ({ setData }) => {
  const [title, setTitle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const formValid = title || fromDate || toDate;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Api.get("projects", "search", {
      title: title ? encodeURIComponent(title) : null,
      fromDate: fromDate ? fromDate : null,
      toDate: toDate ? toDate : null,
    });
    setData({ projects: data });
  };

  return (
    <Col xs={7}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={11}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="프로젝트 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="시작일"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="종료일"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col xs={1}>
            <Row className="justify-content-center">
              <Button type="submit" disabled={!formValid}>
                검색
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default ProjectSearchForm;
