const axios = require('axios');
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'QQ',
    auth: {
        user: '1209144177@qq.com',
        pass: 'ygitochjnrdyhjgd'
    }
}));


module.exports = (app,db) => {

    app.post('/findPsd',(req,res) => {
        if(req.body.matchCode != req.session.mailcode)
        {
            res.set('Content-Type','text/plain');
            res.end(JSON.stringify({
                success: false,
                msg:'验证码错误'
            })); 
            return ;
        }


        var dbase = db.db("MEVN");

        dbase.collection("users").find({account:req.body.account}).toArray(function(err, result) {
            if (err) throw err;

            if(result.length != 0)
            {
                var whereStr = {"account": req.body.account};  // 查询条件
                var updateStr = {$set: { "pass" : req.body.pass}};

                dbase.collection("users").updateOne(whereStr, updateStr, function(err, result) {
                    if (err) throw err;

                    res.set('Content-Type','text/plain');
                    res.end(JSON.stringify({
                        success: true,
                        msg:'密码修改成功'
                    }));
                });
            }
            else
            {
                res.set('Content-Type','text/plain');
                res.end(JSON.stringify({
                    success: false,
                    msg:'账号不存在'
                })); 
            }            
        });
    });

    app.post('/getMailVercode',(req,res) => {
        req.session.mailcode = parseInt(Math.random() * 10000) + '';

        smtpTransport.sendMail({
                from: '1209144177@qq.com',
                to: req.body.mail,
                subject: '验证码',
                html: '你的验证码是：    ' + req.session.mailcode
            }, function (error, response) {
                if (error) {
                    res.end({
                        success: false,
                        msg: error
                    })
                    console.log(error);
                }
                res.set('Content-Type','text/plain');
                res.end(JSON.stringify({
                    success: true,
                }))
            });
        });
}
