const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL = BASE_URL + "/search/movie?" + API_KEY;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview, id } = movie;
    const movieCard = document.createElement("div");

    movieCard.classList.add("movie");

    movieCard.innerHTML = `
            <img src="${IMG_URL + poster_path}" alt="${title}" class='movie-img'>
            <div class="movie-info">
                <h3 class='movie-title'>${title}</h3>
                <div class='movie-rating'>Rating: ${vote_average}/10</div>
                <div class="movie-desc">${overview}</div>
                <button class='movie-button' id="${id}">See More</button>
            </div>
        `;
    main.appendChild(movieCard);

    document.getElementById(id).addEventListener('click', ()=>{
      console.log(id)
      openCard(movie)
    })


  });
}


const overlayContent = document.getElementById('overlay-content');

function openCard(movie){
  document.getElementById("myNav").style.width = "100%";
  let id = movie.id;
  console.log(movie.title)
  console.log(id+'from 2')
  content = `
  <div class='card-modal'> 
    <h3 class='title-modal'>${movie.title}</h3>
    <p class="overview-modal"> ${movie.overview}</p>
    <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}" class='img-modal'>
  </div>

  `
  overlayContent.innerHTML = content;
}

function closeCard() {
  document.getElementById('myNav').style.width = '0%'
}


//Search

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  }
  else {
      getMovies(API_URL)
  }
});


