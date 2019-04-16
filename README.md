Welcome to Friend Finder!

I've built a compatibility-based "FriendFinder" application -- basically a dating app. This full-stack site takes in results from its users' surveys (10 questions, with each answer ranked by the user on a scale of 1 to 5 based on how much the user agrees or disagrees with a question), then compares their answers with those from other users. The app then displays the name and picture of the user with the best overall match.

Specifications:
1. Express handles the routing. Heroku is the server.
2. The 'server.js' file requires npm packages express and path.
3. The 'htmlRoutes.js' file includes two routes:
  * A GET Route to `/survey` which should display the survey page.
  * A default, catch-all route that leads to `home.html` which displays the home page.
4. The `apiRoutes.js` file also contains two routes:
   * A GET route with the url `/api/friends`. This is used to display a JSON of all possible friends.
   * A POST routes `/api/friends`. This is used to handle incoming survey results. This route is also used to handle the compatibility logic.
5. The application's json data is saved inside of `app/data/friends.js` as an array of objects, like this:
{
  "name":"Bill",
  "photo":"https://www.fillmurray.com/200/300",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}
6. The user's most compatible friend is determined as follows:
   * Each user's results is pusehd into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
   * That array is compared with those from other users, question by question. The differences between the question values is added up to equal the `totalDifference`.
     * Example:
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
   * We utilize the absolute value of the differences. 
   * The closest match is the user with the least amount of difference.
7. Once the current user's most compatible friend is established, that person is displayed as a modal pop-up with a name and photo.
