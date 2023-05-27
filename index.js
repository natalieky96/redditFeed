const express = require('express');
const app = express();
const PORT = 3000;
const fs = require('fs');
const axios = require('axios');
const {json} = require("express");

// Fire up my API into the server
app.listen(PORT,
    () => console.log(`It is online on : http://localhost:${PORT}`)
)

//Middleware- every request first will go through here and make it as json
app.use(express.json());

const sanitize =
app.get('/r/:subreddit/top', (req, res) => {
    const {subreddit} = req.params;
    const fullUrl = `https://www.reddit.com/r/${subreddit}/top.json`;

    if (!subreddit) {
        res.status(418).send({message: 'subreddit needed!'});
    }
    let jsonData;
    let jsonObject;
    axios.get(fullUrl).then(response => {
        jsonData = response.data.children.map(child => child.title);
        if (jsonData){
            jsonObject = {titles:jsonData}
            res.status(200).send({
                jsonObject
            })
        }
        else{
            res.status(500).json({message: 'JSON isnt available!'});
        }
        // res.send(jsonData);

    }).catch(error => {
        console.error('Error! Problem with fetching JSON data:', error)
    });
    // if (jsonData) {

    // }
        // else {
    //     console.error('Error fetching JSON data:', error);
    // }

});

