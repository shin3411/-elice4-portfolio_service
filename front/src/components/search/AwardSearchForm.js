import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

const AwardSearchForm = ({ setData }) => {
  const [title, setTitle] = useState("");

  const formValid = title;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Api.get("awards", "search", { title });
    setData({ awards: data });
  };

  return (
    <Col xs={7}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={10}>
            <Form.Control
              type="text"
              placeholder="수상내역"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <Button type="submit" disabled={!formValid}>
              검색
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default AwardSearchForm;
