import React, { useState, useEffect } from "react";
import { Form, Button, ButtonGroup } from "react-bootstrap";

import EducationRegisterForm from "./EducationRegisterForm";
import EducationList from "./EducationList";
import { useRecoilState } from "recoil";
import addEducationState from "./atom/addEducationState";

const Education = () => {
  const [isAddEducation, setIsAddEducation] = useRecoilState(addEducationState);

  return (
    <>
      <Form style={{ border: "2px solid #d3d3d3", borderRadius: "5px" }}>
        <Form.Group>
          <Form.Label className="m-3" style={{ fontSize: "20px" }}>
            학력
          </Form.Label>
        </Form.Group>
        <EducationList />
        <Form.Group className="text-center m-3">
          <Button className="mb-3" onClick={() => setIsAddEducation(true)}>
            +
          </Button>
        </Form.Group>
        {isAddEducation ? <EducationRegisterForm /> : ""}
      </Form>
    </>
  );
};

export default Education;
