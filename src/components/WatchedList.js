import WatchedMovie from "./WatchedMovie";

export default function WatchedList({
  watched,
  onDeleteWatched,
  onSelectMovie,
}) {
  return (
    <ul className="list list-movies">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
          onSelectMovie={onSelectMovie}
        />
      ))}
    </ul>
  );
}
