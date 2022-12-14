import React, { useState } from "react";

const SignUp = () => {
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
    console.log(User);
  };
  const Submit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password } = User;
    await fetch(
      "https://olxauth-ec89e-default-rtdb.firebaseio.com/olx.json",
      {
        method: "post",
        headers: {
          "Content-Type": "aplication/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
        }),
      }
    );
  };

  return (
    <div className="container">
      <header>
        <h3>Sign Up</h3>
      </header>
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
        <button type="submit" onClick={Submit}>
          {" "}
          Sign Up{" "}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
