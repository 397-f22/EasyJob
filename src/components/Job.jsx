import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { Card } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";

export const Job = ({ company, jobTitle, appliedOn, status, deadline }) => {
  const [openJob, setOpenJob] = useState(true);
  // console.log(company);
  return (
    <>
      <Card>
        <Card.Header onClick={() => setOpenJob(!openJob)}>
          {company}
        </Card.Header>
        <Collapse in={openJob}>
          <Card.Body>
            <Card.Text>{jobTitle}</Card.Text>
            <Card.Text>{appliedOn}</Card.Text>
            <Card.Text>{status}</Card.Text>
            <Card.Text>{deadline}</Card.Text>
          </Card.Body>
        </Collapse>
      </Card>
    </>
  );
};
