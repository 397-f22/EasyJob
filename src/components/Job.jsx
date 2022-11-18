import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

export const Job = ({ company, jobTitle, appliedOn, status, deadline }) => {
  const [openJob, setOpenJob] = useState(false);

  return (
    <>
      <div onClick={() => setOpenJob(!openJob)}>
        {openJob ? <BsChevronUp /> : <BsChevronDown />}
      </div>

      <Collapse in={openJob}>
        <div id="example-collapse-text">
          <p>{company}</p>
          <p>{jobTitle}</p>
          <p>{appliedOn}</p>
          <p>{status}</p>
          <p>{deadline}</p>
        </div>
      </Collapse>
    </>
  );
};
