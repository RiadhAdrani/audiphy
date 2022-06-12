import { Button } from "@riadh-adrani/recursive-components/Standard.js";

export default (icon, onClick = () => {}) => {
    return Button({
        children: icon,
        events: { onClick },
        style: {
            className: "icon-btn",
            scoped: true,
            normal: {
                padding: "5px",
                display: "flex",
                alignItems: "center",
                background: "transparent",
                border: "none",
            },
        },
    });
};
