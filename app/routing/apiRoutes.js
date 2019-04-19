// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
var friends = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  //  This builds a route in order to view all friends

  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  // While inside of the module.exports, this is where all of the logic 
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

  app.post("/api/friends", function (req, res) {

    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: 500 // we initially set this to a really high number so that
      // a friend will likely be found in the friend database (i.e., their totalDifference
      // will be less than this number).
    };

    console.log(req.body);
    var userData = req.body;
    var userScores = userData.scores;
    console.log(userScores);
    var totalDifference = 0;

// The following is a nested for loop.  It has a for loop that loops 
// through each friend's survey values (scores), checking to see the absolute difference
// between the user's scores and the friend's scores. The absolute difference is totalled
// (totalDifference). That for loop is wrapped in another for loop that loops through
// all friends in the array. As it checks each friend, it takes the friend with the lowest
// totalDifference and designates that person as the bestMatch.

    for (var i = 0; i < friends.length; i++) {
      console.log(friends[i]);
      totalDifference = 0;

      for (var j = 0; j < friends[i].scores[j]; j++) {
            totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
      
        if (totalDifference <= bestMatch.friendDifference) {
          bestMatch.name = friends[i].name;
          bestMatch.photo = friends[i].photo;
          bestMatch.friendDifference = totalDifference;
        }
      }
    }
    console.log(userData);
    friends.push(userData); // We then push the userData into the friends array
    res.json(bestMatch); // This sends the new bestMatch to the html in json format
  });
  };