//imports
const express = require("express");
const request = require("request-promise");
const cors = require("cors");

//init
const app = express();
app.use(cors());
let repos; //Stores all repos in array of JSONs that was received from API response
let user_agent; //User agent for performance, will be taken from user's request automatically
const port = 8000; // Port which server will listen to

app.listen(port, () => {
    console.log(`Server was successfully launched at port ${port}!`);
});

//GET repos from GitHub API
app.get("/repos/:username", (req, res) => {
    const username = req.params.username;
    user_agent = req.headers["user-agent"];
    const options = {
        url: `https://api.github.com/users/${username}/repos`,
        headers: {
            "User-Agent": user_agent,
            "content-type": "application/json"
        }
    };
    request(options, (error, response, body) => {
        if (error) return console.log('error:', error); // Print the error if one occurred and handle it
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let json = JSON.parse(body);
        repos = writeReposToJSON(json);
        console.log(repos);
        res.send(repos);
    });
});

//Takes the most important inforamtion from API response(like repo name, date of creation, etc) and returns it.
function writeReposToJSON(json) {
    let data = new Array();
    for (let i = 0; i < json.length; i++) {
        const json_ = json[i];
        data.push({
            "id": json_.id,
            "full_name": json_.full_name,
            "html_url": json_.html_url,
            "created_at": Date.parse(json_.created_at),
            "updated_at": Date.parse(json_.pushed_at),
            "language": json_.language,
            "forks": json_.forks_count,
            "stars": json_.watchers_count,
            "owner_id": json_.owner.id
        });
    }
    return data;
}