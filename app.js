const API_KEY = '1b03f7260924b7fa6057fc0caee51c3e'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const moviesContainer = document.getElementById('movies');

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    searchMovies(searchTerm);
  }
});

function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayMovies(data.results);
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
    });
}

function displayMovies(movies) {
  moviesContainer.innerHTML = ''; 

  if (movies.length === 0) {
    moviesContainer.innerHTML = '<p>No movies found.</p>';
    return;
  }

  movies.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const moviePoster = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` 
      : 'https://via.placeholder.com/200x300?text=No+Image';

    movieElement.innerHTML = `
      <img src="${moviePoster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>Release Date: ${movie.release_date || 'N/A'}</p>
      <p>Rating: ${movie.vote_average || 'N/A'}</p>
    `;

    moviesContainer.appendChild(movieElement);
  });
}
