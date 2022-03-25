import React from "react";
import { Row, Col, Form, Button, ButtonGroup } from "react-bootstrap";

const NetworkSearchForm = ({
  selected,
  inputValue,
  setSelected,
  setInputValue,
  setSearchValue,
  setNoSearchList,
  setPage,
}) => {
  const selectList = [
    { value: "name", item: "이름" },
    { value: "email", item: "이메일" },
  ];

  // 검색폼 제출 시 작동하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchValue(inputValue);
    setPage(1);
  };

  return (
    <Form className="mb-4" onSubmit={handleSubmit}>
      <Row className="justify-content-center">
        <Col xs={2}>
          <Form.Select
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setInputValue("");
              setSearchValue("");
              setNoSearchList("");
            }}
          >
            {selectList.map(({ value, item }) => (
              <option value={value} key={value}>
                {item}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col xs={4}>
          <Form.Control
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Col>
        <Col xs={2}>
          <ButtonGroup>
            <Button type="submit" disabled={!inputValue}>
              검색
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => {
                setPage(1);
                setInputValue("");
                setSearchValue("");
                setNoSearchList("");
                console.log("hi");
              }}
            >
              전체
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default NetworkSearchForm;
