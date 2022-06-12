import CreateSvgComponent from "@riadh-adrani/recursive/src/recursive-svg/CreateSvgComponent.js";

export default ({ color = "#aeaeae", size = "16", props = {}, style = {} }) => {
    const d = "m6 14 8 8L30 6v8L14 30l-8-8v-8Z";

    return new CreateSvgComponent({
        tag: "svg",
        style,
        props: { ...props, height: size, width: size, viewBox: "0 0 36 36", fill: color },
        children: [
            new CreateSvgComponent({
                tag: "path",
                props: {
                    d,
                },
            }),
        ],
    });
};
