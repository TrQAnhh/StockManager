const express = require("express");
const route = require("./routes/client/index.route");
const database = require("./config/database");
const app = express();
require("dotenv").config();

const port = process.env.PORT;

// Database
database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes
route(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})