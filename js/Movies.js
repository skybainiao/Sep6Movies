var pageNum = 1; //页数
var pageSize = 12; //每页电影数
const uri = 'http://sep-db-386814.ew.r.appspot.com/movie/getAll?pageNum=';

//给index用的

















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
}
