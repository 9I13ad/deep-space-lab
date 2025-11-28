
const originTitle = document.title;

function getTimeGreeting() {
    const hour = new Date().getHours();
    if (hour < 6) {
        return "夜深了，代码会看着你的 👻";
    } else if (hour < 12) {
        return "早起的人会多写几行 bug";
    } else if (hour < 18) {
        return "下午好，咖啡续上了吗 ☕️";
    } else {
        return "今天也写点新东西吧 ✨";
    }
}

const backMessages = [
    "哦？你又点回来了？",
    "欢迎回来，bug 还在等你 🐛",
    "继续吧，反正也逃不掉的（指需求）",
];

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

let tempTimer = null;

function showTempTitle(text, duration) {
    if (tempTimer !== null) {
        clearTimeout(tempTimer);
        tempTimer = null;
    }

    document.title = text;

    tempTimer = setTimeout(() => {
        document.title = originTitle;
        tempTimer = null;
    }, duration);
}

showTempTitle(getTimeGreeting(), 2000);

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        if (tempTimer !== null) {
            clearTimeout(tempTimer);
            tempTimer = null;
        }
        document.title = getTimeGreeting();
    } else {
        const msg = pickRandom(backMessages);
        showTempTitle(msg, 3000);
    }
});
