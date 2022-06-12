import { CreateComponent, goTo } from "@riadh-adrani/recursive/index.js";
import { makeURL } from "@riadh-adrani/recursive/src/recursive-router/RecursiveHistory.js";

export default function ({ children, style, to, props, key, events, hooks, flags }) {
    return new CreateComponent({
        tag: "a",
        children,
        style,
        props: { ...props, href: makeURL(to) },
        key,
        events: {
            ...events,
            onClick: (e) => {
                if (events && events.onClick) events.onClick();
                e.preventDefault();

                goTo(to);
            },
        },
        hooks,
        flags,
    });
}
