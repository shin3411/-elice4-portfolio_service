import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as Api from "../../api";

const CertificateEditForm = ({
  certificate,
  setCertificateList,
  setIsEditing,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const when_date = e.target.date.value;
    console.log(title, description, when_date);

    // Api.put(`certificates/{certificate.id}`, {title, description, when_date})
    // setCertificateList((current) => {
    //   const newCertificates = current.map((i) => {
    //     if (i.id === certificate.id) {
    //       return { id: certificate.id, title, description, when_date };
    //     } else {
    //       return i;
    //     }
    //   });
    //   return newCertificates;
    // });
    setIsEditing(false);
  };

  return (
    <Col>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          className="mt-3"
          type="text"
          name="title"
          defaultValue={certificate.title}
        />
        <Form.Control
          className="mt-3"
          type="text"
          name="description"
          defaultValue={certificate.description}
        />
        <Form.Control
          className="mt-3"
          type="date"
          name="date"
          defaultValue={certificate.when_date}
        />
        <Row className="text-center mt-3">
          <Col>
            <Button variant="primary" type="submit">
              확인
            </Button>
            <Button
              className="ms-3"
              variant="secondary"
              onClick={() => setIsEditing(false)}
            >
              취소
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default CertificateEditForm;
