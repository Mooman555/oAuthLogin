import { React, useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { SiGmail } from "react-icons/si";
import "./LoginForm.css";
const LoginForm = () => {
  const [isSignedIn, setIsSignedIn] = useState(null);
  useEffect(() => {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "63333214532-b9mfpc9ofbmnmm3svivn0dqm38hc3sil.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          const auth = window.gapi.auth2.getAuthInstance();
          setIsSignedIn(auth.isSignedIn.get());
          auth.isSignedIn.listen(onAuthChange);
        });
    });
  }, []);

  const onAuthChange = () => {
    const auth = window.gapi.auth2.getAuthInstance();
    setIsSignedIn(auth.isSignedIn.get());
  };
  const googleLogoutHandler = (e) => {
    e.preventDefault();
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signOut();
  };
  const googleLoginHandler = (e) => {
    e.preventDefault();
    const auth = window.gapi.auth2.getAuthInstance();
    auth.signIn();
  };

  const renderedButtons = () => {
    if (isSignedIn === null) {
      return null;
    } else {
      return (
        <Button
          id="login-gmail-button"
          onClick={googleLoginHandler}
          type="submit"
        >
          <SiGmail />
          Login with Gmail
        </Button>
      );
    }
  };

  return (
    <div>
      <div className= {isSignedIn ? "login-success-text display-show"  : "login-success-text display-hide" }>
                <p> Successfully Loged In</p>
                <Button id="login-gmail-button" onClick={googleLogoutHandler} type="submit">
          <SiGmail />
          Logout
        </Button>
      </div>
      <Container className={isSignedIn ? "login-container-wrapper display-hide" : "login-container-wrapper display-show"}>
        <Form className="login-form-wrapper">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <div className="login-button-wrapper">
            {renderedButtons()}
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default LoginForm;
