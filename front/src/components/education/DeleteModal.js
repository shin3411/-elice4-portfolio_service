import { Modal, Button } from "react-bootstrap";

import { useRecoilState } from "recoil";
import educationListState from "../../atom/educationListState";
import * as Api from "../../api";

// 학력 삭제 버튼을 누르면 나타나는 모달입니다.
const DeleteModal = ({ education, showModal, setShowModal }) => {
  const [, setEducationList] = useRecoilState(educationListState);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await Api.delete("educations", education.id);
    } catch (err) {
      alert("해당 학적이 존재하지 않습니다.");
    }
    setEducationList((prev) => {
      const newEdu = prev.filter((v) => v.id !== education.id);
      return newEdu;
    });
  };
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>학력 삭제</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>정말로 삭제 하시겠습니까?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          삭제
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
