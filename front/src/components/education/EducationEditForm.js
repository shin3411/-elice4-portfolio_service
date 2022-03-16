import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

import { useRecoilState } from "recoil";
import educationListState from "./atom/educationListState";

// 학력 편집 폼 컴포넌트입니다.
// 추가한 학력 중에서 골라 편집할 수 있습니다.
const EducationEditFrom = ({
  key,
  id,
  idx,
  school,
  major,
  position,
  edit,
  onEdit,
}) => {
  const [educationList, setEducationList] = useRecoilState(educationListState);

  const [inputs, setInputs] = useState({
    id,
    school,
    major,
    position,
    edit,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };

  // 확인 버튼을 누르면 실행되는 함수입니다.
  // id를 통해 수정한 데이터 객체를 찾고 수정해줍니다. edit을 false로 바꾸어 편집창을 닫습니다.
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    setEducationList(
      educationList.map((list) =>
        list.id === inputs.id ? { ...inputs, edit: false } : list
      )
    );
  };

  console.log("isEdit");
  return (
    <Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          name="school"
          defaultValue={inputs.school}
          className="m-2"
          type="text"
          placeholder="학교 이름"
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          name="major"
          defaultValue={inputs.major}
          className="m-2"
          type="text"
          placeholder="전공"
          onChange={onChange}
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
          defaultChecked={inputs.position === "재학 중" ? true : false}
        />
        <Form.Check
          inline
          label="학사 졸업"
          name="position"
          type="radio"
          id={`inline-radio-2`}
          onChange={onChange}
          defaultValue={"학사 졸업"}
          defaultChecked={inputs.position === "학사 졸업" ? true : false}
        />
        <Form.Check
          inline
          label="석사 졸업"
          name="position"
          type="radio"
          id={`inline-radio-3`}
          onChange={onChange}
          defaultValue={"석사 졸업"}
          defaultChecked={inputs.position === "석사 졸업" ? true : false}
        />
        <Form.Check
          inline
          label="박사 졸업"
          name="position"
          type="radio"
          id={`inline-radio-4`}
          defaultValue={"박사 졸업"}
          onChange={onChange}
          defaultChecked={inputs.position === "박사 졸업" ? true : false}
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
          onClick={() => onEdit(idx)}
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
