const fs = require("fs");
const path = require("path");

const allowed = [".mp3", ".wav", ".flac"];
const igonre = [
    "C:\\Program Files",
    "C:\\Program Files (x86)",
    "C:\\ProgramData",
    "C:\\Windows",
    "C:\\$Recycle.Bin",
];

class FileRef {
    constructor(dir, file) {
        this.directory = dir;
        this.file = file;
    }
}

class FolderRef extends FileRef {
    constructor(dir, file, onFileFound = () => {}, onStarted = () => {}, onEnded = () => {}) {
        super(dir, file);
        this.children = [];
        this.onFileFound = onFileFound;
        this.onStarted = onStarted;
        this.onEnded = onEnded;

        this.generate(this.children);
    }

    generate(children) {
        this.onStarted();

        const objects = fs.readdirSync(this.directory + "\\") || [];

        objects.forEach((item, index) => {
            const objDirectory = this.directory + "\\" + item;

            if (igonre.toString().includes(objDirectory)) {
                console.log(`item @ ${objDirectory} ignored.`);
                return;
            }

            fs.lstat(objDirectory, (_, stats) => {
                if (stats && stats.isFile && stats.isFile()) {
                    children.push(new FileRef(objDirectory, item));

                    if (allowed.includes(path.extname(objDirectory))) {
                        this.onFileFound(objDirectory);
                    }
                }
                try {
                    if (stats.isDirectory()) {
                        children.push(
                            new FolderRef(
                                objDirectory,
                                item,
                                this.onFileFound,
                                this.onStarted,
                                this.onEnded
                            )
                        );
                    }
                } catch (e) {
                    // console.log(`file @ ${objDirectory} could not be indexed.`);
                }

                if (index == objects.length - 1) {
                    this.onEnded();
                }
            });
        });
    }
}

module.exports = (dir, name, onItemFound, onStarted, onEnded) =>
    new FolderRef(dir, name, onItemFound, onStarted, onEnded);
