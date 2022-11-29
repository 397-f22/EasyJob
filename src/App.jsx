import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { JobsList } from "./components/JobsList";
import Landing from "./components/Landing";
import { Subheader } from "./components/Subheader";
import { getUser } from "./components/User";
import logo from "./logo.svg";
import { useDbData } from "./utilities/firebase";
import { useState } from "react";
import { AddJob } from "./components/AddJob";

const App = () => {
  const user = getUser();
  // const [users, uerror] = useDbData("/users");
  // const [jobs, j_error] = useDbData(`/users/${user.uid}/jobs`);

  // if (uerror) return <h1>Error loading users: {uerror.toString()}</h1>;
  // if (users === undefined) return <h1>Loading users...</h1>;
  // if (!users) return <h1>No users found</h1>;

  // if (j_error) return <h1>Error loading jobs: {j_error.toString()}</h1>;
  // if (jobs === undefined) return <h1>Loading jobs...</h1>;
  // if (!jobs) return <h1>No jobs found</h1>;

  console.log(user);
  // console.log(jobs)


  //WHAT'S NEW:
  //See AddJob.jsx, firebase.js and JobList.jsx for changes made in this branch
  //
  //In App.jsx:
  //Added new route that directs to the addJob form.
  //It is passed the user from the App.jsx file

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing user={user} />}></Route>
        <Route
          path="/jobs"
          element={
            <div>
              <Header></Header>
              <Subheader jobs={user?.jobs} user={user} />
            </div>
          }
        />
        <Route
          path="/addJob"
          element={
            <div>
              <Header></Header>
              <AddJob user = {user}></AddJob>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
