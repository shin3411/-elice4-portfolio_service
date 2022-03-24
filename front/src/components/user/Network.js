import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Pagination,
  ButtonGroup,
} from "react-bootstrap";

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

  // user 목록을 담는 state
  const [users, setUsers] = useState([]);

  // 검색과 관련된 state
  const [selected, setSelected] = useState("name");
  const [searchValue, setSearchValue] = useState("");
  const [noSearchList, setNoSearchList] = useState("");
  const [searched, setSearched] = useState(false);

  // 페이지네이션과 관련된 state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
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

  // 전체 유저 목록을 api 응답으로 받아오는 함수
  const getUserList = async () => {
    const { data } = await Api.get("userlist", "", { page, limit });
    setUsers(data.data);
    setLastPage(data.lastPage);
  };

  // 검색한 유저 목록을 api 응답으로 받아오는 함수
  const getSearchedUserList = async () => {
    const { data } = await Api.get("users/search", "", {
      [selected]: encodeURIComponent(searchValue),
      page,
      limit,
    });

    if (data.data.length === 0) {
      const searchString = `'${searchValue}'에 대한 검색 결과가 없습니다.`;
      setNoSearchList(searchString);
      setUsers(data.data);
      setLastPage(0);
    } else {
      setUsers(data.data);
      setLastPage(data.lastPage);
      setNoSearchList("");
    }
  };

  // 검색폼 제출 시 작동하는 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(true);
    setPage(1);
    getSearchedUserList();
  };

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate("/login");
      return;
    }
    getUserList();
  }, [userState, navigate]);

  useEffect(() => {
    console.log(searched);
    if (searched) {
      getSearchedUserList();
    } else {
      getUserList();
    }
  }, [page, limit]);

  return (
    <Container fluid>
      <Form className="mb-4" onSubmit={handleSubmit}>
        <Row className="justify-content-center">
          <Col xs={2}>
            <Form.Select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </Col>
          <Col xs={2}>
            <ButtonGroup>
              <Button type="submit" disabled={!searchValue}>
                검색
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => {
                  setSearched(false);
                  setPage(1);
                  getUserList();
                  setSearchValue("");
                }}
              >
                전체
              </Button>
            </ButtonGroup>
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
          <h3>{noSearchList}</h3>
        </Col>
      </Row>
      {lastPage !== 0 && (
        <Row className="position-absolute start-50 translate-middle">
          <Col>
            <Form.Select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
            >
              <option value="4">4</option>
              <option value="8">8</option>
              <option value="16">16</option>
              <option value="32">32</option>
            </Form.Select>
          </Col>
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
