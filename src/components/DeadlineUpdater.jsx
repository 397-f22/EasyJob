import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { updateDeadline } from "../utilities/firebase";

export const DeadlineUpdater = ({ show, setShow, userid, jobid }) => {
  const submitAndHide = (evt) => {
    evt.preventDefault();
    const formData = evt.target;
    updateDeadline(
      userid,
      jobid,
      new Date(`${formData.updateDeadline.value}`).toISOString()
    );
    setShow(false);
  };
  return (
    <Modal show={show} onHide={() => setShow(false)} className="Modal" centered>
      <Modal.Body>
        <Form onSubmit={submitAndHide}>
          <Form.Group className="mb-3" controlId="updateDeadline">
            <Form.Label>
              What is the deadline for this stage of the process?
            </Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <button type="submit" className="btn btn-primary me-auto">
            Update
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
