import "./Auth.css";

import { signInWithGoogle, signOut } from "../utilities/firebase";

import Button from "react-bootstrap/Button";

export const SignIn = () => {
  return (
    <Button variant="custom" size="lg" onClick={signInWithGoogle}>
      Sign In
    </Button>
  );
};

export const SignOut = () => {
  return (
    <Button variant="custom" size="lg" onClick={signOut}>
      Sign Out
    </Button>
  );
};

export const DynamicAuthButton = ({ user }) => {
  return user ? <SignIn /> : <SignOut />;
};
