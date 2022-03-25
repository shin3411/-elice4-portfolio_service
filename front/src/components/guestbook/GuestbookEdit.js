import React from "react";
import { Form, Button } from "react-bootstrap";

const GuestbookEdit = () => {
  return (
    <Form.Group>
      <Form.Group className="mt-3" controlId="formBasicEmail">
        <Form.Control
          name="school"
          className="m-2"
          type="text"
          placeholder="학교 이름"
        />
      </Form.Group>

      <Form.Group className="mt-3" controlId="formBasicPassword">
        <Form.Control
          name="major"
          className="m-2"
          type="text"
          placeholder="전공"
        />
      </Form.Group>

      <div style={{ textAlign: "center" }} className="mb-3">
        <Button variant="primary" type="submit" style={{ marginRight: "10px" }}>
          확인
        </Button>
        <Button
          variant="secondary"
          type="submit"
          style={{ marginLeft: "10px" }}
        >
          취소
        </Button>
      </div>
    </Form.Group>
  );
};

export default GuestbookEdit;
