const express = require("express");
const database = require("./config/database");
const app = express();
require("dotenv").config();

const port = process.env.PORT;

//  Client route
const clientRoute = require("./routes/client/index.route");

// Admin routes
const adminRoute = require("./routes/admin/index.route");

// Database
database.connect();

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// Routes
clientRoute(app);
adminRoute(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})