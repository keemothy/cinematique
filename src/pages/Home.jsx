import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allMovies, setAllMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchMode, setSearchMode] = useState(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popular = await getPopularMovies();
        setAllMovies(popular);
        setOriginalMovies(popular);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return;

    setLoading(true);

    try {
      const results = await searchMovies(searchQuery);
      console.log("API search results:", results);
      setAllMovies(results || []);
      setSearchMode(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies");
      setAllMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setAllMovies(originalMovies);
      setSearchMode(false);
      setError(null);
    } else if (!searchMode) {
      const filtered = originalMovies.filter((movie) =>
        movie.title.toLowerCase().includes(value.toLowerCase())
      );
      setAllMovies(filtered);
    }
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {allMovies.length > 0 ? (
            allMovies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))
          ) : (
            <div className="no-results">No movies found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
