const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
// const request = require('request-promise');
const app = express();


const http= require('http')
// const inquirer = require('inquirer');

const db = require('./queries');
const port = 3000;

// express midware
app.use(express.json());
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true,}))


// calling my server to get info from my database
// when u get a request for this end point run this function 
app.get('/events', db.getEvents);
app.get('/events/:id', db.getEventById);
app.post('/events', db.createEvent);
app.put('/events/:id', db.updateEvent);
app.delete('/events/:id', db.deleteEvent)




app.listen(3000, () => console.log('Quote API listening on port 3000!'));

const data = {
    events: [
      {
        id: 1,
        title: 'code and craft', 
        type: 'craft',
        date: '02292019'
      },
      {
        id: 2,
        title: 'drink and draw', 
        type: 'art',
        date: '03102019'
      },
      {
        id: 3,
        title: 'climbing', 
        type: 'sport',
        date: '03102019'
      },
      {
        id: 4,
        title: 'book club', 
        type: 'book',
        date: '03282019'
      },
      {
        id: 5,
        title: 'chess', 
        type: 'game',
        date: '04012019'
      }
    ]
  }

  // {"id": "100",
  //       "title": "updated event ", 
  //       "type": "game",
  //       "date": "04012019"}