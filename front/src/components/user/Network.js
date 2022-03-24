import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Pagination } from "react-bootstrap";

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
  const [users, setUsers] = useState([]);
  const [noSearch, setNoSearch] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const pagination = [];
  for (let num = 1; num <= lastPage; num++) {
    pagination.push(
      <Pagination.Item
        key={num}
        active={num === page}
        onClick={() => setPage(num)}
      >
        {num}
      </Pagination.Item>
    );
  }

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist", "", { page, limit: 8 }).then((res) => {
      setUsers(res.data.data);
      setLastPage(res.data.lastPage);
    });
  }, [userState, navigate, page]);

  // 검색폼 제출 시 작동하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Api.get("users/search", "", {
      [selected]: encodeURIComponent(searchValue),
      page,
      limit: 8,
    });
    console.log(data);

    if (data.data.length === 0) {
      const searchString = `'${searchValue}'에 대한 검색 결과가 없습니다.`;
      setNoSearch(searchString);
      setUsers(data.data);
      setLastPage(0);
    } else {
      setUsers(data.data);
      setLastPage(data.lastPage);
      setNoSearch("");
    }
  };

  return (
    <Container fluid>
      <Form id="networkForm" className="mb-4" onSubmit={handleSubmit}>
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
            <Button type="submit" disabled={!searchValue}>
              검색
            </Button>
          </Col>
        </Row>
      </Form>
      <Row xs="auto" className="mt-2 m-5">
        {users.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
      <Row className="position-absolute top-50 start-50 translate-middle">
        <Col>
          <h3>{noSearch}</h3>
        </Col>
      </Row>
      {lastPage !== 0 && (
        <Row className="position-absolute start-50 translate-middle">
          <Col>
            <Pagination>
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => setPage((cur) => cur - 1)}
              />
              {pagination}
              <Pagination.Next
                disabled={page === lastPage}
                onClick={() => setPage((cur) => cur + 1)}
              />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Network;
