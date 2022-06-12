import { Div, H5, H6, Img, Input, Audio, H4 } from "@riadh-adrani/recursive-components/Standard.js";
import { Column, Row, Spacer } from "@riadh-adrani/recursive-components/Utility.js";
import Love from "../media/Love.js";
import Next from "../media/Next.js";
import Play from "../media/Play.js";
import Playlist from "../media/Playlist.js";
import Previous from "../media/Previous.js";
import Repeat from "../media/Repeat.js";
import Shuffle from "../media/Shuffle.js";
import Volume from "../media/Volume.js";
import IconButton from "./IconButton.js";
import Pause from "../media/Pause.js";
import VolumeMuted from "../media/VolumeMuted.js";
import { Arts, color, isFav, Native, NATIVE_PLAYER, PROGRESS_BAR } from "../models/Application.js";
import Player from "../models/Player.js";
import LoveFilled from "../media/LoveFilled.js";
import formatTime from "../util/formatTime.js";
import { getRoute, goTo } from "@riadh-adrani/recursive";

export default () => {
    const player = Player();

    const inPlayer = getRoute() == "/player";

    return Row({
        events: {
            onKeyUpGlobal: (e) => {
                if (e.code === "Space") player.value.playing ? player.pause() : player.play();
            },
        },
        style: {
            scoped: true,
            normal: {
                gridArea: "player",
                height: inPlayer ? "0px" : "90px",
                backgroundColor: "#0c0c0c",
                overflowY: "hidden",
                bottom: "0px",
                borderRadius: "0px",
                padding: "0px 10px",
                justifyContent: "space-between",
            },
        },
        children: [
            Audio({
                hooks: {
                    onRef: () => NATIVE_PLAYER,
                },
                style: { inline: { display: "none" } },
                events: {
                    onTimeUpdate: (e) => {
                        player.updateTime(e.target.currentTime, e.target.duration);
                    },
                    onEnded: () => player.next(),
                    onPlay: () => player.setIsPlaying(true),
                    onPause: () => player.setIsPlaying(false),
                },
                src: player.value.path,
            }),
            Row({
                style: {
                    scoped: true,
                    normal: {
                        alignItems: "center",
                        padding: "10px",
                        flex: 0.75,
                        minWidth: "100px",
                        cursor: "pointer",
                    },
                    hover: {
                        backgroundColor: "#ffffff05",
                    },
                },
                events: { onClick: () => goTo("/player") },
                children: [
                    Img({
                        src: player.value.art || Arts().select(),
                        height: 50,
                        width: 50,
                    }),
                    Spacer({ width: "10px" }),
                    Column({
                        style: { inline: { whiteSpace: "nowrap", overflowX: "hidden" } },
                        children: [
                            H4({
                                children: player.value.title,
                                style: { inline: { color: "#aeaeae", fontWeight: 400 } },
                            }),
                            H6({
                                children: player.value.artists,
                                style: { inline: { fontWeight: 500, color } },
                            }),
                            Div({
                                style: {
                                    height: "100%",
                                },
                            }),
                        ],
                    }),
                    Spacer({ width: "20px" }),
                ],
            }),
            Row({
                style: {
                    inline: { background: "inherit", padding: "0px 10px", alignItems: "center" },
                },
                children: IconButton(
                    isFav(player.value.path) ? LoveFilled({ color }) : Love({ color }),
                    () => player.toggleFavorite()
                ),
            }),
            Column({
                style: {
                    inline: {
                        flex: 1,
                        justifyContent: "center",
                        padding: "0px 10px",
                        minWidth: "300px",
                        maxWidth: "700px",
                        backgroundColor: "inherit",
                    },
                },
                children: [
                    Row({
                        style: {
                            scoped: true,
                            normal: {
                                alignItems: "center",
                                marginLeft: "auto",
                                marginRight: "auto",
                            },
                        },
                        children: [
                            IconButton(
                                Shuffle({ color: player.value.shuffle ? color : "#aeaeae" }),
                                () => player.toggleShuffle()
                            ),
                            Spacer({ width: "10px" }),
                            IconButton(Previous({}), () => player.previous()),
                            Spacer({ width: "10px" }),
                            IconButton(
                                !player.value.playing
                                    ? Play({ size: "36", color })
                                    : Pause({ size: "36", color }),
                                () => {
                                    player.value.playing ? player.pause() : player.play();
                                }
                            ),
                            Spacer({ width: "10px" }),
                            IconButton(Next({}), () => player.next()),
                            Spacer({ width: "10px" }),
                            IconButton(
                                Repeat({ color: player.value.repeat ? color : "#aeaeae" }),
                                () => player.toggleRepeat()
                                //
                            ),
                        ],
                    }),
                    Row({
                        style: {
                            inline: {
                                alignItems: "center",
                            },
                        },
                        children: [
                            H6({
                                children: formatTime(player.value.current),
                                style: { inline: { color: "#aeaeae" } },
                            }),
                            Spacer({ width: "5px" }),
                            Div({
                                hooks: { onRef: () => PROGRESS_BAR },
                                events: {
                                    onClick: (e) => player.changeTime(e),
                                },
                                style: {
                                    scoped: true,
                                    normal: { flex: 1, height: "7px", cursor: "pointer" },
                                    hover: { transform: "scaleY(1.5)" },
                                },
                                children: [
                                    Column({
                                        style: {
                                            inline: {
                                                height: "5px",
                                                background: "#5e5e5e",
                                                border: "none",
                                            },
                                        },
                                        children: [
                                            Div({
                                                style: {
                                                    inline: {
                                                        backgroundColor: color,
                                                        height: "100%",
                                                        width: "100%",
                                                        transitionDuration: "200ms",
                                                        transform: `scaleX(${
                                                            player.value.current /
                                                            player.value.duration
                                                        })`,
                                                        transformOrigin: "left",
                                                    },
                                                },
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                            Spacer({ width: "5px" }),
                            H6({
                                children: formatTime(player.value.duration),
                                style: { inline: { color: "#aeaeae" } },
                            }),
                        ],
                    }),
                ],
            }),
            Row({
                style: {
                    scoped: true,
                    normal: {
                        alignItems: "center",
                        padding: "10px",
                        flex: 0.75,
                        overflowX: "hidden",
                        minWidth: "100px",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        backgroundColor: "inherit",
                    },
                },
                children: [
                    IconButton(Playlist({ color }), () => goTo("/playing")),
                    IconButton(
                        !player.value.muted ? VolumeMuted({ color }) : Volume({ color }),
                        player.toggleMute
                    ),
                    Input({
                        type: "range",
                        max: 100,
                        value: player.value.volume,
                        min: 0,
                        style: {
                            inline: { height: "5px", padding: "0px", accentColor: "#eaeaea" },
                        },
                        events: {
                            onInput: (e) => player.changeVolume(e.target.value),
                        },
                    }),
                ],
            }),
        ],
    });
};
