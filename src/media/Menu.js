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
                            d: "M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z",
                        },
                    }),
                ],
            }),
        ],
    });
};
