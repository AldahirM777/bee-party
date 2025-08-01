// scripts.js
//? programación del título principal
const titleMain = document.getElementById("titleMain");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const triggerHeight = window.innerHeight - 160;
  const fixedOffset = 0;

  if (scrollY >= triggerHeight) {
    titleMain.style.position = "fixed";
    titleMain.style.top = `${fixedOffset}px`;
    titleMain.style.left = "50%";
    titleMain.style.transform = "translateX(-50%)";
    titleMain.style.zIndex = "10";
  } else {
    // Vuelve a la posición normal si subes
    titleMain.style.position = "relative";
    titleMain.style.top = "";
    titleMain.style.left = "";
    titleMain.style.transform = "";
    titleMain.style.zIndex = "";
  }
});

//? programación del botón de la musica
const musicButton = document.getElementById("musicButton");
const musicIcon = document.getElementById("musicIcon");
const audio = document.getElementById("audio");

const playSVG = '<path d="M8 5v14l11-7z"/>';
const pauseSVG = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';

musicButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    musicIcon.innerHTML = pauseSVG;
  } else {
    audio.pause();
    musicIcon.innerHTML = playSVG;
  }
});

//! Pendiente de programar para mejor tiempo de espera de carga
/*
//? Saber si es la primera vez que visita la página y determinar el tiempo de espera
document.addEventListener("DOMContentLoaded", () => {
  const hasVisited = localStorage.getItem("visited") === "true";

  const delay = hasVisited ? 2000 : 10000;
});

//? si es la primera vez que visita la página, mostrar el loader
/*
if (!hasVisited) {
  const loader = document.getElementById("loader");
  loader.style.display = "flex";

  setTimeout(() => {
    loader.style.display = "none";
    localStorage.setItem("visited", "true");
  }, delay);
} else {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.display = "none";
  }, delay);
}
*/

/////////////////////////////////////////////////
//! Provicional
//? Mostrar el loader por 2 segundo

const btnStart = document.getElementById("btnStart");
const loader = document.getElementById("loader");
const delay = 2000;
/////////////////////////////////////////////////

setTimeout(() => {
  loader.style.display = "none";
  btnStart.innerHTML = "Cargar la invitación";
}, delay);

//? programación del botón de la invitación
btnStart.addEventListener("click", () => {
  audio.play();

  const bee1 = document.querySelector("#bee1");
  const bee2 = document.querySelector("#bee2");
  const bee3 = document.querySelector("#bee3");
  const heroTitle = document.querySelector("#HeroTitle");
  const heroTitle2 = document.querySelector("#HeroTitle2");
  const main = document.querySelector("#mainPage");
  const HeroContainerInfo = document.querySelector("#HeroContainerInfo");
  const btnStart = document.querySelector("#btnStart");
  const fireworksCanvas = document.querySelector("#fireworksCanvas");
  const heroPage = document.querySelector("#heroPage");

  // Paso 0: Estado inicial
  bee1.style.display = "none";
  btnStart.style.display = "none";
  bee2.style.display = "block";
  heroTitle.style.display = "none";
  heroTitle2.style.display = "flex";
  HeroContainerInfo.style.transform = "translateY(-150%)";
  fireworksCanvas.style.display = "block";

  // 1) Bee vuela + destello
  setTimeout(() => {
    // tras 3s en lugar de 4s
    bee2.style.display = "none";

    // Hero title hace un “wave” rápido
    heroTitle2.style.animation = "wave 0.8s cubic-bezier(.65,0,.35,1)";
    // Bee3 se desvanece un poco más lento para notarlo
    bee3.style.animation = "desvanecer 1s ease-out";
  }, 3000);

  // 2) Entra el main
  setTimeout(() => {
    // a los 4s en lugar de 5s
    main.style.display = "flex";
    main.style.animation = "showBottonTop 1.8s cubic-bezier(.22,1,.36,1)";
    heroPage.style.display = "none";
  }, 4000);

  // 3) Fade out de los fuegos
  setTimeout(() => {
    // comenzamos a los 6s en lugar de 8s
    fireworksCanvas.style.display = "none";
  }, 8000);
});

const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

function createFirework(x, y) {
  const count = 40; // Controlado para no saturar
  for (let i = 0; i < count; i++) {
    const hue = Math.floor(Math.random() * 360);
    particles.push({
      x,
      y,
      angle: Math.random() * 2 * Math.PI,
      speed: Math.random() * 3 + 1,
      radius: Math.random() * 1.5 + 0.5,
      alpha: 1,
      color: `hsla(${hue}, 100%, 60%, 1)`, // MULTICOLOR desde aquí
    });
  }
}

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.alpha -= 0.01;

    const color = p.color.replace(/[\d\.]+\)$/, `${p.alpha})`); // reemplaza alpha
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();

    if (p.alpha <= 0) particles.splice(i, 1);
  }

  requestAnimationFrame(updateParticles);
}

function launchRandomFirework() {
  if (particles.length < 250) {
    createFirework(
      Math.random() * canvas.width,
      Math.random() * canvas.height * 0.5
    );
  }
}

setInterval(launchRandomFirework, 1500);
updateParticles();
