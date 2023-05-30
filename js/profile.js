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
      userJson = xhr.responseText;
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

function GetList()
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${listUri}${userJson.id}&pageNum=${listPage}&pageSize=15`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      listJson = xhr.responseText;
    }
  }
}

function RemoveMovieFromList() //更改removeId
{
  const Json = {
    removedMovieId
  }
  xhr.open('DELETE', `${removeListUri}${userJson.id}`, true)
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
  xhr.open('GET', `${commentUri}${userJson.id}`, true)
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
