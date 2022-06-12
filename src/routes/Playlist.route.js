import { getParams } from "@riadh-adrani/recursive";
import { Library } from "../models/Application.js";
import PlaylistPage from "../widgets/PlaylistPage.js";

export default () => {
    const uid = getParams().name;
    const library = Library();
    const playlist = { name: uid, items: library.getPlaylistTracks(uid) };

    return PlaylistPage(playlist);
};
