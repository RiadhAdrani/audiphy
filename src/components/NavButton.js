import { getRoute } from "@riadh-adrani/recursive/index.js";
import { Row, Spacer } from "@riadh-adrani/recursive-components/Utility.js";
import Home from "../media/Home.js";

export default ({ icon = Home({ size: 30 }), text = "Home", onClick = () => {} }) => {
    return Row({
        style: {
            scoped: true,
            normal: {
                alignItems: "center",
                margin: "0px",
                fontWeight: 400,
                color: "#aeaeae",
                padding: "10px",
                transitionDuration: "200ms",
                fontSize: "0.775em",
                letterSpacing: "1px",
                cursor: "pointer",
            },
            hover: {
                color: "white",
                transform: "translateY(-5px)",
            },
        },
        events: { onClick },
        children: [icon, Spacer({ width: "10px" }), text],
    });
};
