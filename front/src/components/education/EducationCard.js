import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

import EducationEditForm from "./EducationEditForm";

// 학력 목록 하나를 그리는 컴포넌트입니다.
// 편집 버튼을 클릭하면 학력 목록에서 편집 폼으로 바뀝니다.
const EducationCard = ({ education, isEditable, setEducationList }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mb-3">
      <Row>
        {isEditing ? (
          <EducationEditForm
            education={education}
            setEducationList={setEducationList}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Col>
            <div>{education.school}</div>
            <div className="text-muted">
              {education.major}({education.position})
            </div>
          </Col>
        )}
        {!isEditing && (
          <Col xs={1}>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              편집
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default EducationCard;
