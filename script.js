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
