import React, { useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import * as Api from "../../api";

const EducationSearchForm = ({ setData }) => {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");

  const positionList = ["재학 중", "학사 졸업", "석사 졸업", "박사 졸업"];

  const formValid = school || major || position;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Api.get("educations", "search", {
      school: school ? encodeURIComponent(school) : null,
      major: major ? encodeURIComponent(major) : null,
      position: position ? encodeURIComponent(position) : null,
    });

    if (data.length === 0) {
      const searchString = [school, major, position].reduce((acc, i) => {
        if (i !== "") {
          if (acc.length !== 0) return (acc += `, ${i}`);
          return (acc += i);
        } else {
          return acc;
        }
      }, "");
      setData({ none: `'${searchString}'에 대한 검색 결과가 없습니다.` });
    } else {
      setData({ educations: data });
    }
  };

  return (
    <Col xs={7}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={11}>
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
                <option>학위</option>
                {positionList.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Form.Select>
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

export default EducationSearchForm;
