const express = require('express')
const GoogleCredentialController =  require('./controllers/google.credentials.controller');
const app = express()
const Office = require('./office')

const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0';
const GOOGLECREDENTIAL = process.env.googleCredential || "1086925412710-eokas20k03k70dhf2rbi97jrtggntusb.apps.googleusercontent.com" 

//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))

//FIX ME: here we have to get the google APIkey in another way.
app.locals.googleCredential = new GoogleCredentialController(GOOGLECREDENTIAL)

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
