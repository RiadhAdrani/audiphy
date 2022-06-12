import { getState } from "@riadh-adrani/recursive";
import { Library, SEARCH } from "../models/Application.js";

export default function () {
    const [query] = getState(SEARCH);

    const library = Library();

    if (!query.trim()) return library.items;
    else
        return library.items.filter((item) => {
            const title = item.title && item.title.toLowerCase().includes(query.toLowerCase());
            const artists =
                item.artists && item.artists.toLowerCase().includes(query.toLowerCase());
            const album = item.album && item.album.toLowerCase().includes(query.toLowerCase());

            return title || artists || album;
        });
}
