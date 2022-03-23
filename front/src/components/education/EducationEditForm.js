import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import * as Api from "../../api";

import { useRecoilState } from "recoil";
import educationListState from "../../atom/educationListState";

// 학력 편집 폼 컴포넌트 입니다.
// 추가한 학력 중에서 골라 편집할 수 있습니다.
const EducationEditFrom = ({ education, setIsEditing }) => {
  const [, setEducationList] = useRecoilState(educationListState);
  const grades = ["재학 중", "학사 졸업", "석사 졸업", "박사 졸업"];
  const [isDuplicate, setIsDuplicate] = useState(false); // 편집한 학력이 중복인지 확인하는 state

  const [inputs, setInputs] = useState({
    school: education.school,
    major: education.major,
    position: education.position,
  });

  // 학교 이름, 전공, 졸업 상태의 입력 여부를 확인
  const isSchoolValid = inputs.school.length > 0;
  const isMajorValid = inputs.major.length > 0;
  const isPositionValid = inputs.position !== "";
  const isFormValid = isSchoolValid && isMajorValid && isPositionValid;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 확인 버튼을 누르면 실행되는 함수입니다.
  // PUT 요청으로 학력 정보를 수정합니다.
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.put(`educations/${education.id}`, inputs);
      const editedEdu = response.data;
      setIsEditing(false);

      setEducationList((prev) => {
        const newEdu = prev.map((v) => {
          if (v.id === education.id) {
            return editedEdu;
          } else return v;
        });
        return newEdu;
      });
    } catch (e) {
      setIsDuplicate(true);
    }
  };

  return (
    <Form.Group>
      <Form.Group className="mt-3" controlId="formBasicEmail">
        <Form.Control
          name="school"
          defaultValue={inputs.school}
          className="m-2"
          type="text"
          placeholder="학교 이름"
          onChange={onChange}
        />
        {!isSchoolValid && (
          <Form.Text className="text-success">필수 입력사항입니다.</Form.Text>
        )}
        {isDuplicate && (
          <Form.Text className="text-success">중복된 학적입니다.</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mt-3" controlId="formBasicPassword">
        <Form.Control
          name="major"
          defaultValue={inputs.major}
          className="m-2"
          type="text"
          placeholder="전공"
          onChange={onChange}
        />
        {!isMajorValid && (
          <Form.Text className="text-success">필수 입력사항입니다.</Form.Text>
        )}
      </Form.Group>
      <Form.Group key="inline-radio" className="mt-3 mb-2">
        {grades.map((grade, idx) => (
          <Form.Check
            key={`inline-radio-${idx}`}
            inline
            label={grade}
            name="position"
            type="radio"
            id={`inline-radio-${idx}`}
            onChange={onChange}
            defaultValue={grade}
            defaultChecked={inputs.position === grade ? true : false}
          />
        ))}
      </Form.Group>

      <div style={{ textAlign: "center" }} className="mb-3">
        <Button
          onClick={onSubmit}
          variant="primary"
          type="submit"
          style={{ marginRight: "10px" }}
          disabled={!isFormValid}
        >
          확인
        </Button>
        <Button
          onClick={() => setIsEditing(false)}
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

export default EducationEditFrom;
