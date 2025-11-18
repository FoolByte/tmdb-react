import MovieCard from "@/components/MovieCard";
import MovieDetailSheet from "@/components/MovieDetailSheet";
import { PaginationPage } from "@/components/PaginationPage";
import useTmdb from "@/hooks/useTmdb";
import { useState } from "react";

const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 rounded-xl h-79 md:h-108 mb-2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { data, loading, error } = useTmdb(`discover/movie?page=${page}`);

  if (error) return <p>{error}</p>;

  return (
    <div className="pb-5">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-5">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <MovieCardSkeleton key={`skeleton-${index}`} />
            ))
          : data?.results?.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => setSelectedMovie(movie)}
              />
            ))}
      </div>

      {!loading && data && (
        <PaginationPage
          currentPage={data.page}
          totalPages={data.total_pages}
          onChange={setPage}
        />
      )}

      {selectedMovie && (
        <MovieDetailSheet
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
