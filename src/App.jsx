import { useState } from "react";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { JobsList } from "./components/JobsList";
import Landing from "./components/Landing";
import { getUser } from "./components/User";
import { useDbData } from "./utilities/firebase";
import { Header } from "./components/Header";


const App = () => {
  const user = getUser();
  const [users, uerror] = useDbData("/users");
  const [jobs, j_error] = useDbData("/jobs");

  if (uerror) return <h1>Error loading users: {uerror.toString()}</h1>;
  if (users === undefined) return <h1>Loading users...</h1>;
  if (!users) return <h1>No users found</h1>;

  if (j_error) return <h1>Error loading jobs: {j_error.toString()}</h1>;
  if (jobs === undefined) return <h1>Loading jobs...</h1>;
  if (!jobs) return <h1>No jobs found</h1>;

  // console.log(users);
  // console.log(jobs)
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing user={user} />}></Route>
      <Route
          path="/jobs"
          element={
            <div>
              <Header></Header>
              <JobsList jobs={jobs}/>;
            </div>
          }
      />     
      </Routes>
    </BrowserRouter>
  )
};

export default App;
