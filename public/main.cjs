const { app, BrowserWindow } = require("electron");
const start = require("./ipc.cjs");

let win;

function createWindow() {
    win = new BrowserWindow({
        title: "Opdiphy",
        minWidth: 1000,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            webSecurity: false,
            preload: __dirname + "/preloader.cjs",
        },
    });

    start(win);

    win.removeMenu();

    win.loadURL("http://localhost:8080");
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});
