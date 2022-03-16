import React, { useEffect } from "react";
import { Form, Button, ButtonGroup } from "react-bootstrap";

import EducationEditForm from "./EducationEditForm";
import EducationItem from "./EducationItem";
import { mockData } from "./mockData";

import { useRecoilState } from "recoil";
import educationListState from "./atom/educationListState";
import editEducationState from "./atom/editEducationState";

const EducationList = () => {
  const [educationList, setEducationList] = useRecoilState(educationListState);
  const [isEdit, setIsEdit] = useRecoilState(editEducationState);

  useEffect(() => {
    setEducationList(mockData);
  }, []);

  return (
    <div>
      {educationList.map((list, idx) => (
        <EducationItem
          key={idx}
          id={list.id}
          idx={idx}
          school={list.school}
          major={list.major}
          position={list.position}
          edit={list.edit}
        />
      ))}
    </div>
  );
};

export default EducationList;
