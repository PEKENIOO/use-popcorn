import { useState, useEffect } from "react";
import Loader from "./Loader";
import MovieDetailsContent from "./MovieDetailsContent";
import ErrorMessage from "./ErrorMessage";
import { KEY } from "../App";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      async function getMovieDetails() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
          );

          if (!res.ok) throw new Error("Something went wrong with fetch movie");

          const data = await res.json();

          if (data.Response === "False") throw new Error(data.Error);

          setMovie(data);
        } catch (err) {
          console.error(err.message);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getMovieDetails();
    },
    [selectedId]
  );

  return (
    <div className="details">
      {isLoading && <Loader />}
      {!isLoading && !error && (
        <MovieDetailsContent
          movie={movie}
          onCloseMovie={onCloseMovie}
          onAddWatched={onAddWatched}
          selectedId={selectedId}
          watched={watched}
        />
      )}
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
