var username = "";
var password = "";
const uri = 'http://sep-db-386814.ew.r.appspot.com/user/login?username=';

function Login(){
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;

  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${uri}${username}&password=${password}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.send()
  xhr.onreadystatechange = () => {
    //获取响应内容
    if(xhr.readyState == 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      var json=JSON.parse(data);

      alert(json);
      if (json.toString() == 'Login success')
      {
        window.location.href = "../index.html?username=" + username;
      }
    }
  }
}


document.getElementById('login-form').addEventListener('submit', function(event) {
  Login();
})
