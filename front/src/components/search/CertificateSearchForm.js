import React, { useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import * as Api from "../../api";

const CertificateSearchForm = ({ setData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [dateAfter, setDateAfter] = useState("");
  const [dateBefore, setDateBefore] = useState("");
  const [selected, setSelected] = useState("date");

  const formValid = title || description || date || dateAfter || dateBefore;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Api.get("certificates", "search", {
      title: title ? encodeURIComponent(title) : null,
      description: description ? encodeURIComponent(description) : null,
      date: date ? date : null,
      dateAfter: dateAfter ? dateAfter : null,
      dateBefore: dateBefore ? dateBefore : null,
    });
    setData({ certificates: data });
  };

  return (
    <Col xs={7}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={11}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="자격증 제목"
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
            <Row className="mb-1">
              <Col xs={3}>
                <Form.Select
                  value={selected}
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value="date">취득일</option>
                  <option value="period">기간</option>
                </Form.Select>
              </Col>
              <Col>
                {selected === "date" && (
                  <Form.Control
                    type="text"
                    placeholder="취득일"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setDateAfter("");
                      setDateBefore("");
                    }}
                  />
                )}
                {selected === "period" && (
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="해당 날짜 이후"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      value={dateAfter}
                      onChange={(e) => {
                        setDateAfter(e.target.value);
                        setDate("");
                      }}
                    />
                    <Form.Control
                      type="text"
                      placeholder="해당 날짜 이전"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      value={dateBefore}
                      onChange={(e) => {
                        setDateBefore(e.target.value);
                        setDate("");
                      }}
                    />
                  </InputGroup>
                )}
              </Col>
            </Row>
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

export default CertificateSearchForm;
