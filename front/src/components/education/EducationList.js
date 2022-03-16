import React, { useEffect } from "react";
import { Form, Button, ButtonGroup } from "react-bootstrap";

import EducationEditForm from "./EducationEditForm";
import EducationItem from "./EducationItem";
import { mockData } from "./mockData";

import { useRecoilState } from "recoil";
import educationListState from "./atom/educationListState";

// 학력 목록을 보여주는 컴포넌트 입니다. edit의 true/false에 따라 EducationItem, EducationEditForm을 렌더링 합니다.
const EducationList = () => {
  const [educationList, setEducationList] = useRecoilState(educationListState);

  useEffect(() => {
    setEducationList(mockData);
  }, []);

  // edit의 value를 true로 바꾸어주는 함수입니다. 편집 버튼을 눌렀을 때 실행되며
  // edit을 true로 바꾸면 편집 폼으로 바뀝니다.
  const onEdit = (id) => {
    setEducationList(
      educationList.map((list) =>
        list.id === id ? { ...list, edit: true } : list
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
