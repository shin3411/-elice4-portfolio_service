import React from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";

const ProjectSearchForm = () => {
  return (
    <Col xs={7}>
      <Form>
        <Row>
          <Col xs={10}>
            <InputGroup>
              <Form.Control type="text" placeholder="프로젝트 제목" />
              <Form.Control
                type="text"
                placeholder="시작일"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
              <Form.Control
                type="text"
                placeholder="종료일"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </InputGroup>
          </Col>
          <Col xs={2}>
            <Button type="submit">검색</Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default ProjectSearchForm;
