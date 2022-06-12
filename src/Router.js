import { createRouter, getRef, route } from "@riadh-adrani/recursive/index.js";
import AlbumRoute from "./routes/Album.route.js";
import ArtistRoute from "./routes/Artist.route.js";
import FavoriteRoute from "./routes/Favorite.route.js";
import HomeRoute from "./routes/Home.route.js";
import PlayerRoute from "./routes/Player.route.js";
import PlayingRoute from "./routes/Playing.route.js";
import PlaylistRoute from "./routes/Playlist.route.js";

const onLoad = () => {
    const mainView = getRef("main-view");

    mainView.scrollTo({ top: 0, behavior: "smooth" });
};

export default () => {
    createRouter(
        route({
            name: "/",
            component: HomeRoute,
            subRoutes: [
                route({ name: "/favorite", component: FavoriteRoute, onLoad }),
                route({ name: "/playing", component: PlayingRoute, onLoad }),
                route({ name: "/player", component: PlayerRoute }),
                route({ name: "/playlist=:name;", component: PlaylistRoute, onLoad }),
                route({ name: "/album=:name;", component: AlbumRoute, onLoad }),
                route({ name: "/artist=:name;", component: ArtistRoute, onLoad }),
            ],
        }),
        "",
        true
    );
};
