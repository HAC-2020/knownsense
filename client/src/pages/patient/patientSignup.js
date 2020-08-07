import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Message, Button } from "semantic-ui-react";

import AuthForm from "../../components/authForm/authForm";

import "../../css/signup.css";

const PatientSignup = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      //   const { user } = await auth.createUserWithEmailAndPassword(
      //     email,
      //     password
      //   );

      //   await createUserProfileDocument(user, { displayName });

      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      history.push("/doctor/dashboard");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="sign-up">
      <h2 className="title">Sign up for Patient</h2>
      <Form error={!!errorMsg} className="sign-up-form" onSubmit={handleSubmit}>
        <AuthForm
          type="text"
          name="displayName"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          label="Display Name"
          required
        />
        <AuthForm
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          required
        />
        <AuthForm
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          required
        />
        <AuthForm
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          label="Confirm Password"
          required
        />
        <Message error header="Oops!" content={errorMsg} />
        <Button positive type="submit">
          SIGN UP
        </Button>
      </Form>
      <Link to="/patient/signin">
        <h4 style={{ marginTop: "1rem " }} className="bottomRoute">
          I already have an account
        </h4>
      </Link>
    </div>
  );
};

export default PatientSignup;
