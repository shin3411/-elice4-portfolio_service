import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Education from "./Education";
import EducationRegisterForm from "./EducationRegisterForm";
import * as Api from "../../api";

import { useRecoilState } from "recoil";
import addEducationState from "./atom/addEducationState";
import educationListState from "./atom/educationListState";

const Educations = ({ portfolioOwnerId, isEditable }) => {
  const [isAddEducation, setIsAddEducation] = useRecoilState(addEducationState);
  const [educationList, setEducationList] = useRecoilState(educationListState);

  useEffect(() => {
    const fetch = async () => {
      const response = await Api.get("educationlist", portfolioOwnerId);
      setEducationList(response.data);
    };
    fetch();
  }, [portfolioOwnerId]);

  return (
    <Card className="mb-2">
      <Card.Body>
        <Card.Title>학력</Card.Title>
        <Education isEditable={isEditable} />
        {isEditable ? (
          <Row className="text-center mt-3 mb-4">
            <Col>
              <Button
                variant="primary"
                onClick={() => {
                  setIsAddEducation(true);
                }}
              >
                +
              </Button>
            </Col>
          </Row>
        ) : null}

        {isAddEducation ? (
          <EducationRegisterForm portfolioOwnerId={portfolioOwnerId} />
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default Educations;
