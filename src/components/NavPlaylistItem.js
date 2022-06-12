import { Row } from "@riadh-adrani/recursive-components/Utility.js";
import { Span } from "@riadh-adrani/recursive-components/Standard.js";
import { goTo, setState } from "@riadh-adrani/recursive";
import TrashCan from "../media/TrashCan.js";
import { Library, color, Toast } from "../models/Application.js";

export default (item) => {
    const [show, setShow] = setState(`show-delete-${item.name}`, false);
    const [hovered, setHovered] = setState(`hovered-${item.name}`, false);

    const library = Library();

    return Row({
        style: {
            scoped: true,
            normal: {
                alignItems: "center",
                margin: "0px",
                fontWeight: 400,
                padding: "4px 12px",
                transitionDuration: "200ms",
                fontSize: "0.775em",
                letterSpacing: "1px",
                marginBottom: "5px",
                cursor: "pointer",
                transitionDuration: "200ms",
                color: hovered ? "black" : "#aeaeae",
                backgroundColor: hovered ? color : "transparent",
            },
            hover: {
                backgroundColor: "#ffffff11",
            },
        },
        events: {
            onClick: () => {
                goTo(`/playlist=:${item.name};`);
            },
            onMouseEnter: () => {
                setShow(true);
            },
            onMouseLeave: () => {
                setShow(false);
            },
            onDragOver: (e) => {
                e.preventDefault();
                setHovered(true);
            },
            onDragLeave: (e) => {
                setHovered(false);
            },
            onDrop: (e) => {
                const data = e.dataTransfer.getData("text/plain");

                setHovered(false);

                library.addToPlaylists(item.name, data);

                e.dataTransfer.clearData();
            },
        },
        children: [
            Span({
                children: item.name,
                style: { inline: { flex: 1 } },
            }),
            Row({
                children: TrashCan({
                    size: "20px",
                    style: { inline: { display: show ? "initial" : "none" } },
                }),
                events: {
                    onClick: (e) => {
                        e.stopPropagation();

                        if (show) {
                            library.deletePlaylist(item.name);
                            if (location.pathname == `/playlist=:${item.name};`) history.back();
                        }
                    },
                },
            }),
        ],
    });
};
