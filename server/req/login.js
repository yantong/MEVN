const axios = require('axios');
var querystring = require('querystring');
var captchapng = require('captchapng');



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

    app.post('/phoneLogin',(req,res) => {
        if(req.session.code == req.body.matchCode && req.session.picCode == req.body.picCode)
            res.end(JSON.stringify({
                success: true,
                msg:'登录成功'
            }));
        else
            res.end(JSON.stringify({
                success: false,
                msg:'验证码错误'
            })); 
    });

    app.post('/getPhoneVercode',(req,res) => {
        req.session.code = parseInt(Math.random() * 10000) + '';

        // res.set('Content-Type','text/plain');
        // res.end(JSON.stringify({
        //     success: true,
        //     code: req.session.code,
        // }));

        var queryData = querystring.stringify({
            "mobile": req.body.phoneNum,  // 接受短信的用户手机号码
            "tpl_id": "163192",  // 您申请的短信模板ID，根据实际情况修改
            "tpl_value": `#code#=${req.session.code}`,  // 您设置的模板变量，根据实际情况修改
            "key": "b1cc76ea5f18f71084f0f6b06073e9f3",  // 应用APPKEY(应用详细页查询)
        });
        
        var queryUrl = 'http://v.juhe.cn/sms/send?'+queryData;
        
        axios({
            method: 'get',
            url: queryUrl,
        }).then(result => {
            res.set('Content-Type','text/plain');
            res.end(JSON.stringify({
                success: true,
                msg:'验证码已发送',
            }));
        }).catch(e => { console.log(e); })
    });

    app.get('/getPiccode',(req,res) => {
        //返回统一格式赋值
		var response = {};
		req.session.picCode = parseInt(Math.random()*9000+1000);
		var capt = new captchapng(80,30,req.session.picCode); // 图片宽度,图片高度,随机数字
        capt.color(0, 0, 0, 0);  // First color: 图片背景色 (red, green, blue, alpha)
        capt.color(80, 80, 80, 255); // Second color: 数字颜色 (red, green, blue, alpha)
		//转换成base64
        var icodeImg = capt.getBase64();
        response = {
            'success': true,
        	'content': icodeImg
        };
        res.send(response);
    });
}