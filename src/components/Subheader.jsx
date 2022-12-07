import "./Subheader.css";

import { Tab, Tabs } from "react-bootstrap";

import { AddJob } from "./AddJob";
import { AddJobButton } from "./AddJobButton";
import { JobsList } from "./JobsList";
import { Status } from "../utilities/constants";

export const Subheader = ({ jobs, user }) => {
  return (
    <div>
      <Tabs
        defaultActiveKey="all"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="all" title="All" data-testid="all" id="all">
          <JobsList
            jobs={jobs}
            status="All"
            user={user}
            data-testid="all-joblist"
          />
        </Tab>
        {Object.values(Status).map((status) => (
          <Tab
            key={status}
            eventKey={status}
            title={status}
            data-testid={status}
            id={status}
          >
            <JobsList
              jobs={jobs}
              status={status}
              user={user}
              data-testid={{ status } + "jobsList"}
            />
          </Tab>
        ))}
        <Tab
          eventKey="add"
          title="Add Job"
          className="addbutton"
          data-testid="addJobButton"
          id="add "
        >
          <AddJob user={user}></AddJob>
        </Tab>
      </Tabs>
    </div>
  );
};
