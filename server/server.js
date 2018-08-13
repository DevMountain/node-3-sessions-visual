require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const messagesCtrl = require('./messagesCtrl');
const session = require('express-session');

let { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();
app.use(express.static(__dirname + '/../build'));
app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use((req, res, next) => {
  let badWords = ['knucklehead', 'jerk', 'internet explorer'];
  if (req.body.message) {
    let badWordsExist = true;
    for (let i = 0; i < badWords.length; i++) {
      let regex = new RegExp(badWords[i], 'g');
      req.body.message = req.body.message.replace(regex, '****');
    }
    next();
  } else {
    next();
  }
});

app.get('/api/messages', messagesCtrl.getAllMessages);
app.get('/api/messages/history', messagesCtrl.history);
app.post('/api/messages', messagesCtrl.createMessage);
app.get('/api/ip-address', messagesCtrl.getIpAddress);
app.get('/api/sessions', (req, res) => {
  req.sessionStore.all((err, sessions) => {
    let sessionsArray = [];
    for (let key in sessions) {
      sessionsArray.push({ [key]: sessions[key] });
    }
    res.status(200).send(sessionsArray);
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}.`);
});
