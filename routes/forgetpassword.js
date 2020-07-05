var express = require("express");
var router = express.Router();
var mysqlDB = require("../mysql-db");
const crypto = require('crypto');
const nodemailer = require('nodemailer');

//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의
router.get("/", function(req, res) {
  res.render("forgetpassword.html");
  res.end();
  return;
});

router.post('/findpassword', (req, res) => {
  var email = req.body.email; 
  // email 입력 확인
  if (req.body.email === '') {
    res.status(400).send('email required');
  }
  // 유저 데이터베이스에 존재하는 이메일인지 확인

  var sql =
      "SELECT * FROM user where user_email='" +
      req.body.email +
      "' AND WHERE platform='local'"; 
    mysqlDB.query(sql, function(err, rows) {
      if (err) { // 오류
        console.log(err);
      } else {
        if (rows.length === 0) {
          // 같은 값이 없으면 비밀번호찾기 실패 (입력한 이메일이 없음.)
          req.body.findcheck = "noEmail";
          res.redirect("/forgetpassword");
        } else {
          // 같은 값이 있으면
          // const token = crypto.randomBytes(20).toString('hex'); // token 생성
          // const data = { // 데이터 정리
          //   token,
          //   userId: user.id,
          //   ttl: 300 // ttl 값 설정 (5분)
          // };
          let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'youremail@gmail.com',  // gmail 계정 아이디를 입력
              pass: 'yourpassword'          // gmail 계정의 비밀번호를 입력
            }
          });
        }
      }
  
});



//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;
