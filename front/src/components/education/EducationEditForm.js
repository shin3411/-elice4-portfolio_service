import React from "react";
import { Button, Form } from "react-bootstrap";

import { useRecoilState } from "recoil";
import editEducationState from "./atom/editEducationState";

const EducationEditFrom = ({ key, id, idx, school, major, position, edit }) => {
  const [isEdit, setIsEdit] = useRecoilState(editEducationState);
  console.log("isEdit");
  return (
    <Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control className="m-2" type="text" placeholder="학교 이름" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control className="m-2" type="text" placeholder="전공" />
      </Form.Group>
      <Form.Group key=" inline-radio" className="mb-3 m-2">
        <Form.Check
          inline
          label="재학 중"
          name="group1"
          type="radio"
          id={`inline-radio-1`}
        />
        <Form.Check
          inline
          label="학사 졸업"
          name="group1"
          type="radio"
          id={`inline-radio-2`}
        />
        <Form.Check
          inline
          label="석사 졸업"
          name="group1"
          type="radio"
          id={`inline-radio-3`}
        />
        <Form.Check
          inline
          label="박사 졸업"
          name="group1"
          type="radio"
          id={`inline-radio-4`}
        />
      </Form.Group>

      <div style={{ textAlign: "center" }} className="mb-3">
        <Button
          onClick={() => {}}
          variant="primary"
          type="submit"
          style={{ marginRight: "10px" }}
        >
          확인
        </Button>
        <Button
          onClick={() => setIsEdit(false)}
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
