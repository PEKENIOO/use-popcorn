export default function WatchedMovie({
  movie,
  onDeleteWatched,
  onSelectMovie,
}) {
  return (
    <li
      onClick={(e) =>
        e.target.tagName !== "BUTTON" && onSelectMovie(movie.imdbID)
      }
    >
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button
        className="btn-delete"
        onClick={() => onDeleteWatched(movie.imdbID)}
      >
        &#10005;
      </button>
    </li>
  );
}
