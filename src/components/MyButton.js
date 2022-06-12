import { Button } from "@riadh-adrani/recursive-components/Standard.js";

export default ({ text, onClick = () => {} }) => {
    return Button({
        children: text,
        events: { onClick },
        style: {
            className: "fancy-button",
            normal: {
                margin: "0px",
                padding: "4px 8px",
                fontSize: "0.775em",
                textTransform: "capitalize",
            },
            hover: {
                opacity: 0.8,
                transform: "none",
            },
        },
    });
};
