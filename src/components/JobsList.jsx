import { jobs } from "../utilities/jobs.json";
import { Job } from "./Job";

export const JobsList = () => (
  <div>
    {Object.entries(jobs).map(([id, job]) => (
      <Job
        key={id}
        company={job.company}
        jobTitle={job.jobTitle}
        appliedOn={job.appliedOn}
        status={job.status}
        deadline={job.deadline}
      />
    ))}
  </div>
);
