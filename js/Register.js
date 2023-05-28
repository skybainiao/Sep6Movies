var username = "";
var password = "";
const uri = 'http://sep-db-386814.ew.r.appspot.com/user/add/User';

function Register() {
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  const User = {
    "username": username,
    "password": password
  }

  const xhr = new XMLHttpRequest();
  xhr.open('POST', uri, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send(JSON.stringify(User))
  xhr.onreadystatechange = () => {
    //获取响应内容
    if(xhr.readyState == 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      alert("Register successful")
    }
  }

}
  document.getElementById('register-form').addEventListener('submit', function(event) {
    Register();
  })

