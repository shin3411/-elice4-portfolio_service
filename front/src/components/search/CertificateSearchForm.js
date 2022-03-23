import React, { useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import * as Api from "../../api";

const CertificateSearchForm = ({ setData }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const formValid = title || date;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Api.get("certificates", "search", {
      title: encodeURIComponent(title) ? title : null,
      date: date ? date : null,
    });
    setData({ certificates: data });
  };

  return (
    <Col xs={7}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={10}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="자격증 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="취득일"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </InputGroup>
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

export default CertificateSearchForm;
