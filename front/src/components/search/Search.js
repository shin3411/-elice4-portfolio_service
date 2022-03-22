import React, { useState } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import AwardSearchForm from "./AwardSearchForm";
import EducationSearchForm from "./EducationSearchForm";
import ProjectSearchForm from "./ProjectSearchForm";
import CertificateSearchForm from "./CertificateSearchForm";

const Search = () => {
  const selectList = [
    { value: "educations", item: "학력" },
    { value: "awards", item: "수상이력" },
    { value: "projects", item: "프로젝트" },
    { value: "certificates", item: "자격증" },
  ];
  const [selected, setSelected] = useState("educations");

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

        {selected === "educations" && <EducationSearchForm />}
        {selected === "awards" && <AwardSearchForm />}
        {selected === "projects" && <ProjectSearchForm />}
        {selected === "certificates" && <CertificateSearchForm />}
      </Row>
    </Container>
  );
};

export default Search;
