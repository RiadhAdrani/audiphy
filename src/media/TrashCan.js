import CreateSvgComponent from "@riadh-adrani/recursive/src/recursive-svg/CreateSvgComponent.js";

export default ({ color = "#aeaeae", size = "16", props = {}, style = {} }) => {
    return new CreateSvgComponent({
        tag: "svg",
        style,
        props: {
            ...props,
            height: size,
            width: size,
            fill: color,
            viewBox: "0 0 24 24",
        },
        children: [
            new CreateSvgComponent({
                tag: "g",
                children: [
                    new CreateSvgComponent({
                        tag: "path",
                        props: {
                            d: "M11,17H9V8h2V17z M15,8h-2v9h2V8z M19,4v1h-1v16H6V5H5V4h4V3h6v1H19z M17,5H7v15h10V5z",
                        },
                    }),
                ],
            }),
        ],
    });
};
