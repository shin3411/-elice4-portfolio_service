import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import ProjectEditForm from "./ProjectEditForm";
import * as Api from "../../api";

// project 목록 중 하나를 나타내는 컴포넌트
// 편집 버튼을 누르면 편집폼(ProjectEditForm)이 나타남
const ProjectCard = ({ project, isEditable, setProjectList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);

  const handleDelete = () => {
    try {
      Api.delete("projects", project.id);

      setProjectList((current) => {
        const deleted = current.filter((i) => i.id !== project.id);
        return deleted;
      });
    } catch (e) {
      console.log(e);
    }

    setShow(false);
  };
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

        {isEditable && !isEditing && (
          <>
            <Col xs={2} className="text-center">
              <Button
                className="me-2"
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                편집
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  setShow(true);
                }}
              >
                삭제
              </Button>
            </Col>
          </>
        )}
      </Row>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>프로젝트 삭제</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>정말로 삭제하시겠습니까?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShow(false);
            }}
          >
            닫기
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            삭제
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProjectCard;
