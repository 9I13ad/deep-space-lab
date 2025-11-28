// 随机背景资源
const backgrounds = [
  { type: "image", src: "assets/img1.jpg" },
  { type: "image", src: "assets/img2.jpg" },
  { type: "video", src: "assets/video1.mp4" },
  // { type: "video", src: "assets/video2.mp4" },
];

const hero = document.getElementById("hero");
const heroMedia = document.getElementById("hero-media");

// 1. 随机选择一个背景
function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function initBackground() {
  const bg = pickRandom(backgrounds);

  if (bg.type === "image") {
    hero.classList.add("image-bg");
    heroMedia.style.backgroundImage = `url("${bg.src}")`;
  } else if (bg.type === "video") {
    hero.classList.remove("image-bg");

    const video = document.createElement("video");
    video.src = bg.src;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.className = "hero-video";

    heroMedia.appendChild(video);
  }
}

// 2. 鼠标移动 → 视差 + 慢慢移动 / 放大
function initParallax() {
  let rect = hero.getBoundingClientRect();

  window.addEventListener("resize", () => {
    rect = hero.getBoundingClientRect();
  });

  hero.addEventListener("mousemove", (e) => {
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 ~ 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const moveX = x * -20;
    const moveY = y * -20;

    if (hero.classList.contains("image-bg")) {
      heroMedia.style.backgroundPosition = `${50 + moveX / 4}% ${50 + moveY / 4}%`;
    } else {
      const video = heroMedia.querySelector("video");
      if (video) {
        video.style.transform = `scale(1.07) translate(${moveX / 6}px, ${moveY / 6}px)`;
      }
    }
  });

  hero.addEventListener("mouseenter", () => {
    hero.classList.add("hover-active");
  });

  hero.addEventListener("mouseleave", () => {
    hero.classList.remove("hover-active");

    if (hero.classList.contains("image-bg")) {
      heroMedia.style.backgroundPosition = "50% 50%";
    } else {
      const video = heroMedia.querySelector("video");
      if (video) {
        video.style.transform = "scale(1.02) translate(0,0)";
      }
    }
  });
}

// 初始化
initBackground();
initParallax();
