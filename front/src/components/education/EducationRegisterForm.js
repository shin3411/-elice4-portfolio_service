import { Form, Button, ButtonGroup } from "react-bootstrap";
import { useRecoilState } from "recoil";
import addEducationState from "./atom/addEducationState";

const EducationRegisterForm = () => {
  const [isAddEducation, setIsAddEducation] = useRecoilState(addEducationState);
  console.log("register");
  return (
    <Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control className="m-2" type="text" placeholder="학교 이름" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control className="m-2" type="text" placeholder="전공" />
      </Form.Group>
      <Form.Group key=" inline-radio" className="mb-3 m-2">
        <Form.Check
          inline
          label="재학 중"
          name="group1"
          type="radio"
          id={`inline-radio-1`}
        />
        <Form.Check
          inline
          label="학사 졸업"
          name="group1"
          type="radio"
          id={`inline-radio-2`}
        />
        <Form.Check
          inline
          label="석사 졸업"
          name="group1"
          type="radio"
          id={`inline-radio-3`}
        />
        <Form.Check
          inline
          label="박사 졸업"
          name="group1"
          type="radio"
          id={`inline-radio-4`}
        />
      </Form.Group>

      <div style={{ textAlign: "center" }} className="mb-3">
        <Button
          onClick={() => setIsAddEducation(true)}
          variant="primary"
          type="submit"
          style={{ marginRight: "10px" }}
        >
          확인
        </Button>
        <Button
          onClick={() => setIsAddEducation(false)}
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

export default EducationRegisterForm;
