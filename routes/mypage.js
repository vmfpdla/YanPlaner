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
      res.render("mypage.html", { data: JSON.stringify(rows) }); // 유저에 대한 정보를 보냄
    });
  } else {
    res.render("mypage.html");
  }
});

router.post("/modifyProfile", function(req, res, next) {
  // var plan_input = req.query.plan_input;
  // var time_input1 = req.query.time_input1;
  // var time_input2 = req.query.time_input2;

  // var date = new Array();
  // date[0] = req.query.date1;
  // date[1] = req.query.date2;
  // date[2] = req.query.date3;
  // date[3] = req.query.date4;
  // date[4] = req.query.date5;
  // date[5] = req.query.date6;
  // date[6] = req.query.date7;

  // var user_number;
  // var sch_alarm_check;
  // var sch_number;

  // for (i = 0; i < date.length; i++) console.log("date : " + date[i]);

  // for (i = 0; i < date.length; i++) {
  //     if (date[i] != undefined) { //있으면
  //         sch_alarm_check = true;
  //         break;
  //     }
  //     sch_alarm_check = false;
  // }

  // for (i = 0; i < date.length; i++) {

  //     if (date[i] === undefined) { //있으면
  //         date[i] = false;
  //     } else {
  //         date[i] = true;
  //     }

  // }

  // async function sqlFunction() {
  //     await f1()
  //     await f2()
  //     await f3()
  //     await f4()
  // }

  // // 로그인 안한 경우 로그인 창으로 유도
  // function f1() {
  //     return new Promise(function(resolve, reject) {
  //         if (req.session.user) { // 로그인 된 상태
  //             user_number = req.session.user.number;
  //         } else {
  //             req.session.check = 'stillnotlogin';
  //             res.redirect('/login');
  //         }
  //         resolve();
  //     });
  // }

  // //스케쥴 테이블에 row 추가
  // function f2() {
  //     return new Promise(function(resolve, reject) {
  //         var sql_1 = 'INSERT INTO scheduel(sch_title,sch_start,sch_end,user_number,sch_alarm_check) VALUES(?,?,?,?,?)'
  //         var params_1 = [plan_input, time_input1, time_input2, user_number, sch_alarm_check];
  //         mysqlDB.query(sql_1, params_1, function(err, rows) {
  //             if (err) {
  //                 console.log(err);
  //             } else {
  //                 console.log(rows);
  //                 resolve();
  //             }
  //         })
  //     });
  // }

  // //스케쥴 번호 얻기
  // function f3() {
  //     return new Promise(function(resolve, reject) {
  //         var sql_2 = 'select max(sch_number) as aa from scheduel';
  //         mysqlDB.query(sql_2, function(err, rows) {
  //             if (err) {
  //                 console.log(err);
  //             } else {
  //                 sch_number = rows[0].aa;
  //                 console.log(rows);
  //                 resolve();
  //             }
  //         })
  //     });
  // }

  // //스케쥴 번호얻은 것으로 알람테이블에 row 추가
  // function f4() {
  //     return new Promise(function(resolve, reject) {
  //         var sql_3 = 'INSERT INTO alarm(sch_number,mon,tue,wed,thr,fri,sat,sun) VALUES(?,?,?,?,?,?,?,?)'
  //         var params_3 = [sch_number, date[0], date[1], date[2], date[3], date[4], date[5], date[6]];
  //         mysqlDB.query(sql_3, params_3, function(err, rows) {
  //             if (err) {
  //                 console.log(err);
  //             } else {
  //                 console.log(rows);
  //                 resolve();
  //             }
  //         })
  //     });
  // }
  // sqlFunction();
  res.redirect("/main");
});

//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;
