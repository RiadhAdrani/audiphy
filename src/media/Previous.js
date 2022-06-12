import CreateSvgComponent from "@riadh-adrani/recursive/src/recursive-svg/CreateSvgComponent.js";

export default ({ color = "#aeaeae", size = "16", props = {}, style = {} }) => {
    return new CreateSvgComponent({
        tag: "svg",
        style,
        props: { ...props, height: size, width: size, viewBox: "0 0 16 16", fill: color },
        children: [
            new CreateSvgComponent({
                tag: "path",
                props: {
                    d: "M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z",
                },
            }),
        ],
    });
};
