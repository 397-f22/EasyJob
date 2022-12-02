import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { addJob } from "../utilities/firebase";

//WHAT'S NEW:
//Copied and adapted from EasyTutor
//See comments below for design questions

/*
    Design Questions:
    
    I did not add in the "Status" field, because I assumed if you add a job, the status would be applied
    This can change if it's the case that you can add in a job at any particular level in the hiring process
    
    Code for that is here:

    --------------------------------------------------------------------------------------------------
    //UseState Code
    const [jobStatus, setStatus] = useState("");
    
    //HTML Elements
    <Form.Group className="mb-3" controlId="course">
        <Form.Label>Status</Form.Label>
        <Form.Select onChange={(evt) => setStatus(evt.target.value)}>
          <option>Select Your Course</option>
          <option value="applied">Applied</option>
          <option value="oa">Online Assessment</option>
          <option value="interview">Interview</option>
        </Form.Select>
      </Form.Group>
    --------------------------------------------------------------------------------------------------

    Along with that, I believe there should be a link attached to the job that directs you to the company application page:

    --------------------------------------------------------------------------------------------------
    <Form.Group className="mb-3" controlId="link">
          <Form.Label>Link to Application</Form.Label>
          <Form.Control type="text" />
    </Form.Group>
    --------------------------------------------------------------------------------------------------

*/

const ButtonBar = ({ disabled }) => {
    const navigate = useNavigate();
    return (
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-outline-dark me-2"
          onClick={() => navigate("/jobs")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary me-auto"
          disabled={disabled}
        >
          Submit
        </button>
      </div>
    );
  };


export const AddJob = ({ user }) => {
    const navigate = useNavigate();
  
    const handleSubmit = (evt) => {
      evt.preventDefault();
      const formData = evt.target;
      const appliedOn = new Date(`${formData.appliedOn.value}`);
      const deadline = "";
      const status = "Applied";

      addJob(
        formData.company.value,
        formData.jobTitle.value,
        appliedOn,
        deadline,
        status,
        user.uid
      );
      navigate("/jobs");
    };

    return (
      <Form className="p-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="company">
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="jobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control type="text" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="appliedOn">
          <Form.Label>Date Applied On</Form.Label>
          <Form.Control type="date" />
        </Form.Group>
  
        <ButtonBar />
      </Form>
    );
  };
  