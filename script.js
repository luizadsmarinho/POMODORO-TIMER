let workTime = 25 * 60;
let breakT = 5 * 60;
let timeLeft = workTime;
let isWorking = true;
let interval = null;

/* TIMER */
function updateTimer() {
  let m = Math.floor(timeLeft / 60);
  let s = timeLeft % 60;

  document.getElementById("timer").innerText =
    String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");

  document.getElementById("status").innerText =
    isWorking ? "Foco" : "Descanso";
}

function getTimes() {
  workTime = document.getElementById("focusTime").value * 60;
  breakT = document.getElementById("breakTime").value * 60;
}

/* AUDIO */
function playRain() {
  let a = document.getElementById("rainSound");
  a.volume = 0.25;
  a.play().catch(() => {});
  startRainEffect();
}

function playBirds() {
  let a = document.getElementById("birdsSound");
  a.volume = 0.35;
  a.play().catch(() => {});
}

function stopAll() {
  let r = document.getElementById("rainSound");
  let b = document.getElementById("birdsSound");

  r.pause();
  r.currentTime = 0;

  b.pause();
  b.currentTime = 0;

  stopRainEffect();
}

/* VIDEOS */
function showRain() {
  document.getElementById("rainVideo").style.display = "block";
  document.getElementById("birdVideo").style.display = "none";
}

function showBird() {
  document.getElementById("rainVideo").style.display = "none";
  document.getElementById("birdVideo").style.display = "block";
}

/* CHUVA VISUAL */
function startRainEffect() {
  const r = document.querySelector(".rain");
  r.style.display = "block";
  setTimeout(() => r.style.opacity = "1", 10);

  document.querySelectorAll(".drop").forEach(d => {
    d.style.animationPlayState = "running";
  });
}

function stopRainEffect() {
  const r = document.querySelector(".rain");
  r.style.opacity = "0";

  document.querySelectorAll(".drop").forEach(d => {
    d.style.animationPlayState = "paused";
  });

  setTimeout(() => r.style.display = "none", 500);
}

/* INICIAR */
function start() {
  if (interval) return;

  getTimes();

  if (timeLeft <= 0 || timeLeft > workTime) {
    timeLeft = isWorking ? workTime : breakT;
  }

  if (isWorking) {
    showRain();
    playRain();
  } else {
    showBird();
    stopAll();
    playBirds();
  }

  interval = setInterval(() => {
    timeLeft--;

    if (timeLeft < 0) {
      isWorking = !isWorking;
      timeLeft = isWorking ? workTime : breakT;

      stopAll();

      if (isWorking) {
        showRain();
        playRain();
      } else {
        showBird();
        playBirds();
      }
    }

    updateTimer();
  }, 1000);
}

/* PAUSAR */
function pause() {
  clearInterval(interval);
  interval = null;
  stopAll();
}

/* REINICIAR */
function reset() {
  pause();
  isWorking = true;
  getTimes();
  timeLeft = workTime;
  updateTimer();
}

/* INIT */
updateTimer();

/* RAIN GENERATION */
const rainArea = document.querySelector(".rain");

for (let i = 0; i < 80; i++) {
  let d = document.createElement("div");
  d.className = "drop";

  d.style.left = Math.random() * 100 + "vw";
  d.style.animationDuration = (0.5 + Math.random()) + "s";
  d.style.opacity = Math.random();

  rainArea.appendChild(d);
}

stopRainEffect();