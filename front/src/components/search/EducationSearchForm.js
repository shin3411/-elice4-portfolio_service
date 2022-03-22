import React, { useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import * as Api from "../../api";

const EducationSearchForm = () => {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");

  const positionList = [
    { value: "", item: "학위" },
    { value: "재학중", item: "재학 중" },
    { value: "학사졸업", item: "학사 졸업" },
    { value: "석사졸업", item: "석사 졸업" },
    { value: "박사졸업", item: "박사 졸업" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Col xs={7}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={10}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="학교"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
              />
              <Form.Control
                type="text"
                placeholder="전공"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
              />
              <Form.Select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              >
                {positionList.map(({ value, item }) => (
                  <option key={value} value={value}>
                    {item}
                  </option>
                ))}
              </Form.Select>
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

export default EducationSearchForm;
