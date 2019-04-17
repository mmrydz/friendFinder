// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

// The npm express package facilitates routing.
var express = require("express");
// The npm bodyParser package makes it easier to manipulate JSON data.
var bodyParser = require('body-parser');
// Path is a built-in package in node
var path = require("path");

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT || 8080;

// The following all comes from the documentation in bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// We require the following files and pass them, along with  the app (Express) 
// into the module exports functions we created in the htmlRoutes.js  and apiRoutes.js files.
// NOTE: This hung me up for HOURS. You have to require the apiRoutes file first
// because the html needs it. Otherwise the JSON will not appear.
require("./app/routing/apiRoutes.js")(app); 
require("./app/routing/htmlRoutes.js")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
