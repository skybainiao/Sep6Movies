var pageNum = 1; //页数
var pageSize = 12; //每页电影数
const uri = 'http://sep-db-386814.ew.r.appspot.com/movie/getAll?pageNum=';
const infoUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getOne?id=';
var movieId = 0;
const ratingUri = 'sep-db-386814.ew.r.appspot.com/ratings/getRating?movieId=';
var ratingJson;

//给index用的
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
  console.log()
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
        var detailedData = JSON.parse(data);
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
