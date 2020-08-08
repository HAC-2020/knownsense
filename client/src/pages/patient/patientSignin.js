import React, { useState, useContext } from "react";
import axios from 'axios';
import { Link, useHistory } from "react-router-dom";
import { Form, Message, Button } from "semantic-ui-react";
import { AppContext } from "../../context api/Appcontext";

import AuthForm from "../../components/authForm/authForm";

import "../../css/signin.css";

const PatientSignin = () => {
  const { setuser } = useContext(AppContext);
  const { setauthenticated } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();

  const patSignin = async (data) => {
    try {
      const res = await axios.post("/api/v1/patient/signup", data);
      const FBIdToken = `Bearer ${res.data.token}`;
      localStorage.setItem("FBIdToken", FBIdToken);
      axios.defaults.headers.common["Authorization"] = FBIdToken;
      setauthenticated(true);
      setuser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const body = {
        email: email,
        password: password,
      };

      patSignin(body);

      setEmail("");
      setPassword("");
      history.push("/patient/dashboard");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="sign-in">
      <h2 className="title">Sign in as Patient</h2>

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
      <Link to="/patient/signup">
        <h4 style={{ marginTop: "10%" }}>I do not have a account</h4>
      </Link>
    </div>
  );
};

export default PatientSignin;
