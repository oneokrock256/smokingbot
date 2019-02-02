'use strict';

const express = require('express');
const line = require('@line/bot-sdk');
const PORT = process.env.PORT || 3000;

const config = {
    channelSecret: '124ac7f4a826141e83a3125ea43cace7',
    channelAccessToken: '',
};

const app = express();

app.post('/webhook', line.middleware(config), (req, res) => {
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log(req.body.events);
    console.log("");
    console.log("");
    console.log("");
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text //実際に返信の言葉を入れる箇所
  });
}

app.listen(PORT);
console.log(`Server running at ${PORT}`);