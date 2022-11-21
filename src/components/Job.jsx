import "./Jobs.css";

import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";

import Collapse from "react-bootstrap/Collapse";
import { Status } from "../utilities/constants";
import { updateStatus } from "../utilities/firebase";
import { useState } from "react";

export const Job = ({
  id,
  company,
  jobTitle,
  appliedOn,
  status,
  deadline,
  user,
}) => {
  const [openJob, setOpenJob] = useState(false);

  const appliedDate = new Date(appliedOn).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const deadlineDate = new Date(deadline).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Card className="m-2">
        <Card.Header onClick={() => setOpenJob(!openJob)}>
          <div className="job-title">
            {company} - {jobTitle}
            {openJob ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </Card.Header>
        <Collapse in={openJob}>
          <Card.Body>
            <Card.Text>Applied on {appliedDate}</Card.Text>
            <Card.Text>{status}</Card.Text>
            {deadline && <Card.Text>{deadlineDate}</Card.Text>}
            <DropdownButton variant="secondary" title="Change Status">
              {Object.values(Status).map((status) => (
                <Dropdown.Item
                  key={status}
                  onClick={() => updateStatus(user.uid, id, status)}
                >
                  {status}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Card.Body>
        </Collapse>
      </Card>
    </>
  );
};
