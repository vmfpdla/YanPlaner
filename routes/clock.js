var express = require('express');
var router = express.Router();
var fs = require('fs');


//라우터의 get()함수를 이용해 request URL('/')에 대한 업무처리 로직 정의


router.get('/', function(req, res, next) {
    fs.readFile('./public/views/clock.html', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});


//모듈에 등록해야 web.js에서 app.use 함수를 통해서 사용 가능
module.exports = router;