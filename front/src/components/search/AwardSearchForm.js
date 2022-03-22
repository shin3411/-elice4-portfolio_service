import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

const AwardSearchForm = () => {
  return (
    <Col xs={7}>
      <Form>
        <Row>
          <Col xs={10}>
            <Form.Control type="text" placeholder="수상내역" />
          </Col>
          <Col xs={2}>
            <Button type="submit">검색</Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default AwardSearchForm;
