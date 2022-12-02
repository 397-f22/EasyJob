import { Tab, Tabs } from "react-bootstrap";

import { JobsList } from "./JobsList";
import { Status } from "../utilities/constants";
import { AddJobButton } from "./AddJobButton";
import { AddJob } from "./AddJob";
import "./Subheader.css"

export const Subheader = ({ jobs, user }) => {
  return (
    <div>
    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="all" title="All">
        <JobsList jobs={jobs} status="All" user={user}  />
      </Tab>
      {Object.values(Status).map((status) => (
        <Tab key={status} eventKey={status} title={status}>
          <JobsList jobs={jobs} status={status} user={user}/>
        </Tab>
      ))}
      <Tab eventKey="add" title="Add Job" class="addbutton">
      <AddJob user = {user}></AddJob>
      </Tab>
    </Tabs>
    {/* <AddJobButton/> */}
    </div>
  );
};
