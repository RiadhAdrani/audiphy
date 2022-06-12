import { getRoute, getState } from "@riadh-adrani/recursive/index.js";
import {
    Native,
    ProgressBar,
    MEDIA_PLAYER,
    getTrackData,
    isFav,
    removeFav,
    addFav,
    isBusy,
} from "./Application.js";

export default function Player() {
    const [get, set] = getState(MEDIA_PLAYER);

    function calculateCursorXPosition(e) {
        const [navBarShown] = getState("show-nav-bar");
        const progressBar = ProgressBar();

        const offsetLeft = progressBar.offsetLeft;
        const position = e.clientX;

        let output = position - offsetLeft;

        if (getRoute() == "/player") {
            if (navBarShown) output -= 280;
            else output -= 70;
        }

        return output;
    }

    return {
        value: get,
        setPlaylist(nw, name = "Library") {
            set({ ...get, playlist: nw, playlistName: name });
        },
        setPlay(value) {
            set({ ...get, playing: value });
            if (value) {
                Native().play();
            } else {
                Native().pause();
            }
        },
        setIsPlaying(val) {
            set({ ...get, playing: val });
        },
        play() {
            if (Native().src && !isBusy()) {
                Native().play();
            }
        },
        pause() {
            Native().pause();
        },
        toggleShuffle() {
            set({ ...get, shuffle: !get.shuffle });
        },
        toggleRepeat() {
            set({ ...get, repeat: !get.repeat });
        },
        toggleFavorite() {
            isFav(get.path) ? removeFav(get.path) : addFav(get.path);
        },
        updateTime(current, duration) {
            if (current > get.current + 0.5) {
                set({ ...get, current, duration, playing: true });
            }

            const ls = get.lastSync || 0;

            if (current > ls + 5) {
                console.log("syncing ....");
                window.api.send("set:player", JSON.stringify(Player().value));
                set({ ...get, lastSync: current });
            }
        },
        onTrackEnded() {
            this.pause();
        },
        changeTime(e) {
            calculateCursorXPosition(e);

            // const offsetLeft = ProgressBar().offsetLeft;
            // const position = e.clientX;

            const barWidth = ProgressBar().clientWidth;

            const current = get.duration * (calculateCursorXPosition(e) / barWidth);

            Native().currentTime = current;
            set({ ...get, current });
        },
        changeVolume(val) {
            if (val > 100) Native().volume = 1;
            else if (val < 0) Native().volume = 0;
            else Native().volume = val / 100;
        },
        toggleMute() {
            const native = Native();
            Native().muted = !native.muted;
            set({ ...get, muted: !native.muted });
        },
        changeTrack(playlist) {
            const native = Native();

            native.pause();

            set({
                ...get,
                playlist,
                lastSync: 0,
                index: 0,
                ...getTrackData(playlist.items[0]),
            });

            setTimeout(() => this.play(), 100);
        },
        next() {
            if (!get.playlist.items.length) return;

            const native = Native();
            const tracks = get.playlist.items;

            let next = null;
            let index = get.index;

            if (get.index + 1 >= tracks.length) {
                index = 0;
                next = tracks[index];
            } else {
                index = get.index + 1;
                next = tracks[index];
            }

            native.pause();

            set({
                ...get,
                index,
                lastSync: 0,
                ...getTrackData(next),
            });

            if (index == 0 && !get.repeat) return;

            setTimeout(() => this.play(), 100);
        },
        previous() {
            if (!get.playlist.items.length) return;

            const native = Native();
            const tracks = get.playlist.items;

            let pre = null;
            let index = get.index;

            index = get.index - 1 < 0 ? tracks.length - 1 : get.index - 1;
            pre = tracks[index];

            native.pause();

            set({
                ...get,
                index,
                lastSync: 0,
                ...getTrackData(pre),
            });

            setTimeout(() => this.play(), 100);
        },
    };
}
