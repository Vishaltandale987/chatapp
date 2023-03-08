const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./../model/User.model");

const userrouter = express.Router();

//all users

/**
* @swagger
* components:
*   schemas:
*       User:
*           type: object
*           properties:
*               _id:
*                   type: string
*                   description: The auto-generated id of the user
*               name:
*                   type: string
*                   description: The user name
*               pass:
*                    type: string
*                    description: The user email
*               email:
*                     type: string
*                     description: The user email
*/

/**
 * @swagger
 * /user:
 *  get:
 *      summary: This will get all the user data from the database
 *      tags: [User]
 *      responses:
 *          200:
 *              description: The list of all the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: "#/components/schemas/User"
 *
 */

userrouter.get("/", async (req, res) => {
  const notes = await UserModel.find();
  res.send(notes);
});

//register

/**
 * @swagger
 * /user/register:
 *  post:
 *      summary: This is to post a new user to the database.
 *      tags: [User]
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *              description: The user was succesfully register.1
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *
 */
userrouter.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.send({ massege: "something went wrong", error: err.message });
      } else {
        const user = new UserModel({ name, email, pass: hash });
        await user.save();
        res.send({ massege: "New user register" });
      }
    });
  } catch (error) {
    res.send({ massege: "something went wrong" });
  }
});

//login

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: This is to login to the database
 *      tags: [User]
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *              description: The user was succesfully register.1
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *
 */

userrouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        // result == true
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");

          res.send({ massege: "login successful", token: token });
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

module.exports = {
  userrouter,
};
