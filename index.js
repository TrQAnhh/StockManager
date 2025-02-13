const express = require("express");
const database = require("./config/database");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const systemConfig = require("./config/system.js");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const port = process.env.PORT;
const app = express();

// Flash
app.use(cookieParser("keyboard cat"));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Method - override
app.use(methodOverride('_method'))

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

//  Client route
const clientRoute = require("./routes/client/index.route");

// Admin routes
const adminRoute = require("./routes/admin/index.route");

// Database
database.connect();

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/public`));

// Routes
clientRoute(app);
adminRoute(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})