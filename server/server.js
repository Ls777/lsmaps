const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = process.env.PORT || 5000;



const database = require('./database');
const db = new database()

/*


db.newMap("charlie", "www.do.com", "a map", 1)

db.newMap("brolly", "www.dog.com", "another map", 1)

db.newMarker(1, 1.123, 345, "joe","www.google.com", "a dude", "blue")
db.newMarker(2, 123, 345, "bria")

db.updateMarker(2, { 
  name : "joey", 
  url : "www.newplace.com",
  description: "haha",
  color: 2
})

db.getMap(1).then(rows => console.log(rows))

db.updateMarker(1, {url: "poop"})

db.destroy();
*/

app.use(bodyParser.urlencoded({extended: true}))

require('./routes') (app, db);
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND CONNECTED TO REACT' });
});

