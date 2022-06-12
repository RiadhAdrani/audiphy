import { getParams } from "@riadh-adrani/recursive";
import getArtistTrack from "../util/getArtistTrack.js";
import PlaylistPage from "../widgets/PlaylistPage.js";

export default () => {
    const artist = decodeURI(getParams().name);
    const playlist = { name: artist, items: getArtistTrack(artist) };

    return PlaylistPage(playlist);
};
