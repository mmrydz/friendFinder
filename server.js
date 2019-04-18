// ==============================================================================
// DEPENDENCIES
// ==============================================================================

// The npm express package facilitates routing.

var express = require("express");

// ==============================================================================
// EXPRESS CONFIGURATION
// ==============================================================================

// Tells node that we are creating an "express" server

var app = express();

// Sets an initial port. We'll use this later in our listener

var PORT = process.env.PORT || 8080;

// ==============================================================================
// ROUTES
// NOTE: You have to require the apiRoutes file first because the html needs it. Otherwise the JSON will not appear.
// ==============================================================================

require("./app/routing/apiRoutes.js")(app); 
require("./app/routing/htmlRoutes.js")(app);

// =============================================================================
// LISTENER
// The below code "starts" our server
// =============================================================================

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});