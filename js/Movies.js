var pageNum = 1; //页数
var pageSize = 12; //每页电影数
const uri = 'http://sep-db-386814.ew.r.appspot.com/movie/getAll?pageNum=';
var clickedId = 0;
var movieId = 0;
const ratingUri = 'http://sep-db-386814.ew.r.appspot.com/ratings/getRating?movieId=';
var ratingJson = '';
const searchUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getByIdTitle?pageNum=1&pageSize=12&id=0&title=';
var searchTitle = '';
const imageUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getImage?id=00';
var imageJson = '';



window.onload=function (){
  changeStatus();
  GetMoviesForIndex();
}

//给index用的
let user = document.getElementById('lg');
user.onclick=()=>checkProfile();
let username = localStorage.getItem('username');


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

function GetRating()
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
      ratingJson = JSON.parse(data);
    }
  }
}

function GetImage()
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${imageUri}${movieId}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      imageJson = JSON.parse(data);
    }
  }
}

function Search() //调用前更改searchTitle参数
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
