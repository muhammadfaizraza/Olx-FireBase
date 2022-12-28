import React, { useState } from "react";
import { auth, fs } from "../Config/Config.js";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/SignUp.css";
import Logo from "../assets/Olx logo.png";
import swal from "sweetalert";
import Error from "../assets/error.webp";

const SignUp = () => {
  const navigate = useNavigate();
  const [errMessage, seterrMessage] = useState();
  const [SuccessMsg, setSuccessMsg] = useState();

  const [User, setUser] = useState({
    name: "",
    email: "",
    phone: "",
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
    // console.log(User);
    // navigate("./");
    auth
      .createUserWithEmailAndPassword(User.email, User.password)
      .then((userData) => {
        fs.collection("users")
          .doc(userData.user.uid)
          .set({
            Name: User.name,
            Email: User.email,
            Phone: User.phone,
            Password: User.password,
          })
          .then(() => {
            swal({
              title: "Good job!",
              text: "Your account is created successfully",
              icon: "success",
            });
            setUser({
              name: "",
              email: "",
              phone: "",
              password: "",
            });
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 3000);
          })
          .catch((error) =>
            swal({
              icon: Error,
              text: error.message,
              title: "Error!",
              type: "error",
            })
          );
      })
      .catch((error) => {
        swal({
          icon: Error,
          text: error.message,
          title: "Error!",
          type: "error",
        });
      });
  };

  return (
    <div className="container signUp">
      <header className="signupheader">
        <div className="signupLogo">
          <img src={Logo} alt="" />

          <h3>Sign Up</h3>
        </div>
      </header>
<div className="form">      <form method="post" className="form">
        <div>
          <input
            placeholder="Name"
            name="name"
            required
            type="text"
            onChange={handleChange}
            value={User.name}
          />
        </div>
        <div>
          <input
            placeholder="Email"
            name="email"
            required
            type="email"
            onChange={handleChange}
            value={User.email}
          />
        </div>
        <div>
          <input
            placeholder="Phone"
            name="phone"
            required
            type="number"
            onChange={handleChange}
            value={User.phone}
          />
        </div>
        <div>
          <input
            placeholder="password"
            name="password"
            required
            type="password"
            onChange={handleChange}
            value={User.password}
          />
        </div>{" "}
        <div>
          <Link to="/login"> Already Have an Account</Link>
        </div>
        <div className="btnDiv">
        <button type="submit" className="submitBtn" onClick={Submit}>
          Sign Up
        </button>
        </div>
      </form>
    </div>
    </div>

  );
};

export default SignUp;
