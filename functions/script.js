const isMobile = window.innerWidth <= 768;

// 1. DAKTİLO
const subtitleContainer = document.getElementById("typewriter-text");
const textToType = '"Uzaktaki en sevdiğim dostuma..."';
subtitleContainer.innerHTML = '<span id="tw-text"></span><span id="tw-cursor">|</span>';
const twText = document.getElementById("tw-text"); let typeIndex = 0;
function typeWriter() { if (typeIndex < textToType.length) { twText.textContent += textToType.charAt(typeIndex); typeIndex++; setTimeout(typeWriter, 60); } }
setTimeout(typeWriter, 800);

// 2. GALAKSİ & MESAJLAR
const galaxy = document.getElementById("galaxy");
const starCount = isMobile ? 30 : 80;
for (let i = 0; i < starCount; i++) {
  let star = document.createElement("div"); star.className = "star";
  star.style.left = `${Math.random() * 100}%`; star.style.top = `${Math.random() * 100}%`;
  star.style.animationDuration = `${Math.random() * 2 + 1}s`; star.style.animationDelay = `${Math.random() * 2}s`;
  galaxy.appendChild(star);
}
function createShootingStar() {
  let sStar = document.createElement("div"); sStar.className = "shooting-star";
  sStar.style.left = `${Math.random() * 100}%`; sStar.style.top = `${Math.random() * 40}%`;
  galaxy.appendChild(sStar); setTimeout(() => { sStar.remove(); }, 1500);
  setTimeout(createShootingStar, Math.random() * 4000 + (isMobile ? 4000 : 2000));
}
setTimeout(createShootingStar, 2000);

const messageContainer = document.getElementById("messageContainer");
function createRandomMessage() {
  if (!messageContainer) return;
  const mote = document.createElement("div"); mote.className = "messenger-mote";
  mote.style.left = `${Math.random() * 100}%`; mote.style.top = `${15 + Math.random() * 30}%`;
  mote.style.animationDelay = `${Math.random() * 2}s`; messageContainer.appendChild(mote);
  setTimeout(() => { mote.remove(); }, 5000); setTimeout(createRandomMessage, 3000 + Math.random() * 5000);
}
setTimeout(createRandomMessage, 2000);

// 3. ANİMASYON & SCROLL
const timelineItems = document.querySelectorAll(".timeline-item");
const revealObserver = new IntersectionObserver((entries) => { 
  entries.forEach((entry) => { 
    if (entry.isIntersecting) { 
      entry.target.classList.add("show"); 
    } 
  }); 
}, { 
  threshold: isMobile ? 0.1 : 0.2, 
  rootMargin: isMobile ? "0px 0px -70px 0px" : "0px 0px -50px 0px" 
});
timelineItems.forEach((item) => revealObserver.observe(item));

const timelineCore = document.getElementById("timelineCore"); const timelineProgress = document.getElementById("timelineProgress");
window.addEventListener("scroll", () => {
  const rect = timelineCore.getBoundingClientRect(); const viewportHeight = window.innerHeight;
  let scrollPercentage = (viewportHeight / 1.5 - rect.top) / rect.height;
  if (scrollPercentage < 0) scrollPercentage = 0; if (scrollPercentage > 1) scrollPercentage = 1;
  timelineProgress.style.height = `${scrollPercentage * 100}%`;
});

// 4. TEMA GEÇİŞİ (Koyu -> Açık -> Pembe)
const themes = ['', 'light', 'pink'];
let currentThemeIndex = 0;
const themeBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");

themeBtn.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  const newTheme = themes[currentThemeIndex];
  
  if (newTheme === '') {
    document.body.removeAttribute("data-theme");
    themeIcon.className = "fa-solid fa-sun"; 
  } else if (newTheme === 'light') {
    document.body.setAttribute("data-theme", "light");
    themeIcon.className = "fa-solid fa-heart"; 
  } else if (newTheme === 'pink') {
    document.body.setAttribute("data-theme", "pink");
    themeIcon.className = "fa-solid fa-moon"; 
  }
});
themeIcon.className = "fa-solid fa-sun";

// Müzik Çalar 
const bgMusic = document.getElementById("bgMusic"); 
const musicToggleBtn = document.getElementById("musicToggleBtn"); 
const musicIcon = document.getElementById("musicIcon"); 
const musicText = document.getElementById("musicText"); 
let isPlaying = false;

musicToggleBtn.addEventListener("click", () => { 
  if (isPlaying) { 
    bgMusic.pause(); 
    musicIcon.classList.remove("fa-pause"); 
    musicIcon.classList.add("fa-play"); 
    musicText.innerText = "Bizim Şarkımız"; 
  } else { 
    bgMusic.play(); 
    musicIcon.classList.remove("fa-play"); 
    musicIcon.classList.add("fa-pause"); 
    musicText.innerText = "Çalıyor..."; 
  } 
  isPlaying = !isPlaying; 
});

function updateCounter() {
  const startDate = new Date(2025, 8, 8, 23, 15, 0).getTime(); const diff = new Date().getTime() - startDate;
  if (diff > 0) { document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)); document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0"); document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0"); document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, "0"); }
}
setInterval(updateCounter, 1000); updateCounter();

// ==== 5. ÇİZİLEN KIRMIZI ROTA ÜZERİNDEN HARİTA ANİMASYONU ====

const routeKirmizi = [
  [36.929111, 30.629750], // İbrahim'in Evi
  [36.9100, 30.6200],     
  [36.8800, 30.6100],     
  [36.8880, 30.6350],     
  [36.8920, 30.6600],     
  [36.9020, 30.6900],     
  [36.9050, 30.7100],     
  [36.8850, 30.7300],     
  [36.9100, 30.7550],     
  [36.9400, 30.7850],     
  [36.9430, 30.8200],     
  [36.9380, 30.8500],
  [36.9300, 30.8900],
  [36.9220, 30.9300],
  [36.9180, 30.9700],     
  [36.9120, 31.0200],
  [36.9000, 31.0800],
  [36.8850, 31.1400],
  [36.8650, 31.2000],     
  [36.8500, 31.2500],
  [36.846025, 31.319648]  // Umut'un Evi
];

const centerLat = (routeKirmizi[0][0] + routeKirmizi[routeKirmizi.length-1][0]) / 2;
const centerLng = (routeKirmizi[0][1] + routeKirmizi[routeKirmizi.length-1][1]) / 2;

// HARİTA ETKİLEŞİMLERİ KAPATILDI (Kilitleme işlemi)
const map = L.map('realMap', { 
  zoomControl: false,
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  boxZoom: false,
  keyboard: false,
  tap: false
}).setView([centerLat, centerLng], isMobile ? 9 : 10);
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);

L.circleMarker(routeKirmizi[0], { color: '#dc3545', fillColor: '#dc3545', fillOpacity: 0.9, radius: 8 }).addTo(map).bindTooltip("İbrahim'in Evi", { permanent: !isMobile, direction: 'left', className: 'fw-bold' });
L.circleMarker(routeKirmizi[routeKirmizi.length-1], { color: '#0d6efd', fillColor: '#0d6efd', fillOpacity: 0.9, radius: 8 }).addTo(map).bindTooltip("Umut'un Evi", { permanent: !isMobile, direction: 'right', className: 'fw-bold' });

let totalDist = 0;
let routeData = [];
for(let i=0; i<routeKirmizi.length-1; i++){ totalDist += map.distance(routeKirmizi[i], routeKirmizi[i+1]); }
let currentDist = 0;
routeData.push({ latLng: routeKirmizi[0], pct: 0 });
for(let i=0; i<routeKirmizi.length-1; i++){
   currentDist += map.distance(routeKirmizi[i], routeKirmizi[i+1]);
   routeData.push({ latLng: routeKirmizi[i+1], pct: currentDist / totalDist });
}

function getLatLngAtPct(pct) {
  if(pct <= 0) return routeData[0].latLng;
  if(pct >= 1) return routeData[routeData.length-1].latLng;
  for(let i=0; i<routeData.length-1; i++) {
    if(pct >= routeData[i].pct && pct <= routeData[i+1].pct) {
       let segmentPct = (pct - routeData[i].pct) / (routeData[i+1].pct - routeData[i].pct);
       let lat = routeData[i].latLng[0] + (routeData[i+1].latLng[0] - routeData[i].latLng[0]) * segmentPct;
       let lng = routeData[i].latLng[1] + (routeData[i+1].latLng[1] - routeData[i].latLng[1]) * segmentPct;
       return [lat, lng];
    }
  }
}

const canvas = document.getElementById("animCanvas");
const ctx = canvas.getContext("2d");
function resizeCanvas() { canvas.width = document.getElementById("mapWrapper").clientWidth; canvas.height = document.getElementById("mapWrapper").clientHeight; }
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let phase = "APPROACH"; 
let t = 0;
let particles = [];
let smokeParticles = [];
let voidOpacity = 0;

class Shard {
  constructor(x, y, isSpark) {
    this.x = x; this.y = y;
    this.vx = (Math.random() - 0.5) * (isSpark ? 15 : 10);
    this.vy = (Math.random() - 0.5) * (isSpark ? 15 : 10) - 2; 
    this.life = 1.0; this.decay = Math.random() * 0.02 + 0.01;
    this.isSpark = isSpark;
    this.size = isSpark ? Math.random() * 3 + 1 : Math.random() * 8 + 3;
    this.angle = Math.random() * Math.PI * 2; this.spin = (Math.random() - 0.5) * 0.4;
  }
  update() { this.x += this.vx; this.y += this.vy; this.vy += 0.3; this.vx *= 0.95; this.angle += this.spin; this.life -= this.decay; }
  draw(ctx) {
    ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
    if (this.isSpark) { ctx.fillStyle = `rgba(255, 150, 0, ${this.life})`; ctx.shadowBlur = 10; ctx.shadowColor = "orange"; ctx.beginPath(); ctx.arc(0, 0, this.size, 0, Math.PI*2); ctx.fill();
    } else { ctx.fillStyle = `rgba(212, 175, 55, ${this.life})`; ctx.beginPath(); ctx.moveTo(-this.size, -this.size); ctx.lineTo(this.size, -this.size/2); ctx.lineTo(0, this.size); ctx.closePath(); ctx.fill(); }
    ctx.restore();
  }
}

class Smoke {
  constructor(x, y) {
    this.x = x + (Math.random()-0.5)*10; this.y = y + (Math.random()-0.5)*10;
    this.size = Math.random() * 15 + 10; this.life = 0.6; this.decay = Math.random() * 0.008 + 0.005; this.vy = -Math.random() * 0.3 - 0.1;
  }
  update() { this.y += this.vy; this.life -= this.decay; this.size += 0.1; }
  draw(ctx) { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fillStyle = `rgba(15, 10, 20, ${this.life * 0.5})`; ctx.shadowBlur = 10; ctx.shadowColor = "black"; ctx.fill(); }
}

function drawRouteSegment(ctx, startPct, endPct) {
  let startLL = getLatLngAtPct(startPct);
  let startPt = map.latLngToContainerPoint(startLL);
  ctx.beginPath(); ctx.moveTo(startPt.x, startPt.y);
  for(let i=0; i<routeData.length; i++) {
    if(routeData[i].pct > startPct && routeData[i].pct < endPct) {
       let pt = map.latLngToContainerPoint(routeData[i].latLng);
       ctx.lineTo(pt.x, pt.y);
    }
  }
  let endLL = getLatLngAtPct(endPct);
  let endPt = map.latLngToContainerPoint(endLL);
  ctx.lineTo(endPt.x, endPt.y);
  ctx.stroke();
}

function drawLightningOnRoute(startPct, endPct, offsetAmount) {
  let startLL = getLatLngAtPct(startPct);
  let startPt = map.latLngToContainerPoint(startLL);
  ctx.beginPath(); ctx.moveTo(startPt.x, startPt.y);
  
  let steps = 15; 
  for(let i=1; i<steps; i++) {
     let currentPct = startPct + (endPct - startPct) * (i/steps);
     let ptLL = getLatLngAtPct(currentPct);
     let pt = map.latLngToContainerPoint(ptLL);
     ctx.lineTo(pt.x + (Math.random()-0.5)*offsetAmount, pt.y + (Math.random()-0.5)*offsetAmount);
  }
  let endLL = getLatLngAtPct(endPct);
  let endPt = map.latLngToContainerPoint(endLL);
  ctx.lineTo(endPt.x, endPt.y);
  ctx.stroke();
}

function animateCanvas() {
  requestAnimationFrame(animateCanvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (phase === "APPROACH") {
    t += (isMobile ? 0.004 : 0.003); 

    ctx.shadowBlur = 15; ctx.shadowColor = "#d4af37";
    ctx.lineWidth = isMobile ? 3 : 5; ctx.strokeStyle = "#d4af37";
    
    drawRouteSegment(ctx, 0, t); 
    drawRouteSegment(ctx, 1.0 - t, 1.0); 
    
    if (t >= 0.50) { phase = "TENSION"; t = 0; } 
  
  } else if (phase === "TENSION") {
    t += 0.02; 
    
    ctx.save(); ctx.translate((Math.random()-0.5)*4, (Math.random()-0.5)*4); 

    ctx.shadowBlur = 30; ctx.shadowColor = "white";
    ctx.lineWidth = 6; ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random()*0.5 + 0.5})`;
    drawLightningOnRoute(0, 1.0, 15); 

    ctx.restore();

    if (t >= 1) { 
      phase = "SHATTER"; t = 0; voidOpacity = 0.5; 
      
      let midLL = getLatLngAtPct(0.5);
      let midPt = map.latLngToContainerPoint(midLL);

      for(let i=0; i<60; i++) {
        let spawnX = midPt.x + (Math.random()-0.5)*50; 
        let spawnY = midPt.y + (Math.random()-0.5)*50;
        particles.push(new Shard(spawnX, spawnY, false)); 
        particles.push(new Shard(spawnX, spawnY, true));  
        if(i % 8 === 0) smokeParticles.push(new Smoke(spawnX, spawnY)); 
      }
    }

  } else if (phase === "SHATTER") {
    if (t < 0.2) {
      ctx.shadowBlur = 20; ctx.shadowColor = "#ff4500"; ctx.lineWidth = 3; ctx.strokeStyle = "#ff4500";
      for(let i=0; i<3; i++) drawLightningOnRoute(0, 1.0, 80); 
    }
    t += 0.01;

    for(let i = particles.length - 1; i >= 0; i--) {
      particles[i].update(); particles[i].draw(ctx);
      if(particles[i].life <= 0) particles.splice(i, 1);
    }
    for(let i = smokeParticles.length - 1; i >= 0; i--) {
      smokeParticles[i].update(); smokeParticles[i].draw(ctx);
      if(smokeParticles[i].life <= 0) smokeParticles.splice(i, 1);
    }

    drawVoidScar(voidOpacity);

    if (particles.length === 0 && smokeParticles.length === 0) { phase = "VOID"; }
  
  } else if (phase === "VOID") {
    drawVoidScar(voidOpacity);
    voidOpacity -= 0.003; 
    if (voidOpacity <= 0) { phase = "APPROACH"; t = 0; } 
  }
}

function drawVoidScar(opacity) {
  ctx.save();
  ctx.lineCap = "round";
  ctx.shadowBlur = 15; ctx.shadowColor = "rgba(0,0,0,0.5)";
  ctx.lineWidth = 8; ctx.strokeStyle = `rgba(15, 5, 20, ${opacity})`;
  
  let startPt = map.latLngToContainerPoint(routeData[0].latLng);
  ctx.beginPath(); ctx.moveTo(startPt.x, startPt.y);
  
  for(let i=1; i<100; i++) {
     let ptLL = getLatLngAtPct(i/100);
     let pt = map.latLngToContainerPoint(ptLL);
     ctx.lineTo(pt.x + (Math.sin(i)*2), pt.y + (Math.cos(i)*2));
  }
  ctx.stroke();
  ctx.restore();
}

const mapSection = document.getElementById("mapSection");
let mapStarted = false;
const mapObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !mapStarted) {
      mapStarted = true; map.invalidateSize(); resizeCanvas();
      animateCanvas(); 
    }
  });
}, { threshold: 0.2 });
mapObserver.observe(mapSection);
