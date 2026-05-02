//Lastest version of line bot sdk: https://www.npmjs.com/package/@line/bot-sdk

const express = require('express');
const line = require('@line/bot-sdk');

// create LINE SDK config from env variables
const config = {
  channelSecret: "a14f87d9cfbc5a027258a29a1f9290a5",
};

// create LINE SDK client
const client = line.LineBotClient.fromChannelAccessToken({
  channelAccessToken: "cjQWX5wAD6x2TESH1vvn4gvC3JJRAXdJyc36oOLXB/ww2dxQTvhTu5L/XA/2fiTGdFQ56Zhu0zgDy1v6SFI9c2pk8q1MI/OXAhSk/1o3x2A2uN4JsAlUioj0gqi4gqdG5dq07Jp010JsEs92sxZyvwdB04t89/1O/w1cDnyilFU=",
});

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create an echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage({
    replyToken: event.replyToken,
    messages: [echo],
  });
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});

//Old version of line bot sdk: https://www.npmjs.com/package/linebot
// // index.js
// const express = require('express');
// const { middleware, messagingApi } = require('@line/bot-sdk');

// const app = express();

// // ตั้งค่าจาก LINE Developers Console
// const config = {
//   channelAccessToken: 'cjQWX5wAD6x2TESH1vvn4gvC3JJRAXdJyc36oOLXB/ww2dxQTvhTu5L/XA/2fiTGdFQ56Zhu0zgDy1v6SFI9c2pk8q1MI/OXAhSk/1o3x2A2uN4JsAlUioj0gqi4gqdG5dq07Jp010JsEs92sxZyvwdB04t89/1O/w1cDnyilFU=',
//   channelSecret: 'a14f87d9cfbc5a027258a29a1f9290a5'
// };

// app.use('/webhook', middleware(config));

// // รับ webhook
// app.post('/webhook', (req, res) => {
//   Promise
//     .all(req.body.events.map(handleEvent))
//     .then(result => res.json(result));
// });

// // ตอบกลับข้อความ
// function handleEvent(event) {
//   if (event.type !== 'message' || event.message.type !== 'text') {
//     return Promise.resolve(null);
//   }

//   return client.replyMessage({
//     replyToken: event.replyToken,
//     messages: [{
//       type: 'text',
//       text: `คุณพิมพ์ว่า: ${event.message.text}`
//     }]
//   });
// }

// const client = new messagingApi.MessagingApiClient({
//   channelAccessToken: config.channelAccessToken
// });
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });

// example
// const express = require('express');
// const app = express();
// const port = 3000

// // Respond with Hello World! on the homepage:
// app.get('/', function (req, res) {
//     res.send('Hello World!')
// })

// // Respond to POST request on the root route (/), the application’s home page:
// app.post('/', function (req, res) {
//     res.send('Got a POST request')
// })
// // Respond to a PUT request to the /user route:
// app.put('/user', function (req, res) {
//     res.send('Got a PUT request at /user')
// })
// // Respond to a DELETE request to the /user route:
// app.delete('/user', function (req, res) {
//     res.send('Got a DELETE request at /user')
// })


// app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })