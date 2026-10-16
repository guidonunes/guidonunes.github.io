"use client";
import { useEffect, useRef } from "react";
import { translate, type Locale } from "@/lib/portfolio/content";
import { usePreferences } from "./preferences";

export function Sculpture({ lang }: { lang: Locale }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { reduced } = usePreferences();
  const t = (value: string) => translate(lang, value);
  useEffect(() => {
    const panel = panelRef.current!;
    const canvas = panel.querySelector("canvas")!;
    const drawing = canvas.getContext("2d");
    const pauseButton = panel.querySelector<HTMLButtonElement>("#pause-art")!;
    const hint = panel.querySelector<HTMLElement>("#art-hint")!;
    const text = (en: string, pt: string) => (lang === "pt" ? pt : en);
    if (!drawing) {
      hint.textContent = text(
        "Interactive canvas is unavailable in this browser.",
        "A animação interativa não está disponível neste navegador.",
      );
      pauseButton.disabled = true;
      panel
        .querySelectorAll<HTMLButtonElement>("[data-shape]")
        .forEach((button) => {
          button.disabled = true;
        });
      return;
    }
    const context = drawing;
    const controller = new AbortController();
    const { signal } = controller;
    const compact = window.innerWidth <= 900;
    const U = compact ? 40 : 56,
      V = compact ? 18 : 23;
    let width = 500,
      height = 550,
      ratio = 1;
    let time = 0,
      last = 0,
      frame = 0,
      inView = true;
    let paused = reduced;
    const initialShape =
      panel.querySelector<HTMLButtonElement>("[data-shape].selected")?.dataset
        .shape === "flow"
        ? 1
        : 0;
    let shape = initialShape,
      targetShape = initialShape,
      px = 0,
      py = 0,
      targetX = 0,
      targetY = 0;
    let pulse = 0;
    const points = Array.from({ length: U * V }, (_, index) => ({
      u: (Math.floor(index / V) / U) * Math.PI * 2,
      v: ((index % V) / (V - 1)) * Math.PI - Math.PI / 2,
      x: 0,
      y: 0,
      z: 0,
      scale: 1,
    }));
    function syncPause() {
      pauseButton.setAttribute("aria-pressed", String(paused));
      pauseButton.disabled = reduced;
      pauseButton.setAttribute(
        "aria-label",
        reduced
          ? text("Animations are turned off", "Animações desativadas")
          : paused
            ? text("Play animation", "Reproduzir animação")
            : text("Pause animation", "Pausar animação"),
      );
      panel.querySelector<HTMLElement>("#pause-icon")!.textContent = paused
        ? "▷"
        : "Ⅱ";
      hint.textContent = paused
        ? reduced
          ? text(
              "Motion off · choose a shape",
              "Movimento desativado · escolha uma forma",
            )
          : text("Paused · choose a shape", "Em pausa · escolha uma forma")
        : "ontouchstart" in window
          ? text(
              "Tap the sculpture to send a ripple",
              "Toque na escultura para criar uma onda",
            )
          : text("Move your pointer to explore", "Mova o cursor para explorar");
    }
    function resize() {
      const bounds = panel.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      ratio = Math.min(window.devicePixelRatio || 1, compact ? 1.5 : 1.75);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    }
    function draw() {
      context.clearRect(0, 0, width, height);
      const centerX = width * 0.5,
        centerY = height * 0.45;
      const size = Math.min(width * 0.29, height * 0.31);
      const ay = time * 0.15 + px * 0.55;
      const ax = -0.37 + py * 0.4 + Math.sin(time * 0.18) * 0.12;
      const az = -0.29 + Math.sin(time * 0.1) * 0.12;
      const cy = Math.cos(ay),
        sy = Math.sin(ay),
        cx = Math.cos(ax),
        sx = Math.sin(ax),
        cz = Math.cos(az),
        sz = Math.sin(az);
      const glow = context.createRadialGradient(
        centerX,
        centerY,
        size * 0.1,
        centerX,
        centerY,
        size * 1.7,
      );
      glow.addColorStop(0, "rgba(120,176,235,.12)");
      glow.addColorStop(1, "rgba(120,176,235,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      for (const p of points) {
        const wave = Math.sin(p.u * 3 + p.v * 4 + time * 0.55) * 0.027;
        const ripple = pulse * Math.sin(p.v * 9 + time * 5) * 0.055;
        const sphereRadius = 1.08 + wave + ripple;
        const a = sphereRadius * Math.cos(p.v) * Math.cos(p.u);
        const b = sphereRadius * Math.sin(p.v);
        const c = sphereRadius * Math.cos(p.v) * Math.sin(p.u);
        const torusRadius = 0.8 + 0.37 * Math.cos(p.v * 2) + wave + ripple;
        let x = a * (1 - shape) + torusRadius * Math.cos(p.u) * shape;
        let y = b * (1 - shape) + 0.37 * Math.sin(p.v * 2) * shape;
        let z = c * (1 - shape) + torusRadius * Math.sin(p.u) * shape;
        const xx = x * cy + z * sy;
        z = z * cy - x * sy;
        x = xx;
        const yy = y * cx - z * sx;
        z = y * sx + z * cx;
        y = yy;
        const zx = x * cz - y * sz;
        y = x * sz + y * cz;
        x = zx;
        const perspective = 4 / (4 - z);
        p.x = centerX + x * size * perspective;
        p.y = centerY + y * size * perspective;
        p.z = z;
        p.scale = perspective;
      }
      // Latitudes and longitudes form a readable, architectural wire mesh.
      context.lineWidth = 0.55;
      for (let i = 0; i < U; i++) {
        for (let j = 0; j < V; j++) {
          const p = points[i * V + j];
          const q = points[((i + 1) % U) * V + j];
          const alpha = Math.max(0.025, 0.07 + (p.z + 1) * 0.075);
          context.strokeStyle = `rgba(134,192,243,${alpha})`;
          context.beginPath();
          context.moveTo(p.x, p.y);
          context.lineTo(q.x, q.y);
          if (j < V - 1) {
            const n = points[i * V + j + 1];
            context.moveTo(p.x, p.y);
            context.lineTo(n.x, n.y);
          }
          context.stroke();
        }
      }
      // Layer dots back-to-front so the front surface reads clearly.
      const sorted = [...points].sort((a, b) => a.z - b.z);
      for (const p of sorted) {
        const light = Math.max(0.06, 0.2 + (p.z + 1) * 0.31);
        const signal = Math.sin(p.u * 2 - time * 0.9 + p.v * 2) > 0.975;
        const radius = (signal ? 1.65 : 0.9) * p.scale;
        context.fillStyle = signal
          ? `rgba(165,242,222,${light})`
          : `rgba(136,191,243,${light})`;
        context.beginPath();
        context.arc(p.x, p.y, radius, 0, Math.PI * 2);
        context.fill();
      }
      // Two orbiting data points add depth without decorative UI clutter.
      for (let i = 0; i < 2; i++) {
        const angle = time * 0.24 + i * Math.PI + 0.5;
        const x = centerX + Math.cos(angle) * size * 1.42;
        const y = centerY + Math.sin(angle) * size * 0.65;
        context.fillStyle = "#a3ebdb";
        context.beginPath();
        context.arc(x, y, 2, 0, Math.PI * 2);
        context.fill();
        context.strokeStyle = "#8cbcf244";
        context.beginPath();
        context.arc(x, y, 6, 0, Math.PI * 2);
        context.stroke();
      }
    }
    function animate(timestamp: number) {
      frame = 0;
      const delta = last ? Math.min((timestamp - last) / 1000, 0.05) : 1 / 60;
      last = timestamp;
      if (!paused) {
        time += delta;
        px += (targetX - px) * 0.045;
        py += (targetY - py) * 0.045;
        pulse *= 0.97;
      }
      shape += (targetShape - shape) * 0.055;
      draw();
      if (
        inView &&
        !document.hidden &&
        (!paused || Math.abs(targetShape - shape) > 0.001)
      )
        frame = requestAnimationFrame(animate);
    }
    function start() {
      if (!frame && inView && !document.hidden) {
        last = 0;
        frame = requestAnimationFrame(animate);
      }
    }
    panel.addEventListener(
      "pointermove",
      (event) => {
        if (paused || event.pointerType === "touch") return;
        const r = panel.getBoundingClientRect();
        targetX = ((event.clientX - r.left) / width) * 2 - 1;
        targetY = ((event.clientY - r.top) / height) * 2 - 1;
      },
      { passive: true, signal },
    );
    panel.addEventListener(
      "pointerleave",
      () => {
        targetX = 0;
        targetY = 0;
      },
      { signal },
    );
    canvas.addEventListener(
      "pointerdown",
      () => {
        if (!paused) pulse = 2;
      },
      { signal },
    );
    pauseButton.addEventListener(
      "click",
      () => {
        if (reduced) return;
        paused = !paused;
        syncPause();
        start();
      },
      { signal },
    );
    [...panel.querySelectorAll<HTMLButtonElement>("[data-shape]")].forEach(
      (button) =>
        button.addEventListener(
          "click",
          () => {
            targetShape = button.dataset.shape === "flow" ? 1 : 0;
            [
              ...panel.querySelectorAll<HTMLButtonElement>("[data-shape]"),
            ].forEach((item) => {
              item.classList.toggle("selected", item === button);
              item.setAttribute("aria-pressed", String(item === button));
            });
            if (reduced || paused) {
              shape = targetShape;
              draw();
            } else start();
          },
          { signal },
        ),
    );

    document.addEventListener(
      "visibilitychange",
      () => {
        if (document.hidden) {
          cancelAnimationFrame(frame);
          frame = 0;
        } else start();
      },
      { signal },
    );
    const visibility =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              inView = entries[0].isIntersecting;
              if (inView) start();
              else {
                cancelAnimationFrame(frame);
                frame = 0;
              }
            },
            { threshold: 0.05 },
          )
        : null;
    visibility?.observe(panel);
    const sizing =
      "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    sizing?.observe(panel);
    if (!sizing) window.addEventListener("resize", resize, { signal });
    syncPause();
    resize();
    start();
    return () => {
      controller.abort();
      visibility?.disconnect();
      sizing?.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [reduced, lang]);
  return (
    <div className="art-panel" id="art-panel" ref={panelRef}>
      <div className="art-topline">
        <span>
          <i />
          {t("CODE, IN MOTION")}
        </span>
        <span className="art-index">{t("EXPERIMENT / 001")}</span>
      </div>
      <div className="art-grid" aria-hidden="true" />
      <canvas
        id="sculpture"
        role="img"
        aria-label={t(
          "An interactive three-dimensional sculpture of connected blue and mint particles, morphing between an orbit and a flowing torus.",
        )}
      >
        {t("Interactive particle sculpture.")}
      </canvas>
      <span className="art-cross cross-one" aria-hidden="true">
        +
      </span>
      <span className="art-cross cross-two" aria-hidden="true">
        +
      </span>
      <div className="orbit-label" aria-hidden="true">
        <span className="tiny-line" />
        {t("ideas → systems")}
      </div>
      <div className="art-bottom">
        <div>
          <span className="art-caption">
            {t("A little logic. A lot of possibility.")}
          </span>
          <span className="art-hint" id="art-hint">
            {t("Move your pointer to explore")}
          </span>
        </div>
        <button
          className="pause-button"
          id="pause-art"
          aria-label={t("Pause animation")}
          aria-pressed="false"
        >
          <span id="pause-icon">Ⅱ</span>
        </button>
      </div>
      <div className="art-modes" role="group" aria-label={t("Sculpture shape")}>
        <button data-shape="orbit" className="selected" aria-pressed="true">
          {t("01 / Orbit")}
        </button>
        <button data-shape="flow" aria-pressed="false">
          {t("02 / Flow")}
        </button>
      </div>
    </div>
  );
}
