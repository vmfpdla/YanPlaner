var data = document.getElementById("data");
console.log("data" + data);
var data1 = data.innerText;
data1 = JSON.parse(data1);

document.getElementById("login_email").value = data1[0].user_email;
console.log(data1[0].user_email);
