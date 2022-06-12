import { Column } from "@riadh-adrani/recursive-components/Utility.js";
import { Modal } from "../models/Application.js";

export default () => {
    const modal = Modal();

    return Column({
        flags: { renderIf: modal.value.show },
        events: {
            onClick: (e) => {
                e.stopPropagation();

                modal.hide();
            },
            onKeyUpGlobal: (e) => {
                if (modal.value.show && e.code == "Escape") {
                    modal.hide();
                }
            },
        },
        style: {
            scoped: true,
            normal: {
                position: "absolute",
                inset: "0px",
                background: "#000000aa",
                zIndex: 9998,
                justifyContent: "center",
                alignItems: "center",
            },
        },
        children: modal.value.component ? modal.value.component() : "Hello World",
    });
};
