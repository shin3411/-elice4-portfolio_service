import React from "react";
import EducationCard from "./EducationCard";

import { useRecoilState } from "recoil";
import educationListState from "../../atom/educationListState";

// 각 학력을 담고 있는 컴포넌트입니다.
const Education = ({ isEditable }) => {
  const [educationList, setEducationList] = useRecoilState(educationListState);
  return (
    <>
      {educationList.map((education) => (
        <EducationCard
          key={education.id}
          education={education}
          isEditable={isEditable}
          setEducationList={setEducationList}
        />
      ))}
    </>
  );
};

export default Education;
