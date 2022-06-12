import { renderRoute, setState, setStyle } from "@riadh-adrani/recursive/index.js";
import { Div, H2, H4 } from "@riadh-adrani/recursive-components/Standard.js";
import { Column, Spacer } from "@riadh-adrani/recursive-components/Utility.js";
import { WaveSpinner } from "@riadh-adrani/recursive-components/Spinners.js";
import { Application, color, isBusy } from "./models/Application.js";
import Router from "./Router.js";
import { dStyle, sStyle } from "./Style.css.js";
import MediaPlayer from "./widgets/MediaPlayer.js";
import NavBar from "./widgets/NavBar.js";
import Modal from "./widgets/Modal.js";
import Toast from "./widgets/Toast.js";

sStyle();
Router();

export default () => {
    Application();

    dStyle();

    const [scroll, setScroll] = setState("main-view-scroll", { top: 0 });

    return Column({
        style: {
            scoped: true,
            normal: {
                display: "grid",
                gridTemplateAreas: `"nav-bar main-view main-view""player player player"`,
                gridTemplateColumns: "auto 1fr",
                gridTemplateRows: "1fr auto",
                height: "100vh",
            },
        },
        children: [
            NavBar(),
            Div({
                hooks: { onRef: () => "main-view" },
                events: {
                    onScroll: (e) => {
                        const old = e.target.scrollTop;

                        setTimeout(() => {
                            if (old == e.target.scrollTop) {
                                setScroll({ ...scroll, top: e.target.scrollTop });
                            }
                        }, 20);
                    },
                },
                style: {
                    scoped: true,
                    normal: { gridArea: "main-view", overflowY: "scroll", height: "100%" },
                },
                children: renderRoute(),
            }),
            MediaPlayer(),
            Toast(),
            Modal(),
        ],
    });
};
