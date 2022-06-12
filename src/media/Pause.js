import CreateSvgComponent from "@riadh-adrani/recursive/src/recursive-svg/CreateSvgComponent.js";

export default ({ color = "#aeaeae", size = "16", props = {}, style = {} }) => {
    return new CreateSvgComponent({
        tag: "svg",
        style,
        props: { ...props, height: size, width: size, fill: color, viewBox: "0 0 16 16" },
        children: [
            new CreateSvgComponent({
                tag: "path",
                props: {
                    d: "M2.7 1a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7H2.7zm8 0a.7.7 0 00-.7.7v12.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-2.6z",
                },
            }),
        ],
    });
};
