import React, { useState, useEffect } from "react";
import { Form, Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { MdDelete, MdCreate } from "react-icons/md";

import { useRecoilValue } from "recoil";
import { modeState } from "../../atom/themeState";
import loginIdState from "../../atom/loginIdState";

const Guestbooks = ({ portfolioOwnerId, isEditable, guestBooks }) => {
  const ModeState = useRecoilValue(modeState);
  const loginId = useRecoilValue(loginIdState);

  return (
    <Card.Body style={{ maxHeight: "350px", overflow: "auto" }}>
      {guestBooks.map((comment, idx) => (
        <CardItemBlock key={idx}>
          <Card
            scrollable="true"
            className={
              ModeState.mode === "dark" ? "mb-2 p-2 border-white" : "mb-2 p-2 "
            }
          >
            {comment.writerId.name} : {comment.comment}
            {/* 자신이 쓴 댓글만 수정, 삭제 할 수 있도록 조건부 렌더링 */}
            {loginId === comment.writerId.id && (
              <IconBlock>
                <Edit>
                  <MdCreate />
                </Edit>
                <Remove>
                  <MdDelete />
                </Remove>
              </IconBlock>
            )}
          </Card>
        </CardItemBlock>
      ))}
    </Card.Body>
  );
};

export default Guestbooks;

// 펜 모양 보여주는 컴포넌트
const Edit = styled.div`
  width: fit-content;
  color: #dee2e6;
  margin-right: 5px;
  &:hover {
    color: #7cd1b8;
  }
`;

// 쓰레기통 보여주는 컴포넌트
const Remove = styled.div`
  width: fit-content;
  color: #dee2e6;
  &:hover {
    color: #ff6b6b;
  }
`;

const IconBlock = styled.div`
  display: flex;
  width: fit-content;
  position: relative;
  left: 12.5rem;
`;

const CardItemBlock = styled.div`
  width: 16rem;
`;
