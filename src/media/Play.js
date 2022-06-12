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
                    d: "M3 1.713a.7.7 0 011.05-.607l10.89 6.288a.7.7 0 010 1.212L4.05 14.894A.7.7 0 013 14.288V1.713z",
                },
            }),
        ],
    });
};
