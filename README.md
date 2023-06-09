# Top articles from a subreddit
I created a REST API that enables users to fetch the top articles from a specific subreddit.

The framework I used was Express with Node.js in the WebStorm IDE.
For testing I used the Jest Framework.
To view the output data body, I utilized a REST client called "Insomnia."

## Instructions on how to launch my application on the cloud:
I deployed my app to Vercel:
https://top-subreddit-articles.vercel.app/

To run it, you can write (for example):

https://top-subreddit-articles.vercel.app/r/news/top

or

https://top-subreddit-articles.vercel.app/r/n%20%20p/top
(For invalid url)

## Instructions on how to launch my application locally:
- Open the "index.js" file
- Download if needed the following: express (execute the command in the terminal: npm install express),and axios (npm install axios fs)   
(For testing you need to download jest with the command: npm install --save-dev jest)
- Run the program by execute the command "node ." in the terminal. You should get this message: "It is online on : http://localhost:3000"
- I used "Insomnia" for better visibility, you can use a regular browser, for the subreddit 'news' write: "http://localhost:3000/r/news/top" 
(you can modify it for any other subreddit).
For example:

![image](https://github.com/natalieky96/redditFeed/assets/62475562/24d37833-f689-4296-a25a-6a50a3d33c93)

- Press enter/send and you should get all the titles and urls of the top articles from the 'news' subreddit.

![image](https://github.com/natalieky96/redditFeed/assets/62475562/2c93b000-fcb2-48eb-8958-51898025ca6f)


## An overview of how my application works
This application provides an API endpoint that allows clients to retrieve the top posts from a specific subreddit on Reddit. The API returns the titles and URLs of the top posts in JSON format.

My application includes the following files:
* index.js - The main file which we run
* constants.js - A file which includes the constants variables some of the other files use
* utils.js - A helper file for the test files, it includes the functions - "sanitizeRedditData", "validWord"
* sanitize.test.js - Test file for testing the "sanitizeRedditData" function
* getRestApi.test.js - Test file for testing the getAPI call (END2END)

### Functionality:
I will focusing on the main file index.js. First, I wanted to fire up the api into the server. Then, I used middleware to make every request a JSON.
Then:
1. The client sends a GET request to the above endpoint, replacing {subreddit} in the URL with the desired subreddit name.
2. The server fetches the data from the corresponding Reddit API endpoint.
3. The retrieved data is sanitized using the sanitizeRedditData function, which extracts relevant information (titles and URLs) from the JSON response.
4. If the data is successfully sanitized and available, the server responds with a status of "200 OK" and the JSON object containing the titles and URLs of the top posts(in an array).
5. If any errors occur during the process, appropriate status codes and error messages are sent as a response.


## Test
After downloading the Jest framework, In the terminal, execute the command 'npm test test-file-name.js' to run the specific test file. 
You can also press the '>' button near the 'describe' in the IDE you use:

![image](https://github.com/natalieky96/redditFeed/assets/62475562/e548bdf0-d127-414e-9d32-2462707dfe9d)

*Don't!!* run 'npm test' alone as it can cause collisions and lead to non-functional tests.
Then, you should get:

![image](https://github.com/natalieky96/redditFeed/assets/62475562/d2707535-86e4-49b5-858e-cbc07687ff66)

and:

![image](https://github.com/natalieky96/redditFeed/assets/62475562/ed5b0402-63db-4ff4-ac8e-df7cbca2a61b)














