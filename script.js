const apiKey = '7be6ae62f17603f033f4ee6bcaee3ba9';
const apiUrl = 'https://api.themoviedb.org/3';

function fetchMovies(endpoint, sectionId) {
  fetch(`${apiUrl}${endpoint}?api_key=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const movies = data.results;
      const movieContainer = document.getElementById(sectionId);

      movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const imagePath = movie.poster_path 
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : 'https://via.placeholder.com/200x300?text=No+Image';

        movieElement.innerHTML = `
          <img src="${imagePath}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p><strong>Released:</strong> ${movie.release_date}</p>
          <p>${truncateText(movie.overview, 100)}</p>
          <p><strong>Genres:</strong> ${getGenres(movie.genre_ids)}</p>
        `;

        movieContainer.appendChild(movieElement);
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

function getGenres(genreIds) {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };

  return genreIds.map(id => genres[id]).join(', ');
}

// Fetch data for each section
document.addEventListener('DOMContentLoaded', () => {
  fetchMovies('/movie/popular', 'popular-movies');
  fetchMovies('/movie/top_rated', 'top-rated-movies');
  fetchMovies('/movie/upcoming', 'upcoming-movies');
});
