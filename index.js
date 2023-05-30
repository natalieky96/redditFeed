/*************
 * Constants *
 *************/
const express = require('express');
const app = express();
const PORT = 3000;
const axios = require('axios');
const {
    TITLE, URL, SUBREDDIT_PARAM_MISSING_OR_INVALID_ERROR, INVALID_JSON_STRUCT_ERROR,
    UNAVAILABLE_JSON_FILE_ERROR, PROBLEM_FETCHING_DATA_ERROR
} = require('./constants.js')

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
        //saves all the top articles we found
        const childrenArray = jsonData.children;
        //take from every child just the title and url and push it to the return array
        childrenArray.forEach(child => {
            const childData = child.data;
            if (!child.data || !childData[TITLE]) {
                titlesAndUrlArr = null;
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
 * Check if a word is invalid for the url address using regex
 * @param word the word we want to check
 * @returns {boolean} True if it is valid, Otherwise False
 */
const validWord = (word) => {
    //Check if the word includes space in the middle of a word
    //Check if the word is just spaces or starts with spaces
    return ((!(/\s/.test(word))) && (!(/^\s*$/.test(word))) && (!(/^\s/.test(word))));
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
 Status: 200 OK
 Body: The top {subreddit} articles titles and Urls.

 Error Handling
 Status: 404 NOT FOUND (invalid request message framing)
 Body: subreddit parameter is missing or invalid!

 Status: 500 Forbidden Error
 Body: JSON isnt available! / Invalid JSON structure! /

 */
app.get('/r/:subreddit/top', (req, res) => {
    const {subreddit} = req.params;
    if (!subreddit || subreddit.length === 0 || !validWord(subreddit)) {
        res.status(404).send({message: SUBREDDIT_PARAM_MISSING_OR_INVALID_ERROR});
    }
    const fullUrl = `https://www.reddit.com/r/${subreddit}/top.json`;
    let jsonData, jsonObject;

    //use axios to get the fullURL data as a JSON
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
                res.status(403).send({message: UNAVAILABLE_JSON_FILE_ERROR});
            }
        }
    }).catch(error => {
        console.error(PROBLEM_FETCHING_DATA_ERROR, error);
    });
});


