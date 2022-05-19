const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/v1/user");
const articleRoute = require("./routes/v1/article");
const commentRoute = require("./routes/v1/comment");
var hateoasLinker = require("express-hateoas-links");

dotenv.config();

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.DATABASE);
}

app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/article", articleRoute);
app.use("/api/comments", commentRoute);

// hateoasLinker(app);
app.use(hateoasLinker);
app.get("/", function (req, res) {
  // create an example JSON Schema
  var commentSchema = {
    name: "Ahmed Mohamed",
    description:
      "This JSON Schema defines the parameters required to create a Person object",
   
  };

  // call res.json as normal but pass second param as array of links
  res.json(commentSchema, [
    { rel: "self", method: "GET", href: "http://127.0.0.1" },
    {
      rel: "create",
      method: "POST",
      title: "Create Person",
      href: "http://127.0.0.1/api/comments",
    },
    {
      rel: "get",
      method: "GET",
      title: "Get comments",
      href: "http://localhost:8000/api/comments"
    },
  ]);
});

const { PORT, HOST, DB_URL } = process.env;
mongoose
.connect(DB_URL)
.then(()=>{console.log('DB connect');})
.catch((err)=>{console.error('connect failed=>',err);});
app.listen(PORT,HOST,()=>{
    console.log("listening");
})