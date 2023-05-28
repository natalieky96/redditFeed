/*************
 * Constants *
 *************/
const express = require('express');
const app = express();
const PORT = 3000;
const axios = require('axios');
const TITLE = 'title';
const URL = 'url';
const SUBREDDIT_PARAM_MISSING_ERROR = 'subreddit parameter is missing!';
const INVALID_JSON_STRUCT_ERROR = "Invalid JSON structure!";
const UNAVAILABLE_JSON_FILE_ERROR = 'JSON isnt available!';
const PROBLEM_FETCHING_DATA_ERROR = 'Problem with fetching JSON data:';
const URL_RETRIEVE_FROM = `https://www.reddit.com/r/${subreddit}/top.json`;

// Fire up my API into the server
app.listen(PORT,
    () => console.log(`It is online on : http://localhost:${PORT}`)
)

//Middleware- every request first will go through here and make it as JSON
app.use(express.json());

/**
 * Process the given JSON data: Deletes all the irrelevant information,
 * and saves the titles and the url(links) of the post
 * @param jsonData
 * @returns {*[]} An array of titles and their url array
 */
const sanitizeRedditData = (jsonData) => {
    if (jsonData && jsonData.children) {
        let titlesAndUrlArr = []
        const childrenArray = jsonData.children;
        childrenArray.forEach(child => {
            const childData = child.data;
            const title = childData[TITLE];
            const url = childData[URL];
            titlesAndUrlArr.push([title, url]);
        });
        return titlesAndUrlArr;
    } else {
        return null;
    }
};

/**
 URL: /r/:subreddit/top
 Method: GET
 Description: The client sends a GET request to retrieve the top posts of a specific subreddit.
 The client replaces {subreddit} in the URL with the desired subreddit name.
 The response body will contain the titles and URLs of the top posts from that subreddit.

 Response Format: JSON

 Parameters
 subreddit (string): The subreddit which we want to retrieve the top articles from

 Response
 Status: 200 OK, otherwise NOT OK
 Body: The top {subreddit} articles titles and Urls.

 Error Handling
 Status: 400 Bad Request (invalid request message framing)
 Body: subreddit parameter is missing!

 Status: 500 Internal Server Error
 Body: JSON isnt available! / Invalid JSON structure!

 */
app.get('/r/:subreddit/top', (req, res) => {
    const {subreddit} = req.params;
    const fullUrl = URL_RETRIEVE_FROM;
    if (!subreddit) {
        res.status(400).send({message: SUBREDDIT_PARAM_MISSING_ERROR});
    }
    let jsonData, jsonObject;
    axios.get(fullUrl).then(response => {
        jsonData = response.data.data
        titlesArray = sanitizeRedditData(jsonData)
        if (!titlesArray) {
            res.status(500).send({message: INVALID_JSON_STRUCT_ERROR});
        } else {
            if (jsonData) {
                jsonObject = {titles: titlesArray}
                res.status(200).send({
                    jsonObject
                })
            } else {
                res.status(500).send({message: UNAVAILABLE_JSON_FILE_ERROR});
            }
        }
    }).catch(error => {
        console.error(PROBLEM_FETCHING_DATA_ERROR, error);
    });
});

