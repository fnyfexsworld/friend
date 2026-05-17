document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth <= 768;

  // ==== MÜZİK ÇALAR ====
  const bgMusic = document.getElementById("bgMusic");
  const musicToggleBtn = document.getElementById("musicToggleBtn");
  const musicIcon = document.getElementById("musicIcon");
  const musicText = document.getElementById("musicText");
  let isPlaying = false;

  if (musicToggleBtn && bgMusic) {
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
  }

  // ==== DAKTİLO EFEKTİ ====
  const subtitleContainer = document.getElementById("typewriter-text");
  if (subtitleContainer) {
    const textToType = '"Uzaktaki en sevdiğim dostuma..."';
    subtitleContainer.innerHTML =
      '<span id="tw-text"></span><span id="tw-cursor">|</span>';
    const twText = document.getElementById("tw-text");
    let typeIndex = 0;
    function typeWriter() {
      if (typeIndex < textToType.length) {
        twText.textContent += textToType.charAt(typeIndex);
        typeIndex++;
        setTimeout(typeWriter, 60);
      }
    }
    setTimeout(typeWriter, 800);
  }

  // ==== ZAMAN SAYACI ====
  function updateCounter() {
    const startDate = new Date(2025, 8, 8, 23, 15, 0).getTime();
    const diff = new Date().getTime() - startDate;
    if (diff > 0) {
      const d = document.getElementById("days");
      const h = document.getElementById("hours");
      const m = document.getElementById("minutes");
      const s = document.getElementById("seconds");
      if (d && h && m && s) {
        d.innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        h.innerText = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        )
          .toString()
          .padStart(2, "0");
        m.innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
          .toString()
          .padStart(2, "0");
        s.innerText = Math.floor((diff % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0");
      }
    }
  }
  setInterval(updateCounter, 1000);
  updateCounter();

  // ==== GALAKSİ & MESAJLAR ====
  const galaxy = document.getElementById("galaxy");
  if (galaxy) {
    const starCount = isMobile ? 30 : 80;
    for (let i = 0; i < starCount; i++) {
      let star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 2 + 1}s`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      galaxy.appendChild(star);
    }
    function createShootingStar() {
      let sStar = document.createElement("div");
      sStar.className = "shooting-star";
      sStar.style.left = `${Math.random() * 100}%`;
      sStar.style.top = `${Math.random() * 40}%`;
      galaxy.appendChild(sStar);
      setTimeout(() => {
        sStar.remove();
      }, 1500);
      setTimeout(
        createShootingStar,
        Math.random() * 4000 + (isMobile ? 4000 : 2000),
      );
    }
    setTimeout(createShootingStar, 2000);
  }

  const messageContainer = document.getElementById("messageContainer");
  function createRandomMessage() {
    if (!messageContainer) return;
    const mote = document.createElement("div");
    mote.className = "messenger-mote";
    mote.style.left = `${Math.random() * 100}%`;
    mote.style.top = `${15 + Math.random() * 30}%`;
    mote.style.animationDelay = `${Math.random() * 2}s`;
    messageContainer.appendChild(mote);
    setTimeout(() => {
      mote.remove();
    }, 5000);
    setTimeout(createRandomMessage, 3000 + Math.random() * 5000);
  }
  setTimeout(createRandomMessage, 2000);

  // ==== ANİMASYON, TİMELİNE & YUKARI/AŞAĞI OK ====
  const timelineItems = document.querySelectorAll(".timeline-item");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: isMobile ? 0.1 : 0.2,
      rootMargin: isMobile ? "0px 0px -70px 0px" : "0px 0px -50px 0px",
    },
  );
  timelineItems.forEach((item) => revealObserver.observe(item));

  const timelineCore = document.getElementById("timelineCore");
  const timelineProgress = document.getElementById("timelineProgress");
  const scrollDownBtn = document.getElementById("scrollDownBtn");
  let isAtBottom = false; // Ok yönünü kontrol edeceğimiz değişken

  window.addEventListener("scroll", () => {
    // Timeline ilerleme barı
    if (timelineCore && timelineProgress) {
      const rect = timelineCore.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      let scrollPercentage = (viewportHeight / 1.5 - rect.top) / rect.height;
      if (scrollPercentage < 0) scrollPercentage = 0;
      if (scrollPercentage > 1) scrollPercentage = 1;
      timelineProgress.style.height = `${scrollPercentage * 100}%`;
    }

    // Scroll okunun yönünü (Aşağı/Yukarı) belirleme
    if (scrollDownBtn) {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 50;
      const icon = scrollDownBtn.querySelector("i");

      if (scrollPosition >= threshold) {
        isAtBottom = true;
        icon.classList.remove("fa-chevron-down");
        icon.classList.add("fa-chevron-up");
      } else {
        isAtBottom = false;
        icon.classList.remove("fa-chevron-up");
        icon.classList.add("fa-chevron-down");
      }
    }
  });

  // Ok butonuna tıklandığında ne olacağı
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", () => {
      if (isAtBottom) {
        // En alttayken tıklanırsa en başa yumuşakça dön
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        // Değilse ekranın %70'i kadar aşağı kaydır
        window.scrollBy({
          top: window.innerHeight * 0.7,
          behavior: "smooth",
        });
      }
    });
  }

  // ==== TEMA GEÇİŞİ ====
  const themes = ["", "light", "pink"];
  let currentThemeIndex = 0;
  const themeBtn = document.getElementById("themeToggleBtn");
  const themeIcon = document.getElementById("themeIcon");

  if (themeBtn && themeIcon) {
    themeBtn.addEventListener("click", () => {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      const newTheme = themes[currentThemeIndex];

      if (newTheme === "") {
        document.body.removeAttribute("data-theme");
        themeIcon.className = "fa-solid fa-sun";
      } else if (newTheme === "light") {
        document.body.setAttribute("data-theme", "light");
        themeIcon.className = "fa-solid fa-heart";
      } else if (newTheme === "pink") {
        document.body.setAttribute("data-theme", "pink");
        themeIcon.className = "fa-solid fa-moon";
      }
    });
    themeIcon.className = "fa-solid fa-sun";
  }

  // ==== HARİTA VE ANİMASYON ====
  const mapElement = document.getElementById("realMap");
  if (mapElement && typeof L !== "undefined") {
    const routeKirmizi = [
      [36.929111, 30.62975],
      [36.91, 30.62],
      [36.88, 30.61],
      [36.888, 30.635],
      [36.892, 30.66],
      [36.902, 30.69],
      [36.905, 30.71],
      [36.885, 30.73],
      [36.91, 30.755],
      [36.94, 30.785],
      [36.943, 30.82],
      [36.938, 30.85],
      [36.93, 30.89],
      [36.922, 30.93],
      [36.918, 30.97],
      [36.912, 31.02],
      [36.9, 31.08],
      [36.885, 31.14],
      [36.865, 31.2],
      [36.85, 31.25],
      [36.846025, 31.319648],
    ];

    const centerLat =
      (routeKirmizi[0][0] + routeKirmizi[routeKirmizi.length - 1][0]) / 2;
    const centerLng =
      (routeKirmizi[0][1] + routeKirmizi[routeKirmizi.length - 1][1]) / 2;

    const map = L.map("realMap", {
      zoomControl: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
    }).setView([centerLat, centerLng], isMobile ? 9 : 10);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      { maxZoom: 19 },
    ).addTo(map);

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) map.tap.disable();

    L.circleMarker(routeKirmizi[0], {
      color: "#dc3545",
      fillColor: "#dc3545",
      fillOpacity: 0.9,
      radius: 8,
    })
      .addTo(map)
      .bindTooltip("İbrahim'in Evi", {
        permanent: !isMobile,
        direction: "left",
        className: "fw-bold",
      });
    L.circleMarker(routeKirmizi[routeKirmizi.length - 1], {
      color: "#0d6efd",
      fillColor: "#0d6efd",
      fillOpacity: 0.9,
      radius: 8,
    })
      .addTo(map)
      .bindTooltip("Umut'un Evi", {
        permanent: !isMobile,
        direction: "right",
        className: "fw-bold",
      });

    let totalDist = 0;
    let routeData = [];
    for (let i = 0; i < routeKirmizi.length - 1; i++) {
      totalDist += map.distance(routeKirmizi[i], routeKirmizi[i + 1]);
    }

    let currentDist = 0;
    routeData.push({ latLng: routeKirmizi[0], pct: 0 });
    for (let i = 0; i < routeKirmizi.length - 1; i++) {
      currentDist += map.distance(routeKirmizi[i], routeKirmizi[i + 1]);
      routeData.push({
        latLng: routeKirmizi[i + 1],
        pct: currentDist / totalDist,
      });
    }

    function getLatLngAtPct(pct) {
      if (pct <= 0) return routeData[0].latLng;
      if (pct >= 1) return routeData[routeData.length - 1].latLng;
      for (let i = 0; i < routeData.length - 1; i++) {
        if (pct >= routeData[i].pct && pct <= routeData[i + 1].pct) {
          let segmentPct =
            (pct - routeData[i].pct) /
            (routeData[i + 1].pct - routeData[i].pct);
          let lat =
            routeData[i].latLng[0] +
            (routeData[i + 1].latLng[0] - routeData[i].latLng[0]) * segmentPct;
          let lng =
            routeData[i].latLng[1] +
            (routeData[i + 1].latLng[1] - routeData[i].latLng[1]) * segmentPct;
          return [lat, lng];
        }
      }
    }

    const canvas = document.getElementById("animCanvas");
    const mapWrapper = document.getElementById("mapWrapper");
    if (canvas && mapWrapper) {
      const ctx = canvas.getContext("2d");
      function resizeCanvas() {
        canvas.width = mapWrapper.clientWidth;
        canvas.height = mapWrapper.clientHeight;
      }
      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();

      let phase = "APPROACH";
      let t = 0;
      let particles = [];
      let smokeParticles = [];
      let voidOpacity = 0;

      class Shard {
        constructor(x, y, isSpark) {
          this.x = x;
          this.y = y;
          this.vx = (Math.random() - 0.5) * (isSpark ? 15 : 10);
          this.vy = (Math.random() - 0.5) * (isSpark ? 15 : 10) - 2;
          this.life = 1.0;
          this.decay = Math.random() * 0.02 + 0.01;
          this.isSpark = isSpark;
          this.size = isSpark ? Math.random() * 3 + 1 : Math.random() * 8 + 3;
          this.angle = Math.random() * Math.PI * 2;
          this.spin = (Math.random() - 0.5) * 0.4;
        }
        update() {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += 0.3;
          this.vx *= 0.95;
          this.angle += this.spin;
          this.life -= this.decay;
        }
        draw(ctx) {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          if (this.isSpark) {
            ctx.fillStyle = `rgba(255, 150, 0, ${this.life})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "orange";
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = `rgba(212, 175, 55, ${this.life})`;
            ctx.beginPath();
            ctx.moveTo(-this.size, -this.size);
            ctx.lineTo(this.size, -this.size / 2);
            ctx.lineTo(0, this.size);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }
      }

      class Smoke {
        constructor(x, y) {
          this.x = x + (Math.random() - 0.5) * 10;
          this.y = y + (Math.random() - 0.5) * 10;
          this.size = Math.random() * 15 + 10;
          this.life = 0.6;
          this.decay = Math.random() * 0.008 + 0.005;
          this.vy = -Math.random() * 0.3 - 0.1;
        }
        update() {
          this.y += this.vy;
          this.life -= this.decay;
          this.size += 0.1;
        }
        draw(ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(15, 10, 20, ${this.life * 0.5})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "black";
          ctx.fill();
        }
      }

      function drawRouteSegment(ctx, startPct, endPct) {
        let startLL = getLatLngAtPct(startPct);
        let startPt = map.latLngToContainerPoint(startLL);
        ctx.beginPath();
        ctx.moveTo(startPt.x, startPt.y);
        for (let i = 0; i < routeData.length; i++) {
          if (routeData[i].pct > startPct && routeData[i].pct < endPct) {
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
        ctx.beginPath();
        ctx.moveTo(startPt.x, startPt.y);

        let steps = 15;
        for (let i = 1; i < steps; i++) {
          let currentPct = startPct + (endPct - startPct) * (i / steps);
          let ptLL = getLatLngAtPct(currentPct);
          let pt = map.latLngToContainerPoint(ptLL);
          ctx.lineTo(
            pt.x + (Math.random() - 0.5) * offsetAmount,
            pt.y + (Math.random() - 0.5) * offsetAmount,
          );
        }
        let endLL = getLatLngAtPct(endPct);
        let endPt = map.latLngToContainerPoint(endLL);
        ctx.lineTo(endPt.x, endPt.y);
        ctx.stroke();
      }

      function drawVoidScar(opacity) {
        ctx.save();
        ctx.lineCap = "round";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.lineWidth = 8;
        ctx.strokeStyle = `rgba(15, 5, 20, ${opacity})`;

        let startPt = map.latLngToContainerPoint(routeData[0].latLng);
        ctx.beginPath();
        ctx.moveTo(startPt.x, startPt.y);

        for (let i = 1; i < 100; i++) {
          let ptLL = getLatLngAtPct(i / 100);
          let pt = map.latLngToContainerPoint(ptLL);
          ctx.lineTo(pt.x + Math.sin(i) * 2, pt.y + Math.cos(i) * 2);
        }
        ctx.stroke();
        ctx.restore();
      }

      function animateCanvas() {
        requestAnimationFrame(animateCanvas);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (phase === "APPROACH") {
          t += isMobile ? 0.004 : 0.003;
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#d4af37";
          ctx.lineWidth = isMobile ? 3 : 5;
          ctx.strokeStyle = "#d4af37";

          drawRouteSegment(ctx, 0, t);
          drawRouteSegment(ctx, 1.0 - t, 1.0);
          if (t >= 0.5) {
            phase = "TENSION";
            t = 0;
          }
        } else if (phase === "TENSION") {
          t += 0.02;
          ctx.save();
          ctx.translate((Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4);
          ctx.shadowBlur = 30;
          ctx.shadowColor = "white";
          ctx.lineWidth = 6;
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
          drawLightningOnRoute(0, 1.0, 15);
          ctx.restore();

          if (t >= 1) {
            phase = "SHATTER";
            t = 0;
            voidOpacity = 0.5;
            let midLL = getLatLngAtPct(0.5);
            let midPt = map.latLngToContainerPoint(midLL);

            for (let i = 0; i < 60; i++) {
              let spawnX = midPt.x + (Math.random() - 0.5) * 50;
              let spawnY = midPt.y + (Math.random() - 0.5) * 50;
              particles.push(new Shard(spawnX, spawnY, false));
              particles.push(new Shard(spawnX, spawnY, true));
              if (i % 8 === 0) smokeParticles.push(new Smoke(spawnX, spawnY));
            }
          }
        } else if (phase === "SHATTER") {
          if (t < 0.2) {
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#ff4500";
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#ff4500";
            for (let i = 0; i < 3; i++) drawLightningOnRoute(0, 1.0, 80);
          }
          t += 0.01;

          for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);
            if (particles[i].life <= 0) particles.splice(i, 1);
          }
          for (let i = smokeParticles.length - 1; i >= 0; i--) {
            smokeParticles[i].update();
            smokeParticles[i].draw(ctx);
            if (smokeParticles[i].life <= 0) smokeParticles.splice(i, 1);
          }
          drawVoidScar(voidOpacity);
          if (particles.length === 0 && smokeParticles.length === 0) {
            phase = "VOID";
          }
        } else if (phase === "VOID") {
          drawVoidScar(voidOpacity);
          voidOpacity -= 0.003;
          if (voidOpacity <= 0) {
            phase = "APPROACH";
            t = 0;
          }
        }
      }

      const mapSection = document.getElementById("mapSection");
      let mapStarted = false;
      const mapObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !mapStarted) {
              mapStarted = true;
              map.invalidateSize();
              resizeCanvas();
              animateCanvas();
            }
          });
        },
        { threshold: 0.2 },
      );
      if (mapSection) mapObserver.observe(mapSection);
    }
  }
});
