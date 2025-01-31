const express = require("express");
const route = require("./routes/client/index.route");
const database = require("./config/database");
<<<<<<< Updated upstream
const app = express();
=======
const methodOverride = require('method-override');
const systemConfig = require('./config/system.js');

const app = express();
app.use(methodOverride('_method'))

>>>>>>> Stashed changes
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