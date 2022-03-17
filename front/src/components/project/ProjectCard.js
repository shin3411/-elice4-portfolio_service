import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ProjectEditForm from "./ProjectEditForm";

// project 목록 중 하나를 나타내는 컴포넌트
// 편집 버튼을 누르면 편집폼(ProjectEditForm)이 나타남
const ProjectCard = ({ project, isEditable, setProjectList }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mb-3">
      <Row>
        {isEditing ? (
          <ProjectEditForm
            project={project}
            setProjectList={setProjectList}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Col>
            <div>{project.title}</div>
            <div className="text-muted">{project.description}</div>
            <div className="text-muted">
              {project.fromDate} ~ {project.toDate}
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

export default ProjectCard;
