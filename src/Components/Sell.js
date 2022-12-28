import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/SignUp.css";
import Logo from "../assets/Olx logo.png";
import { storage, fs } from "../Config/Config";
import Error from "../assets/error.webp";
import swal from "sweetalert";
const Sell = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [image, setimage] = useState(null);
  let name, value;

  const types = ["image/jpg", "image/jpeg", "image/png", "image/PNG"];
  const handleImage = (e) => {
    let selectedfile = e.target.files[0];
    if (selectedfile) {
      if (selectedfile && types.includes(selectedfile.type)) {
        setimage(selectedfile);
      } else {
        setimage(null);
      }
    } else {
      console.log("please select a file");
    }
  };

  const SubmitProduct = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => console.log(error.message),
      () => {
        storage
          .ref("product-images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            fs.collection("products")
              .add({
                title,
                description,
                price: Number(price),
                url,
              })
              .then(() => {
                swal({
                  icon: "success",
                  text: "data has been added",
                  title: "Success",
                });
                setTitle("");
                setDescription("");
                setPrice("");
                document.getElementById("file").value = "";

                setTimeout(() => {}, 3000);
              })
              .catch((error) =>
                swal({
                  icon: Error,
                  text: error.message,
                  title: "Error!",
                  type: "error",
                })
              );
          });
      }
    );
  };

  return (
    <div className="container signUp">
      <header className="signupheader">
        <div className="signupLogo">
          <img src={Logo} alt="" />
          
        </div>
      </header>
      <form method="post" className="form">
        <div>
          <input
            placeholder="title"
            name="title"
            required
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <input
            placeholder="description"
            name="description"
            required
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div>
          <input
            placeholder="price"
            name="price"
            required
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div>
          <input
            placeholder="image"
            name="image"
            type="file"
            onChange={handleImage}
            id="file"
          />
        </div>

        <div className="btnDiv">
        <button type="submit" className="submitBtn" onClick={SubmitProduct}>
       Send
        </button>
        </div>      </form>
    </div>
  );
};

export default Sell;
