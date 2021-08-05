import {React,useEffect} from "react";
import {Container,Form,Button} from "react-bootstrap";
import {SiGmail} from 'react-icons/si';
import "./LoginForm.css";
const LoginForm = () => {

  useEffect(()=>{
     window.gapi.load('client:auth2',()=>{
       window.gapi.init({
       clientId : "client id :- 63333214532-b9mfpc9ofbmnmm3svivn0dqm38hc3sil.apps.googleusercontent.com",
       scope: "email"
       }).then(()=>{
            this.auth = window.gapi.auth2.getAuthInstance();
       });
     });
  },[])
  const loginHandler = (e) => {
    e.preventDefault();
  }
  const googleLoginHandler = (e) => {
    e.preventDefault();

  }
  return (
    <div>
   <Container className="login-container-wrapper">
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
        <Button onClick ={loginHandler} variant="success" type="submit">
          Log In
        </Button>
        <Button id = "login-gmail-button"  onClick={googleLoginHandler} type="submit">
        <SiGmail/>Login with Gmail
        </Button>
        </div>
        
      </Form>
    </Container>
    </div>
  );
};

export default LoginForm;
