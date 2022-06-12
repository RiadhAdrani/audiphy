import { Button, Div, H3, P } from "@riadh-adrani/recursive-components/Standard.js";
import { Column, Row, Spacer } from "@riadh-adrani/recursive-components/Utility.js";
import Volume from "../media/Volume.js";
import { addFav, isFav, makePlaylist, removeFav, Modal } from "../models/Application.js";
import Player from "../models/Player.js";
import { color } from "../models/Application.js";
import { getRef, goTo, setState } from "@riadh-adrani/recursive";
import Love from "../media/Love.js";
import LoveFilled from "../media/LoveFilled.js";
import AddToPlaylist from "./AddToPlaylist.js";
import urlValid from "../util/urlValid.js";
import TrackContextMenu from "./TrackContextMenu.js";

export default (track, playlist, index) => {
    const player = Player();

    const isNow = player.value.path === track.path;
    const isFaved = isFav(track.path);
    const isPlaying = isNow && Player().value.playing;

    function playMe() {
        if (isNow) {
            if (player.value.playing) player.pause();
            else player.play();
        } else {
            player.changeTrack(makePlaylist(playlist.items, index, playlist.name));
        }
    }

    function favMe() {
        if (isFav(track.path)) {
            removeFav(track.path);
        } else {
            addFav(track.path);
        }
    }

    function addToPlaylist() {
        Modal().show(() => AddToPlaylist(track.path));
    }

    const [showMenu, setShowMenu] = setState(`show-menu-${track.path}`, {
        show: false,
        invert: false,
        x: 0,
        y: 0,
        height: 50,
        width: 200,
    });

    const ContextMenu = () => {
        const items = [
            {
                text: isPlaying ? "Pause" : "Play",
                onClick: playMe,
            },
            {
                text: isFaved ? "Removed From Favorite" : "Add to Favorite",
                onClick: favMe,
            },
            {
                text: "Add to playlist",
                onClick: addToPlaylist,
            },
        ];

        return TrackContextMenu([showMenu, setShowMenu], items);
    };

    return Row({
        props: { draggable: true },
        hooks: { onRef: () => `track-${track.path}` },
        events: {
            /**
             *
             * @param {DragEvent} e
             */
            onDragStart: (e) => {
                e.dataTransfer.dropEffect = "copy";
                e.dataTransfer.setData("text", track.path);

                console.log(e.dataTransfer.getData("text"));
            },
            onClick: () => playMe(),
            onResizeGlobal: () => {
                if (showMenu.show) {
                    setShowMenu({ ...showMenu, show: false });
                }
            },
            onContextMenuGlobal: (_, notify) => {
                if (showMenu.show) {
                    notify();
                    setShowMenu({ ...showMenu, show: false });
                }
            },
            onContextMenu: (e) => {
                const ref = getRef(`track-${track.path}`);

                const dX = ref.getBoundingClientRect().left;
                const dY = ref.getBoundingClientRect().top;

                const oX = ref.getBoundingClientRect().x - e.offsetX;
                const oY = ref.getBoundingClientRect().y - e.offsetY;

                console.log(oX, oY);

                let x = dX - oX;
                let y = dY - oY;

                const invert = e.clientX + showMenu.width > innerWidth;

                setShowMenu({ ...showMenu, show: true, x, y, invert });
            },
        },
        style: {
            className: "item-wrapper",
            scoped: true,
            normal: {
                position: "relative",
                padding: "10px 20px",
                marginBottom: "10px",
                borderRadius: "5px",
                alignItems: "center",
                whiteSpace: "nowrap",
                boxShadow: "0px 0px 5px 0px #00000022",
                cursor: "pointer",
                height: "81px",
                boxSizing: "border-box",
                backgroundColor: isNow ? `${color}22` : "#090909",
            },
            hover: {
                backgroundColor: `${color}05`,
            },
        },
        children: [
            ContextMenu(track),
            Column({
                style: {
                    className: "item-info-wrapper",
                    normal: {
                        flex: 1,
                        padding: "0px 20px",
                        overflow: "hidden",
                    },
                },
                children: [
                    H3({
                        style: {
                            className: "item-title",
                            normal: { margin: "0px", color: "#e0e0e0", fontSize: "0.925em", color },
                        },
                        children: track.title,
                    }),
                    P({
                        children: track.artists,
                        style: {
                            className: "item-artist",
                            normal: {
                                margin: "0px",
                                color: "#a0a0a0",
                                fontSize: "0.775em",
                                width: "fit-content",
                            },
                            hover: { textDecoration: "underline" },
                        },
                        events: {
                            onClick: (e) => {
                                e.stopPropagation();
                                goTo(`/artist=:${urlValid(track.artists)};`);
                            },
                        },
                    }),
                    P({
                        children: `${track.album} ${track.year ? "(" + track.year + ")" : ""}`,
                        style: {
                            className: "item-genre",
                            normal: {
                                margin: "0px",
                                color: "#a0a0a0",
                                fontSize: "0.675em",
                                width: "fit-content",
                            },
                            hover: { textDecoration: "underline" },
                        },
                        events: {
                            onClick: (e) => {
                                e.stopPropagation();
                                goTo(`/album=:${urlValid(track.album)};`);
                            },
                        },
                    }),
                ],
            }),
            Row({
                children: [
                    Div({
                        style: { inline: { display: isNow ? "flex" : "none" } },
                        children: [Volume({ color: "#a0a0a0", size: "20px" })],
                    }),
                    Spacer({ width: "10px" }),
                    Div({
                        style: { className: "toggle-fav-track", hover: { opacity: 0.5 } },
                        events: {
                            onClick: (e) => {
                                e.stopPropagation();

                                favMe();
                            },
                        },
                        children: [
                            isFav(track.path)
                                ? LoveFilled({ color, size: "20px" })
                                : Love({ color: "#a0a0a0", size: "20px" }),
                        ],
                    }),
                ],
            }),
        ],
    });
};
