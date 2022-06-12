const convertArt = (art) => {
    const { data } = art;
    let base64String = "";
    for (let i = 0; i < data.length; i += 1) {
        base64String += String.fromCharCode(data[i]);
    }
    return `data:${data.format};base64,${Buffer.from(base64String, "binary").toString("base64")}`;
};

module.exports = (art) => convertArt(art);
