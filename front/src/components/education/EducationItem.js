import React from "react";
import { Button } from "react-bootstrap";

const EducationItem = ({
  key,
  id,
  idx,
  school,
  major,
  position,
  edit,
  onEdit,
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
        variant="outline-success"
        className=""
        onClick={() => onEdit(idx)}
        style={{ margin: "13px" }}
      >
        편집
      </Button>
    </div>
  );
};

export default EducationItem;
