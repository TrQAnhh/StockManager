const express = require("express");
const database = require("./config/database");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const systemConfig = require("./config/system.js");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

const port = process.env.PORT || 3000;
const app = express();

// Flash messages middleware
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 }, secret: "mysecret", resave: false, saveUninitialized: false }));
app.use(flash());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Method override
app.use(methodOverride("_method"));

// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Import routes
const clientRoute = require("./routes/client/index.route");
const adminRoute = require("./routes/admin/index.route");

// Connect to the database
database.connect();

// Set Pug as the view engine
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// Serve static files
app.use(express.static(`${__dirname}/public`));

// Routes
clientRoute(app);
adminRoute(app);

// Default route to prevent 404 errors
app.get("/", (req, res) => {
    res.send("Welcome to Stock Manager API!");
});

// Handle 404 errors for undefined routes
app.use((req, res) => {
    res.status(404).send("404 - Not Found");
});

// Start the server
app.listen(port, () => {
    console.log(`✅ Server is running on port: ${port}`);
});
