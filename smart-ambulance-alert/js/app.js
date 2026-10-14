const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

// Mobile menu
$("#mobileMenu").addEventListener("click", () => {
  const nav = $(".navbar nav");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  nav.style.position = "absolute";
  nav.style.top = "76px";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.padding = "20px";
  nav.style.background = "#07111f";
  nav.style.flexDirection = "column";
});

// Login modal
const modal = $("#loginModal");
$$("[data-open-login]").forEach(btn => btn.addEventListener("click", () => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}));
$("#closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
$("#loginBtn").addEventListener("click", () => {
  const email = $("#email").value.trim();
  if (!email) return toast("Please enter your email.");
  closeModal();
  toast("Prototype login successful — welcome to SAAS Control.");
});

// Dashboard demo
let running = false;
let timer = null;
let seconds = 272;

function setSignal(index, active) {
  const signal = $(`#sig${index}`);
  const row = $("#signalList").children[index - 1];
  signal.classList.toggle("active", active);
  row.classList.toggle("active", active);
  row.querySelector("strong").textContent = active ? "ALERT" : "STANDBY";
}

function log(message) {
  const box = $("#activityLog");
  const p = document.createElement("p");
  p.innerHTML = `<span>●</span> ${message}`;
  box.prepend(p);
  while (box.children.length > 4) box.removeChild(box.lastChild);
  $("#activityTime").textContent = new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
}

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function runDemo() {
  if (running) return;
  running = true;
  seconds = 272;
  $("#startDemo").textContent = "Ambulance en route…";
  $("#systemStatus").textContent = "EMERGENCY ACTIVE";
  $("#systemStatus").style.color = "#ffb800";
  log("Ambulance #102 started. AI route analysis initiated.");

  let step = 0;
  const positions = [
    ["10%", "55%"], ["27%", "52%"], ["43%", "48%"], ["59%", "44%"], ["74%", "40%"], ["82%", "36%"]
  ];

  timer = setInterval(() => {
    step++;
    const pos = positions[Math.min(step, positions.length - 1)];
    $("#mapAmb").style.left = pos[0];
    $("#mapAmb").style.top = pos[1];
    seconds = Math.max(0, seconds - 4);
    $("#mEta").textContent = formatTime(seconds);

    if (step === 1) { setSignal(1, true); log("Signal #001 activated — drivers warned in advance."); }
    if (step === 2) { setSignal(2, true); log("Signal #002 activated — emergency corridor extended."); }
    if (step === 3) { setSignal(3, true); log("Signal #003 activated — ambulance approaching."); }
    if (step === 4) { setSignal(1, false); log("Signal #001 returned to standby."); }
    if (step === 5) {
      setSignal(4, true);
      log("Signal #004 activated — final approach warning.");
      $("#mAlerts").textContent = "3";
    }
    if (step >= 6) {
      clearInterval(timer);
      running = false;
      $("#startDemo").textContent = "Start ambulance";
      $("#systemStatus").textContent = "ROUTE COMPLETED";
      $("#systemStatus").style.color = "#30d158";
      ["1","2","3","4"].forEach(i => setSignal(i, false));
      $("#mAlerts").textContent = "0";
      $("#mCoverage").textContent = "0 m";
      log("Ambulance #102 reached the hospital. Route released.");
      toast("Demo completed successfully.");
    }
  }, 1500);
}

$("#startDemo").addEventListener("click", runDemo);

$$(".side-link").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".side-link").forEach(x => x.classList.remove("active"));
    btn.classList.add("active");
    toast(`${btn.textContent.trim()} module selected (prototype).`);
  });
});
