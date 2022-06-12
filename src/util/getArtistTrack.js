import { Library } from "../models/Application.js";
import urlValid from "./urlValid.js";

export default (artist) => {
    const tracks = Library().items;

    return tracks.filter((item) => urlValid(item.artists) == artist);
};
