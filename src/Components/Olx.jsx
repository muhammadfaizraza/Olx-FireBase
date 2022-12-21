import React, { Fragment, useEffect, useState } from "react";
import Logo from "../assets/Olx logo.png";
import { AiFillCar } from "react-icons/ai";
import { BsBuilding } from "react-icons/bs";
import olx from "../assets/olx.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { AiOutlineSearch } from "react-icons/ai";
import Border from "../assets/Border.svg";
import { Link } from "react-router-dom";
import { fs } from "../Config/Config";

const Olx = () => {
  const [product, setProduct] = useState([]);

  const getProdcts = async () => {
    const Products = await fs.collection("products").get();
    const productsArray = [];
    for (var snap of Products.docs) {
      var data = snap.data();
      data.ID = snap.id;
      productsArray.push({
        ...data,
      });
      if (productsArray.length === Products.docs.length) {
        setProduct(productsArray);
        console.log(product)
    
      }
    }
  };
  useEffect(() => {
    getProdcts();
  }, []);

  return (
    <Fragment>
      <header>
        <img src={Logo} alt="" />
        <span>
          <AiFillCar />
          Motors
        </span>
        <span>
          <BsBuilding />
          Property
        </span>
      </header>
      <div className="sub-header">
        <img src={olx} alt="" />
        <Dropdown>
          <Dropdown.Toggle>
            <AiOutlineSearch /> Pakistan
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <input placeholder="Find Cars,Mobile Phones and More..." />
        <AiOutlineSearch className="search-icon" />
        <Link to="/login">
          <h6>Login</h6>
        </Link>
        <span>
          <img src={Border} alt="" />
          <Link to="/signup">
            {" "}
            <h5>Sign Up</h5>
          </Link>
        </span>
      </div>
      <div>
        <div>
<h3>          {product.h3}</h3>
        </div>
      </div>
    </Fragment>
  );
};

export default Olx;
