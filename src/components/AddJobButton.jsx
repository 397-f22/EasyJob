import { Navigate, useNavigate } from "react-router-dom";

//WHAT'S NEW:
//Added the AddJob button
//Add a job button
//If anyone knows how to center a button, please center the addjob button

export const AddJobButton = () => {
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