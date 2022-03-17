import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";
import * as Api from "../../api";
import { useRecoilState } from "recoil";
import addEducationState from "./atom/addEducationState";
import educationListState from "./atom/educationListState";

// + 버튼을 눌렀을 때 나타나는 학력 추가 컴포넌트 입니다.
// 사용자에게 입력받은 학력 내용을 추가해주는 기능을 합니다.
const EducationRegisterForm = ({ portfolioOwnerId }) => {
  const [educationList, setEducationList] = useRecoilState(educationListState);
  const [isAddEducation, setIsAddEducation] = useRecoilState(addEducationState);

  // 사용자의 입력을 받아 저장하기 위한 state입니다.
  const [inputs, setInputs] = useState({
    school: "",
    major: "",
    position: "",
  });

  // 확인 버튼을 눌렀을 때 실행되는 함수로, 입력받은 정보가 저장된 inputs를
  // POST 요청으로 db에 저장합니다.
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await Api.post("education/create", inputs);
    if (!response) {
      console.log("POST 요청 실패하였습니다.");
    }
    setEducationList((cur) => {
      return [...cur, response.data];
    });
    setIsAddEducation(false);
  };

  // input 창, radio 버튼을 통한 사용자 입력을 inputs에 저장하는 함수입니다.
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <Form.Group>
      <Form.Group className="m-3 mb-2">
        <Form.Control
          name="school"
          defaultValue={inputs.school}
          onChange={onChange}
          className="m-2"
          type="text"
          placeholder="학교 이름"
        />
      </Form.Group>

      <Form.Group className="m-3 mb-4">
        <Form.Control
          name="major"
          defaultValue={inputs.major}
          onChange={onChange}
          className="m-2"
          type="text"
          placeholder="전공"
        />
      </Form.Group>
      <Form.Group key=" inline-radio" className="mb-3 m-2">
        <Form.Check
          inline
          label="재학 중"
          name="position"
          type="radio"
          id={`inline-radio-1`}
          onChange={onChange}
          defaultValue={"재학 중"}
        />
        <Form.Check
          inline
          label="학사 졸업"
          name="position"
          type="radio"
          id={`inline-radio-2`}
          onChange={onChange}
          defaultValue={"학사 졸업"}
        />
        <Form.Check
          inline
          label="석사 졸업"
          name="position"
          type="radio"
          id={`inline-radio-3`}
          onChange={onChange}
          defaultValue={"석사 졸업"}
        />
        <Form.Check
          inline
          label="박사 졸업"
          name="position"
          type="radio"
          id={`inline-radio-4`}
          onChange={onChange}
          defaultValue={"박사 졸업"}
        />
      </Form.Group>

      <div style={{ textAlign: "center" }} className="mb-3">
        <Button
          onClick={onSubmit}
          variant="primary"
          type="submit"
          style={{ marginRight: "10px" }}
        >
          확인
        </Button>
        <Button
          onClick={() => setIsAddEducation(false)}
          variant="secondary"
          type="submit"
          style={{ marginLeft: "10px" }}
        >
          취소
        </Button>
      </div>
    </Form.Group>
  );
};

export default EducationRegisterForm;
