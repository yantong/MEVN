//express_demo.js 文件
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
var session = require('express-session');

const regist = require('./req/regist');
const login = require('./req/login');
const findpsd = require('./req/findpsd');


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({
        secret :  'secret', // 对session id 相关的cookie 进行签名
        resave : true,
        saveUninitialized: false, // 是否保存未初始化的会话
        cookie : {
            maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
        },
    }));

    app.use(express.static(path.join(__dirname,'dist')));
    app.get('/',(req,res) =>{
        res.sendFile('./dist/index.html');
    });
    
    regist(app,db);
    login(app,db);
    findpsd(app,db);

    app.use((req, res, next) => {
        res.status(404).send('Not found');
    })
      
    var server = app.listen(3000, function () {
        var port = server.address().port
       
        console.log("应用实例，访问地址为 http://localhost:%s", port)
    })
});
