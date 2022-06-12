import { goTo } from "@riadh-adrani/recursive";
import { Div, H1, H3, H5, H6, Img, Input } from "@riadh-adrani/recursive-components/Standard.js";
import { Column, Row, Spacer } from "@riadh-adrani/recursive-components/Utility.js";
import Love from "../media/Love.js";
import LoveFilled from "../media/LoveFilled.js";
import Next from "../media/Next.js";
import Pause from "../media/Pause.js";
import Play from "../media/Play.js";
import Playlist from "../media/Playlist.js";
import Previous from "../media/Previous.js";
import Repeat from "../media/Repeat.js";
import Shuffle from "../media/Shuffle.js";
import Volume from "../media/Volume.js";
import VolumeMuted from "../media/VolumeMuted.js";
import { color, isFav, PROGRESS_BAR } from "../models/Application.js";
import Player from "../models/Player.js";
import formatTime from "../util/formatTime.js";
import urlValid from "../util/urlValid.js";
import IconButton from "../widgets/IconButton.js";

export default () => {
    const player = Player();

    return Column({
        style: {
            inline: {
                height: "-webkit-fill-available",
                backgroundImage: `url(${player.value.art})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            },
        },
        children: [
            Column({
                style: {
                    inline: {
                        height: "-webkit-fill-available",
                        backdropFilter: "blur(20px)",
                        backgroundColor: "#000000aa",
                        padding: "30px",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        textAlign: "center",
                    },
                },
                children: [
                    Img({ src: player.value.art, height: 200, width: 200 }),
                    Spacer({ height: "20px" }),
                    H1({
                        children: player.value.title,
                        style: {
                            scoped: true,
                            normal: { fontWeight: 500 },
                        },
                    }),
                    H3({
                        children: player.value.album,
                        style: {
                            scoped: true,
                            normal: { fontWeight: 400, color: "#dedede" },
                            hover: {
                                textDecoration: "underline",
                                cursor: "pointer",
                            },
                        },
                        events: {
                            onClick: () => goTo(`/album=:${urlValid(player.value.album)};`),
                        },
                    }),
                    H5({
                        children: player.value.artists,
                        style: {
                            scoped: true,
                            normal: { fontWeight: 400, color: "#dedede" },
                            hover: {
                                textDecoration: "underline",
                                cursor: "pointer",
                            },
                        },
                        events: {
                            onClick: () => goTo(`/artist=:${urlValid(player.value.artists)};`),
                        },
                    }),
                    Spacer({ height: "10px" }),
                    Row({
                        style: {
                            inline: {
                                padding: "0px 10px",
                                alignItems: "center",
                            },
                        },
                        children: IconButton(
                            isFav(player.value.path)
                                ? LoveFilled({ color: "white", size: "30px" })
                                : Love({ color: "white", size: "30px" }),
                            () => player.toggleFavorite()
                        ),
                    }),
                    Row({
                        style: {
                            scoped: true,
                            normal: {
                                alignItems: "center",
                                padding: "10px",
                                overflowX: "hidden",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                minWidth: "100px",
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
                                    inline: {
                                        height: "5px",
                                        padding: "0px",
                                        accentColor: "#eaeaea",
                                    },
                                },
                                events: {
                                    onInput: (e) => player.changeVolume(e.target.value),
                                },
                            }),
                        ],
                    }),
                    Spacer({ height: "20px" }),
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
                                Shuffle({
                                    color: player.value.shuffle ? color : "#aeaeae",
                                }),
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
                                Repeat({
                                    color: player.value.repeat ? color : "#aeaeae",
                                }),
                                () => player.toggleRepeat()
                            ),
                        ],
                    }),
                    Row({
                        style: {
                            inline: {
                                alignItems: "center",
                                width: "100%",
                            },
                        },
                        children: [
                            H6({
                                children: formatTime(player.value.current),
                                style: { inline: { color: "#aeaeae" } },
                            }),
                            Spacer({ width: "5px" }),
                            Div({
                                hooks: { onRef: () => "altprogressbar" },
                                events: {
                                    onClick: (e) => player.changeTime(e),
                                },
                                style: {
                                    scoped: true,
                                    normal: {
                                        flex: 1,
                                        height: "7px",
                                        cursor: "pointer",
                                    },
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
        ],
    });
};
