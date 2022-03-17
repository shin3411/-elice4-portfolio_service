import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import * as Api from "../../api";

import EducationEditForm from "./EducationEditForm";
import { useRecoilState } from "recoil";
import addEducationState from "./atom/addEducationState";

// EducationMVP 전체를 담고있는 컴포넌트 입니다.
// isAddEducation의 상태를 통해 +버튼을 누르면 EducationRegisterForm이 렌더링되어
// 학력 추가를 할 수 있습니다.
const EducationCard = ({ education, isEditable, setEducationList }) => {
  const [isAddEducation, setIsAddEducation] = useRecoilState(addEducationState);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mb-3">
      <Row>
        {isEditing ? (
          <EducationEditForm
            education={education}
            setIsEditing={setIsEditing}
            setEducationList={setEducationList}
          />
        ) : (
          <Col>
            <div>{education.school}</div>
            <div className="text-muted">
              {education.major}({education.position})
            </div>
          </Col>
        )}
        {isEditable ? (
          <Col xs={1}>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              편집
            </Button>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default EducationCard;
