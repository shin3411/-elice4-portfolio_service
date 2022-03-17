import React, { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Education from "./Education";
import EducationRegisterForm from "./EducationRegisterForm";
import * as Api from "../../api";

import { useRecoilState } from "recoil";
import addEducationState from "./atom/addEducationState";
import educationListState from "./atom/educationListState";

// 학력 정보 전체를 담는 컴포넌트입니다.
const Educations = ({ portfolioOwnerId, isEditable }) => {
  const [isAddEducation, setIsAddEducation] = useRecoilState(addEducationState);
  const [educationList, setEducationList] = useRecoilState(educationListState);

  // 로그인한 유저의 모든 학력 정보를 불러와 저장합니다.
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
