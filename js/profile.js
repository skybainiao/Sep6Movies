window.onload=function (){
  changeStatus();
}

//给index用的
let user = document.getElementById('lg');
user.onclick=()=>checkProfile();
let username = localStorage.getItem('username');


function changeStatus(){
  user.innerHTML=username;
}

function checkProfile(){
  if (username===null){
    window.location.href = "html/Login.html";
  }
  else {
    window.location.href = "html/profile.html";
  }

}
