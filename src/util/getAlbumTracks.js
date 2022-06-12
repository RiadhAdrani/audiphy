import { Library } from "../models/Application.js";

export default (album) => {
    const tracks = Library().items;

    return tracks.filter((item) => item.album == album);
};
