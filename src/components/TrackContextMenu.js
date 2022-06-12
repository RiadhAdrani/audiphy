import { Button } from "@riadh-adrani/recursive-components/Standard.js";
import { Column } from "@riadh-adrani/recursive-components/Utility.js";
import { color } from "../models/Application.js";

export default (state, items) => {
    const [get, set] = state;

    return Column({
        style: {
            className: "contextMenu",
            scoped: true,
            normal: {
                backgroundColor: `${color}22`,
                backdropFilter: "blur(20px)",
                display: get.show ? "flex" : "none",
                width: get.width + "px",
                position: "absolute",
                left: get.invert ? get.x - get.width + "px" : get.x + "px",
                top: get.y + "px",
                zIndex: 2,
                animationName: "context-menu-appear",
                animationDuration: "0.1s",
                animationIteractionCount: "1",
                animationTimingFunction: "ease-in-out",
            },
            animations: [
                {
                    name: "context-menu-appear",
                    steps: {
                        from: {
                            opacity: 0,
                            transform: "translateY(-10px)",
                        },
                        to: { opacity: 1, transform: "translateY(0px)" },
                    },
                },
            ],
        },
        events: {
            onClick: (e) => e.stopPropagation(),
            onClickGlobal: () => {
                set({ ...get, show: false });
            },
        },
        children: items.map((item) =>
            Button({
                style: {
                    className: "track-context-menu",
                    normal: {
                        backgroundColor: "transparent",
                        textAlign: "start",
                        color: "white",
                        fontSize: "0.675em",
                        margin: "0px",
                        border: "none",
                    },
                    hover: {
                        transform: "none",
                        backgroundColor: `${color}77`,
                    },
                },
                children: item.text,
                events: {
                    onClick: () => {
                        item.onClick(), set({ ...get, show: false });
                    },
                },
            })
        ),
    });
};
