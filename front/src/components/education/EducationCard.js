import React, { useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

import * as Api from "../../api";

import EducationRegisterForm from "./EducationRegisterForm";
import EducationList from "./EducationList";
import { useRecoilState } from "recoil";
import addEducationState from "./atom/addEducationState";
import educationListState from "./atom/educationListState";
import { UserStateContext } from "../../App";

// EducationMVP 전체를 담고있는 컴포넌트 입니다.
// isAddEducation의 상태를 통해 +버튼을 누르면 EducationRegisterForm이 렌더링되어
// 학력 추가를 할 수 있습니다.
const EducationCard = ({ portfolioOwnerId }) => {
  const [isAddEducation, setIsAddEducation] = useRecoilState(addEducationState);
  const [educationList, setEducationList] = useRecoilState(educationListState);
  const userState = useContext(UserStateContext);

  const fetch = async () => {
    const response = await Api.get("educationlist", portfolioOwnerId);
    console.log(response.data);
    setEducationList(response.data);
  };

  return (
    <>
      <Form style={{ border: "2px solid #d3d3d3", borderRadius: "5px" }}>
        <Form.Group>
          <Form.Label className="m-3" style={{ fontSize: "20px" }}>
            학력
          </Form.Label>
        </Form.Group>
        <EducationList fetch={fetch} />
        <Form.Group className="text-center m-3">
          <Button className="mb-3" onClick={() => setIsAddEducation(true)}>
            +
          </Button>
        </Form.Group>
        {isAddEducation ? <EducationRegisterForm fetch={fetch} /> : ""}
      </Form>
    </>
  );
};

export default EducationCard;
