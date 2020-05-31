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


//signin
router.get('/fail', function(req, res) {
    res.send('<script type="text/javascript">alert("이메일, 비밀번호를 다시 확인 해 주세요");</script>');
});

router.post('/signin', function(req, res, next) {
    var email = req.body.signIn_email;
    var password = req.body.signIn_password;

    var sql = "select user_password from user where user_email='" + email + "'";
    mysqlDB.query(sql, function(err, rows) {
        if (err) {
            console.log(err);
        } else {

            if (rows.length === 0) { // 같은 값이 없으면 로그인 실패
                res.send('<script type="text/javascript">alert("이메일, 비밀번호를 다시 확인 해 주세요");</script>');

            } else { // 같은 값이 있으면
                if (password == rows[0].user_password) // 비밀번호가 같으면
                {
                    req.session.user = {
                        "email": email,
                        "password": password,
                    }
                    res.render('main.html');

                } else {
                    res.send('<script type="text/javascript">alert("비밀번호를 다시 확인 해 주세요");</script>');
                }
            }

        }
    })

});

//signup
router.get('/failsignup', function(req, res, next) {
    res.send('<script type="text/javascript">alert("이미 등록되어있는 이메일입니다.");</script>');
});

router.post('/signup', function(req, res, next) {
    var email = req.body.signUp_email;
    var password = req.body.signUp_password;

    var sql = "select * from user where user_email='" + email + "'";
    mysqlDB.query(sql, function(err, rows) {
        if (err) {
            console.log(err);
        } else {
            if (rows.length === 0) { // 같은 값이 없으면 데베에 등록
                var sql2 = "INSERT INTO USER(platform_type,user_email,user_password) VALUES(?,?,?)";
                var params2 = ['local', email, password];
                mysqlDB.query(sql2, params2, function(err, rows) {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send({ check: 0 }); // 제대로 가입 된 경우 =0
                        res.end(data);
                    }
                })
            } else { // 같은 값이 있으면
                // res.render('../public/views/login');
                //res.send('<script type="text/javascript">alert("이미 등록되어있는 이메일입니다.");</script>');
                // res.end(data);
                // return;
                // fs.readFile('./public/views/login.html', function(error, data) {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         res.writeHead(200, { 'Content-Type': 'text/html' });
                //         res.end(data);
                //     }
                // });
                //res.send(rows); // 이미 이메일이 있는 경우 =1

                res.redirect("/failsignup");
            }

        }
    })

});

module.exports = router;