/*************
 * Constants *
 *************/

// const SUBREDDIT_PARAM_MISSING_ERROR = 'subreddit parameter is missing!';
// const INVALID_JSON_STRUCT_ERROR = "Invalid JSON structure!";
// const UNAVAILABLE_JSON_FILE_ERROR = 'JSON isnt available!';
// const PROBLEM_FETCHING_DATA_ERROR = 'Problem with fetching JSON data:';
const TITLES_AND_URLS = "Titles, Urls";

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

module.exports = {
    TITLES_AND_URLS, SANITIZE_VALID_DATA_TEST, SANITIZE_DATA_WITHOUT_TITLE_TEST,
    SANITIZE_DATA_WITHOUT_URL_TEST, INVALID_DATA
};