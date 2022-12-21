import React, { Fragment, useState } from "react";
import { auth, fs } from "../Config/Config.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errMessage, seterrMessage] = useState();
  const [SuccessMsg, setSuccessMsg] = useState();
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...User, [name]: value });
  };
  const Submit = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(User.email, User.password).then(() => {
      setSuccessMsg("Your Account Has been Created Successfully");
      setUser({
        name: "",
        email: "",
        phone: "",
        password: "",
      });
      navigate("/");
    });
  };
  return (
    <Fragment>
      <header>
        <h3>Login</h3>
      </header>
      {SuccessMsg && (
        <>
          <p>{SuccessMsg}</p>
        </>
      )}

      <form method="post">
        <div>
          <input
            placeholder="Email"
            name="email"
            required
            type="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            placeholder="password"
            name="password"
            required
            type="password"
            onChange={handleChange}
          />
        </div>
        {errMessage && (
          <>
            <p>{errMessage}</p>
          </>
        )}
        <div>
          
          <button type="submit" onClick={Submit}>
            
            Login
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default Login;
