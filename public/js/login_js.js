function changeSignIn() {
    // signIn 누르면 display 보이게
    var signInForm = document.getElementById('signInForm');
    signInForm.style.display = 'block';
    // signUp 누르면 display 안보이게( 아예 자리도 안차지하게)
    var signUpForm = document.getElementById('signUpForm');
    signUpForm.style.display = 'none';
    // signIn 누르면 signIn 줄생기고 효과 주기
    var signIn_h2 = document.getElementById('signIn_h2');
    signIn_h2.className = "active";
    // signUp 누르면 signUp 줄생기고 효과 주기
    var signUp_h2 = document.getElementById('signUp_h2');
    signUp_h2.className = "inactive underlineHover"
}

function changeSignUp() {
    var signUpForm = document.getElementById('signUpForm');
    signUpForm.style.display = 'block';

    var signInForm = document.getElementById('signInForm');
    signInForm.style.display = 'none';

    var signIn_h2 = document.getElementById('signIn_h2');
    signIn_h2.className = "inactive underlineHover";
    var signUp_h2 = document.getElementById('signUp_h2');
    signUp_h2.className = "active"
}


// naver 로그인 버튼을 누르면 api_url 쪽으로 이동 
function goNaverLogin() {
    var client_id = 'q0fvK38XvbbNCrdCc06i';
    var state = "RAMDOM_STATE";
    var redirectURI = encodeURI("http://localhost:3000/login/callback_naver");
    var api_url = "";
    api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    location.href = api_url;
}