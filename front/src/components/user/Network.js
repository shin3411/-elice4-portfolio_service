import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const selectList = [
    { value: "name", item: "이름" },
    { value: "email", item: "이메일" },
  ];
  const [selected, setSelected] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, [userState, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchedUsers = await Api.get(
      `users/search?${selected}=${encodeURIComponent(searchValue)}`
    ).then((res) => setUsers(res.data));
    setUsers(searchedUsers);
  };

  return (
    <Container fluid>
      <Form className="mb-4" onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs={2}>
            <Form.Select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {selectList.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.item}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col xs={4}>
            <Form.Control
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Col>
          <Col xs={1}>
            <Button type="submit">검색</Button>
          </Col>
        </Row>
      </Form>
      <Row xs="auto" className="mt-2 m-5">
        {users.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default Network;
