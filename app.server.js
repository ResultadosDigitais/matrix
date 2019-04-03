const express = require('express')
const GoogleCredentialController = require('./controllers/google.credentials.controller');
const app = express()
const Office = require('./office.server')
const fs = require('fs');

const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0';
const GOOGLECREDENTIAL = process.env.googleCredential || "990846956506-bfhbjsu4nl5mvlkngr3tsmfcek24e8t8.apps.googleusercontent.com"

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))
app.use('/vendor/css/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

//FIX ME: here we have to get the google APIkey in another way.
app.locals.googleCredential = new GoogleCredentialController(GOOGLECREDENTIAL)


let roomData = process.env.roomData || fs.readFileSync('./file/default.room.web.json');
let roomsDetail = JSON.parse(roomData);
console.log(roomsDetail);

app.locals.roomsDetail = roomsDetail;

//routes
app.get('/', (req, res) => {
	res.render('index')
})

app.get('/office', (req, res) => {
	res.render('office')
})

//Listen on port 8080
server = app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

new Office(server)

module.exports = server
