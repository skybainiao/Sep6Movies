const infoUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getOne?id=';
var detailedData = '';
const actorsUri = 'http://sep-db-386814.ew.r.appspot.com/people/getActors?movieTitle=';
var actorsJson = '';
var movieId = 0;
const imageUri = 'http://sep-db-386814.ew.r.appspot.com/movie/getImage?id=00';
var imageJson = '';
const ratingUri = 'http://sep-db-386814.ew.r.appspot.com/ratings/getRating?movieId=';
var ratingJson = '';
const directorUri = 'http://sep-db-386814.ew.r.appspot.com/people/getDirectorById?movieId=';
var directorJson = '';
const commentUri = 'http://sep-db-386814.ew.r.appspot.com/comment/get/movie?mId=';
var commentJson = '';

var commentContext = '';
var rating = 0;
var userId = 0;
var username = '';
var AddCommentUri = 'http://sep-db-386814.ew.r.appspot.com/comment/add/one';

var actors = '';

let htmlTitle = document.getElementById('title');
let htmlDirector = document.getElementById('director');
let htmlActors = document.getElementById('actors');
let htmlGenre = document.getElementById('genre');
let htmlCountry = document.getElementById('country');
let htmlLanguage = document.getElementById('language');
let htmlMovieId = document.getElementById('movieId');
let htmlOverview = document.getElementById('overview');
let htmlRating = document.getElementById('rating');
let htmlVotes = document.getElementById('votes');
let htmlImg = document.getElementById('image');



function GetMovieInfo(){
  GetId();
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${infoUri}${movieId}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var data = xhr.responseText;
      detailedData = JSON.parse(data); //id,title,year,image,language,country,genre,overview
      htmlTitle.innerHTML = detailedData.title + "(" + detailedData.year + ")";
      htmlGenre.innerHTML = "Genre: " + detailedData.genre;
      htmlCountry.innerHTML = "Country/region of production: " + detailedData.country;
      htmlLanguage.innerHTML = "Language: " + detailedData.language;
      htmlMovieId.innerHTML = "IMDb：tt" + detailedData.id;
      htmlOverview.innerHTML = detailedData.overview;
      htmlImg.src = detailedData.imagePath;
      GetActors();
      GetRating(); //rating,votes
      GetDirector();
      GetComment();
    }
  }
}

function GetId()
{
  var map = new Map();
  var receiveData = decodeURI(window.location.search);
  var key=receiveData.substring(receiveData.indexOf("?")+1,receiveData.indexOf("="));
  var value=receiveData.substring(receiveData.indexOf("=")+1);
  map.set(key,value);
  movieId = value;
console.log(movieId);
}

function GetActors()
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${actorsUri}${detailedData.title}&pageNum=1&pageSize=100`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var data = xhr.responseText;
      actorsJson = JSON.parse(data);
      actors += actorsJson.list[0].name;
      for (var i = 1; i < actorsJson.total; i++)
      {
        actors += "," + actorsJson.list[i].name;
      }
      htmlActors.innerHTML = "Stars: " + actors;
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
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      imageJson = JSON.parse(data);
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
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var data = xhr.responseText;
      ratingJson = JSON.parse(data);
      htmlRating.innerHTML = ratingJson.ratings.toFixed(1);
      htmlVotes.innerHTML = ratingJson.votes + " people rated";
    }
  }
}

function GetDirector()
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${directorUri}${movieId}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      directorJson = JSON.parse(data);
      htmlDirector.innerHTML = "Director: " + directorJson.name;
    }
  }
}

function GetComment()
{
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${commentUri}${movieId}`, true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.setRequestHeader('Accept', 'application/json')

  xhr.send()
  xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && /^20\d$/.test(xhr.status)){
      console.log(xhr.responseText)
      var  data = xhr.responseText;
      commentJson = JSON.parse(data);
    }
  }
}

function AddComment()//调用前设置userid username
{
  const Json = {
    "commentContext": commentContext,
    "rating": rating,
    "user": {
      "userId": userId,
      "username": username
    },
    "movie": {
      "id": movieId,
      "title": detailedData.title,
      "year": detailedData.year
    }
  }

  xhr.open('POST', AddCommentUri, true)
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
