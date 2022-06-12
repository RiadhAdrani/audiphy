import { getCache } from "@riadh-adrani/recursive";
import Chip from "./Chip.js";

export default ({ type, text, state }) => {
    const [get, set] = getCache(state);

    const isSelected = get.type == type;

    return Chip({
        text: `${text} ${isSelected ? (get.inv ? "- d" : "- a") : ""}`,
        isSelected,
        onClick: () => {
            console.log(`sorting by ${type}`);
            // if (get.type == type) set({ ...get, inv: !get.inv });
            // else
            set({ ...get, type });
        },
    });
};
