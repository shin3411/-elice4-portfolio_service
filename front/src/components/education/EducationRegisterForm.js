import React, { useState, useRef } from "react";

import { Form, Button, ButtonGroup } from "react-bootstrap";

import { useRecoilState } from "recoil";
import addEducationState from "./atom/addEducationState";
import educationListState from "./atom/educationListState";

const EducationRegisterForm = ({}) => {
  const [educationList, setEducationList] = useRecoilState(educationListState);
  const [isAddEducation, setIsAddEducation] = useRecoilState(addEducationState);

  const nextId = useRef(educationList.length);

  const [inputs, setInputs] = useState({
    id: nextId.current,
    school: "",
    major: "",
    position: "",
  });

  console.log("register");

  const onSubmit = (e) => {
    e.preventDefault();
    setEducationList([...educationList, inputs]);
    console.log(nextId.current);
    nextId.current += 1;
    setInputs({
      id: nextId.current,
      school: "",
      major: "",
      position: "",
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };

  return (
    <Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          name="school"
          defaultValue={inputs.school}
          onChange={onChange}
          className="m-2"
          type="text"
          placeholder="학교 이름"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
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
