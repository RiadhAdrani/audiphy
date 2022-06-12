import { setCache } from "@riadh-adrani/recursive";
import { Button, H3, P, Span } from "@riadh-adrani/recursive-components/Standard.js";
import { Column, Row, Spacer } from "@riadh-adrani/recursive-components/Utility.js";
import TrackCard from "../components/TrackCard.js";
import Playlist from "../media/Playlist.js";
import { color } from "../models/Application.js";
import getNowPlaying from "../util/getNowPlaying.js";

export default () => {
    const list = getNowPlaying();

    const [sort] = setCache("now-playing-sort", { type: "added", inv: false });

    return Column({
        children: [
            Row({
                style: {
                    scoped: true,
                    normal: {
                        padding: "10px 30px",
                        backgroundColor: `${color}22`,
                        backdropFilter: "blur(20px)",
                        borderRadius: "0px",
                        alignItems: "center",
                        position: "sticky",
                        top: "0px",
                        zIndex: 10,
                    },
                },
                children: [
                    Button({
                        style: {
                            className: "playing-playlist",
                            normal: {
                                borderRadius: "50%",
                                display: "flex",
                                flexDirection: "column",
                                padding: "10px",
                                backgroundColor: "#aeaeae",
                                border: "none",
                            },
                        },
                        children: Playlist({ size: "30px", color: `black` }),
                    }),
                    Spacer({ width: "20px" }),
                    Column({
                        children: [
                            H3({ children: `Now Playing : ${list.name}` }),
                            Spacer({ height: "5px" }),
                            P({
                                style: { inline: { margin: "0px", fontSize: "0.775em" } },
                                children: [Span({ children: "Sorted by order of play" })],
                            }),
                        ],
                    }),
                ],
            }),
            Column({
                props: { className: "wrapper" },
                children: list.items.map((item, i) => TrackCard(item, list, i)),
            }),
        ],
    });
};
