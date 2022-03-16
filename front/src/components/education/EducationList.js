import React, { useEffect } from "react";
import { Form, Button, ButtonGroup } from "react-bootstrap";

import EducationEditForm from "./EducationEditForm";
import EducationItem from "./EducationItem";
import { mockData } from "./mockData";

import { useRecoilState } from "recoil";
import educationListState from "./atom/educationListState";

const EducationList = () => {
  const [educationList, setEducationList] = useRecoilState(educationListState);

  useEffect(() => {
    setEducationList(mockData);
  }, []);
  const onEdit = (idx) => {
    setEducationList(
      educationList.map((list) =>
        list.id === idx ? { ...list, edit: !list.edit } : list
      )
    );
  };

  return (
    <div>
      {educationList.map((list, idx) =>
        !list.edit ? (
          <EducationItem
            key={idx}
            id={list.id}
            idx={idx}
            school={list.school}
            major={list.major}
            position={list.position}
            edit={list.edit}
            onEdit={onEdit}
          />
        ) : (
          <EducationEditForm
            id={list.id}
            idx={idx}
            school={list.school}
            major={list.major}
            position={list.position}
            edit={list.edit}
            onEdit={onEdit}
          />
        )
      )}
    </div>
  );
};

export default EducationList;
