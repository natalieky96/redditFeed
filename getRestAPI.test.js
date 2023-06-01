/*************
 * Constants *
 *************/
const express = require('express');
const app = express();
const PORT = 2000;
const axios = require('axios');
const {
    INVALID_SUBREDDIT_SPACE_IN_START, INVALID_SUBREDDIT_SPACE_IN_MIDDLE, INVALID_SUBREDDIT_JUST_SPACE, VALID_URL,
    SUBREDDIT_PARAM_MISSING_OR_INVALID_ERROR, INVALID_JSON_STRUCT_ERROR, UNAVAILABLE_JSON_FILE_ERROR
} =
    require('./constants');
const {validWord, sanitizeRedditData} = require('./utils');

/**************
 * Controller *
 **************/
app.get('/r/:subreddit/top', async (req, res) => {
    const {subreddit} = req.params;
    if (!subreddit || subreddit.length === 0 || !validWord(subreddit)) {
        return res.status(404).send({message: SUBREDDIT_PARAM_MISSING_OR_INVALID_ERROR})
    }
    const {valid, message} = await getAPIHnadler(subreddit);
    if (!valid) return res.status(500).send(message);
    return res.status(200).send(message);
});

/**************
 * Service *
 **************/
const getAPIHnadler = async (subreddit) => {
    if (!subreddit) return null;
    let jsonData;

    const fullUrl = `https://www.reddit.com/r/${subreddit}/top.json`;
    const response = await axios.get(fullUrl);
    if (response) {
        jsonData = response.data.data;
        let releventinfoArray = sanitizeRedditData(jsonData);
        if (!releventinfoArray) {
            return {valid: false, message: INVALID_JSON_STRUCT_ERROR};
        }
        if (jsonData) {
            return {valid: true, message: releventinfoArray}
        }
    }
    return {valid: false, message: UNAVAILABLE_JSON_FILE_ERROR}
}

/************
 *   TEST   *
 ************/
describe('getApi Handler', () => {

    it('check we get the right data from a valid URL', async () => {
        //Fire up the api
        app.listen(PORT,
            () => console.log(`It is online on : http://localhost:${PORT}`)
        )
        app.use(express.json());

        const response = await axios.get(VALID_URL);
        let jsonData = response.data;
        expect(response.status).toBe(200);
        expect(jsonData).toBeInstanceOf(Array);
    });

    //The invalid subreddit is a word contains just spaces = invalid
    it('Check if we get 404 error code for invalid subreddit', async () => {
        try {
            const response = await axios.get(INVALID_SUBREDDIT_JUST_SPACE);
            if (response.status === 200) {
                // Fail the test if a valid response with status 200 is received
                expect(response.status).not.toBe(200);
            }
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe(SUBREDDIT_PARAM_MISSING_OR_INVALID_ERROR);
        }
    });

    //The invalid subreddit is a word contains space in the middle of the word = invalid
    it('Check if we get 404 error code for invalid subreddit#2', async () => {
        try {
            const response = await axios.get(INVALID_SUBREDDIT_SPACE_IN_MIDDLE);
            if (response.status === 200) {
                // Fail the test if a valid response with status 200 is received
                expect(response.status).not.toBe(200);
            }
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe(SUBREDDIT_PARAM_MISSING_OR_INVALID_ERROR);
        }
    });

    //The invalid subreddit is a word contains space in the start of the word = invalid
    it('Check if we get 404 error code for invalid subreddit#3', async () => {
        try {
            const response = await axios.get(INVALID_SUBREDDIT_SPACE_IN_START);
            if (response.status === 200) {
                // Fail the test if a valid response with status 200 is received
                expect(response.status).not.toBe(200);
            }
        } catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data.message).toBe(SUBREDDIT_PARAM_MISSING_OR_INVALID_ERROR);
        }
    });
});
