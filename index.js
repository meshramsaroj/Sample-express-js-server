const express = require("express");
const path = require("path");
const exphbs = require('express-handlebars');
// const logger = require("./middleWare/logger");

const app = express();

//Initial MiddleWare
// app.use(logger);

//HandleBars MiddleWare
app.engine('handlebars',exphbs({defaultLayout : 'main'}));
app.set('view engine','handlebars');

//Body parser middleWare
app.use(express.json());
app.use(express.urlencoded({extended : false}))

// Set static folder for view
app.use(express.static(path.join(__dirname, "public")));

app.use('/api/students',require('./routes/api/student-api'));

const port = 7000;

app.listen(port, () => {
  console.log("running");
});
