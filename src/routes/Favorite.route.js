import { setCache } from "@riadh-adrani/recursive";
import { Button, H3, P, Span } from "@riadh-adrani/recursive-components/Standard.js";
import { Column, Row, Spacer } from "@riadh-adrani/recursive-components/Utility.js";
import SortChip from "../components/SortChip.js";
import TrackCard from "../components/TrackCard.js";
import Love from "../media/Love.js";
import { color, getFav } from "../models/Application.js";
import sortPlaylist from "../util/sortPlaylist.js";

export default () => {
    const fav = getFav();

    const [sort] = setCache("fav-sort", { type: "added", inv: false });

    const playlist = { items: fav, name: "Favorites" };

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
                            className: "play-playlist",
                            normal: {
                                borderRadius: "50%",
                                display: "flex",
                                flexDirection: "column",
                                padding: "10px",
                                backgroundColor: "#aeaeae",
                                border: "none",
                            },
                        },
                        children: Love({ size: "30px", color: `black` }),
                    }),
                    Spacer({ width: "20px" }),
                    Column({
                        children: [
                            H3({ children: "Favorites" }),
                            Spacer({ height: "5px" }),
                            P({
                                style: { inline: { margin: "0px", fontSize: "0.775em" } },
                                children: [
                                    Span({ children: "Sort by :" }),
                                    Spacer({ width: "5px" }),
                                    SortChip({ type: "added", text: "Added", state: "fav-sort" }),
                                    Spacer({ width: "5px" }),
                                    SortChip({ type: "title", text: "Title", state: "fav-sort" }),
                                    Spacer({ width: "5px" }),
                                    SortChip({ type: "artist", text: "Artist", state: "fav-sort" }),
                                    Spacer({ width: "5px" }),
                                    SortChip({ type: "album", text: "Album", state: "fav-sort" }),
                                    Spacer({ width: "5px" }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            Column({
                props: { className: "wrapper" },
                children: sortPlaylist(fav, sort.type, sort.inv).map((item, i) =>
                    TrackCard(item, playlist, i)
                ),
            }),
        ],
    });
};
