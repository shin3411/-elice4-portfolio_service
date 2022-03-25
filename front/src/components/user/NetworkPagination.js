import React, { useMemo } from "react";
import { Row, Col, Form, Pagination } from "react-bootstrap";

const NetworkPagination = ({ page, lastPage, limit, setPage, setLimit }) => {
  const pagination = useMemo(() => {
    const pagination = [];
    for (let num = 1; num <= lastPage; num++) {
      pagination.push(
        <Pagination.Item
          key={num}
          active={num === page}
          onClick={() => setPage(num)}
        >
          {num}
        </Pagination.Item>
      );
    }
    return pagination;
  }, [lastPage, page]);

  return (
    <Row className="position-absolute start-50 translate-middle">
      <Col>
        <Form.Select
          value={limit}
          onChange={(e) => {
            setPage(1);
            setLimit(e.target.value);
          }}
        >
          <option value="4">4</option>
          <option value="8">8</option>
          <option value="16">16</option>
          <option value="32">32</option>
        </Form.Select>
      </Col>
      <Col>
        <Pagination>
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => setPage((cur) => cur - 1)}
          />
          {pagination}
          <Pagination.Next
            disabled={page === lastPage}
            onClick={() => setPage((cur) => cur + 1)}
          />
        </Pagination>
      </Col>
    </Row>
  );
};

export default NetworkPagination;
