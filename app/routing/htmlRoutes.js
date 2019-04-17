// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // This function passes in the app (Express).
  // When the user arrives at the url /survey, the file
  // survey.html is delivered
  // ---------------------------------------------------------------------------

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/survey"));
  });

  // If no matching route is found, redirect the user to the home page
  app.use(function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home"));
  });
};