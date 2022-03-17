import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

const CertificateAddForm = ({ setIsAdding, user, setCertificateList }) => {
  const defaultDate = new Date().toISOString().substring(0, 10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const when_date = e.target.date.value;

    if (!title || !description) return;

    const data = { user_id: user.id, title, description, when_date };
    const res = await Api.post("certificate/create", data);
    const _id = res.data._id;

    setCertificateList((current) => {
      return [...current, { _id, title, description, date: when_date }];
    });
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Control
        className="mt-3"
        type="text"
        placeholder="자격증 제목"
        name="title"
      />
      <Form.Control
        className="mt-3"
        type="text"
        placeholder="상세내역"
        name="description"
      />
      <Form.Control
        className="mt-3"
        type="date"
        defaultValue={defaultDate}
        name="date"
      />
      <Row className="text-center mt-3">
        <Col>
          <Button variant="primary" type="submit">
            확인
          </Button>
          <Button
            className="ms-3"
            variant="secondary"
            onClick={() => setIsAdding(false)}
          >
            취소
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CertificateAddForm;
