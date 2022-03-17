import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";
import * as Api from "../../api";

const mockData = [
  {
    _id: 1,
    title: "web1",
    description: "front",
    fromDate: "2022-03-01",
    toDate: "2022-03-14",
  },
  {
    _id: 2,
    title: "web2",
    description: "back",
    fromDate: "2022-03-02",
    toDate: "2022-03-12",
  },
];
// Project MVP 전체를 담는 컴포넌트
const Projects = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [projectList, setProjectList] = useState(mockData);
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
