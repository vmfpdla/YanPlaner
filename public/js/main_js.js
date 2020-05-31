import email from '../../routes/index';

window.attachEvent('onload', function() {
    console.log("으아아아아아아");
    console.log(email);
});

function changeBtn_login() {
    // btn_login 누르면 display 보이게
    var btn_login = document.getElementById('btn_login');
    btn_login.style.display = 'block';
    // btn_mypage 누르면 display 안보이게( 아예 자리도 안차지하게)
    var btn_mypage = document.getElementById('btn_mypage');
    btn_mypage.style.display = 'none';
}

function changeBtn_mypage() {
    var btn_mypage = document.getElementById('btn_mypage');
    btn_mypage.style.display = 'block';

    var btn_login = document.getElementById('btn_login');
    btn_login.style.display = 'none';
}