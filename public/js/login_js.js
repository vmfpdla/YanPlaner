function changeSignIn(){
  // signIn 누르면 display 보이게
  var signInForm = document.getElementById('signInForm');
  signInForm.style.display='block';
  // signUp 누르면 display 안보이게( 아예 자리도 안차지하게)
  var signUpForm = document.getElementById('signUpForm');
  signUpForm.style.display='none';
  // signIn 누르면 signIn 줄생기고 효과 주기
  var signIn_h2 = document.getElementById('signIn_h2');
  signIn_h2.className="active";
  // signUp 누르면 signUp 줄생기고 효과 주기
  var signUp_h2 = document.getElementById('signUp_h2');
  signUp_h2.className="inactive underlineHover"
}

function changeSignUp(){
  var signUpForm = document.getElementById('signUpForm');
  signUpForm.style.display='block';

  var signInForm = document.getElementById('signInForm');
  signInForm.style.display='none';

  var signIn_h2 = document.getElementById('signIn_h2');
  signIn_h2.className="inactive underlineHover";
  var signUp_h2 = document.getElementById('signUp_h2');
  signUp_h2.className="active"
}
