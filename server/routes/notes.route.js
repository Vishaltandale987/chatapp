const express = require("express");
const { NotesModel } = require("./../model/notes.model");

const notesrouter = express.Router();


/**
* @swagger
* components:
*   schemas:
*       Notes:
*           type: object
*           properties:
*               _id:
*                   type: string
*                   description: The auto-generated id of the user
*               name:
*                   type: string
*                   description: The user name
*               title:
*                    type: string
*                    description: The user email
*               user:
*                     type: string
*                     description: The user email
*/

/**
 * @swagger
 * /notes:
 *  get:
 *      summary: This will get all the user data from the database
 *      tags: [Notes]
 *      responses:
 *          200:
 *              description: The list of all the users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          item:
 *                              $ref: "#/components/schemas/Notes"
 *
 */



//get notes

notesrouter.get("/",  async(req, res) => {
  const notes = await NotesModel.find()
  res.send(notes);

});

//create notes


/**
 * @swagger
 * /notes/create:
 *  post:
 *      summary: This is to post a new note to the database.
 *      tags: [Notes]
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
 *                          $ref: "#/components/schemas/Notes"
 *
 */

notesrouter.post("/create", async (req, res) => {
  let data = req.body
  const notes = new NotesModel(data)
  await notes.save()
  res.send({ massege: "notes created" });

});

//delete notes

/**
 * @swagger
 * /notes/delete:
 *  delete:
 *      summary: This is to delete a note to the database.
 *      tags: [Notes]
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Notes"
 *      responses:
 *          200:
 *              description: The user was succesfully register.1
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *
 */

notesrouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id
  await NotesModel.findByIdAndDelete({_id:id})
  res.send({ massege: `notes ${id} has been deleted` });

});


//update notes

/**
 * @swagger
 * /notes/update:
 *  patch:
 *      summary: This is to update a notes to the database.
 *      tags: [Notes]
 *      requestBody:
 *           required: true
 *           content:
 *               application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Notes"
 *      responses:
 *          200:
 *              description: The user was succesfully register.1
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *
 */

notesrouter.patch("/update/:id", async (req, res) => {
  const id = req.params.id
  const data=req.body
  await NotesModel.findByIdAndUpdate({_id:id},data)
  res.send({ massege: `notes ${id} has been update.` });

});


module.exports = {
  notesrouter,
};
