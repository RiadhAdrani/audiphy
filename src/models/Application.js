import { setState, getState, getRef, getRoute } from "@riadh-adrani/recursive/index.js";
import Player from "./Player.js";
import "./Api.js";
import art from "../raw/placeholder.jpg";

const MEDIA_PLAYER = "mediaplayer";
const PLAYLIST = "playlist";
const NATIVE_PLAYER = "nativeplayer";
const PROGRESS_BAR = "progressbar";
const PROGRESS_BAR_PLAYER = "altprogressbar";
const LIBRARY = "library";
const LOADING = "loading";
const ARTS = "arts";
const TASKS = "tasks";
const SEARCH = "search";
const FAV = "favorite";
const RECENT = "recent";
const SHOW_MODAL = "show-modal";
const TOAST = "toast";

const color = "#3a86ff";

function Application() {
    setState(SHOW_MODAL, { show: false, component: null });
    setState(TOAST, { show: false, text: "", time: Date.now() });
    setState(FAV, []), setState(RECENT, []);
    setState(SEARCH, "");
    setState(TASKS, []);
    setState(ARTS, {});
    setState(LOADING, false);
    setState(MEDIA_PLAYER, {
        playing: false,
        current: 0,
        duration: 0,
        muted: false,
        volume: 100,
        index: 0,
        shuffle: false,
        repeat: false,
        playlistName: "",
        lastSync: 0,
    });
    setState(LIBRARY, { items: [], playlists: [] }, () => {
        window.api.send("get:media");
        window.api.send("get:art");
        window.api.send("get:player");
        window.api.send("get:favorite");
        window.api.send("get:playlists");
    });
}

function Toast() {
    const [get, set, , , live] = getState(TOAST);

    return {
        value: get,
        show: (text) => {
            const res = { show: true, text, time: Date.now() };

            set(res);

            setTimeout(() => {
                if (live().time == res.time && live().show) set({ ...get, show: false });
            }, 5000);
        },
        hide: () => {
            set({ ...get, show: false });
        },
    };
}

function Modal() {
    const [get, set] = getState(SHOW_MODAL);

    return {
        value: get,
        show: (component) => {
            set({ show: true, component });
        },
        hide: () => {
            set({ ...get, show: false });
        },
    };
}

function getFav() {
    const [get] = getState(FAV);

    const output = [];

    get.forEach((item) => {
        const res = Library().items.find((i) => i.path === item);

        if (res) output.push(res);
    });

    return output;
}

function isFav(path) {
    const [get] = getState(FAV);

    return get.includes(path);
}

function addFav(path) {
    const [get, set] = getState(FAV);

    const res = [...get, path];

    Toast().show("Added to favorite");

    window.api.send("set:favorite", JSON.stringify(res));

    set(res);
}

function removeFav(path) {
    const [get, set] = getState(FAV);

    const res = get.filter((item) => item != path);

    Toast().show("Removed from favorite");

    window.api.send("set:favorite", JSON.stringify(res));

    set(res);
}

function setSearchQuery(query) {
    const [get, set] = getState(SEARCH);

    set(query);
}

function addTask(task) {
    const [get, set] = getState(TASKS);

    set([...get, task]);
}

function removeTask(task) {
    const [get, set] = getState(TASKS);

    console.log(task);

    set(get.filter((t) => t != task));
}

function on(callback) {
    const [get] = getState(TASKS);

    if (get.length > 0) return;

    Player().pause();
    callback();
}

function isBusy() {
    const [get] = getState(TASKS);

    return get.length > 0 ? true : false;
}

function Arts() {
    const [get, set] = getState(ARTS);

    return {
        update: (nw) => {
            set(nw);
        },
        select: (uid) => {
            return get[uid] ? get[uid] : art;
        },
    };
}

function Library() {
    const [get, set] = getState(LIBRARY);

    return {
        items: get.items,
        playlists: get.playlists,
        update: (newItems) => {
            set({ ...get, items: newItems });
        },
        getPlaylistTracks: (name) => {
            const playlist = get.playlists.find((item) => item.name == name);

            if (!playlist) return [];

            return get.items.filter((item) => playlist.items.includes(item.path));
        },
        updatePlaylists: (newItems) => {
            set({ ...get, playlists: newItems });
        },
        playlistExists: (name) => {
            const exists = get.playlists.find(
                (item) => item.name.trim().toLowerCase() == name.trim().toLowerCase()
            );

            return exists;
        },
        createPlaylist: (name, items) => {
            const res = { ...get, playlists: [...get.playlists, { name, items }] };

            set(res);

            window.api.send("set:playlists", JSON.stringify(res.playlists));
        },
        deletePlaylist: (name) => {
            const res = { ...get, playlists: get.playlists.filter((item) => item.name != name) };

            set(res);

            window.api.send("set:playlists", JSON.stringify(res.playlists));
        },
        addToPlaylists: (name, item) => {
            const playlists = get.playlists;

            const playlist = playlists.find((p) => p.name == name);

            if (!playlist) return;

            const exists = playlist.items.find((t) => t == item);

            if (exists) {
                Toast().show("Item already exist in playlist.");
                return;
            }

            playlist.items.push(item);

            set({ ...get, playlists });

            Toast().show("Track added");

            window.api.send("set:playlists", JSON.stringify(playlists));
        },
        removeFromPlaylist: (name, item) => {
            const playlists = get.playlists;

            const playlist = playlists.find((p) => p.name == name);

            if (!playlist) return;

            playlist.items = playlist.items.filter((p) => p != item);

            set({ ...get, playlists });

            Toast().show("Track removed");

            window.api.send("set:playlists", JSON.stringify(playlists));
        },
        isTrackInPlaylist: (name, item) => {
            const playlist = get.playlists.find((p) => p.name == name);

            if (!playlist) return;

            return playlist.items.find((t) => t == item);
        },
    };
}

function Playlist() {
    const [get, set] = getState(PLAYLIST);

    return {
        tracks: [],
        change(playlist) {
            set({ ...get, tracks: playlist.items, name: playlist.name });
        },
    };
}

/**
 * @return {HTMLAudioElement}
 */
function Native() {
    return getRef(NATIVE_PLAYER);
}

function ProgressBar() {
    return getRef(getRoute() == "/player" ? PROGRESS_BAR_PLAYER : PROGRESS_BAR);
}

function getTrackData(data) {
    return {
        ...data,
        art: Arts().select(data.art),
        playing: false,
        current: 0,
        duration: 0,
    };
}

function makePlaylist(list, start = 0, name = "playing") {
    const firstItem = list[start];

    const res = { name };

    const shuffle = Player().value.shuffle;

    if (!shuffle) {
        res.items = [firstItem, ...list.slice(start + 1), ...list.slice(0, start)];
        return res;
    }

    const array = [...list.slice(0, start), ...list.slice(start + 1)];

    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    res.items = [firstItem, ...array];

    return res;
}

export {
    color,
    getFav,
    isFav,
    addFav,
    removeFav,
    setSearchQuery,
    addTask,
    removeTask,
    on,
    isBusy,
    makePlaylist,
    getTrackData,
    Toast,
    Modal,
    Arts,
    Native,
    Application,
    Playlist,
    Library,
    ProgressBar,
    NATIVE_PLAYER,
    MEDIA_PLAYER,
    PLAYLIST,
    PROGRESS_BAR,
    LIBRARY,
    LOADING,
    ARTS,
    TASKS,
    SEARCH,
    FAV,
    RECENT,
};
