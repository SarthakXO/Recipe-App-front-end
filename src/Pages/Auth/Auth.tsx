import React, { useState } from "react";
import Axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

interface userDetails {
  username: String;
  password: String;
  setUsername: Function;
  setPassword: Function;
  label: String;
  onSubmit: any;
}

const Auth = () => {
  return (
    <div className="auth inline">
      <Login />
      <Register />
    </div>
  );
};

//REGISTRATION

const Register = () => {
  //register component
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await Axios.post(`http://localhost:3001/auth/register`, {
        username,
        password,
      }); //sending the username and password to our backend to check and store it

      alert("Registration completed! Please Login in to continue");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label={"Register"}
      onSubmit={onSubmit}
    />
  );
};

//LOGIN

const Login = () => {
  //Login component
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const [_, setCookies] = useCookies(["access_token"]);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`http://localhost:3001/auth/login`, {
        username,
        password,
      });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label={"Login"}
      onSubmit={onSubmit}
    />
  );
};

const Form = (props: userDetails) => {
  return (
    <div className="auth-container">
      <form onSubmit={props.onSubmit}>
        <h2>{props.label}</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={(event) => props.setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(event) => props.setPassword(event.target.value)}
          />
        </div>
        <button className="btn btn-primary">{props.label}</button>
      </form>
    </div>
  );
};

export default Auth;
