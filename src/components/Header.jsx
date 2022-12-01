import "./Header.css";
import { AddJobButton } from "./AddJobButton";

import {
  Button,
  Container,
  Navbar,
  Offcanvas,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

import Image from "react-bootstrap/Image";
// import { getUser } from "./User";
import { Logo } from "./Logo";
import { Plus } from "react-bootstrap-icons";
import logo from "../static/logo.png";


//WHAT'S NEW:
//Added the Add a Job Button
//Need help with CSS

const SignOutButton = () => {
  const navigate = useNavigate();

  async function signOutProcess() {
    await signOut();

    navigate("/");
  }

  return (
    <button className="btn btn-dark" onClick={signOutProcess}>
      Sign out
    </button>
  );
};

const AuthButton = () => {
  getUser();
  const [user] = useAuthState();
  return <SignOutButton />;
};

export const Header = ({ showAddRides, user }) => {
  return (
    <Navbar bg="light" variant="light" expand={false}>
      <Container fluid>
        <Link className="plain-link text-white" to="/">
          <Image src={logo} width={180}></Image>
        </Link>
        <AddJobButton/>
        <SignOutButton />

        {showAddRides ? (
          <Button variant="light" className="rounded-pill">
            <Link to="/addRide" className="plain-link">
              <Plus size={30}></Plus>
            </Link>
          </Button>
        ) : (
          ""
        )}
      </Container>
    </Navbar>
  );
};
