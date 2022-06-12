export default (tracks) => {
    const output = [];

    tracks.forEach((item) => {
        if (!output.includes(item.artists)) {
            output.push(item.artists);
        }
    });

    return output;
};
