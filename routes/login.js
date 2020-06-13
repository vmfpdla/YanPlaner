var express = require('express');
var router = express.Router();
var mysqlDB = require('../mysql-db');

var client_id = 'q0fvK38XvbbNCrdCc06i';
var client_secret = 'ZX_3corwLH';
var state = "RAMDOM_STATE";
var redirectURI = encodeURI("http://localhost:3000/login/callback_naver");
var api_url = "";

// 이 밑으로 라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의

// 로그인 메인 홈페이지
router.get('/', function(req, res) {
    var check = req.session.check;
    res.render('login.html', { check: check });
    res.end();
    return;
});


// naver 아이디로 회원가입시

router.get('/signup_naver', function (req, res) {
    var token = req.session.accessToken;
    console.log("token"+token);
    var header = "Bearer " + token;
    var api_url = 'https://openapi.naver.com/v1/nid/me';
    var request = require('request');
    var options = {
        url: api_url,
        headers: {'Authorization': header}
     };
    request.get(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var jsonRes = JSON.parse(body); // body는 현재 JSON 형식의 문자열 -> 이 문자열을 자바스크립트 객체로 변환
        var email = jsonRes.response.email;
        var id = jsonRes.response.id;
    
        var sql = "select * from user where user_id='" + id + "'";
        mysqlDB.query(sql, function(err, rows) {
            if (err) {
                console.log(err);
            } else {
                if (rows.length === 0) { // 같은 값이 없으면 데베에 등록
                    var sql2 = "INSERT INTO USER(platform_type,user_id,user_email) VALUES(?,?,?)";
                    var params2 = ['naver', id, email];
                    mysqlDB.query(sql2, params2, function(err, rows) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.send({ check: 0 }); // 제대로 가입 된 경우 =0
                            res.end();
                        }
                    })
                } else { // 같은 값이 있으면
                    req.session.user = {
                        "email": email,
                        "number": rows[0].user_number
                    }
                    res.redirect('../'); 
                }

            }
        })
        // res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
        // res.end(body);
      } else {
        console.log('error');
        if(response != null) {
          res.status(response.statusCode).end();
          console.log('error = ' + response.statusCode);
        }
      }
    });
  });

router.get('/callback_naver', function(req, res) {

    code = req.query.code;
    state = req.query.state;

    console.log(code);
    console.log(state);
    api_url = 'https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=' +
        client_id + '&client_secret=' + client_secret + '&redirect_uri=' + redirectURI + '&code=' + code + '&state=' + state;
    var request = require('request');
    var options = {
        url: api_url,
        headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
    };

    
    request.get(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonRes = JSON.parse(body); // body는 현재 JSON 형식의 문자열 -> 이 문자열을 자바스크립트 객체로 변환
            req.session.accessToken = jsonRes.access_token;
            res.redirect('/login/signup_naver');

            
            // res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
            // res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});




// router.get('/callback_naver', function(req, res) {

//     res.render('naver_callback.html');
//     res.end();
//     return;
// });

//signin

router.post('/signin', function(req, res, next) {
    var email = req.body.signIn_email;
    var password = req.body.signIn_password;

    var sql = "select user_number, user_password from user where user_email='" + email + "'";
    mysqlDB.query(sql, function(err, rows) {
        if (err) {
            console.log(err);
        } else {

            if (rows.length === 0) { // 같은 값이 없으면 로그인 실패 (아예 이메일도 등록이 안되있는 경우)
                req.session.check = 'failemail';
                res.redirect('/login');
            } else { // 같은 값이 있으면
                if (password == rows[0].user_password) // 비밀번호가 같으면
                {
                    req.session.user = {
                        "email": email,
                        "password": password,
                        "number": rows[0].user_number
                    }
                    res.redirect('../'); // 홈으로 이동

                } else { //비밀번호 틀렸으면
                    req.session.check = 'failpassword';
                    res.redirect('/login');
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
                        res.end();
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

                res.redirect("/login/failsignup");
            }

        }
    })

});



module.exports = router;