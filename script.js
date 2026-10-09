const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".desktop-nav");

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");
    const category = filter.dataset.filter;
    projects.forEach((project) => {
      project.classList.toggle("hidden", category !== "all" && project.dataset.category !== category);
    });
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("mobile-open", !isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("mobile-open");
  });
});

const lifePhotos = [
 { file: "image0.JPG", title: "gator gym meet with roomie", alt: "Viannee at a Gator gym meet with her roomie" },
 { file: "image1.JPG", title: "Code4Change Hackathon", alt: "Viannee working with her team" },
  { file: "image2.jpg", title: "first football game", alt: "Viannee working on a hardware project" },
  { file: "image3.JPG", title: "late night hacking", alt: "Viannee at a professional conference" },
  { file: "image4.JPG", title: "the birth of an RC car", alt: "Viannee collaborating with other students" },
  { file: "image5.jpg", title: "GO GATORS! 🐊", alt: "Viannee working on an engineering project" },
  { file: "image6.JPG", title: "stadium pics", alt: "Viannee enjoying time with friends and teammates" },
  { file: "image7.jpeg", title: "web app team", alt: "Viannee on the University of Florida campus" },
  { file: "image8.jpg", title: "WiNGHacks!", alt: "A recent snapshot from Viannee's life" },
  { file: "image9.JPG", title: "the people behind FRITA 🏎️", alt: "A recent snapshot from Viannee's life" },
  { file: "image10.jpg", title: "late night studying with friends", alt: "Viannee spending time with friends and teammates" }
];
const lifeImage = document.querySelector(".life-feature-image");
const lifeTitle = document.querySelector(".life-title");
const lifeCount = document.querySelector(".life-count");
const pauseButton = document.querySelector(".carousel-pause");
let currentLifePhoto = 0;
let slideshowTimer;
let isSlideshowPaused = false;

function showLifePhoto(index) {
  currentLifePhoto = (index + lifePhotos.length) % lifePhotos.length;
  const photo = lifePhotos[currentLifePhoto];
  lifeImage.src = `assets/${photo.file}`;
  lifeImage.alt = photo.alt;
  lifeTitle.textContent = photo.title;
  lifeCount.textContent = `${String(currentLifePhoto + 1).padStart(4, "0")} / ${String(lifePhotos.length).padStart(4, "0")}`;
}

function startSlideshow() {
  clearInterval(slideshowTimer);
  slideshowTimer = setInterval(() => showLifePhoto(currentLifePhoto + 1), 5000);
}

document.querySelector(".carousel-prev").addEventListener("click", () => showLifePhoto(currentLifePhoto - 1));
document.querySelector(".carousel-next").addEventListener("click", () => showLifePhoto(currentLifePhoto + 1));
pauseButton.addEventListener("click", () => {
  isSlideshowPaused = !isSlideshowPaused;
  pauseButton.textContent = isSlideshowPaused ? "▶ play" : "Ⅱ pause";
  pauseButton.setAttribute("aria-label", isSlideshowPaused ? "Play slideshow" : "Pause slideshow");
  if (isSlideshowPaused) clearInterval(slideshowTimer);
  else startSlideshow();
});

showLifePhoto(0);
startSlideshow();

const gameModal = document.querySelector(".game-modal");
const gameLaunch = document.querySelector(".game-launch");
const gameClose = document.querySelector(".game-close");
const gameCanvas = document.querySelector(".game-canvas");
const gameScore = document.querySelector(".game-score");
const gameBest = document.querySelector(".game-best");
const gameContext = gameCanvas.getContext("2d");
const playerImage = new Image();
playerImage.src = "assets/animatedV.png";
let gameFrame;
let gameRunning = false;
let gameOver = false;
let gameScoreValue = 0;
let gameBestValue = Number(localStorage.getItem("viannee-run-best") || 0);
let gamePlayer;
let gameObstacles;
let gameGaps;
let gameStars;
let gameLastTime;
let gameObstacleDistance;
const GAME_SPEED = 4;

function updateGameHud() {
  gameScore.textContent = String(gameScoreValue).padStart(4, "0");
  gameBest.textContent = String(gameBestValue).padStart(4, "0");
}

function resetGame() {
  gameScoreValue = 0;
  gameLastTime = 0;
  gameOver = false;
  gamePlayer = { x: 74, y: 198, width: 68, height: 68, velocity: 0, grounded: true };
  gameObstacles = [];
  gameGaps = [];
  gameStars = [];
  gameObstacleDistance = 150;
  updateGameHud();
}

function drawGame() {
  const width = gameCanvas.width;
  const height = gameCanvas.height;
  gameContext.clearRect(0, 0, width, height);
  gameContext.fillStyle = "#d9cafa";
  gameContext.fillRect(0, 0, width, height);
  gameContext.fillStyle = "rgba(255,255,255,.55)";
  gameContext.fillRect(70, 52, 110, 12);
  gameContext.fillRect(530, 86, 145, 12);
  gameContext.fillStyle = "#f3a8d2";
  gameGaps.forEach((gap) => {
    gameContext.fillRect(gap.x, 266, gap.width, 34);
  });
  let groundStart = 0;
  gameContext.fillStyle = "#f3a8d2";
  gameGaps.forEach((gap) => {
    gameContext.fillRect(groundStart, 266, gap.x - groundStart, 34);
    groundStart = gap.x + gap.width;
  });
  gameContext.fillRect(groundStart, 266, width - groundStart, 34);
  gameContext.fillStyle = "#d9cafa";
  gameGaps.forEach((gap) => {
    gameContext.fillRect(gap.x, 266, gap.width, 34);
    gameContext.fillStyle = "#d9cafa";
    gameContext.fillRect(gap.x, 266, gap.width, 5);
    gameContext.fillStyle = "#c66eae";
  });
  if (playerImage.complete && playerImage.naturalWidth > 0) {
    gameContext.drawImage(playerImage, gamePlayer.x, gamePlayer.y, gamePlayer.width, gamePlayer.height);
  } else {
    gameContext.fillStyle = "#29152b";
    gameContext.fillRect(gamePlayer.x, gamePlayer.y, gamePlayer.width, gamePlayer.height);
    gameContext.fillStyle = "#f3a8d2";
    gameContext.fillRect(gamePlayer.x + 7, gamePlayer.y + 7, 5, 5);
  }
  gameContext.fillStyle = "#c66eae";
  gameObstacles.forEach((obstacle) => {
    gameContext.beginPath();
    gameContext.moveTo(obstacle.x, obstacle.y + obstacle.height);
    gameContext.lineTo(obstacle.x + obstacle.width / 2, obstacle.y);
    gameContext.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height);
    gameContext.closePath();
    gameContext.fill();
  });
  gameContext.fillStyle = "#b58bff";
  gameContext.font = "28px monospace";
  gameStars.forEach((star) => {
    gameContext.fillText("★", star.x, star.y);
  });
  if (gameOver) {
    gameContext.fillStyle = "rgba(16,13,24,.72)";
    gameContext.fillRect(0, 0, width, height);
    gameContext.fillStyle = "#f8efff";
    gameContext.font = "bold 22px monospace";
    gameContext.fillText("oops! segmentation fault ♡", 190, 128);
    gameContext.font = "14px monospace";
    gameContext.fillText("press SPACE to restart", 270, 160);
  }
}

function endGame() {
  gameOver = true;
  gameRunning = false;
  if (gameScoreValue > gameBestValue) {
    gameBestValue = gameScoreValue;
    localStorage.setItem("viannee-run-best", String(gameBestValue));
  }
  updateGameHud();
  drawGame();
}

function gameLoop(timestamp) {
  if (!gameRunning) return;
  const elapsed = Math.min((timestamp - gameLastTime) / 16.67, 1.5);
  gameLastTime = timestamp;
  gamePlayer.velocity += 0.55 * elapsed;
  gamePlayer.y += gamePlayer.velocity * elapsed;
  if (gamePlayer.y >= 198) {
    gamePlayer.y = 198;
    gamePlayer.velocity = 0;
    gamePlayer.grounded = true;
  }
  gameObstacleDistance -= GAME_SPEED * elapsed;
  if (gameObstacleDistance <= 0) {
    if (Math.random() < 0.28) {
      gameGaps.push({ x: gameCanvas.width + 10, width: 30 + Math.random() * 18 });
    } else {
      gameObstacles.push({ x: gameCanvas.width + 10, y: 246, width: 22, height: 20 });
    }
    gameObstacleDistance = 150 + Math.random() * 210;
  }
  if (Math.random() < 0.008 * elapsed) gameStars.push({ x: gameCanvas.width + 10, y: 190 + Math.random() * 35 });
  gameObstacles.forEach((obstacle) => { obstacle.x -= GAME_SPEED * elapsed; });
  gameGaps.forEach((gap) => { gap.x -= GAME_SPEED * elapsed; });
  gameStars.forEach((star) => { star.x -= GAME_SPEED * elapsed; });
  gameObstacles = gameObstacles.filter((obstacle) => obstacle.x > -30);
  gameGaps = gameGaps.filter((gap) => gap.x + gap.width > -30);
  gameStars = gameStars.filter((star) => star.x > -30);
  gameObstacles.forEach((obstacle) => {
    if (gamePlayer.x < obstacle.x + obstacle.width && gamePlayer.x + gamePlayer.width > obstacle.x && gamePlayer.y < obstacle.y + obstacle.height && gamePlayer.y + gamePlayer.height > obstacle.y) endGame();
  });
  if (gamePlayer.grounded && gameGaps.some((gap) => gamePlayer.x + gamePlayer.width > gap.x && gamePlayer.x < gap.x + gap.width)) endGame();
  gameStars = gameStars.filter((star) => {
    const collected = gamePlayer.x < star.x + 24 && gamePlayer.x + gamePlayer.width > star.x && gamePlayer.y < star.y && gamePlayer.y + gamePlayer.height > star.y - 24;
    if (collected) gameScoreValue += 25;
    return !collected;
  });
  gameScoreValue += 1;
  updateGameHud();
  drawGame();
  gameFrame = requestAnimationFrame(gameLoop);
}

function startGame() {
  resetGame();
  gameRunning = true;
  gameModal.hidden = false;
  gameLastTime = performance.now();
  gameFrame = requestAnimationFrame(gameLoop);
}

resetGame();
drawGame();
gameLaunch.addEventListener("click", startGame);
gameClose.addEventListener("click", () => {
  gameRunning = false;
  cancelAnimationFrame(gameFrame);
  gameModal.hidden = true;
});
gameModal.addEventListener("click", (event) => {
  if (event.target === gameModal) gameClose.click();
});
function jumpOrRestart() {
  if (gameModal.hidden) return;
  if (gameOver) return startGame();
  if (gamePlayer.grounded) {
    gamePlayer.velocity = -11;
    gamePlayer.grounded = false;
  }
}
document.addEventListener("keydown", (event) => {
  if (event.code !== "Space") return;
  event.preventDefault();
  jumpOrRestart();
});
gameCanvas.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  jumpOrRestart();
});
