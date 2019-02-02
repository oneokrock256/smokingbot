'use strict';

const express = require('express');
const line = require('@line/bot-sdk');

const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '秘密',
    channelAccessToken: '秘密',
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {

    console.log(req.body.events);
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
    if (event.type == 'message' && event.message.type == 'text') {
        let mes =  event.message.text;


        return client.replyMessage(event.replyToken, {
            type: 'text',
            text: mes
        });
        
    }

    if( event.type == 'message' && event.message.type  == 'location'){
        var lat = event.message.latitude;
        var lng = event.message.longitude;
        
        return client.replyMessage(event.replyToken, {
            type: 'text',
            text :"https://www.google.com/maps/d/embed?mid=1nfJ4qICIxHyiVMtdFl2Un8iSBXtCVT2I&ll=" +
            lat +
            "," +
            lng +
            "&z=18",
        });
    }

    return Promise.resolve(null);
    


}


app.listen(PORT);
console.log(`Server running at ${PORT}`);