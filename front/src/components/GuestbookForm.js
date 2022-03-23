import React from "react";
import { Form, Card, Button } from "react-bootstrap";

import { useRecoilValue } from "recoil";
import { modeState } from "../atom/themeState";

const GuestbookForm = () => {
  const mokComment = [
    { nickname: "user1", comment: "안녕하세요" },
    { nickname: "user2", comment: "반갑습니다." },
    { nickname: "user3", comment: "오늘 날씨 좋나요?" },
    { nickname: "user4", comment: "비 오니까 우산 챙기세요" },
    { nickname: "user5", comment: "비 오니까 우산 챙기세요" },
    { nickname: "user5", comment: "비 오니까 우산 챙기세요" },
    { nickname: "user5", comment: "비 오니까 우산 챙기세요" },
  ];

  const ModeState = useRecoilValue(modeState);

  return (
    <>
      <Card
        // className="mb-2 ms-3 mt-5 border-success"
        className={
          ModeState.mode === "dark"
            ? "mb-2 ms-3 mt-5 border-white"
            : "mb-2 ms-3 mt-5"
        }
        style={{ width: "18rem", padding: "5px" }}
      >
        <Card.Header
          className={ModeState.mode === "dark" ? "mb-1 border-white" : "mb-1"}
        >
          방명록
        </Card.Header>
        <Card.Body style={{ maxHeight: "350px", overflow: "auto" }}>
          {mokComment.map((comment, idx) => (
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
            </Card>
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
      <br />
    </>
  );
};

export default GuestbookForm;
