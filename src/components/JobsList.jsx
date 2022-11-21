import { Job } from "./Job";

export const JobsList = ({ jobs, status }) => {
  if (jobs) {
    const filteredJobs = Object.entries(jobs).filter(
      ([id, job]) => status === undefined || job.status === status
    );
    return (
      <div>
        {filteredJobs.length === 0
          ? "No jobs with this status"
          : filteredJobs.map(([id, job]) => {
              return (
                <Job
                  key={id}
                  company={job.company}
                  jobTitle={job.jobTitle}
                  appliedOn={job.appliedOn}
                  status={job.status}
                  deadline={job.deadline}
                />
              );
            })}
      </div>
    );
  }
  return "No Jobs";
};
