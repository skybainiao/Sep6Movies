﻿var pageNum = 1; //页数
var pageSize = 12; //每页电影数
const uri = 'http://sep-db-386814.ew.r.appspot.com/movie/getAll?pageNum=';
var clickedId = 0;
const ratingUri = 'http://sep-db-386814.ew.r.appspot.com/ratings/getRating?movieId=';
var ratingJson = '';
const searchUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getByIdTitle?pageNum=1&pageSize=12&id=0&title=';
var searchTitle = '';
const imageUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getImage?id=00';



let user = document.getElementById('lg');
user.onclick=()=>checkProfile();
let username = localStorage.getItem('username');
let searchBt = document.getElementById('searchBt');
searchBt.onclick=()=>searchMovie();
let searchText = document.getElementById('searchTxt');


let imgs = [];
let names = [];
let times = [];
let ratingsList = [];
let items = [];
//items[0].onclick=()=>goInfo();


for (let i = 1; i <= 12; i++) {
  let img = document.getElementById('img' + i);
  let name = document.getElementById('s' + i);
  let time = document.getElementById('time' + i);
  let rating = document.getElementById('rating' + i);
  let item = document.getElementById('item' + i);

  imgs.push(img);
  names.push(name);
  times.push(time);
  ratingsList.push(rating);
  items.push(item);
}


window.onload=function (){
  changeStatus();
  GetMovies();
}

function changeStatus(){
  if (username!==null){
    user.innerHTML=username;
  }

}

function checkProfile(){
  if (username===null){
    window.location.href = "html/login.html";
  }
  else {
    window.location.href = "html/profile.html";
  }
}

function goInfo() {
  localStorage.setItem('title', names[0]);
}

function searchMovie() {
  Search(searchText.value);
  hideItems();
}


function Search(searchTitle) //调用前更改searchTitle参数
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${searchUri}${searchTitle}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && /^20\d$/.test(xhr.status)) {
      console.log(xhr.responseText)
      var data = xhr.responseText;
      var json = JSON.parse(data); //输出

      names[0].innerHTML=json.list[0].title;
      times[0].innerHTML="Opened "+json.list[0].year;
      GetRating(json.list[0].id,0);
      imgs[0].src=json.list[0].imagePath;

    }
  }
}

function GetRating(movieId,i)
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${ratingUri}${movieId}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;

      ratingJson = JSON.parse(data);
      ratingsList[i].innerHTML="Rating: "+ratingJson.ratings;
    }
  }
}


function hideItems() {
  for (let i = 1; i < items.length; i++) {
    items[i].style.display = "none";
  }
}

function GetMovies(){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${uri}${pageNum}&pageSize=${pageSize}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      var json=JSON.parse(data); //json格式电影信息

      for (let i = 0; i < 12; i++) {
        names[i].innerHTML=json.list[i].title;
        times[i].innerHTML="Opened "+json.list[i].year;
        GetRating(json.list[i].id,i);
        GetImage(json.list[i].id,i);
      }
    }
  }







  function GetImage(movieId,i)
  {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${imageUri}${movieId}`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'application/json')

    xhr.send()
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
        console.log(xhr.responseText)
        imgs[i].src=xhr.responseText;
      }
    }
  }



  window.onclick = function (e) {
    var element = document.elementFromPoint(e.clientX,e.clientY);
    if (element.classList.contains("movie"))
    {
      clickedId = element.id;
      GetMovieInfo();
      window.location.href = "../movieInfo.html?id=" + clickedId;
    }
  }

  function GetMovieInfo(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${infoUri}${movieId}`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'application/json')

    xhr.send()
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
        console.log(xhr.responseText)
        var data = xhr.responseText;
        var detailedData = JSON.parse(data); //id,title,year



        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${actorsUri}${detailedData.title}&pageNum=1&pageSize=100`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Accept', 'application/json')

        xhr.send()
        xhr.onreadystatechange = () => {
          if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
            console.log(xhr.responseText)
            var data = xhr.responseText;
            var actorsData = JSON.parse(data); //actors info

          }
        }
      }
    }
  }
}






