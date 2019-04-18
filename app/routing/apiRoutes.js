// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friendsData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  //  This builds a route in order to view all friends

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  // While still inside of the module.exports, this is where all of the logic 
  // behind the "most compatible friend" comes into play.

  // 6. The user's most compatible friend is determined as follows:
  //    * Each user's results is pushed into a simple array of numbers 
  // (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
  //    * That array is compared with those from other users, question by question. 
  //      The differences between the question values is added up to equal the 
  //      `totalDifference`.
  //      * Example:
  //        * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
  //        * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
  //        * Total Difference: **2 + 1 + 2 =** **_5_**
  //    * We utilize the absolute value of the differences. 
  //    * The closest match is the user with the least amount of difference.
  // 7. Once the current user's most compatible friend is established, that person 
  // is displayed as a modal pop-up with a name and photo.

  // This takes in the user's survey post data and parses it.
  app.post("/api/friends", function (req, res) {

      if (friendsData.length > 0) {
        var indexOfClosestMatch = 0;
        var lowestDif;
        for (i = 0; i < friendsData.length; i++) {
          var totaDif =0;
          for (x =0; x < friendsData[i].scores.length; x++) {
            totalDif += Math.abs(parsInt(friendsData[i].scores[x]) - parseInt(req.body.scores[x]));
        }
        if (lowestDif > totalDif) {

          lowestDif = totalDif;
          indexOfClosestMatch = i;
        }
      }
    }
    friendsData.push(req.body);

    res.json(friendsData[indexOfClosestMatch]);

  });
};