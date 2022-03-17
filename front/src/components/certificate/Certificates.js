import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";
import * as Api from "../../api";

// Certificate MVP 전체를 담는 컴포넌트
const Certificates = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [certificateList, setCertificateList] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  useEffect(() => {
    Api.get("certificatelist", user.id).then((res) =>
      setCertificateList(res.data)
    );
  }, [user]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        <Certificate
          isEditable={isEditable}
          certificateList={certificateList}
          setCertificateList={setCertificateList}
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
          <CertificateAddForm
            setIsAdding={setIsAdding}
            setCertificateList={setCertificateList}
          />
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default Certificates;
