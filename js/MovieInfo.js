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
      detailedData = JSON.parse(data); //id,title,year
      GetActors();
      GetImage();
      GetRating();
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
    }
  }
}

function GetImage1()
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

function GetRating1()
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
