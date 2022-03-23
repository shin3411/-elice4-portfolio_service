import React, { useState } from "react";
import { Form, Row, Col, Button, InputGroup } from "react-bootstrap";
import * as Api from "../../api";

const AwardSearchForm = ({ setData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formValid = title || description;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Api.get("awards", "search", {
      title: title ? encodeURIComponent(title) : null,
      description: description ? encodeURIComponent(description) : null,
    });
    setData({ awards: data });
  };

  return (
    <Col xs={7}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={11}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="수상내역"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="상세내역"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

export default AwardSearchForm;
