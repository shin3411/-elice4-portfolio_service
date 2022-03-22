import React, { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import CertificateEditForm from "./CertificateEditForm";
import * as Api from "../../api";

// certificate 목록 중 하나를 나타내는 컴포넌트
// 편집 버튼을 누르면 편집폼(CertificateEditForm)이 나타남
const CertificateCard = ({ certificate, isEditable, setCertificateList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState(false);

  const handleDelete = () => {
    try {
      Api.delete("certificates", certificate._id);

      setCertificateList((current) => {
        const deleted = current.filter((i) => i._id !== certificate._id);
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
          <CertificateEditForm
            certificate={certificate}
            setCertificateList={setCertificateList}
            setIsEditing={setIsEditing}
          />
        ) : (
          <Col>
            <div>{certificate.title}</div>
            <div className="text-muted">{certificate.description}</div>
            <div className="text-muted">
              {certificate.date.substring(0, 10)}
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
          <Modal.Title>자격증 삭제</Modal.Title>
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

export default CertificateCard;
