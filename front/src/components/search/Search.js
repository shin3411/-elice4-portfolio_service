import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Row, Col } from "react-bootstrap";
import { UserStateContext } from "../../App";

import AwardSearchForm from "./AwardSearchForm";
import AwardList from "./AwardList";
import EducationSearchForm from "./EducationSearchForm";
import EducationList from "./EducationList";
import ProjectSearchForm from "./ProjectSearchForm";
import ProjectList from "./ProjectList";
import CertificateSearchForm from "./CertificateSearchForm";
import CertificateList from "./CertificateList";

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
    <Container id="search-container">
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

      <Row className="justify-content-center mt-5">
        {data.educations &&
          data.educations.map((education) => {
            return <EducationList key={education._id} education={education} />;
          })}
        {data.awards &&
          data.awards.map((award) => {
            return <AwardList key={award._id} award={award} />;
          })}
        {data.projects &&
          data.projects.map((project) => {
            return <ProjectList key={project._id} project={project} />;
          })}
        {data.certificates &&
          data.certificates.map((certificate) => {
            return (
              <CertificateList
                key={certificate._id}
                certificate={certificate}
              />
            );
          })}
      </Row>
    </Container>
  );
};

export default Search;
