import { goTo, setState } from "@riadh-adrani/recursive";
import { Hr, Input } from "@riadh-adrani/recursive-components/Standard.js";
import { Column, Fragment, Row, Spacer } from "@riadh-adrani/recursive-components/Utility.js";
import NavButton from "../components/NavButton.js";
import NavPlaylistItem from "../components/NavPlaylistItem.js";
import ScanMyMusic from "../components/ScanMyMusic.js";
import Library from "../media/Library.js";
import LoveFilled from "../media/LoveFilled.js";
import Menu from "../media/Menu.js";
import Playlist from "../media/Playlist.js";
import Search from "../media/Search.js";
import { color, on, setSearchQuery, Library as Lib, Modal } from "../models/Application.js";

export default () => {
    const library = Lib();

    const [show, setShow] = setState("show-nav-bar", false);

    return Column({
        style: {
            scoped: true,
            normal: {
                gridArea: "nav-bar",
                width: show ? "250px" : "40px",
                height: "-webkit-fill-available",
                transitionDuration: "200ms",
                backgroundColor: "#050505",
                bottom: "0px",
                borderRadius: "0px",
                overflowY: "hidden",
                overflowX: "hidden",
                paddingTop: "20px",
                paddingLeft: "15px",
                paddingRight: "15px",
            },
        },
        children: [
            Row({
                events: {
                    onClick: () => {
                        setShow(!show);
                    },
                },
                children: Menu({
                    size: "30px",
                    style: {
                        className: "show-menu",
                        normal: {
                            transitionDuration: "200ms",
                            transform: show ? "rotate(90deg)" : "rotate(0deg)",
                        },
                    },
                }),
            }),
            Spacer({ height: "20px" }),
            Column({
                style: {
                    inline: {
                        width: "250px",
                        transitionDuration: "200ms",
                        transform: show ? "translateX(0px)" : "translateX(-270px)",
                        height: "-webkit-fill-available",
                        overflowY: "hidden",
                    },
                },
                children: Fragment({
                    children: [
                        Input({
                            placeholder: "Search ...",
                            style: {
                                scoped: true,
                                normal: {
                                    backgroundColor: "transparent",
                                    color: "white",
                                    border: "1px solid transparent",
                                },
                                focus: { outline: "none", background: "white", color: "black" },
                            },
                            events: {
                                onInput: (e) => {
                                    if (e.target.value.trim()) goTo("/");

                                    setSearchQuery(e.target.value);
                                },
                                onKeyUp: (e) => {
                                    e.stopPropagation();
                                },
                            },
                        }),
                        Hr({
                            color: "#9e9e9e",
                            size: "1px",
                            style: { inline: { width: "-webkit-fill-available" } },
                        }),
                        NavButton({
                            icon: Library({ size: 20, color }),
                            text: "My Library",
                            onClick: () => goTo("/"),
                        }),
                        Hr({
                            color: "#9e9e9e",
                            size: "1px",
                            style: { inline: { width: "-webkit-fill-available" } },
                        }),
                        NavButton({
                            icon: LoveFilled({ size: 20, color }),
                            text: "Favorites",
                            onClick: () => goTo("/favorite"),
                        }),
                        NavButton({
                            icon: Playlist({ size: "20", color }),
                            text: "Playing",
                            onClick: () => goTo("/playing"),
                        }),
                        Hr({
                            color: "#9e9e9e",
                            size: "1px",
                            style: { inline: { width: "-webkit-fill-available" } },
                        }),
                        NavButton({
                            icon: Search({ size: 20, color }),
                            text: "Scan for Tracks",
                            onClick: () => {
                                Modal().show(() => ScanMyMusic());
                                // on(() => {
                                //     window.api.send("get:scan");
                                // });
                            },
                        }),
                        Hr({
                            color: "#9e9e9e",
                            size: "1px",
                            style: { inline: { width: "-webkit-fill-available" } },
                        }),
                        Column({
                            style: {
                                inline: { overflowY: "auto", height: "-webkit-fill-available" },
                            },
                            children: library.playlists.map((item) => NavPlaylistItem(item)),
                        }),
                    ],
                }),
            }),
        ],
    });
};
