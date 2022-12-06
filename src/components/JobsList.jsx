import { Job } from "./Job";

export const JobsList = ({ jobs, status, user }) => {
  if (jobs) {
    const filteredJobs = Object.entries(jobs).filter(
      ([id, job]) => status === "All" || job.status === status
    );
    return (
      <div data-testid={status + " List"}>
        {filteredJobs.length === 0
          ? "No jobs with this status"
          : filteredJobs.map(([id, job]) => {
              return (
                <Job
                  key={id}
                  id={id}
                  company={job.company}
                  jobTitle={job.jobTitle}
                  appliedOn={job.appliedOn}
                  status={job.status}
                  deadline={job.deadline}
                  user={user}
                  tab={status}
                />
              );
            })}
      </div>
    );
  }
  return "No Jobs";
};
