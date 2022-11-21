import "./Jobs.css";

import { BsChevronDown, BsChevronUp, BsFillCalendarCheckFill, BsLink45Deg, BsAlarmFill, BsSpeedometer } from "react-icons/bs";
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
  tab
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

  var deadlineText;
  switch (status) {
    case "Online Assessment":
      deadlineText = "Due by "
      break;
    case "Interview":
      deadlineText = "Scheduled for "
      break;
    case "Offered":
      deadlineText = "Accept by "
      break;
  }

  return (
    <>
      <Card className="m-2">
        <Card.Header onClick={() => setOpenJob(!openJob)}>
          <div className="job-title">
            <p></p>
            <div className="job-title-middle">
            <p className="company-text">{company}</p> &nbsp; | &nbsp; <p className="role-text">{jobTitle}</p>
            </div>
            {openJob ? <BsChevronUp /> : <BsChevronDown />}
          </div>
        </Card.Header>
        <Collapse in={openJob}>
          <Card.Body>
            <Card.Text> <BsFillCalendarCheckFill className="icon"/> Applied on {appliedDate}</Card.Text>
            {/* <Card.Text> <BsLink45Deg className="icon" /> {url} </Card.Text> */}
            {tab === "All" ? <Card.Text> <BsSpeedometer className="icon" />{status}</Card.Text> : ""}
            {deadline && <Card.Text> <BsAlarmFill className="icon" />{deadlineText}{deadlineDate}</Card.Text>}
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
