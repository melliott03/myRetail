var express = require('express')
var app = express()
var path = require('path');

var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const asyncMiddleware = require('./utils/asyncMiddleware').asyncMiddleware;
const db = require('./db/item-data.json');



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.static(path.join(__dirname, '../server/public')));


app.use("/item", asyncMiddleware(async (req, res, next) => { 
   res.send(db)
}));
  
  app.listen(7000, function(){
      console.log("Listening on port: ", 7000);
    });
  