import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import { UserStateContext } from "../../App";

import AwardSearchForm from "./AwardSearchForm";
import EducationSearchForm from "./EducationSearchForm";
import ProjectSearchForm from "./ProjectSearchForm";
import CertificateSearchForm from "./CertificateSearchForm";

const Search = () => {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);

  const selectList = [
    { value: "educations", item: "학력" },
    { value: "awards", item: "수상이력" },
    { value: "projects", item: "프로젝트" },
    { value: "certificates", item: "자격증" },
  ];
  const [selected, setSelected] = useState("educations");
  const [data, setData] = useState({});

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
  }, [userState, navigate]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={2}>
          <Form.Select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {selectList.map(({ value, item }) => (
              <option value={value} key={value}>
                {item}
              </option>
            ))}
          </Form.Select>
        </Col>

        {selected === "educations" && <EducationSearchForm setData={setData} />}
        {selected === "awards" && <AwardSearchForm setData={setData} />}
        {selected === "projects" && <ProjectSearchForm setData={setData} />}
        {selected === "certificates" && (
          <CertificateSearchForm setData={setData} />
        )}
      </Row>
    </Container>
  );
};

export default Search;
