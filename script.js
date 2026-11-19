/* =========================================================
   ✏️  EDIT EVERYTHING IN THIS CONFIG BLOCK
   Put your photos in the /images folder using the same names,
   or change the file names below to match yours.
   ========================================================= */
const CONFIG = {
  name1: "Rahul",
  name2: "Uddeshy",

  // Lines typed out under the names (they loop)
  typedLines: [
    "Two hearts, one celebration 💖",
    "Another year of laughter and love",
    "Here's to many more adventures together ✨",
  ],

  // The date you started your journey together (YYYY-MM-DD)
  togetherSince: "2026-01-05",

  // Main photo shown in the spinning circle
  heroPhoto: "images/couple.jpg",

  // Optional background music. Put an mp3 at this path, or set to "" to hide the button.
  music: "music/song.mp3",

  // Number of candles on the cake
  candles: 5,

  story: [
    { date: "5 Jan 2026", title: "The First Hello", text: "The day it all began — and nothing was the same again.", photo: "images/story1.jpg" },
    { date: "Spring 2026", title: "Our First Trip", text: "Sunsets, long drives and endless conversations.", photo: "images/story2.jpg" },
    { date: "Summer 2026", title: "Falling Deeper", text: "Inside jokes, late nights and a love that kept growing.", photo: "images/story3.jpg" },
    { date: "Today", title: "Still Counting", text: "Every day with you is the best day yet.", photo: "images/story4.jpg" },
  ],

  gallery: [
    { src: "images/photo1.jpg", caption: "Sweet beginnings" },
    { src: "images/photo2.jpg", caption: "Adventures" },
    { src: "images/photo3.jpg", caption: "Silly us" },
    { src: "images/photo4.jpg", caption: "Golden hour" },
    { src: "images/photo5.jpg", caption: "Celebrations" },
    { src: "images/photo6.jpg", caption: "Always & forever" },
    { src: "images/photo7.jpg", caption: "Lazy Sundays" },
    { src: "images/photo8.jpg", caption: "Our happy place" },
  ],

  wishes: [
    { from: "Mom & Dad", text: "May your home always be full of laughter and your hearts full of love. Happy birthday, our darlings!" },
    { from: "Your Best Friends", text: "To the couple who makes every party better — have the most amazing birthday ever! 🥳" },
    { from: "The Whole Family", text: "Wishing you both health, happiness and a year full of beautiful surprises." },
  ],

  letter:
`My dearest,

Happy birthday to the person who makes every ordinary day feel like a celebration.

Thank you for the laughter, the late-night talks, the patience and the endless love. Growing older next to you is my favourite adventure.

Here's to us — today and always.`,
  letterSign: "Forever yours ❤",
};

/* =========================================================
   Nothing below needs editing
   ========================================================= */
const $ = (sel) => document.querySelector(sel);
const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const COLORS = ["#ff5c8a", "#ff8fab", "#ffc857", "#8b5cf6", "#5eead4", "#60a5fa"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Image helper with friendly placeholder ---------- */
function makeImage(src, alt) {
  const img = new Image();
  img.src = src;
  img.alt = alt || "";
  img.loading = "lazy";
  img.onerror = () => {
    const ph = document.createElement("div");
    ph.className = "missing";
    ph.innerHTML = `<span class="big">📷</span><span>Add your photo</span><code>${src}</code>`;
    img.replaceWith(ph);
  };
  return img;
}

/* ---------- Fill content ---------- */
function renderContent() {
  $("#names").innerHTML = `${CONFIG.name1} <span class="amp">&amp;</span> ${CONFIG.name2}`;
  document.title = `Happy Birthday ${CONFIG.name1} & ${CONFIG.name2} 🎂`;
  $("#year").textContent = `© ${new Date().getFullYear()} · ${CONFIG.name1} & ${CONFIG.name2}`;

  const inner = document.createElement("div");
  inner.className = "photo-inner";
  inner.appendChild(makeImage(CONFIG.heroPhoto, `${CONFIG.name1} and ${CONFIG.name2}`));
  $("#heroPhoto").appendChild(inner);

  // Timeline
  const tl = $("#timeline");
  CONFIG.story.forEach((s) => {
    const item = document.createElement("div");
    item.className = "t-item reveal";
    item.innerHTML = `<div class="t-card"><div class="media"></div><div class="body">
        <div class="t-date">${s.date}</div><h3>${s.title}</h3><p>${s.text}</p></div></div>`;
    if (s.photo) item.querySelector(".media").appendChild(makeImage(s.photo, s.title));
    else item.querySelector(".media").remove();
    tl.appendChild(item);
  });

  // Gallery
  const grid = $("#galleryGrid");
  CONFIG.gallery.forEach((g, i) => {
    const fig = document.createElement("figure");
    fig.className = "polaroid reveal";
    fig.style.setProperty("--r", `${pick([-5, -3, -2, 2, 3, 5])}deg`);
    fig.innerHTML = `<div class="media"></div><figcaption>${g.caption || ""}</figcaption>`;
    fig.querySelector(".media").appendChild(makeImage(g.src, g.caption));
    fig.addEventListener("click", () => openLightbox(i));
    grid.appendChild(fig);
  });

  // Wishes
  const wg = $("#wishesGrid");
  CONFIG.wishes.forEach((w, i) => {
    const card = document.createElement("div");
    card.className = "wish reveal";
    card.style.transitionDelay = `${i * 0.12}s`;
    card.innerHTML = `<p>${w.text}</p><div class="from">— ${w.from}</div>`;
    wg.appendChild(card);
  });

  // Letter
  const lt = $("#letterText");
  lt.textContent = CONFIG.letter;
  const sign = document.createElement("span");
  sign.className = "sign";
  sign.textContent = CONFIG.letterSign;
  lt.appendChild(sign);
}

/* ---------- Typewriter ---------- */
function typewriter() {
  const el = $("#typed");
  let line = 0, char = 0, deleting = false;
  (function tick() {
    const text = CONFIG.typedLines[line];
    el.textContent = text.slice(0, char);
    if (!deleting && char < text.length) { char++; setTimeout(tick, 70); }
    else if (!deleting) { deleting = true; setTimeout(tick, 1800); }
    else if (char > 0) { char--; setTimeout(tick, 35); }
    else { deleting = false; line = (line + 1) % CONFIG.typedLines.length; setTimeout(tick, 400); }
  })();
}

/* ---------- Counters ---------- */
function setGrid(el, parts) {
  // Build once, then only update numbers (so we can animate changes)
  if (!el.dataset.built || el.dataset.built !== parts.map((p) => p[1]).join()) {
    el.innerHTML = parts.map(([v, label]) => `<div><b>${v}</b><small>${label}</small></div>`).join("");
    el.dataset.built = parts.map((p) => p[1]).join();
    return;
  }
  el.querySelectorAll("b").forEach((b, i) => {
    const v = String(parts[i][0]);
    if (b.textContent !== v) {
      b.textContent = v;
      b.classList.remove("tick"); void b.offsetWidth; b.classList.add("tick");
    }
  });
}

function updateCounters() {
  const now = new Date();

  // Together since: years, months, days, then live seconds
  const start = new Date(CONFIG.togetherSince + "T00:00:00");
  let y = now.getFullYear() - start.getFullYear();
  let m = now.getMonth() - start.getMonth();
  let d = now.getDate() - start.getDate();
  if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  const totalDays = Math.floor((now - start) / 86400000);
  const pad = (n) => String(n).padStart(2, "0");
  const parts = [];
  if (y > 0) parts.push([y, y === 1 ? "Year" : "Years"]);
  parts.push(
    [m, "Months"],
    [d, "Days"],
    [pad(now.getHours()), "Hours"],
    [pad(now.getMinutes()), "Mins"],
    [pad(now.getSeconds()), "Secs"]
  );
  setGrid($("#together"), parts);

  const since = start.toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" });
  $("#togetherLabel").textContent = `💞 Together since ${since}`;
  $("#togetherTotal").innerHTML = `That's <b>${totalDays.toLocaleString()}</b> beautiful days and counting…`;
}

/* ---------- Confetti (canvas) ---------- */
const canvas = $("#confetti");
const ctx = canvas.getContext("2d");
let particles = [];
let animating = false;

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function burst(x, y, count = 120, spread = 1) {
  for (let i = 0; i < count; i++) {
    const angle = rand(0, Math.PI * 2);
    const speed = rand(3, 11) * spread;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - rand(2, 6),
      size: rand(6, 11),
      color: pick(COLORS),
      rot: rand(0, 360),
      vr: rand(-10, 10),
      shape: pick(["rect", "circle", "heart"]),
      life: 0,
      max: rand(90, 160),
    });
  }
  if (!animating) { animating = true; requestAnimationFrame(drawConfetti); }
}

function rain(count = 160) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => burst(rand(0, innerWidth), -10, 1, 0.3), i * 12);
  }
}

function drawHeart(s) {
  ctx.beginPath();
  ctx.moveTo(0, s / 4);
  ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s / 4);
  ctx.bezierCurveTo(-s / 2, s / 2, 0, s * 0.7, 0, s * 0.85);
  ctx.bezierCurveTo(0, s * 0.7, s / 2, s / 2, s / 2, s / 4);
  ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, s / 4);
  ctx.fill();
}

function drawConfetti() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles = particles.filter((p) => p.life < p.max && p.y < innerHeight + 40);
  for (const p of particles) {
    p.life++;
    p.vx *= 0.985;
    p.vy = p.vy * 0.985 + 0.22;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rot * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, 1 - p.life / p.max);
    ctx.fillStyle = p.color;
    if (p.shape === "rect") ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    else if (p.shape === "circle") { ctx.beginPath(); ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2); ctx.fill(); }
    else drawHeart(p.size * 1.3);
    ctx.restore();
  }
  if (particles.length) requestAnimationFrame(drawConfetti);
  else { animating = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

function fireworks(times = 5) {
  for (let i = 0; i < times; i++) {
    setTimeout(() => burst(rand(innerWidth * 0.15, innerWidth * 0.85), rand(innerHeight * 0.15, innerHeight * 0.5), 90), i * 350);
  }
}

/* ---------- Floating hearts & balloons ---------- */
const floaters = $("#floaters");
const EMOJI = ["💖", "💕", "✨", "🎈", "💗", "🏳️‍🌈", "🎉", "💞", "🌈"];

function spawnFloater() {
  const el = document.createElement("span");
  el.className = "floater";
  el.textContent = pick(EMOJI);
  el.style.left = rand(0, 100) + "vw";
  el.style.fontSize = rand(16, 34) + "px";
  const dur = rand(9, 16);
  el.style.animationDuration = dur + "s";
  floaters.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}

function spawnBalloon() {
  const el = document.createElement("span");
  el.className = "balloon";
  const c = pick(COLORS);
  el.style.background = c;
  el.style.setProperty("--c", c);
  el.style.left = rand(2, 92) + "vw";
  const scale = rand(0.7, 1.2);
  el.style.width = 54 * scale + "px";
  el.style.height = 68 * scale + "px";
  const dur = rand(8, 14);
  el.style.animationDuration = dur + "s";
  el.innerHTML = '<span class="shine"></span>';
  floaters.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}

function releaseBalloons(n = 14) {
  for (let i = 0; i < n; i++) setTimeout(spawnBalloon, i * 180);
}

/* ---------- Sparkle trail on cursor / touch ---------- */
let lastSparkle = 0;
function sparkle(x, y) {
  const now = performance.now();
  if (now - lastSparkle < 45) return;
  lastSparkle = now;
  const s = document.createElement("span");
  s.className = "sparkle";
  s.textContent = pick(["✦", "✧", "❤", "✨"]);
  s.style.left = x + "px";
  s.style.top = y + "px";
  s.style.color = pick(COLORS);
  s.style.setProperty("--dx", rand(-30, 30) + "px");
  s.style.setProperty("--dy", rand(10, 40) + "px");
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 900);
}

/* ---------- Cake & candles ---------- */
function buildCandles() {
  const wrap = $("#candles");
  wrap.innerHTML = "";
  for (let i = 0; i < CONFIG.candles; i++) {
    const c = document.createElement("div");
    c.className = "candle";
    c.title = "Blow me out!";
    c.innerHTML = '<span class="flame"></span>';
    c.addEventListener("click", () => blowOut(c));
    wrap.appendChild(c);
  }
  $("#wishMsg").textContent = "🕯️ Make a wish…";
  $("#relight").classList.remove("show");
}

function blowOut(candle) {
  if (candle.classList.contains("out")) return;
  candle.classList.add("out");
  const smoke = document.createElement("span");
  smoke.className = "smoke";
  candle.appendChild(smoke);
  setTimeout(() => smoke.remove(), 1400);

  const left = document.querySelectorAll(".candle:not(.out)").length;
  const msg = $("#wishMsg");
  if (left > 0) {
    msg.textContent = `${left} more to go! 💨`;
  } else {
    msg.textContent = "Your wish is on its way! 🌟";
    const r = $("#cakeEl").getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 3, 200);
    fireworks(4);
    releaseBalloons(10);
    $("#relight").classList.add("show");
  }
}

/* ---------- Lightbox ---------- */
let lbIndex = 0;
function openLightbox(i) {
  lbIndex = i;
  showLb();
  $("#lightbox").classList.add("open");
  $("#lightbox").setAttribute("aria-hidden", "false");
}
function showLb() {
  const item = CONFIG.gallery[lbIndex];
  const img = $("#lbImg");
  img.src = item.src;
  img.alt = item.caption || "";
  $("#lbCap").textContent = item.caption || "";
}
function closeLightbox() {
  $("#lightbox").classList.remove("open");
  $("#lightbox").setAttribute("aria-hidden", "true");
}
function stepLb(dir) {
  lbIndex = (lbIndex + dir + CONFIG.gallery.length) % CONFIG.gallery.length;
  showLb();
}

/* ---------- Music ---------- */
function setupMusic() {
  if (!CONFIG.music) return;
  const audio = $("#bgm");
  const btn = $("#musicBtn");
  audio.src = CONFIG.music;
  // Only show the button if the file actually exists
  fetch(CONFIG.music, { method: "HEAD" })
    .then((r) => { if (r.ok) btn.hidden = false; })
    .catch(() => {});
  btn.addEventListener("click", () => {
    if (audio.paused) audio.play().then(() => btn.classList.add("playing")).catch(() => {});
    else { audio.pause(); btn.classList.remove("playing"); }
  });
}
function tryStartMusic() {
  const audio = $("#bgm");
  const btn = $("#musicBtn");
  if (!btn.hidden && audio.paused) audio.play().then(() => btn.classList.add("playing")).catch(() => {});
}

/* ---------- Scroll reveal, active nav, hide-on-scroll ---------- */
function setupScroll() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  const links = [...document.querySelectorAll(".nav a")];
  const sectionIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("header[id], section[id]").forEach((s) => sectionIO.observe(s));

  let lastY = scrollY;
  addEventListener("scroll", () => {
    const y = scrollY;
    $("#nav").classList.toggle("hide", y > lastY && y > 300);
    lastY = y;
  }, { passive: true });
}

/* ---------- Init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderContent();
  typewriter();
  updateCounters();
  setInterval(updateCounters, 1000);
  buildCandles();
  setupMusic();
  setupScroll();
  resizeCanvas();
  addEventListener("resize", resizeCanvas);

  // Ambient floaters
  if (!reduceMotion) {
    setInterval(spawnFloater, 900);
    setInterval(spawnBalloon, 4000);
    addEventListener("mousemove", (e) => sparkle(e.clientX, e.clientY));
    addEventListener("touchmove", (e) => sparkle(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  }

  // Welcome burst
  setTimeout(() => { rain(140); releaseBalloons(8); }, 600);

  $("#celebrate").addEventListener("click", (e) => {
    burst(e.clientX, e.clientY, 180);
    fireworks(6);
    releaseBalloons(16);
    tryStartMusic();
  });

  $("#relight").addEventListener("click", buildCandles);
  $("#envelope").addEventListener("click", function () {
    if (!this.classList.contains("open")) {
      this.classList.add("open");
      const r = this.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top, 120);
    }
  });

  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => stepLb(-1));
  $("#lbNext").addEventListener("click", () => stepLb(1));
  $("#lightbox").addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
  addEventListener("keydown", (e) => {
    if (!$("#lightbox").classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLb(-1);
    if (e.key === "ArrowRight") stepLb(1);
  });

  // Double-click / double-tap anywhere for a heart burst
  addEventListener("dblclick", (e) => burst(e.clientX, e.clientY, 60));
});
