import { Job } from "./Job";

export const JobsList = ({jobs}) => {
  console.log(jobs)
  return (
  <div>
    {Object.entries(jobs).map(([id, job]) => {
      return (
      <Job
        key={id}
        company={job.company}
        jobTitle={job.jobTitle}
        appliedOn={job.appliedOn}
        status={job.status}
        deadline={job.deadline}
      />)
})}
  </div>
)
};
