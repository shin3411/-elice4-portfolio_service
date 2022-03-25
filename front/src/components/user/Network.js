import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import * as Api from "../../api";
import UserCard from "./UserCard";
import NetworkSearchForm from "./NetworkSearchForm";
import NetworkPagination from "./NetworkPagination";
import { UserStateContext } from "../../App";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  // user 목록을 담는 state
  const [users, setUsers] = useState([]);

  // 검색과 관련된 state
  const [selected, setSelected] = useState("name");
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [noSearchList, setNoSearchList] = useState("");

  // 페이지네이션과 관련된 state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [lastPage, setLastPage] = useState(1);

  // 유저 목록을 api 응답으로 받아오는 함수
  const getUserList = async () => {
    if (searchValue.length > 0) {
      const { data } = await Api.get("userlist", "", {
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
        setNoSearchList("");
        setUsers(data.data);
        setLastPage(data.lastPage);
      }
    } else {
      const { data } = await Api.get("userlist", "", {
        page,
        limit,
      });
      setUsers(data.data);
      setLastPage(data.lastPage);
    }
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
    getUserList();
  }, [page, limit, searchValue]);

  return (
    <Container fluid>
      <NetworkSearchForm
        selected={selected}
        inputValue={inputValue}
        setSelected={setSelected}
        setInputValue={setInputValue}
        setSearchValue={setSearchValue}
        setNoSearchList={setNoSearchList}
        setPage={setPage}
      />
      <Row xs="auto" className="mt-2" style={{ margin: "0 1.3rem" }}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} imageSrc={user.img} isNetwork />
        ))}
      </Row>
      <Row className="position-absolute top-50 start-50 translate-middle">
        <Col>
          <h3>{noSearchList}</h3>
        </Col>
      </Row>
      {lastPage !== 0 && (
        <NetworkPagination
          page={page}
          lastPage={lastPage}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
        />
      )}
    </Container>
  );
}

export default Network;
