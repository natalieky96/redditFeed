/*************
 * Constants *
 *************/
const {sanitizeRedditData} = require('./utils.js');
const {
    EXPECTED_OUTPUT_DATA_WITHOUT_URL_TEST, EXPECTED_OUTPUT_VALID_DATA,
    SANITIZE_VALID_DATA_TEST, SANITIZE_DATA_WITHOUT_TITLE_TEST,
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
        const expectedOutput = EXPECTED_OUTPUT_VALID_DATA;

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
        const expectedOutput = EXPECTED_OUTPUT_DATA_WITHOUT_URL_TEST;

        const result = sanitizeRedditData(exampleJsonData);
        expect(result).toEqual(expectedOutput);
    });
});
