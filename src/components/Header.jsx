import "./Header.css";

import { Button, Container, Navbar, Offcanvas } from "react-bootstrap";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

import Image from "react-bootstrap/Image";
// import { getUser } from "./User";
import { Logo } from "./Logo";
import { Plus } from "react-bootstrap-icons";
import logo from "../static/logo.png";

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
        <Navbar.Toggle className="mx-2" />
        <Link className="plain-link text-white" to="/">
          <Image src={logo} width={180}></Image>
        </Link>
        <SignOutButton />
        <Navbar.Offcanvas
          bg="dark"
          variant="dark"
          className="flex-grow-1 pe-3"
          placement="top"
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body>
            <Link className="plain-link " to="/teach">
              Teach
            </Link>
            <Link className="plain-link" to="/learn">
              Learn
            </Link>
            <Link className="plain-link" to="/mySessions">
              My Sessions
            </Link>

            <div className="d-flex justify-content-center">
              {/* <AuthButton /> */}
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
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
