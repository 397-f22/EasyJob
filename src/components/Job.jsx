import "./Jobs.css";

import {
    BsAlarmFill,
    BsChevronDown,
    BsChevronUp,
    BsFillCalendarCheckFill,
    BsLink45Deg,
    BsSpeedometer,
    BsTrash,
} from "react-icons/bs";
import { Button, Card, Dropdown, DropdownButton } from "react-bootstrap";
import { removeJob, updateDeadline, updateStatus } from "../utilities/firebase";

import Collapse from "react-bootstrap/Collapse";
import { DeadlineUpdater } from "./DeadlineUpdater";
import { Status } from "../utilities/constants";
import { useState } from "react";

export const Job = ({
    id,
    company,
    jobTitle,
    appliedOn,
    status,
    deadline,
    user,
    tab,
}) => {
    const [openJob, setOpenJob] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const appliedDate = new Date(appliedOn).toLocaleString("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const deadlineDate = new Date(deadline).toLocaleString("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    var deadlineText;
    switch (status) {
        case "Online Assessment":
            deadlineText = "Due by ";
            break;
        case "Interview":
            deadlineText = "Scheduled for ";
            break;
        case "Offered":
            deadlineText = "Accept by ";
            break;
    }

    return (
        <div data-testid={status + " Job"}>
            <Card className="m-2">
                <Card.Header onClick={() => setOpenJob(!openJob)}>
                    <div className="job-title">
                        <p></p>
                        <div className="job-title-middle">
                            <p className="company-text">{company}</p> &nbsp; |
                            &nbsp; <p className="role-text">{jobTitle}</p>
                        </div>
                        {openJob ? <BsChevronUp /> : <BsChevronDown />}
                    </div>
                </Card.Header>

                <DeadlineUpdater
                    show={showModal}
                    setShow={setShowModal}
                    userid={user.uid}
                    jobid={id}
                />

                <Collapse in={openJob}>
                    <Card.Body>
                        <Card.Text>
                            {" "}
                            <BsFillCalendarCheckFill className="icon" /> Applied
                            on {appliedDate}
                        </Card.Text>
                        {/* <Card.Text> <BsLink45Deg className="icon" /> {url} </Card.Text> */}
                        {tab === "All" ? (
                            <Card.Text>
                                {" "}
                                <BsSpeedometer className="icon" />
                                {status}
                            </Card.Text>
                        ) : (
                            ""
                        )}
                        {deadline && (
                            <Card.Text>
                                {" "}
                                <BsAlarmFill className="icon" />
                                {deadlineText}
                                {deadlineDate}
                            </Card.Text>
                        )}
                        <DropdownButton
                            variant="secondary"
                            title="Change Status"
                        >
                            {Object.values(Status).map((status) => (
                                <Dropdown.Item
                                    key={status}
                                    onClick={() => {
                                        if (
                                            status == Status.OA ||
                                            status == Status.Interview ||
                                            status == Status.Offered
                                        ) {
                                            setShowModal(true);
                                        } else {
                                            updateDeadline(user.uid, id, "");
                                        }
                                        updateStatus(user.uid, id, status);
                                    }}
                                >
                                    {status}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <Card.Text>
                            {" "}
                            <Button
                                variant="outline-secondary"
                                id="trashIcon"
                                data-testid={`delete-${tab}-${id}`}
                                onClick={() => removeJob(user.uid, id)}
                            >
                                <BsTrash className="icon" />
                            </Button>
                        </Card.Text>
                    </Card.Body>
                </Collapse>
            </Card>
        </div>
    );
};
