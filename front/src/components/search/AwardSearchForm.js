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

    if (data.length === 0) {
      const searchString = [title, description].reduce((acc, i) => {
        if (i !== "") {
          if (acc.length !== 0) return (acc += `, ${i}`);
          return (acc += i);
        } else {
          return acc;
        }
      }, "");
      setData({ none: `'${searchString}'에 대한 검색 결과가 없습니다.` });
    } else {
      setData({ awards: data });
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
