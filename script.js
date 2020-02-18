const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const PROFILE_BASE_URL = 'http://image.tmdb.org/t/p/w185'
const BACKDROP_BASE_URL = 'http://image.tmdb.org/t/p/w780'

class App {
  static run() {
    APIService.fetchMovie(534)
      .then(movie => Page.renderMovie(movie))
    APIService.fetchAct(534)
      .then(actor => Page.renderActor(actor))
  }
}
class APIService {
  static fetchMovie(movieId) {
    const url = APIService._constructUrl(`movie/${movieId}`)
    return fetch(url)
      .then(res => res.json())
      .then(json => new Movie(json))
  }
   static fetchAct(movieId) {
    const urlAct = APIService._constructUrl(`movie/${movieId}/credits`)
    return fetch(urlAct)
      .then(res => res.json())
      .then(json => {

        let actors=[];
        for (let i = 0; i <4; i++) {
          actors.push(new Actor(json.cast[i]))
          console.log(json.cast[i])
        }
       //
       return actors;
       })//should be an array
  }

  static  _constructUrl(path) {
    return `${TMDB_BASE_URL}/${path}?api_key=${atob('NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI=')}`
  }
}

class Page {
  static backdrop = document.getElementById('movie-backdrop')
  static title = document.getElementById('movie-title')
  static releaseDate = document.getElementById('movie-release-date')
  static runtime = document.getElementById('movie-runtime')
  static overview = document.getElementById('movie-overview')

  static actors=document.getElementById('actors');

  static renderMovie(movie) {
    Page.backdrop.src = BACKDROP_BASE_URL + movie.backdropPath
    Page.title.innerText = movie.title
    Page.releaseDate.innerText = movie.releaseDate
    Page.runtime.innerText = movie.runtime + " minutes"
    Page.overview.innerText = movie.overview
  }
 static renderActor(act) {
    //mmmmmm
    act.map(e=>{

    let img=document.createElement('img');
    let p=document.createElement('p');
    img.src=PROFILE_BASE_URL+"/"+e.pic;//how could i know the name of attribute?
    p.innerHTML=e.name;
    let newLi=document.createElement('li');
    newLi.appendChild(img,p);
    Page.actors.appendChild(newLi);
  
  })
}}

class Movie {
  constructor(json) {
    this.id = json.id
    this.title = json.title
    this.releaseDate = json.release_date
    this.runtime = json.runtime
    this.overview = json.overview
    this.backdropPath = json.backdrop_path
  }
}
class Actor {
  constructor(json) {
    //mmmmmmmmm
    this.name=json.name;
    this.pic=json.profile_path;
  }
}

document.addEventListener("DOMContentLoaded", App.run);

