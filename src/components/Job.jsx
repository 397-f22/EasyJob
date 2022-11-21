import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { Card } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";

export const Job = ({ company, jobTitle, appliedOn, status, deadline }) => {
  const [openJob, setOpenJob] = useState(true);

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
      <Card>
        <Card.Header onClick={() => setOpenJob(!openJob)}>
          {company} - {jobTitle}
        </Card.Header>
        <Collapse in={openJob}>
          <Card.Body>
            <Card.Text>Applied on {appliedDate}</Card.Text>
            <Card.Text>{status}</Card.Text>
            {deadline && <Card.Text>{deadlineDate}</Card.Text>}
          </Card.Body>
        </Collapse>
      </Card>
    </>
  );
};
