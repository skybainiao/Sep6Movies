var pageNum = 1; //页数
var pageSize = 12; //每页电影数
const uri = 'http://sep-db-386814.ew.r.appspot.com/movie/getAll?pageNum=';
var clickedId = 0;
const ratingUri = 'http://sep-db-386814.ew.r.appspot.com/ratings/getRating?movieId=';
var ratingJson = '';
const searchUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getByIdTitle?pageNum=1&pageSize=12&id=0&title=';
var searchTitle = '';
const imageUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getImage?id=00';
const moviesByGenresUri = 'https://api.themoviedb.org/3/discover/movie?api_key=a1d579240045bb45c21c03bdc18a0f57&with_genres=';



let user = document.getElementById('lg');
user.onclick=()=>checkProfile();
let username = localStorage.getItem('username');
let searchBt = document.getElementById('searchBt');
searchBt.onclick=()=>searchMovie();
let searchText = document.getElementById('searchTxt');
let tip = document.getElementById('tip');

let Action = document.getElementById('28');
Action.onclick=()=>GetMoviesByGenres(28);
let Adventure = document.getElementById('12');
Adventure.onclick=()=>GetMoviesByGenres(12);
let Comedy = document.getElementById('35');
Comedy.onclick=()=>GetMoviesByGenres(35);
let Crime = document.getElementById('80');
Crime.onclick=()=>GetMoviesByGenres(80);
let Drama = document.getElementById('18');
Drama.onclick=()=>GetMoviesByGenres(18);
let Fantasy = document.getElementById('14');
Fantasy.onclick=()=>GetMoviesByGenres(14);
let Historical = document.getElementById('36');
Historical.onclick=()=>GetMoviesByGenres(36);
let Mystery = document.getElementById('9648');
Mystery.onclick=()=>GetMoviesByGenres(9648);
let Romance = document.getElementById('10749');
Romance.onclick=()=>GetMoviesByGenres(10749);
let Science = document.getElementById('878');
Science.onclick=()=>GetMoviesByGenres(878);

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
        items[i].href = "movieInfo.html?id=" + json.list[i].id;
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

function GetMoviesByGenres(genreId)
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${moviesByGenresUri}${genreId}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && /^20\d$/.test(xhr.status)) {
      console.log(xhr.responseText)
      var data = xhr.responseText;
      var json = JSON.parse(data); //json格式电影信息

      for (let i = 0; i < 12; i++) {
        names[i].innerHTML=json.results[i].title;
        times[i].innerHTML="Opened "+json.results[i].release_date;
        ratingsList[i].innerHTML="Rating: "+json.results[i].vote_average;
        imgs[i].src="http://image.tmdb.org/t/p/w500/"+json.results[i].poster_path;
        //items[i].href = "movieInfo.html?id=" + json.list[i].id;
      }

    }
  }
}





