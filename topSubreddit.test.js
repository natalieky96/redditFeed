/*************
 * Constants *
 *************/
const {sanitizeRedditData} = require('./utils.js');
const SANITIZE_VALID_DATA_TEST = [{
    "kind": "t3", data: {
        "approved_at_utc": null,
        "subreddit": "nba",
        "author_fullname": "t2_r9jb9hx0",
        "saved": false,
        "mod_reason_title": null,
        "gilded": 1,
        "clicked": false,
        "title": "[Highlight] Derrick White barely beats the buzzer and forces a game 7!",
        "link_flair_richtext": [{"e": "text", "t": "Highlight"}],
        "subreddit_name_prefixed": "r/nba",
        "author_premium": true,
        "url": "https://streamable.com/p0udq1",
        "thumbnail": "default",
        "edited": false,
        "author_flair_css_class": "Timberwolves1",
    }
}];

const SANITIZE_DATA_WITHOUT_TITLE_TEST = [{
    "kind": "t3", data: {
        "approved_at_utc": null,
        "subreddit": "nba",
        "url": "https://streamable.com/p0udq1",
    }
}];

const SANITIZE_DATA_WITHOUT_URL_TEST = [{
    "kind": "t3", data: {
        "approved_at_utc": null,
        "subreddit": "nba",
        "title": "Derrick White barely beats the buzzer and forces a game 7!",
        "subreddit_name_prefixed": "r/nba",
        "author_premium": true,
    }
}];

const INVALID_DATA = ['bla'];


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