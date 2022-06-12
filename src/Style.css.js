import { setStaticStyle, setStyle } from "@riadh-adrani/recursive";
import { color } from "./models/Application.js";

function sStyle() {
    setStaticStyle({
        import: [
            `url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap')`,
        ],
        selectors: {
            "*": {
                fontFamily: "'Roboto', sans-serif",
                borderRadius: "4px",
                lineHeight: 1.5,
                userSelect: "none",
                transitionTimingFunction: "ease-in-out ",
            },
            body: {
                margin: "0px",
                minHeight: "100vh",
                fontSize: "17px",
                backgroundColor: "#121212",
                color: "white",
            },
            svg: { cursor: "pointer" },
            "h1,h2,h3,h4,h5,h6": {
                margin: "0px",
            },
            "input,button": {
                padding: "8px 16px",
                fontSize: "0.875em",
            },
            input: { border: "none" },
            button: {
                textTransform: "uppercase",
                fontWeight: "500",
                letterSpacing: "1px",
                cursor: "pointer",
                transitionDuration: "200ms",
            },
            "button:hover": {
                transform: "scale(1.05)",
            },
            "button:active": {
                transform: "scale(0.95)",
            },
            ".wrapper": {
                padding: "10px 20px",
            },
        },
    });
}

function dStyle() {
    setStyle({
        selectors: {
            "::-webkit-scrollbar": {
                width: "10px",
            },
            "::-webkit-scrollbar-track": {
                background: "transparent",
            },
            "::-webkit-scrollbar-thumb": {
                background: "#ffffff33",
                borderRadius: "2.5px",
            },
            "::-webkit-scrollbar-thumb:hover": {
                background: `${color}66`,
            },
            "::-webkit-scrollbar-thumb:active": {
                background: `${color}`,
            },
        },
    });
}

export { dStyle, sStyle };
