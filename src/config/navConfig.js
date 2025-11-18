import { Clapperboard, Home, Users } from "lucide-react";

// Import halaman
import Dashboard from "@/pages/Dashboard";
import MoviePage from "@/pages/MoviePage";

const navConfig = [
  {
    title: "Main Menu",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Home,
        element: Dashboard,
      },
      {
        title: "Movies",
        url: "/movies",
        icon: Clapperboard,
        element: MoviePage,
      },
    ],
  },
];

export default navConfig;
