import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import * as Api from "../../api";

import { useRecoilValue } from "recoil";
import { modeState } from "../../atom/themeState";

import styled from "styled-components";
import { MdDelete, MdCreate } from "react-icons/md";

const GuestbookForm = ({ portfolioOwnerId, isEditable }) => {
  const [guestBook, setGuestBook] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await Api.get();
        setGuestBook(response.data);
      } catch (e) {}
    };
    fetch();
  }, [portfolioOwnerId]);

  console.log(guestBook);

  const mokComment = [
    { nickname: "user1", comment: "좋은 포트폴리오네요!" },
    { nickname: "user2", comment: "프로젝트 경험이 좋아요!" },
    { nickname: "user3", comment: "테스트 메시지....." },
    { nickname: "user4", comment: "테스트 메시지....." },
    { nickname: "user5", comment: "테스트 메시지....." },
    { nickname: "user5", comment: "테스트 메시지....." },
    { nickname: "user5", comment: "테스트 메시지....." },
  ];

  const ModeState = useRecoilValue(modeState);

  return (
    <Card
      className={
        ModeState.mode === "dark"
          ? "mb-2 ms-3 mt-5 border-white"
          : "mb-2 ms-3 mt-5"
      }
      style={{ width: "21rem", padding: "5px" }}
    >
      <Card.Header
        className={ModeState.mode === "dark" ? "mb-1 border-white" : "mb-1"}
      >
        방명록
      </Card.Header>
      <Card.Body style={{ maxHeight: "350px", overflow: "auto" }}>
        {mokComment.map((comment, idx) => (
          <CardItemBlock>
            <Card
              scrollable="true"
              key={idx}
              className={
                ModeState.mode === "dark"
                  ? "mb-2 p-2 border-white"
                  : "mb-2 p-2 "
              }
            >
              {comment.nickname} : {comment.comment}
              <IconBlock>
                <Edit>
                  <MdCreate />
                </Edit>
                <Remove>
                  <MdDelete />
                </Remove>
              </IconBlock>
            </Card>
          </CardItemBlock>
        ))}
      </Card.Body>
      <Form.Group className="mt-2" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          as="textarea"
          placeholder="댓글을 입력해주세요."
          rows={3}
        />
      </Form.Group>
      <Button className="mt-2">등록</Button>
    </Card>
  );
};

export default GuestbookForm;

// 펜 모양 보여주는 컴포넌트
const Edit = styled.div`
  width: fit-content;
  opacity: 0;
  color: #dee2e6;
  margin-right: 5px;
  &:hover {
    color: #7cd1b8;
  }
`;

// 쓰레기통 보여주는 컴포넌트
const Remove = styled.div`
  width: fit-content;
  opacity: 0;
  color: #dee2e6;
  &:hover {
    color: #ff6b6b;
  }
`;

const IconBlock = styled.div`
  display: flex;
  &:hover {
    ${Remove}, ${Edit} {
      opacity: 1;
    }
  }
`;

const CardItemBlock = styled.div`
  width: 16rem;
`;
