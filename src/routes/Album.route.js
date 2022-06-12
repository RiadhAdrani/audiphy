import { getParams } from "@riadh-adrani/recursive";
import getAlbumTracks from "../util/getAlbumTracks.js";
import PlaylistPage from "../widgets/PlaylistPage.js";

export default () => {
    const album = decodeURI(getParams().name);
    const playlist = { name: album, items: getAlbumTracks(album) };

    return PlaylistPage(playlist);
};
