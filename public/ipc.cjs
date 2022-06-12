const { ipcMain } = require("electron");

function start(win) {
    const os = require("os");
    const jsmediatags = require("jsmediatags");
    const Store = require("electron-store");
    const seeker = require("./seeker.cjs");
    const convertArt = require("./convertArt.cjs");

    const store = new Store();

    function send(channel, data) {
        win.webContents.send(channel, JSON.stringify(data));
    }

    store.onDidChange("media", (newValue, oldValue) => {
        const res = { ...oldValue, ...newValue };

        if (JSON.stringify(res) != JSON.stringify(oldValue)) send("media:chunk", res);
    });

    store.onDidChange("art", (newValue, oldValue) => {
        const res = { ...oldValue, ...newValue };

        if (JSON.stringify(res) != JSON.stringify(oldValue)) send("art:chunk", res);
    });

    function getTrackInfo(path) {
        jsmediatags.read(path, {
            onSuccess: (data) => {
                let artUniqueName =
                    `${data.tags.album}${data.tags.artist}${data.tags.year}${data.tags.genre}`.replace(
                        ".",
                        ""
                    );

                const output = {
                    path: path,
                    year: data.tags.year,
                    title: data.tags.title,
                    artists: data.tags.artist,
                    album: data.tags.album,
                    track: data.tags.track,
                    genre: data.tags.genre,
                    art: artUniqueName,
                };

                if (!store.has(`art.${artUniqueName}`)) {
                    store.set(`art.${artUniqueName}`, convertArt(data.tags.picture));
                }

                store.set(`media.${path.replace(".", "")}`, output);
            },
        });
    }

    ipcMain.on("set:playlists", (e, data) => {
        const playlists = JSON.parse(data);
        store.set(`playlists`, playlists);
    });

    ipcMain.on("set:recent", (e, data) => {
        const recent = JSON.parse(data);
        store.set(`recent`, recent);
    });

    ipcMain.on("set:favorite", (e, data) => {
        const items = JSON.parse(data);
        store.set(`favorite`, items);
    });

    ipcMain.on("set:player", (e, data) => {
        store.set("player", JSON.parse(data));
    });

    ipcMain.on("get:scan", () => {
        seeker(`C:\\Users\\${os.userInfo().username}\\Music`, "All", (dir) => {
            send("is:busy");
            getTrackInfo(dir);
        });
    });

    ipcMain.on("get:playlists", () => {
        const data = store.has("playlists") ? store.get("playlists") : [];
        send("set:playlists", data);
    });

    ipcMain.on("get:recent", () => {
        const data = store.has("recent") ? store.get("recent") : [];
        send("set:recent", data);
    });

    ipcMain.on("get:favorite", () => {
        const fav = store.has("favorite") ? store.get("favorite") : [];
        send("set:favorite", fav);
    });

    ipcMain.on("get:media", () => {
        const media = store.has("media") ? store.get("media") : {};
        send("set:media", media);
    });

    ipcMain.on("get:art", () => {
        const art = store.has("art") ? store.get("art") : {};
        send("set:art", art);
    });

    ipcMain.on("get:player", () => {
        const player = store.has("player") ? store.get("player") : {};
        send("set:player", player);
    });
}

module.exports = start;
