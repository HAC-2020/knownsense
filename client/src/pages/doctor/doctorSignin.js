import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Message, Button } from "semantic-ui-react";

import AuthForm from "../../components/authForm/authForm";

import "../../css/signin.css";

const DoctorSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  const docSignin = async () => {};

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const body = {
        email: email,
        password: password,
      };

      docSignin(body);

      setEmail("");
      setPassword("");
      history.push("/doctor/dashboard");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="sign-in">
      <h2 className="title">Sign in as Doctor</h2>

      <Form error={!!errorMsg} onSubmit={handleSubmit}>
        <AuthForm
          name="email"
          type="email"
          handleChange={(e) => setEmail(e.target.value)}
          value={email}
          label="Email"
          required
        />
        <AuthForm
          name="password"
          type="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
          label="Password"
          required
        />
        <Message error header="Oops!" content={errorMsg} />
        <div className="buttons">
          <Button positive type="submit">
            Sign in
          </Button>
        </div>
      </Form>
      <Link to="/doctor/signup">
        <h4 style={{ marginTop: "10%" }}>I do not have a account</h4>
      </Link>
    </div>
  );
};

export default DoctorSignin;
