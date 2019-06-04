const axios = require('axios');
var querystring = require('querystring');

module.exports = (app,db) => {
    app.post('/login',(req,res) =>{
        var dbase = db.db("MEVN");

        dbase.collection("users").find({account:req.body.account}).toArray(function(err, result) {
            if (err) throw err;

            res.set('Content-Type','text/plain');

            if(result.length == 0)
            {
                res.end(JSON.stringify({
                    success: false,
                    msg:'账号不存在'
                }));
                return ;
            }
            
            if(result[0].pass == req.body.pass)
                res.end(JSON.stringify({
                    success: true,
                    msg:'登录成功'
                }));
            else
                res.end(JSON.stringify({
                    success: false,
                    msg:'密码错误'
                })); 
        });
    });

    app.post('/getPhoneVercode',(req,res) =>{
        var queryData = querystring.stringify({
            "mobile": req.body.phoneNum,  // 接受短信的用户手机号码
            "tpl_id": "163192",  // 您申请的短信模板ID，根据实际情况修改
            "tpl_value": "#code#=123456",  // 您设置的模板变量，根据实际情况修改
            "key": "b1cc76ea5f18f71084f0f6b06073e9f3",  // 应用APPKEY(应用详细页查询)
        });
        
        var queryUrl = 'http://v.juhe.cn/sms/send?'+queryData;

        axios({
            method: 'get',
            url: queryUrl,
        }).then(res => {
            res.set('Content-Type','text/plain');
            res.end(JSON.stringify({
                success: true,
                msg:'验证码已发送'
            }));
        }).catch(e => { console.log(e); })
    });
}