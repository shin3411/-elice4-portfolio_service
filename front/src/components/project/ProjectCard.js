import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";

// certificate 목록 중 하나를 나타내는 컴포넌트
// 편집 버튼을 누르면 편집폼(CertificateEditForm)이 나타남
const ProjectCard = ({ project, isEditable, setProjectList }) => {
  return (
    <div className="mb-3">
      <Row>
        <Col>
          <div>{project.title}</div>
          <div className="text-muted">{project.description}</div>
          <div className="text-muted">
            {project.from_date} ~ {project.to_date}
          </div>
        </Col>

        {isEditable ? (
          <Col xs={1}>
            <Button variant="outline-info" size="sm">
              편집
            </Button>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default ProjectCard;
