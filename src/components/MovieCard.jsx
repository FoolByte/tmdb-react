import { Card, CardTitle } from "./ui/card";

export default function MovieCard({ movie, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <Card className="p-0 overflow-hidden flex flex-col h-full hover:scale-[1.02] transition">
        <div className="w-full aspect-2/3 overflow-hidden rounded-b-2xl">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        <CardTitle className="text-center mb-3">
          <div className="line-clamp-2 h-10">{movie.title}</div>
          <p className="text-sm text-muted-foreground">
            ({movie.release_date?.slice(0, 4)})
          </p>
        </CardTitle>
      </Card>
    </div>
  );
}
