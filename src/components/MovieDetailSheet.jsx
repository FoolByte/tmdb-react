import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import GENRE_MAP from "@/constants/genreMap";
import LANGUAGE_MAP from "@/constants/languageMap";
import { Star } from "lucide-react";
import { useState } from "react";

const StarRating = ({ rating, maxRating = 10 }) => {
  const normalizedRating = (rating / maxRating) * 5;

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const fillPercentage =
          Math.max(0, Math.min(1, normalizedRating - star + 1)) * 100;

        return (
          <div key={star} className="relative">
            <Star className="text-gray-500 w-4 h-4 md:w-6 md:h-6" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className="text-yellow-500 fill-yellow-500 w-4 h-4 md:w-6 md:h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function MovieDetailSheet({ movie, onClose }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`
    : null;

  return (
    <Sheet open={!!movie} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full p-5 md:max-w-none">
        <div className="md:flex md:m-auto md:gap-10 md:w-3/4">
          {backdropUrl ? (
            <>
              {/* Skeleton */}
              {!imageLoaded && (
                <div className="w-full md-w[913px] h-52 md:h-129 bg-muted animate-pulse rounded-xl" />
              )}

              {/* Gambar */}
              <img
                src={backdropUrl}
                alt={movie.title}
                className={`w-full rounded-xl transition-opacity duration-300 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
            </>
          ) : (
            // Jika memang tidak ada backdrop sama sekali
            <div className="w-full h-52 md:h-129 bg-muted animate-pulse rounded-xl" />
          )}

          <div className="md:w-1/2">
            <SheetHeader className="p-0 mt-4">
              <SheetTitle className="md:text-3xl">{movie.title}</SheetTitle>

              <SheetDescription className="flex justify-between items-start md:text-2xl">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap gap-2">
                    {movie.genre_ids.map((id) => (
                      <span
                        key={id}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md md:text-lg"
                      >
                        {GENRE_MAP[id] || `Genre ${id}`}
                      </span>
                    ))}
                  </div>

                  {`${movie.release_date?.slice(
                    0,
                    4
                  )} • ${movie.original_language.toUpperCase()} (${
                    LANGUAGE_MAP[movie.original_language] || "Unknown"
                  })`}
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-sm md:text-2xl font-medium mb-1">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                  <StarRating rating={movie.vote_average} />
                </div>
              </SheetDescription>
            </SheetHeader>

            <p className="text-sm md:text-lg leading-relaxed text-foreground mt-4">
              {movie.overview}
            </p>

            <div className="flex-1 space-y-2 mt-4">
              <p>
                <strong>Popularity:</strong> {movie.popularity}
              </p>
              <p>
                <strong>Adult:</strong> {movie.adult ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
