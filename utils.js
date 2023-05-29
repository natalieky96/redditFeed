const axios = require("axios");
/*************
 * Constants *
 *************/
URL = 'url';
TITLE = 'title';
const SUBREDDIT_PARAM_MISSING_ERROR = 'subreddit parameter is missing!';
const INVALID_JSON_STRUCT_ERROR = "Invalid JSON structure!";
const UNAVAILABLE_JSON_FILE_ERROR = 'JSON isnt available!';
const PROBLEM_FETCHING_DATA_ERROR = 'Problem with fetching JSON data:';
TITLES_AND_URLS = "Titles, Urls";

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

// const handleGetTopArticles = (req) => {
//     const {subreddit} = req
//     const fullUrl = `https://www.reddit.com/r/${subreddit}/top.json`;
//     if (!subreddit) {
//         return [SUBREDDIT_PARAM_MISSING_ERROR];
//     }
//     let jsonData, jsonObject;
//     axios.get(fullUrl).then(response => {
//         jsonData = response.data.data
//         let relevantInfoArray = sanitizeRedditData(jsonData)
//         if (!relevantInfoArray) {
//             return [INVALID_JSON_STRUCT_ERROR];
//         } else {
//             if (jsonData) {
//                 return relevantInfoArray;
//             } else {
//                return [UNAVAILABLE_JSON_FILE_ERROR];
//             }
//         }
//     }).catch(error => {
//         console.error(PROBLEM_FETCHING_DATA_ERROR, error);
//     });
// };


// const handleGetTopArticles = (req, res) => {
//     const {subreddit} = req.params;
//     const fullUrl = `https://www.reddit.com/r/${subreddit}/top.json`;
//     if (!subreddit) {
//         res.status(400).send({message: SUBREDDIT_PARAM_MISSING_ERROR});
//     }
//     let jsonData, jsonObject;
//     axios.get(fullUrl).then(response => {
//         jsonData = response.data.data
//         let relevantInfoArray = sanitizeRedditData(jsonData)
//         if (!relevantInfoArray) {
//             res.status(500).send({message: INVALID_JSON_STRUCT_ERROR});
//         } else {
//             if (jsonData) {
//                 jsonObject = {TITLES_AND_URLS: relevantInfoArray}
//                 res.status(200).send({
//                     jsonObject
//                 })
//             } else {
//                 res.status(500).send({message: UNAVAILABLE_JSON_FILE_ERROR});
//             }
//         }
//     }).catch(error => {
//         console.error(PROBLEM_FETCHING_DATA_ERROR, error);
//     });
// }
//
//

module.exports = {sanitizeRedditData};
// module.exports = {handleGetTopArticles};