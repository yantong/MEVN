//express_demo.js 文件
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const regist = require('./req/regist');
const login = require('./req/login');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname,'dist')));
    app.get('/',(req,res) =>{
        res.sendFile('./dist/index.html');
    });
    
    regist(app,db);
    login(app,db);

    app.use((req, res, next) => {
        res.status(404).send('Not found');
    })
      
    var server = app.listen(3000, function () {
        var port = server.address().port
       
        console.log("应用实例，访问地址为 http://localhost:%s", port)
    })
});
