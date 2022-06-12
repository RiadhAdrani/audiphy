import { H3, H4 } from "@riadh-adrani/recursive-components/Standard.js";
import { Column, Row, Spacer } from "@riadh-adrani/recursive-components/Utility.js";
import { color, Modal, on } from "../models/Application.js";
import BusyScreen from "./BusyScreen.js";
import TextButton from "./TextButton.js";

export default () => {
    return Column({
        events: {
            onClick: (e) => {
                e.stopPropagation();
            },
        },
        style: {
            scoped: true,
            className: "scan-for-music",
            normal: {
                padding: "20px",
                backgroundColor: `${color}22`,
                backdropFilter: "blur(10px)",
                width: "450px",
                animation: "addToPlaylist 0.25s 1",
            },
            animations: [
                {
                    name: "addToPlaylist",
                    steps: {
                        from: { opacity: 0.1, transform: "scale(0.5)" },
                        to: { opacity: 1, transform: "scale(1)" },
                    },
                },
            ],
        },
        children: [
            H4({
                children:
                    "All audio files will be indexed from your operating system's Music directory, The operation could take sometime to finish, are you sure you want to proceed with the task ? ",
                style: { inline: { fontWeight: 300 } },
            }),
            Spacer({ height: "10px" }),
            Row({
                style: { inline: { justifyContent: "flex-end" } },
                children: [
                    TextButton({
                        text: "Proceed",
                        onClick: () => {
                            Modal().show(() => BusyScreen());
                            on(() => {
                                window.api.send("get:scan");
                            });
                        },
                    }),
                    TextButton({ text: "Cancel", onClick: () => Modal().hide() }),
                ],
            }),
        ],
    });
};
