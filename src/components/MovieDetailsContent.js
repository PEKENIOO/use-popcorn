import { useState, useEffect, useRef } from "react";
import StarRating from "./StarRating";
import WatchedFilmRating from "./WatchedFilmRating";
import { useKey } from "../hooks/useKey";

export default function MovieDetailsContent({
  movie,
  onCloseMovie,
  onAddWatched,
  selectedId,
  watched,
}) {
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);

  useKey("Escape", onCloseMovie);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched
    .filter((movie) => movie.imdbID === selectedId)
    ?.map((movie) => movie.userRating);

  function handleAdd() {
    if (userRating === "") return;
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      year,
      userRating,
      countRatingDecisions: countRef.current,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <>
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb Rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          {isWatched ? (
            <WatchedFilmRating rating={watchedUserRating} />
          ) : (
            <>
              <StarRating size={24} onSetRating={setUserRating} />
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </>
  );
}
