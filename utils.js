/*************
 * Constants *
 *************/
const {URL,TITLE} = require('./constants');

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
    //Check if the word includes space in the middle of the word
    //Check if the word is just spaces or starts with spaces
    return ((!(/\s/.test(word))) && (!(/^\s*$/.test(word))) && (!(/^\s/.test(word))));
};

module.exports = {sanitizeRedditData, validWord};
