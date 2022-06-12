/**
 *
 * @param {Array} list
 * @param {String} by
 * @returns {Array} array
 */
export default function (list, by, invert = false) {
    let output = [];

    switch (by) {
        case "title":
            output = list.sort((a, b) => (a.title >= b.title ? 1 : -1));
            break;
        case "artist":
            output = list.sort((a, b) => (a.artists >= b.artists ? 1 : -1));
            break;
        case "album":
            output = list.sort((a, b) => (a.album >= b.album ? 1 : -1));
            break;
        case "genre":
            output = list.sort((a, b) => b.year - a.year);
            break;
        case "year":
            output = list.sort((a, b) => b.year - a.year);
            break;
        default:
            output = list;
            break;
    }

    return invert ? output.reverse() : output;
}
