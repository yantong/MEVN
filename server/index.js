//express_demo.js 文件
var express = require('express');
var app = express();
const path = require('path');
const mongo = require('./mongo/index');

app.use(express.static(path.join(__dirname,'dist')));
app.get('/',(req,res) =>{
    res.sendFile('./dist/index.html');
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname,'dist/index.html'));
})
  

var server = app.listen(3000, function () {
    var port = server.address().port
   
    console.log("应用实例，访问地址为 http://localhost:%s", port)
})