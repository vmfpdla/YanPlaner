var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysqlDB = require('../mysql-db');


//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의
router.get('/', function(req, res, next) {
    fs.readFile('./public/views/login.html', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });

});

router.get('/login/failsignin', function(req, res, next) {
    res.send('<script type="text/javascript">alert("이메일, 비밀번호를 다시 확인 해 주세요");</script>');
});

router.post('/login/signin', function(req, res, next) {
    var email = req.body.signIn_email;
    var password = req.body.signIn_password;

    console.log(email, password);
    var sql = "select user_password from user where user_email='" + email + "'";

    mysqlDB.query(sql, function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            console.log("으악 " + rows);
            if (rows.length === 0) { // 같은 값이 없으면 로그인 실패
                res.redirect("/fail");

            } else { // 같은 값이 있으면
                sessionStorage.setItem('email', email);
                fs.readFile('./public/views/main.html', function(error, data) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data);
                    }
                });


            }

        }
    })

});

module.exports = router;