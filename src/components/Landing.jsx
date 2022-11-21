import "./Landing.css";

import { SignIn, SignOut } from "./Auth";

import Image from "react-bootstrap/Image";
import { Navigate } from "react-router-dom";
import logo from "../static/logo.png";

const Landing = ({ user }) => {
  if (user) {
    console.log(user);
    return <Navigate to="/jobs" />;
  } else {
    return (
      <div className="landing">
        <Image src={logo} width={320}></Image>
        <div className="subheading">
          Applying to jobs has never been easier!
        </div>
        <p className="description">
          Easily keep track of your job applications and status
        </p>
        <SignIn />
      </div>
    );
  }
};

export default Landing;
