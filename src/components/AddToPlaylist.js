import { setState } from "@riadh-adrani/recursive";
import {
    H3,
    Hr,
    Input,
    Option,
    P,
    Select,
    Span,
} from "@riadh-adrani/recursive-components/Standard.js";
import {
    Column,
    Fragment,
    LazyColumn,
    Row,
    Spacer,
} from "@riadh-adrani/recursive-components/Utility.js";
import Tick from "../media/Tick.js";
import { color, Library, Modal } from "../models/Application.js";
import MyButton from "./MyButton.js";
import TextButton from "./TextButton.js";

export default (trackPath) => {
    const library = Library();

    const [newName, setNewName] = setState("new-playlist-name", "");

    function isValid() {
        const regEx = /^[0-9a-zA-Z]{0,}$/g;

        if (!newName.trim()) return false;

        if (!regEx.test(newName.trim())) return false;

        return true;
    }

    return Column({
        events: {
            onClick: (e) => {
                e.stopPropagation();
            },
        },
        style: {
            scoped: true,
            className: "add-to-playlist",
            normal: {
                padding: "20px",
                backgroundColor: `${color}22`,
                backdropFilter: "blur(10px)",
                width: "450px",
                animation: "addToPlaylist 0.25s 1",
            },
            animations: [
                {
                    name: "addToPlaylist",
                    steps: {
                        from: { opacity: 0.1, transform: "scale(0.5)" },
                        to: { opacity: 1, transform: "scale(1)" },
                    },
                },
            ],
        },
        children: [
            H3({ children: "Select a playlist", style: { inline: { fontWeight: 300 } } }),
            Spacer({ height: "10px" }),
            LazyColumn({
                style: {
                    inline: {
                        padding: "0px 10px",
                        maxHeight: "200px",
                        overflowY: "scroll",
                        overflowX: "hidden",
                    },
                },
                children: library.playlists.map((playlist) =>
                    Row({
                        style: {
                            className: "select-playlist",
                            normal: {
                                backgroundColor: "#00000044",
                                padding: "4px 8px",
                                marginBottom: "4px",
                                fontSize: "0.775em",
                                cursor: "pointer",
                                justifyContent: "space-between",
                                alignItems: "center",
                            },
                            hover: {
                                backgroundColor: "#00000077",
                            },
                        },
                        children: [
                            Span({ children: playlist.name }),
                            library.isTrackInPlaylist(playlist.name, trackPath) ? Tick({}) : "",
                        ],
                        events: {
                            onClick: (e) => {
                                e.stopPropagation();

                                const exist = library.isTrackInPlaylist(playlist.name, trackPath);

                                if (exist) {
                                    library.removeFromPlaylist(playlist.name, trackPath);
                                } else {
                                    library.addToPlaylists(playlist.name, trackPath);
                                }
                            },
                        },
                    })
                ),
            }),
            Spacer({ height: "10px" }),
            Hr({ width: "100%", size: "1px" }),
            Spacer({ height: "10px" }),
            H3({ children: "Or create a new one", style: { inline: { fontWeight: 300 } } }),
            Spacer({ height: "10px" }),
            Column({
                style: { inline: { padding: "0px 10px" } },
                children: [
                    Row({
                        children: [
                            Input({
                                type: "text",
                                placeholder: "New playlist name ...",
                                style: {
                                    scoped: true,
                                    normal: {
                                        backgroundColor: "transparent",
                                        padding: "4px 8px",
                                        color: "inherit",
                                        flex: 1,
                                    },
                                    focus: {
                                        backgroundColor: "#00000077",
                                        outline: "none",
                                    },
                                },
                                events: {
                                    onKeyUp: (e) => e.stopPropagation(),
                                    onInput: (e) => setNewName(e.target.value),
                                },
                            }),
                            Spacer({ width: "10px" }),
                            TextButton({
                                text: "Add",
                                onClick: () => {
                                    if (!isValid() || library.playlistExists(newName) != undefined)
                                        return;

                                    library.createPlaylist(newName.trim(), [trackPath]);

                                    Modal().hide();
                                },
                            }),
                        ],
                    }),
                    Spacer({ height: "10px" }),
                    Span({
                        children:
                            "Note : Playlist name can only contain alphanumerical characters.",
                        style: {
                            inline: {
                                fontSize: "0.775em",
                                paddingLeft: "8px",
                                fontWeight: 400,
                                lineBreak: "anywhere",
                                color: isValid() ? "#61cf54" : "#f95d5d",
                            },
                        },
                    }),
                    Span({
                        flags: { renderIf: library.playlistExists(newName) != undefined },
                        children: "Playlist with this name already exists",
                        style: {
                            inline: {
                                fontSize: "0.775em",
                                paddingLeft: "8px",
                                fontWeight: 400,
                                lineBreak: "anywhere",
                                color: "#f95d5d",
                            },
                        },
                    }),
                ],
            }),
            Spacer({ height: "10px" }),
            Hr({ width: "100%", size: "1px" }),
            Spacer({ height: "20px" }),
            Row({
                style: { inline: { justifyContent: "flex-end" } },
                children: TextButton({ text: "Close", onClick: () => Modal().hide() }),
            }),
        ],
    });
};
