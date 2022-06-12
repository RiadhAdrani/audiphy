import { Button, H3, Span } from "@riadh-adrani/recursive-components/Standard.js";
import { Row, Spacer, Column } from "@riadh-adrani/recursive-components/Utility.js";
import SortChip from "./SortChip.js";

export default ({ sort }) => {
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
            Column({
                children: [
                    H3({ children: "Favorites" }),
                    Spacer({ height: "5px" }),
                    P({
                        style: { inline: { margin: "0px", fontSize: "0.775em" } },
                        children: [
                            Span({ children: "Sort by :" }),
                            Spacer({ width: "5px" }),
                            SortChip({ type: "added", text: "Added", state: sort }),
                            Spacer({ width: "5px" }),
                            SortChip({ type: "title", text: "Title", state: sort }),
                            Spacer({ width: "5px" }),
                            SortChip({ type: "artist", text: "Artist", state: sort }),
                            Spacer({ width: "5px" }),
                            SortChip({ type: "album", text: "Album", state: sort }),
                            Spacer({ width: "5px" }),
                        ],
                    }),
                ],
            }),
        ],
    });
};
