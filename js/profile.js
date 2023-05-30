var userUri = 'http://sep-db-386814.ew.r.appspot.com/user/getUser?id=0&username=';
var userJson = '';
var updateUserUri = 'http://sep-db-386814.ew.r.appspot.com/user/update/user';
var newPassword = '';
var listUri = 'http://sep-db-386814.ew.r.appspot.com/user/movieList/getList?userId=';
var listPage = 1;
var listJson = '';
var removeListUri = 'http://sep-db-386814.ew.r.appspot.com/user/movieList/removeMovie?userId=';
var removedMovieId = 0;
var commentUri = 'http://sep-db-386814.ew.r.appspot.com/comment/get/user?uId=';
var commentJson = '';
var removeCommentUri = 'http://sep-db-386814.ew.r.appspot.com/comment/remove/one?cId=';
var commentId = 0;
var updateCommentUri = 'http://sep-db-386814.ew.r.appspot.com/comment/update/one';
var newCommentText = '';
var newRating = '';
var newMovieCommentId = 0;
var newMovieCommentTitle = '';
var newMovieCommentYear = 0;

window.onload=function (){
  changeStatus();
  profileLoading();
}


let user = document.getElementById('lg');
user.onclick=()=>checkProfile();
let username = localStorage.getItem('username');
let logout = document.getElementById('out');
logout.onclick=()=>Logout();
let UserId = document.getElementById('userid');
let UserName = document.getElementById('username');
let Email = document.getElementById('email');
let FaCount = document.getElementById('movies-count');
let faMovies = document.getElementById('FaMovies');
let commentsList = document.getElementById('comments');


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

function Logout() {
  localStorage.removeItem("username");
  localStorage.clear();
  window.location.href = "../index.html";
}


function toggleDropdown(id) {
  document.getElementById(id).classList.toggle("show");
}


function profileLoading() {
  GetUser();
  UserName.innerHTML=username;
  Email.innerHTML=username+"10086@gmail.com";

}


function GetUser()
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${userUri}${username}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      userJson = JSON.parse(data);

      UserId.innerHTML=userJson.userId.toString();
      GetList();
      GetComment();
    }
  }
}
function GetList()
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${listUri}${userJson.userId}&pageNum=${listPage}&pageSize=15`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      listJson = JSON.parse(data);
      FaCount.innerHTML = listJson.total;

      for (var i = 0; i < listJson.total; i++)
      {
        var trObj = document.createElement("tr");

        var movieNum = document.createElement("td");
        var movieNumber = i;
        movieNumber += 1;
        movieNum.innerHTML = "Movie" + movieNumber + ":";
        trObj.appendChild(movieNum);

        var movieTitle = document.createElement("td");
        movieTitle.innerHTML = listJson.list[i].title;
        trObj.appendChild(movieTitle);

        var deleteBtnTd = document.createElement("td");
        var deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-button");
        deleteBtn.innerHTML = "Delete";
        deleteBtn.addEventListener('click', function() {
          RemoveMovieFromList(listJson.list[i].id);
          trObj.remove();
        });
        deleteBtnTd.appendChild(deleteBtn);
        trObj.appendChild(deleteBtnTd);

        faMovies.appendChild(trObj);
      }

    }
  }
}


function UpdateUser()
{
  const Json = {
    "userId":userJson.id,
    "username":username,
    "password":newPassword
  }

  xhr.open('PUT', updateUserUri, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send(JSON.stringify(Json))
  xhr.onreadystatechange = () => {
    //获取响应内容
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)

    }
  }
}



function RemoveMovieFromList(removedMovieId) //更改removeId
{
  const Json = {
    removedMovieId
  }
  const xhr = new XMLHttpRequest(); // 新建一个XMLHttpRequest对象
  xhr.open('DELETE', `${removeListUri}${userJson.userId}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send(JSON.stringify(Json))
  xhr.onreadystatechange = () => {
    //获取响应内容
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)

    }
  }
}


function GetComment()
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${commentUri}${userJson.userId}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      commentJson = JSON.parse(data);

      for (var i = 0; i < commentJson.length; i++)
      {
        var trObj = document.createElement("tr");

        var comNum = document.createElement("td");
        var comNumber = i;
        comNumber += 1;
        comNum.innerHTML = "Comment" + comNumber + ":";
        trObj.appendChild(comNum);

        var comContext = document.createElement("td");
        comContext.innerHTML = commentJson[i].commentContext;
        trObj.appendChild(comContext);

        var deleteBtnTd = document.createElement("td");
        var deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-button");
        deleteBtn.innerHTML = "Delete";
        deleteBtnTd.appendChild(deleteBtn);
        trObj.appendChild(deleteBtnTd);

        commentsList.appendChild(trObj);
      }
    }
  }
}

function RemoveComment()//更改commentId
{
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', `${removeCommentUri}${commentId}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      commentJson = xhr.responseText;
    }
  }
}

function UpdateComment()//newCommentText,newRating使用时更改 newMovieCommentXXX从commentJson中获取
{
  const Json = {
    "commentContext": newCommentText,
    "rating": newRating,
    "user": {
      "userId": userJson.id,
      "username": userJson.username
    },
    "movie": {
      "id": newMovieCommentId,
      "title": newMovieCommentTitle,
      "year": newMovieCommentYear
    }  }
  xhr.open('PUT', updateCommentUri, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send(JSON.stringify(Json))
  xhr.onreadystatechange = () => {
    //获取响应内容
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)

    }
  }
}
