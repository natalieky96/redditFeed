/*************
 * Constants *
 *************/
URL = 'url';
TITLE = 'title';

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
            const title = childData[TITLE];
            const url = childData[URL];
            titlesAndUrlArr.push([title, url]);
        });
        return titlesAndUrlArr;
    } else {
        return null;
    }
};

module.exports = {sanitizeRedditData};
