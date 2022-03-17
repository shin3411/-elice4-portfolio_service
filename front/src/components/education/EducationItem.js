import React, { useState } from "react";
import { Button } from "react-bootstrap";

// 학력 목록을 보여주는 컴포넌트 입니다.
// 목록에는 학교, 학과, 졸업 상태, 편집 버튼이 있습니다.
const EducationItem = ({
  id,
  school,
  major,
  position,
  edit,
  onEdit,
  setIsEditing,
}) => {
  console.log("item");
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <ul
        style={{
          listStyle: "none",
        }}
      >
        <li>{school}</li>
        <li>
          {major} ({position})
        </li>
      </ul>
      <Button
        variant="outline-info"
        className=""
        onClick={() => setIsEditing(true)}
        style={{ margin: "13px" }}
      >
        편집
      </Button>
    </div>
  );
};

export default EducationItem;
