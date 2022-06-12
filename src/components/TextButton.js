import { Button } from "@riadh-adrani/recursive-components/Standard.js";

export default ({ text, onClick = () => {} }) => {
    return Button({
        children: text,
        events: { onClick },
        style: {
            className: "text-button",
            normal: {
                margin: "0px",
                padding: "4px 12px",
                fontSize: "0.775em",
                textTransform: "capitalize",
                background: "transparent",
                color: "inherit",
                border: "none",
            },
            hover: {
                opacity: 0.8,
                transform: "none",
                backgroundColor: "#ffffff22",
            },
        },
    });
};
