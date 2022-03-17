import React from "react";
import EducationCard from "./EducationCard";

import { useRecoilState } from "recoil";
import addEducationState from "./atom/addEducationState";
import educationListState from "./atom/educationListState";

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
