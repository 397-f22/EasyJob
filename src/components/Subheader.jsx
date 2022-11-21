import { Tab, Tabs } from "react-bootstrap";

import { JobsList } from "./JobsList";
import { Status } from "../utilities/constants";

export const Subheader = ({ jobs }) => {
  return (
    <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3">
      <Tab eventKey="all" title="All">
        <JobsList jobs={jobs} />
      </Tab>
      {Object.values(Status).map((status) => (
        <Tab key={status} eventKey={status} title={status}>
          <JobsList jobs={jobs} status={status} />
        </Tab>
      ))}
    </Tabs>
  );
};
