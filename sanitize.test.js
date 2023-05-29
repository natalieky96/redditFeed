/*************
 * Constants *
 *************/
const {sanitizeRedditData} = require('./utils.js');
const {
    TITLES_AND_URLS, SANITIZE_VALID_DATA_TEST, SANITIZE_DATA_WITHOUT_TITLE_TEST,
    SANITIZE_DATA_WITHOUT_URL_TEST, INVALID_DATA
} = require('./constants');


/*********************************************
 * Tests for the sanitizeRedditData function *
 *********************************************/

describe('sanitizeRedditData', () => {

    it('retrieve the correct data from the JSON', async () => {
        //part of the subreddit NBA top posts, check if it can sanitize it correctly
        //which means the function should get only the title and the url
        const exampleJsonData = {
            children:
            SANITIZE_VALID_DATA_TEST
        };
        const expectedOutput = [["[Highlight] Derrick White barely beats the buzzer and forces a game 7!",
            "https://streamable.com/p0udq1"]];

        const result = sanitizeRedditData(exampleJsonData);
        expect(result).toEqual(expectedOutput);
    });

    it('return null for empty data', async () => {
        const exampleJsonData = null;
        const expectedOutput = null;

        const result = sanitizeRedditData(exampleJsonData);
        expect(result).toEqual(expectedOutput);
    });

    it('return null for invalid data', async () => {
        const exampleJsonData = {children: INVALID_DATA};
        const expectedOutput = null;

        const result = sanitizeRedditData(exampleJsonData);
        expect(result).toEqual(expectedOutput);
    });

    it('return null for missing title', async () => {
        const exampleJsonData = {children: SANITIZE_DATA_WITHOUT_TITLE_TEST};
        const expectedOutput = null;

        const result = sanitizeRedditData(exampleJsonData);
        expect(result).toEqual(expectedOutput);
    });

    it('retrieve the title without the url', async () => {
        const exampleJsonData = {children: SANITIZE_DATA_WITHOUT_URL_TEST};
        const expectedOutput = [["Derrick White barely beats the buzzer and forces a game 7!"]];

        const result = sanitizeRedditData(exampleJsonData);
        expect(result).toEqual(expectedOutput);
    });
});