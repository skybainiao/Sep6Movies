var pageNum = 1; //页数
var pageSize = 12; //每页电影数
const uri = 'http://sep-db-386814.ew.r.appspot.com/movie/getAll?pageNum=';
const infoUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getOne?id=';
var movieId = 0;
const ratingUri = 'http://sep-db-386814.ew.r.appspot.com/ratings/getRating?movieId=';
var ratingJson;
const actorsUri = 'http://sep-db-386814.ew.r.appspot.com/people/getActors?movieTitle=';
const searchUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getByIdTitle?pageNum=1&pageSize=12&id=0&title=';
var searchTitle = '';

//给index用的
let user = document.getElementById('lg');
let username = localStorage.getItem('username');


function changeStatus(){
  user.innerHTML=username;
}





let imgs = [];
let names = [];
let times = [];
let ratings = [];

for (let i = 1; i <= 12; i++) {
  let img = document.getElementById('img' + i);
  let name = document.getElementById('s' + i);
  let time = document.getElementById('time' + i);
  let rating = document.getElementById('rating' + i);

  imgs.push(img);
  names.push(name);
  times.push(time);
  ratings.push(rating);
}

window.onload=function (){
  changeStatus();
  GetMoviesForIndex();
}

function GetMoviesForIndex(){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${uri}${pageNum}&pageSize=${pageSize}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      var json=JSON.parse(data); //json格式电影信息

      for (let i = 0; i < 12; i++) {
        names[i].innerHTML=json.list[i].title;
        times[i].innerHTML="Opened "+json.list[i].year;

        //rating part
        movieId = json.list[i].id;
        GetRatings(); //ratingJson包含评分信息
      }
    }
  }
}

function GetMovies(){
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${uri}${pageNum}&pageSize=${pageSize}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      var json=JSON.parse(data); //json格式电影信息
    }
  }

  window.onclick = function (e) {
    var element = document.elementFromPoint(e.clientX,e.clientY);
    if (element.classList.contains("movie"))
    {
      movieId = element.id;
      GetMovieInfo();
      window.location.href = "../movieInfo.html";
    }
  }

  function GetMovieInfo(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${infoUri}${movieId}`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'application/json')

    xhr.send()
    xhr.onreadystatechange = () => {
      if(xhr.readyState == 4 && /^20\d$/.test(xhr.status)){
        console.log(xhr.responseText)
        var data = xhr.responseText;
        var detailedData = JSON.parse(data); //id,title,year

        const xhr = new XMLHttpRequest();
        xhr.open('GET', `${actorsUri}${detailedData.title}&pageNum=1&pageSize=100`, true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.setRequestHeader('Accept', 'application/json')

        xhr.send()
        xhr.onreadystatechange = () => {
          if(xhr.readyState == 4 && /^20\d$/.test(xhr.status)){
            console.log(xhr.responseText)
            var data = xhr.responseText;
            var actorsData = JSON.parse(data); //actors info

          }
        }
      }
    }
  }
}

function GetRatings()
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${ratingUri}${movieId}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      var ratingData = JSON.parse(data);
      ratingJson = ratingData;
    }
  }
}

function Search() //使用时更改searchTitle参数
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${searchUri}${searchTitle}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && /^20\d$/.test(xhr.status)) {
      console.log(xhr.responseText)
      var data = xhr.responseText;
      var json = JSON.parse(data); //输出
    }
  }
}
