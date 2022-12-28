import React, { Fragment, useState } from "react";
import { auth, fs } from "../Config/Config.js";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  const navigate = useNavigate();
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
      swal({
        title: "Good job!",
        text: "You are log in successfully",
        icon: "success",
      });
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
      <div className="login">
      <header>
        <h3>Login</h3>
      </header>

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

        <div className="btnDiv2">
          <button className="submitBtn" type="submit" onClick={Submit}>
            Login
          </button>
        </div>
      </form>
      </div>
    </Fragment>
  );
};

export default Login;
