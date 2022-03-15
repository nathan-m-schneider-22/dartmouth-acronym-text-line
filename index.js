const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();
const mapping = require('./acronyms.json')
console.log(mapp)

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
  console.log("message received")
  console.log(req.body)

  const twiml = new MessagingResponse();

  if (req.body.Body in mapping){
    twiml.message(mapping[req.body.Body]);
  } else {
    twiml.message(
      'Could not find acronym'
    );
  }

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`Express server listening on port ${process.env.PORT}`);
});
