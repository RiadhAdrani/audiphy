import { getParams, getState } from "@riadh-adrani/recursive";
import { H1, Img, Span } from "@riadh-adrani/recursive-components/Standard.js";
import { Column, Fragment, Row, Spacer } from "@riadh-adrani/recursive-components/Utility.js";
import Chip from "../components/Chip.js";
import TrackCard from "../components/TrackCard.js";
import Play from "../media/Play.js";
import { Arts, color, makePlaylist } from "../models/Application.js";
import Player from "../models/Player.js";
import getArtists from "../util/getArtists.js";

export default (playlist) => {
    const [scroll] = getState("main-view-scroll");
    const [navShowed] = getState("show-nav-bar");
    const art = Arts().select(playlist.items[0] ? playlist.items[0].art : "");

    function shrink() {
        return scroll.top < 100 ? true : false;
    }

    return Column({
        style: { inline: { height: "100%" } },
        children: [
            Column({
                style: {
                    scoped: true,
                    normal: {
                        backgroundImage: `url(${art})`,
                        backgroundSize: "cover",
                        backgroundAttachement: "fixed",
                        position: "absolute",
                        width: `calc(100% - ${navShowed ? "280px" : "70px"} - 10px)`,
                        top: "0px",
                        zIndex: 10,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        borderRadius: "0px",
                        transitionDuration: "200ms",
                    },
                },
                children: [
                    Column({
                        style: {
                            inline: {
                                justifyContent: "center",
                                padding: "10px 25px",
                                backgroundColor: `#000000aa`,
                                backdropFilter: "blur(20px)",
                                borderRadius: "0px",
                                transitionDuration: "300ms",
                                height: shrink() ? "280px" : "170px",
                                boxSizing: "border-box",
                            },
                        },
                        children: Row({
                            style: {
                                scoped: true,
                                normal: {
                                    alignItems: "flex-end",
                                },
                            },
                            children: [
                                Img({
                                    src: art,
                                    style: {
                                        className: "playlist-art",
                                        normal: {
                                            height: shrink() ? "250px" : "150px",
                                            width: shrink() ? "250px" : "150px",
                                            transitionDuration: "300ms",
                                        },
                                    },
                                }),
                                Spacer({ width: "20px" }),
                                Column({
                                    children: [
                                        Column({
                                            style: {
                                                className: "play-this-playlist",
                                                normal: {
                                                    height: shrink() ? "40px" : "30px",
                                                    width: shrink() ? "40px" : "30px",
                                                    transitionDuration: "300ms",
                                                    backgroundColor: `${color}11`,
                                                    border: `1px solid ${color}22`,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    borderRadius: "50%",
                                                    cursor: "pointer",
                                                },
                                                hover: { opacity: 0.5 },
                                            },
                                            children: Play({
                                                color: `${color}dd`,
                                                size: shrink() ? "20px" : "15px",
                                            }),
                                            events: {
                                                onClick: () => {
                                                    if (playlist.items.length == 0) return;

                                                    const player = Player();

                                                    const shuffle = player.value.shuffle;
                                                    let index = 0;

                                                    if (shuffle) {
                                                        index = Math.floor(
                                                            Math.random() * playlist.items.length
                                                        );
                                                    }

                                                    player.changeTrack(
                                                        makePlaylist(
                                                            playlist.items,
                                                            index,
                                                            playlist.name
                                                        )
                                                    );
                                                },
                                            },
                                        }),
                                        Spacer({ height: "10px" }),
                                        Row({
                                            style: {
                                                inline: { alignItems: "center", fontSize: "12px" },
                                            },
                                            children: H1({
                                                children: playlist.name,
                                                style: {
                                                    inline: {
                                                        fontSize: shrink() ? "2em" : "1.5em",
                                                        transitionDuration: "300ms",
                                                    },
                                                },
                                            }),
                                        }),
                                        Spacer({ height: "5px" }),
                                        Span({
                                            children: `${playlist.items.length} Track${
                                                playlist.items.length > 1 ? "s" : ""
                                            }`,
                                        }),
                                        Spacer({ height: "10px" }),
                                        Span({
                                            flags: { renderIf: shrink() },
                                            children: getArtists(playlist.items).map((item) =>
                                                Fragment({
                                                    children: [
                                                        Chip({ text: item }),
                                                        Spacer({ width: "5px" }),
                                                    ],
                                                })
                                            ),
                                        }),
                                    ],
                                }),
                            ],
                        }),
                    }),
                ],
            }),
            Column({
                props: { className: "wrapper" },
                style: {
                    scoped: true,
                    normal: {
                        marginTop: shrink() ? "290px" : "190px",
                        transitionDuration: "300ms",
                    },
                },
                children: playlist.items.map((item, i) => TrackCard(item, playlist, i)),
            }),
        ],
    });
};
