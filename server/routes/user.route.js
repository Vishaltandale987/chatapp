const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./../model/User.model");

const userrouter = express.Router();

//all users



userrouter.get("/", async (req, res) => {
  const notes = await UserModel.find();
  res.send(notes);
});

//register


userrouter.post("/register", async (req, res) => {
  const { fristName, lastName, email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.send({ massege: "something went wrong", error: err.message });
      } else {
        const user = new UserModel({ fristName, lastName, email, password: hash });
        await user.save();
        res.send({ massege: "New user register" });
      }
    });
  } catch (error) {
    res.send({ massege: "something went wrong" });
  }
});

//login



userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");

          res.send({ massege: "login successful", token: token, id:user[0]._id });
        } else {
          res.send({ massege: "something went wrong" });
        }
      });
    } else {
      res.send({ massege: "wrong coredentials" });
    }
  } catch (error) {
    res.send({ massege: "something went wrong" });
  }
});


// post


userrouter.post("/data", async (req, res) => {
  try {
    // Create a new user object using the request body
    const user = new UserModel({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      password: req.body.password,
      email: req.body.email,
      avatar: req.body.avatar,
      coverimg: req.body.coverimg,
      post: req.body.post,
    });

    // Save the user object to the database
    await user.save();

    // res.status(201).send(savedUser); // Send the saved user object back to the client
    res.send({ massege: "New user register" });
  } catch (error) {
    // res.status(500).send(error); // Send any errors back to the client
    res.send({ massege: "something went wrong" });
  }
});








module.exports = {
  userrouter,
};
