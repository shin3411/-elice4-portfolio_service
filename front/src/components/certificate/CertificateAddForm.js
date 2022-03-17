import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import * as Api from "../../api";

// + 버튼 클릭했을 때 + 버튼 하단에 나타나는 폼 컴포넌트
const CertificateAddForm = ({ setIsAdding, setCertificateList }) => {
  const defaultDate = new Date().toISOString().substring(0, 10);

  // 폼 제출시 실행되는 함수. 입력받은 정보를 post하고 certificateList에 합침
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 입력받은 정보 가져옴
    const title = e.target.title.value;
    const description = e.target.description.value;
    const date = e.target.date.value;

    // 입력받은 정보가 없으면 리턴. 제춡X
    if (!title || !description) return;

    const data = { title, description, date };
    const res = await Api.post("certificate/create", data);
    setCertificateList((current) => {
      return [...current, res.data];
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
