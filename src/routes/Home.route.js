import { setCache, setState } from "@riadh-adrani/recursive";
import { Button, H3, P, Span } from "@riadh-adrani/recursive-components/Standard.js";
import {
    Column,
    Fragment,
    LazyColumn,
    Row,
    Spacer,
} from "@riadh-adrani/recursive-components/Utility.js";
import { color, Library } from "../models/Application.js";
import TrackCard from "../components/TrackCard.js";
import SortChip from "../components/SortChip.js";
import sortPlaylist from "../util/sortPlaylist.js";
import retreiveSearchResult from "../util/retreiveSearchResult.js";
import LibraryIcon from "../media/Library.js";

export default () => {
    const library = Library();

    const [number, setNumber] = setState("items-displayed", 10);
    const [sort] = setCache("home-sort", { type: "added", inv: false });

    const list = sortPlaylist(retreiveSearchResult(), sort.type, sort.inv);
    const playlist = { items: list, name: "Library" };

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
                        children: LibraryIcon({ size: "30px", color: `black` }),
                    }),
                    Spacer({ width: "20px" }),
                    Column({
                        children: [
                            H3({ children: "Library" }),
                            Spacer({ height: "5px" }),
                            P({
                                style: { inline: { margin: "0px", fontSize: "0.775em" } },
                                children: [
                                    Span({ children: "Sort by :" }),
                                    Spacer({ width: "5px" }),
                                    SortChip({ type: "added", text: "Added", state: "home-sort" }),
                                    Spacer({ width: "5px" }),
                                    SortChip({ type: "title", text: "Title", state: "home-sort" }),
                                    Spacer({ width: "5px" }),
                                    SortChip({
                                        type: "artist",
                                        text: "Artist",
                                        state: "home-sort",
                                    }),
                                    Spacer({ width: "5px" }),
                                    SortChip({ type: "album", text: "Album", state: "home-sort" }),
                                    Spacer({ width: "5px" }),
                                ],
                            }),
                        ],
                    }),
                ],
            }),
            LazyColumn({
                props: { className: "wrapper" },
                onObserved: () => {
                    if (number < library.items.length) {
                        setNumber(number + 10);
                    }
                },
                children: [
                    Fragment({
                        children: list.slice(0, number).map((track, index) => {
                            return TrackCard(track, playlist, index);
                        }),
                    }),
                ],
            }),
        ],
    });
};
