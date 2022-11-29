import { Job } from "./Job";
import { Navigate, useNavigate } from "react-router-dom";

//WHAT'S NEW:
//Added the AddJob button
//Add a job button
//If anyone knows how to center a button, please center the addjob button

const AddJobButton = () => {
  const navigate = useNavigate();

  function gotoAddJob() {
    navigate("/addJob");
  }

  return (
    <button className="btn btn-dark" onClick={gotoAddJob}>
      Add a Job
    </button>
  );
}

export const JobsList = ({ jobs, status, user }) => {
  if (jobs) {
    const filteredJobs = Object.entries(jobs).filter(
      ([id, job]) => status === "All" || job.status === status
    );
    return (
      <div>
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

            <AddJobButton />
      </div>
    );
  }
  return "No Jobs";
};
