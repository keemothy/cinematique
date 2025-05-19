import "../css/MovieCard.css";

import { useMovieContext } from "../contexts/MovieContext";

function MovieCard({ movie }) {
  const { addToFavorites, removeFavorite, isFavorite } = useMovieContext();
  const favorite = isFavorite(movie.id);

  function handleClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFavorite(movie.id);
    } else {
      addToFavorites(movie);
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={handleClick}
          >
            ♥
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3> {movie.title} </h3>
        <p> {movie.release_date?.split("-")[0]}</p>
      </div>
    </div>
  );
}

export default MovieCard;
