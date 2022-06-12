import { P } from "@riadh-adrani/recursive-components/Standard.js";
import { Column } from "@riadh-adrani/recursive-components/Utility.js";
import { color, Toast } from "../models/Application.js";

export default () => {
    const toast = Toast();

    return Column({
        style: {
            inline: {
                position: "absolute",
                zIndex: "9999",
                top: "0px",
                width: "100%",
                alignItems: "center",
                transform: `translateY(-100px)`,
            },
        },
        children: P({
            children: toast.value.text,
            style: {
                scoped: true,
                normal: {
                    backgroundColor: `#182232`,
                    fontSize: "0.775em",
                    padding: "6px 8px",
                    boxShadow: `0px 0px 10px 1px #ffffff33`,
                    width: "300px",
                    textAlign: "center",
                    boxSizing: "border-box",
                    transitionDuration: "200ms",
                    transitionTimingFunction: "ease-in-out",
                    transform: `translateY(${toast.value.show ? "120px" : "0px"})`,
                    cursor: "pointer",
                    borderRadius: "20px",
                },
                hover: {
                    opacity: 0.7,
                },
            },
            events: { onClick: () => toast.hide() },
        }),
    });
};
