(function logVisitorInfo() {
  const API_URL = "https://plain-bar-bbb3.isksdhuin.workers.dev/ip";

  fetch(API_URL)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      const ipElem = document.getElementById("ip");
      const statusElem = document.getElementById("ip-status");

      if (ipElem) {
        ipElem.textContent = data.ip || "未知 IP";
      }

      if (statusElem) {
        const parts = [];

        if (data.country) parts.push(data.country);
        if (data.region && data.region !== "unknown") parts.push(data.region);
        if (data.city && data.city !== "unknown") parts.push(data.city);

        const locationText =
          parts.length > 0 ? parts.join(" · ") : "未知位置";

        statusElem.textContent =
          "大概位置：" +
          locationText +
          "（基于 IP 的粗略定位，仅供参考）";
      }
    })
    .catch(function (error) {
      const ipElem = document.getElementById("ip");
      const statusElem = document.getElementById("ip-status");

      if (ipElem) ipElem.textContent = "获取失败";
      if (statusElem)
        statusElem.textContent =
          "获取 IP / 位置出错：" + error.message;
    });
})();
