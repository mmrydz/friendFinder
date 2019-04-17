// ==============================================================================
// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality
// ==============================================================================

var express = require("express");
var bodyParser = require('body-parser');

// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Creates application/json parser
var jsonParser = bodyParser.json();

// Creates application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false});

// Parses various different custom JSON types as JSON
app.use(bodyParser.json({type: 'application/**json'}));

// Parses some custom thing into a Buffer
app.use(bodyParser.raw({type: 'application/vnd.custom-type'}));

// parses an HTML body into a string
app.use(bodyParser.text({type: 'text/html'}));

// We require the following file and pass into it the app (Express) 
// into the module exports function we created in the htmlRoutes.js file:
require("./app/routing/htmlRoutes.js")(app);
require("./app/routing/apiRoutes.js")(app);

// =============================================================================
// LISTENER
// The below code effectively "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
