const express = require("express");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const { connection } = require("./config/db");
const { userrouter } = require("./routes/user.route");
const { notesrouter } = require("./routes/notes.route");
// const { auth } = require("./middlewares/authentication.middleware");
require("dotenv").config();
const swaggerjsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

let app = express();
app.use(express.json());
app.use(cors());





app.use(fileupload({
  useTempFiles: true
}))






cloudinary.config({
  cloud_name: 'dd9cmhunr',
  api_key: '358273696883359',
  api_secret: '2brG2Fl46PgJ8DVDK8fFteaU420',
  secure: true
});


app.post('/upload', function (req, res) {
  console.log(req.data)
  const file = req.files.photo
  let data = req.body.description

  cloudinary.uploader
    .upload(file.tempFilePath,(err,result ) => {
      console.log(result.url)
      res.send({image:result.url ,description:data });

    })
});


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Learning Swagger for frist time",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerjsdoc(options)
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use("/user", userrouter);
// app.use(auth);
app.use("/notes", notesrouter);

//get

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/upload", (req, res) => {
  const notes =  find()
  res.send(notes);
});

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch (error) {
    console.log(error);
  }
  console.log(`server running on ${process.env.port} `);
});
