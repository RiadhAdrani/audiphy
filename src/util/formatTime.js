export default function (time) {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor((time - seconds) / 60);

    const sec = seconds < 10 ? `0${seconds}` : seconds;
    const min = minutes < 10 ? `0${minutes}` : minutes;

    return `${min}:${sec}`;
}
