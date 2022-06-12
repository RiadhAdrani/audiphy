import { WaveSpinner } from "@riadh-adrani/recursive-components/Spinners.js";
import { Column } from "@riadh-adrani/recursive-components/Utility.js";
import { color, isBusy } from "../models/Application.js";

export default () => {
    return Column({
        flags: { renderIf: isBusy() },
        style: {
            inline: {
                inset: 0,
                backgroundColor: `#aeaeae55`,
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
            },
        },
        children: [
            WaveSpinner({
                color,
                size: "50px",
                thickness: "5px",
                maxScale: 5,
                minScale: 0.5,
            }),
        ],
    });
};
