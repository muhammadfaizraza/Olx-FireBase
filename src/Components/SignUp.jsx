import React, { useState } from "react";
import { auth, fs } from "../Config/Config.js";
import { Link, useNavigate } from "react-router-dom";
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
          console.log(userData, "hai");
          fs.collection("users")
            .doc(userData.user.uid)
            .set({
            Name: User.name,
            Email: User.email,
            Phone: User.phone,
            Password: User.password,
          })
          .then(() => {
            setSuccessMsg("Your Account Has been Created Successfully");
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
          .catch((error) => seterrMessage(error.message));
      })
      .catch((error) => {
        seterrMessage(error.message);
      });
  };

  return (
    <div className="container">
      <header>
        <h3>Sign Up</h3>
      </header>
      {SuccessMsg && (
        <>
          <p>{SuccessMsg}</p>
        </>
      )}
      <form method="post">
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
        </div>
        <Link to="/login"> Already Have an Account</Link>
        <div>
          {" "}
          <button type="submit" onClick={Submit}>
            Sign Up
          </button>
        </div>
      </form>
      {errMessage && (
        <>
          <p>{errMessage}</p>
        </>
      )}
    </div>
  );
};

export default SignUp;
