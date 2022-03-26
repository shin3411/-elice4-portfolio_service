import React, { useState } from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import { MdDelete, MdCreate } from "react-icons/md";
import * as Api from "../../api";
import GuestbookEdit from "./GuestbookEdit";

import { useRecoilValue } from "recoil";
import { modeState } from "../../atom/themeState";
import loginIdState from "../../atom/loginIdState";

const GuestbookCard = ({ comment, idx, setGuestBooks, fetch }) => {
  const ModeState = useRecoilValue(modeState);
  const loginId = useRecoilValue(loginIdState);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <CardItemBlock key={idx}>
      <Card
        scrollable="true"
        className={
          ModeState.mode === "dark" ? "mb-2 p-2 border-white" : "mb-2 p-2 "
        }
      >
        {!isEdit ? (
          <>
            {comment.writerId.name} : {comment.comment}
            {/* 자신이 쓴 댓글만 수정, 삭제 할 수 있도록 조건부 렌더링 */}
            {loginId === comment.writerId.id && (
              <IconBlock>
                <Edit>
                  <MdCreate
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  />
                </Edit>
                <Remove>
                  <MdDelete
                    onClick={async () => {
                      await Api.delete("comments", comment._id);
                      setGuestBooks((prev) => {
                        const newGB = prev.filter((v) => v._id !== comment._id);
                        return newGB;
                      });
                    }}
                  />
                </Remove>
              </IconBlock>
            )}
          </>
        ) : (
          <GuestbookEdit
            comment={comment}
            setGuestBooks={setGuestBooks}
            setIsEdit={setIsEdit}
            fetch={fetch}
          />
        )}
      </Card>
    </CardItemBlock>
  );
};

export default GuestbookCard;

// 펜 모양 보여주는 컴포넌트
const Edit = styled.div`
  width: fit-content;
  color: #dee2e6;
  margin-right: 5px;
  font-size: 1.2rem;
  &:hover {
    color: #7cd1b8;
  }
`;

// 쓰레기통 보여주는 컴포넌트
const Remove = styled.div`
  width: fit-content;
  color: #dee2e6;
  font-size: 1.2rem;
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
