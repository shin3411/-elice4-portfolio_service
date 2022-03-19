import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import * as Api from "../../api";

// certificate 편집 폼 컴포넌트
const CertificateEditForm = ({
  certificate,
  setCertificateList,
  setIsEditing,
}) => {
  // 폼 제출 시 실행되는 함수. 입력받은 정보를 put하고 certificateList에 적용
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 입력받은 정보 가져옴
    const title = e.target.title.value;
    const description = e.target.description.value;
    const date = e.target.date.value;

    try {
      const res = await Api.put(`certificates/${certificate._id}`, {
        title,
        description,
        date,
      });
      const editedCertificate = res.data;

      setIsEditing(false);

      setCertificateList((current) => {
        const newCertificateList = current.map((i) => {
          if (i._id === certificate._id) {
            return editedCertificate;
          } else {
            return i;
          }
        });
        return newCertificateList;
      });
    } catch (e) {
      console.log(e);
    }
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
          defaultValue={certificate.date.substring(0, 10)}
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
