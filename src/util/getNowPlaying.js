import Player from "../models/Player.js";

export default function () {
    const get = Player().value.playlist;

    const res = { items: [], name: "no_name" };

    if (!get) return res;

    return get;
}
