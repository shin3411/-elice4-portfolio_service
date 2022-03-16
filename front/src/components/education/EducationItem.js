import React from "react";
import { Button } from "react-bootstrap";

import EducationEditForm from "./EducationEditForm";

import { useRecoilState } from "recoil";
import educationListState from "./atom/educationListState";

const EducationItem = ({ key, id, idx, school, major, position, edit }) => {
  const [educationList, setEducationList] = useRecoilState(educationListState);

  const onEdit = (idx) => {
    setEducationList((cur) => {
      const newList = [...cur, { ...cur[idx], edit: true }];
      return newList;
    });
  };
  console.log("item");
  return edit ? (
    ""
  ) : (
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
        variant="outline-success"
        className="m-4"
        onClick={() => onEdit(idx)}
      >
        편집
      </Button>
    </div>
  );
};

export default EducationItem;
