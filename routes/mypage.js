var express = require("express");
var router = express.Router();
var mysqlDB = require("../mysql-db");

//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의

router.get("/", function(req, res) {
  if (req.session.user != undefined) {
    var sql =
      "SELECT * from user where user_number ='" + req.session.user.number + "'";
    mysqlDB.query(sql, function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        //console.log(rows);
      }
      res.render("mypage.html", {
        data: JSON.stringify(rows),
        mypagecheck: req.session.mypagecheck,
      }); // 유저에 대한 정보를 보냄
    });
  } else {
    res.redirect("/login");
  }
});

router.post("/modifyProfile", function(req, res, next) {
  var password1 = req.body.login_password;
  var password2 = req.body.login_password2;
  if (password1 == password2) {
    var sql =
      "UPDATE user SET user_password='" +
      password1 +
      "' where user_number='" +
      req.session.user.number +
      "'";
    mysqlDB.query(sql, function(err, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
      }
      req.session.check = "CompleteModify";
      res.redirect("/login");
    });
  } else {
    // 비밀번호 두개가 서로 일치하지 않는 경우
    req.session.mypagecheck = "failmodify";
    res.redirect("/mypage");
  }
});

//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;
