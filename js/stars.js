const container = document.getElementById('stars');

// 通用：创建一颗随机流星
function createRandomStar(extraClass) {
  const star = document.createElement('div');

  // 颜色：大部分白色，小概率彩色
  const r = Math.random();
  if (r < 0.15) {
    star.classList.add('star', 'pink');
  } else if (r < 0.25) {
    star.classList.add('star', 'blue');
  } else if (r < 0.32) {
    star.classList.add('star', 'yellow');
  } else {
    star.classList.add('star');
  }

  // 如果是暴风专用，再加一个标记 class
  if (extraClass) {
    star.classList.add(extraClass); // 比如 "storm-star"
  }

  // 随机起点：主要从上方某个带子划过
  const startX = Math.random() * 140 - 20; // -20vw ~ 120vw
  const startY = Math.random() * 40 - 30;  // -30vh ~ 10vh
  star.style.left = `${startX}vw`;
  star.style.top = `${startY}vh`;

  // 随机角度：0° ~ 90°，都往右边飞
  const angle = Math.random() * 90;
  star.style.setProperty('--angle', angle + 'deg');

  // 随机亮度（普通模式下偏暗）
  const tailAlpha = 0.2 + Math.random() * 0.4; // 0.2 ~ 0.6
  const headAlpha = 0.4 + Math.random() * 0.4; // 0.4 ~ 0.8
  star.style.setProperty('--tail-alpha', tailAlpha);
  star.style.setProperty('--head-alpha', headAlpha);

  // 随机延迟 & 速度
  const delay = Math.random() * 8;
  star.style.animationDelay = `${delay}s`;

  const duration = 3.5 + Math.random() * 3.5; // 3.5s ~ 7s
  star.style.animationDuration = `${duration}s`;

  container.appendChild(star);
  return star;
}

// 页面加载时：生成一批“常驻流星”
const STAR_COUNT = Math.floor(15 + Math.random() * 25); // 15 ~ 40
for (let i = 0; i < STAR_COUNT; i++) {
  createRandomStar();
}

// ================= 键盘彩蛋：流星风暴 =================

let keyBuffer = "";

// 存放这次暴风额外加的流星，方便之后删掉
let stormStars = [];

// 开启暴风模式
function triggerMeteorStorm() {
  // 已经在暴风中就不重复触发了
  if (document.body.classList.contains('meteor-storm')) return;

  document.body.classList.add("meteor-storm");

  // 额外生成一波暴风流星
  spawnStormStars();

  // 4.5 秒后恢复正常
  setTimeout(() => {
    document.body.classList.remove("meteor-storm");
    clearStormStars();
  }, 4500);
}

// 生成一批“暴风专用流星”
function spawnStormStars() {
  const EXTRA_COUNT = 522; // 想更爆炸改大，比如 35

  stormStars = [];
  for (let i = 0; i < EXTRA_COUNT; i++) {
    const star = createRandomStar('storm-star');
    stormStars.push(star);
  }
}

// 删除这次暴风生成的流星
function clearStormStars() {
  stormStars.forEach(star => {
    if (star && star.parentNode) {
      star.parentNode.removeChild(star);
    }
  });
  stormStars = [];
}

// 键盘监听：输入 "le" 触发
document.addEventListener("keydown", (e) => {
  if (e.key.length > 1) return;  // 忽略功能键

  keyBuffer += e.key.toLowerCase();
  if (keyBuffer.length > 10) {
    keyBuffer = keyBuffer.slice(-10);
  }

  if (keyBuffer.endsWith("le")) {
    triggerMeteorStorm();
  }
});
