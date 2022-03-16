import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";
import * as Api from "../../api";

const Certificates = ({ portfolioOwnerId, isEditable }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [certificateList, setCertificateList] = useState([]);

  //   useEffect(() => {
  //     Api.get("certificatelist", portfolioOwnerId).then((res) =>
  //       setCertificateList(res.data)
  //     );
  //   }, [portfolioOwnerId]);

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
          <Row className="text-center">
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
            portfolioOwnerId={portfolioOwnerId}
            setCertificateList={setCertificateList}
          />
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default Certificates;
