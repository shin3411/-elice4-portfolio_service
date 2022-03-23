import React, { useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  InputGroup,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import * as Api from "../../api";

const ProjectSearchForm = ({ setData }) => {
  const [title, setTitle] = useState("");
  const [dateAfter, setDateAfter] = useState("");
  const [dateBefore, setDateBefore] = useState("");
  const [dateAfterValid, setDateAfterValid] = useState(false);
  const [dateBeforeValid, setDateBeforeValid] = useState(false);

  const dateValid = (!dateAfter && !dateBefore) || (dateAfter && dateBefore);
  const formValid = dateValid || (title && !dateAfter && !dateBefore);

  useEffect(() => {
    if (!dateAfter && dateBefore) {
      setDateAfterValid(true);
    } else if (dateAfter && !dateBefore) {
      setDateBeforeValid(true);
    } else {
      setDateAfterValid(false);
      setDateBeforeValid(false);
    }
  }, [dateAfter, dateBefore]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await Api.get("projects", "search", {
      title: title ? encodeURIComponent(title) : null,
      dateAfter: dateAfter ? dateAfter : null,
      dateBefore: dateBefore ? dateBefore : null,
    });

    if (data.length === 0) {
      const searchString = [title, `${dateAfter} ~ ${dateBefore}`].reduce(
        (acc, i) => {
          if (i !== "" && i !== " ~ ") {
            if (acc.length !== 0) return (acc += `, ${i}`);
            return (acc += i);
          } else {
            return acc;
          }
        },
        ""
      );
      setData({ none: `'${searchString}'에 대한 검색 결과가 없습니다.` });
    } else {
      setData({ projects: data });
    }
  };

  return (
    <Col xs={7}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={11}>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="프로젝트 제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <OverlayTrigger
                show={dateAfterValid}
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id="button-tooltip">시작일을 입력해주세요.</Tooltip>
                }
              >
                <Form.Control
                  type="text"
                  placeholder="시작일"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={dateAfter}
                  onChange={(e) => setDateAfter(e.target.value)}
                />
              </OverlayTrigger>
              <OverlayTrigger
                show={dateBeforeValid}
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip id="button-tooltip">종료일을 입력해주세요.</Tooltip>
                }
              >
                <Form.Control
                  type="text"
                  placeholder="종료일"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  value={dateBefore}
                  onChange={(e) => setDateBefore(e.target.value)}
                />
              </OverlayTrigger>
            </InputGroup>
          </Col>
          <Col xs={1}>
            <Row className="justify-content-center">
              <Button type="submit" disabled={!formValid}>
                검색
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </Col>
  );
};

export default ProjectSearchForm;
