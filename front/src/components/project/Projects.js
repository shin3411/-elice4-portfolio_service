import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import * as Api from "../../api";

// Project MVP 전체를 담는 컴포넌트
const Projects = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  //   useEffect(() => {
  //     Api.get("projectlist", user.id).then((res) => setProjectList(res.data));
  //   }, [user]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <Project
          isEditable={isEditable}
          projectList={projectList}
          setProjectList={setProjectList}
        />
        {isEditable ? (
          <Row className="text-center mt-3 mb-4">
            <Col>
              <Button
                variant="primary"
                onClick={() => {
                  setIsAdding(true);
                }}
              >
                +
              </Button>
            </Col>
          </Row>
        ) : null}

        {isAdding ? (
          <ProjectAddForm
            setIsAdding={setIsAdding}
            user={user}
            setProjectList={setProjectList}
          />
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default Projects;
