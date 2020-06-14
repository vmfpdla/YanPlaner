var express = require("express");
var router = express.Router();
var mysqlDB = require("../mysql-db");

//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의
router.get("/", function(req, res) {
  res.render("forgetpassword.html");
  res.end();
  return;
});

router.post('/findpassword', (req, res) => {
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
          const token = crypto.randomBytes(20).toString('hex'); // token 생성
    const data = { // 데이터 정리
      token,
      userId: user.id,
      ttl: 300 // ttl 값 설정 (5분)
    };
        }
      }
  
});

// router.post("/modifyProfile", function(req, res, next) {
//   var password1 = req.body.login_password;
//   var password2 = req.body.login_password2;
//   if (password1 == password2) {
//     var sql =
//       "UPDATE user SET user_password='" +
//       password1 +
//       "' where user_number='" +
//       req.session.user.number +
//       "'";
//     mysqlDB.query(sql, function(err, rows) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(rows);
//       }
//       req.session.check = "CompleteModify";
//       res.redirect("/login");
//     });
//   } else {
//     // 비밀번호 두개가 서로 일치하지 않는 경우
//     req.session.mypagecheck = "failmodify";
//     res.redirect("/mypage");
//   }
// });

//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;
