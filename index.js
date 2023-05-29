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
TITLES_AND_URLS = "Titles, Urls";

// Fire up the API into the server
app.listen(PORT,
    () => console.log(`It is online on : http://localhost:${PORT}`)
)

//Middleware- every request first will go through here and make it as JSON
app.use(express.json());

/**
 * Process the given JSON data: Deletes all the irrelevant information,
 * and saves the titles and the url(links) of the post
 * @param jsonData The subredditData.data.data as a JSON
 * @returns {*[]} An array of titles and their url array
 */
const sanitizeRedditData = (jsonData) => {
    if (jsonData && jsonData.children) {
        let titlesAndUrlArr = []
        const childrenArray = jsonData.children;
        childrenArray.forEach(child => {
            const childData = child.data;
            if (!child.data || !childData[TITLE] ) {
                titlesAndUrlArr= null;
                return null;
            }
            const title = childData[TITLE];
            if (!childData[URL]) {
                titlesAndUrlArr.push([title]);
            } else {
                const url = childData[URL];
                titlesAndUrlArr.push([title, url]);
            }
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
    const fullUrl = `https://www.reddit.com/r/${subreddit}/top.json`;
    if (!subreddit) {
        res.status(400).send({message: SUBREDDIT_PARAM_MISSING_ERROR});
    }
    let jsonData, jsonObject;
    axios.get(fullUrl).then(response => {
        jsonData = response.data.data
        let relevantInfoArray = sanitizeRedditData(jsonData)
        if (!relevantInfoArray) {
            res.status(500).send({message: INVALID_JSON_STRUCT_ERROR});
        } else {
            if (jsonData) {
                jsonObject = {TITLES_AND_URLS: relevantInfoArray}
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


