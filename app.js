//필요한 모듈 선언
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var mysqlDB = require('./routes/mysql_db');
var expressSession = require('express-session');

mysqlDB.connect();

var app = express();

//express 서버 포트 설정
app.set('port', 3000);

app.set('views', __dirname + '/public/views/');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// 기본 path를 /public으로 설정(css, javascript 등의 파일 사용을 위해)
app.use(express.static(__dirname + '/public'));

//서버 생성
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

//세션 환경 세팅
//세션은 서버쪽에 저장하는 것을 말하는데, 파일로 저장 할 수도 있고 레디스라고 하는 메모리DB등 다양한 저장소에 저장 할 수가 있는데
app.use(expressSession({
    secret: 'my key', //이때의 옵션은 세션에 세이브 정보를 저장할때 할때 파일을 만들꺼냐
    //아니면 미리 만들어 놓을꺼냐 등에 대한 옵션들임
    resave: true,
    saveUninitialized: true
}));



//라우팅 모듈 선언
var indexRouter = require('./routes/index');
var clockRouter = require('./routes/clock');
var loginRouter = require('./routes/login');
var mypageRouter = require('./routes/mypage');

//request 요청 URL과 처리 로직을 선언한 라우팅 모듈 매핑
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static('public')); //이 로직을 추가함으로써 css 파일이 적용됨

app.use('/', indexRouter);
app.use('/clock', clockRouter);
app.use('/login', loginRouter);
app.use('/mypage', mypageRouter);