import { Span } from "@riadh-adrani/recursive-components/Standard.js";
import { color } from "../models/Application.js";

export default ({ text, isSelected = false, onClick = () => {} }) => {
    return Span({
        children: text,
        style: {
            scoped: true,
            normal: {
                borderColor: `1px solid ${isSelected ? `${color}55` : "#aeaeae22"}`,
                backgroundColor: isSelected ? color : "#aeaeae22",
                color: isSelected ? "white" : "#bebebe",
                padding: "1px 10px",
                borderRadius: "10px",
                cursor: "pointer",
            },
            hover: {
                borderColor: isSelected ? color : "#aeaeae",
                backgroundColor: isSelected ? `${color}77` : "#aeaeae55",
            },
        },
        events: { onClick },
    });
};
