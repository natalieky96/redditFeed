/*************
 * Constants *
 *************/
const express = require('express');
const app = express();
const PORT = 2000;
const axios = require('axios');
const {TITLES_AND_URLS} = require("./constants");
const TITLE = 'title';
const URL = 'url';
const SUBREDDIT_PARAM_MISSING_ERROR = 'subreddit parameter is missing!';
const INVALID_JSON_STRUCT_ERROR = "Invalid JSON structure!";
const UNAVAILABLE_JSON_FILE_ERROR = 'JSON isnt available!';
const PROBLEM_FETCHING_DATA_ERROR = 'Problem with fetching JSON data:';


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

// CONTROLLER
app.get('/r/:subreddit/top', async(req, res) => {
    // Fire up the API into the server
    const { subreddit } = req.params;
    if (!subreddit) {
        return res.status(400).send({ message: SUBREDDIT_PARAM_MISSING_ERROR })
    }
    const { valid, message } = await getAPIHnadler(subreddit);
    if (!valid) return res.status(500).send(message);
    return res.status(200).send(message);
});

// SERVICE
const getAPIHnadler = async (subreddit) => {
    if (!subreddit) return null;
    let jsonData, jsonObject;

    const fullUrl = `https://www.reddit.com/r/${subreddit}/top.json`;
    const response = await axios.get(fullUrl);
    jsonData = response.data.data;

    let releventinfoArray = sanitizeRedditData(jsonData);
    if (!releventinfoArray) {
        return { valid: false, message: INVALID_JSON_STRUCT_ERROR };
    }
    if (jsonData) {
        jsonObject = { TITLES_AND_URLS: releventinfoArray }
        return { valid: true, message: releventinfoArray }
    }
    return { valid: false, message: UNAVAILABLE_JSON_FILE_ERROR }
}

describe('getApi Handler', () => {

    it('check I get the right data from a valid URL', async () => {
        //Fire up the api
        app.listen(PORT,
            () => console.log(`It is online on : http://localhost:${PORT}`)
        )
        app.use(express.json());

        const response = await axios.get('http://localhost:2000/r/blop/top');
        let jsonData = response.data;
        let jsonDataResponse = jsonData[TITLES_AND_URLS];

        expect(response.status).toBe(200);
        expect(jsonData.message).toBeInstanceOf(Array);
    });
});