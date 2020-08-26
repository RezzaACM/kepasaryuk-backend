// library
var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./app/config/db');
const multer = require('multer');
const upload = multer()
const dotenv = require('dotenv');

dotenv.config()
// running express
const app = express();
app.use(cors())

app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    res.render('email/index');
});



// checking connection to db
connection.connect(error => {
    if (error) throw error;
    console.log('Successfully connected to database');
})

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json())

// for parsing multipart/form-data
app.use(upload.array());

// root url
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to Rest API plants n plan"
    });
})

// request hedaer
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

// call routing
app.use('/api', require('./app/routes/api'));

// port
const port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`Service running on port http://localhost:${port}`)
});