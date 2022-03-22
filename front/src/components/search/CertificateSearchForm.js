import React from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";

const CertificateSearchForm = () => {
  return (
    <Col xs={7}>
      <Form>
        <Row>
          <Col xs={10}>
            <InputGroup>
              <Form.Control type="text" placeholder="자격증 제목" />
              <Form.Control
                type="text"
                placeholder="취득일"
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

export default CertificateSearchForm;
