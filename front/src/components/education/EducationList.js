import React, { useEffect, useContext, useState } from "react";

import EducationEditForm from "./EducationEditForm";
import EducationItem from "./EducationItem";

import { useRecoilState } from "recoil";
import educationListState from "./atom/educationListState";

import * as Api from "../../api";
import { UserStateContext } from "../../App";

// 학력 목록을 보여주는 컴포넌트 edit의 true/false에 따라 EducationItem, EducationEditForm을 렌더링 합니다.
const EducationList = ({ fetch }) => {
  const [educationList, setEducationList] = useRecoilState(educationListState);
  const userState = useContext(UserStateContext);

  useEffect(() => {
    fetch();
    console.log("fetch");
  }, []);

  // edit의 value를 true, false로 바꾸어주는 함수입니다. 편집 버튼을 눌렀을 때 실행되며
  // edit을 true로 바꾸면 편집 폼으로 바뀝니다.
  const onEdit = (id) => {
    setEducationList(
      educationList.map((list) =>
        list.id === id ? { ...list, edit: !list.edit } : list
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
