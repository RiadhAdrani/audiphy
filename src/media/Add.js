import CreateSvgComponent from "@riadh-adrani/recursive/src/recursive-svg/CreateSvgComponent.js";

export default ({ color = "#aeaeae", size = "16", props = {}, style = {} }) => {
    const d =
        "M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z";

    return new CreateSvgComponent({
        tag: "svg",
        props: {
            ...props,
            height: size,
            width: size,
            fill: color,
            viewBox: "0 0 16 16",
        },
        style,
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
