import { getState, updateAfter } from "@riadh-adrani/recursive";
import { Library, Arts, TASKS, Native, MEDIA_PLAYER, RECENT, FAV, Modal } from "./Application.js";

window.api.receive("is:busy", () => {
    const [get, set] = getState(TASKS);

    if (get.length == 0) {
        setTimeout(() => {
            set([]);
            Modal().hide();
        }, 30000);
    }
});

window.api.receive("set:playlists", (data) => {
    const res = JSON.parse(data);

    Library().updatePlaylists(res);
});

window.api.receive("set:media", (data) => {
    const res = JSON.parse(data);

    const output = [];

    for (let item in res) {
        if (res[item].path) output.push(res[item]);
    }

    Library().update(output);
});

window.api.receive("media:chunk", (data) => {
    const res = JSON.parse(data);

    const output = [];

    for (let item in res) {
        if (res[item].path) output.push(res[item]);
    }

    updateAfter(() => {
        removeTask("get:media");
        Library().update(output);
    });
});

window.api.receive("set:art", (data) => {
    const res = JSON.parse(data);

    Arts().update(res);
});

window.api.receive("art:chunk", (data) => {
    const res = JSON.parse(data);

    updateAfter(() => {
        removeTask("get:art");
        Arts().update(res);
    });
});

window.api.receive("set:player", (data) => {
    const res = JSON.parse(data);

    const native = Native();

    updateAfter(() => {
        const [, setPlayer] = getState(MEDIA_PLAYER);
        native.src = res.path;
        native.currentTime = res.current;
        native.volume = res.volume / 100;
        setPlayer({ ...res, playing: false });
    });
});

window.api.receive("set:favorite", (data) => {
    const res = JSON.parse(data);

    updateAfter(() => {
        const [, setValue] = getState(FAV);
        setValue(res);
    });
});

window.api.receive("set:recent", (data) => {
    const res = JSON.parse(data);

    updateAfter(() => {
        const [, setValue] = getState(RECENT);
        setValue(res);
    });
});

window.api.receive("set:favorite", (data) => {
    const res = JSON.parse(data);

    updateAfter(() => {
        const [, setValue] = getState(FAV);
        setValue(res);
    });
});
