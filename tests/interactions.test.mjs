import { test } from "node:test";
import assert from "node:assert/strict";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { JSDOM } from "jsdom";
import { Shell } from "../components/portfolio/shell.tsx";
import { Home } from "../components/portfolio/home.tsx";

async function mount({
  lang = "en",
  reduced = false,
  userOff = false,
  light = false,
  native = false,
} = {}) {
  const dom = new JSDOM(
    '<!doctype html><html data-theme="' +
      (light ? "light" : "dark") +
      '"><head><meta name="theme-color"></head><body><div id="root"></div></body></html>',
    {
      url: "https://guidonunes.github.io" + (lang === "pt" ? "/pt/" : "/"),
      pretendToBeVisual: true,
    },
  );
  const win = dom.window;
  for (const key of [
    "window",
    "document",
    "navigator",
    "HTMLElement",
    "HTMLDialogElement",
    "localStorage",
    "history",
    "location",
    "AbortController",
    "Event",
    "MouseEvent",
    "StorageEvent",
  ])
    Object.defineProperty(globalThis, key, {
      value: key === "window" ? win : win[key],
      configurable: true,
      writable: true,
    });
  Object.assign(globalThis, {
    IS_REACT_ACT_ENVIRONMENT: true,
    innerHeight: 900,
    innerWidth: 1440,
    scrollY: 0,
    addEventListener: win.addEventListener.bind(win),
    removeEventListener: win.removeEventListener.bind(win),
  });
  let frames = new Map(),
    id = 0,
    clipboard = "",
    transitions = 0,
    draws = 0;
  const media = {
    matches: reduced,
    listeners: new Set(),
    addEventListener(_, fn) {
      this.listeners.add(fn);
    },
    removeEventListener(_, fn) {
      this.listeners.delete(fn);
    },
  };
  win.matchMedia = () => media;
  globalThis.matchMedia = win.matchMedia;
  win.requestAnimationFrame = (fn) => {
    frames.set(++id, fn);
    return id;
  };
  win.cancelAnimationFrame = (id) => frames.delete(id);
  globalThis.requestAnimationFrame = win.requestAnimationFrame;
  globalThis.cancelAnimationFrame = win.cancelAnimationFrame;
  win.scrollTo = () => {};
  win.HTMLDialogElement.prototype.showModal = function () {
    this.open = true;
  };
  win.HTMLDialogElement.prototype.close = function () {
    this.open = false;
  };
  const drawing = new Proxy(
    {
      createRadialGradient() {
        return { addColorStop() {} };
      },
    },
    {
      get(target, key) {
        return (
          target[key] ||
          (() => {
            draws++;
          })
        );
      },
      set(target, key, value) {
        target[key] = value;
        return true;
      },
    },
  );
  win.HTMLCanvasElement.prototype.getContext = () => drawing;
  win.HTMLElement.prototype.animate = function () {
    let end;
    const result = {
      finished: new Promise((resolve) => {
        end = resolve;
      }),
      cancel() {
        end();
      },
      effect: { target: this },
    };
    queueMicrotask(end);
    return result;
  };
  if (native)
    win.document.startViewTransition = (commit) => {
      transitions++;
      commit();
      return {
        ready: Promise.resolve(),
        finished: Promise.resolve(),
        skipTransition() {},
      };
    };
  Object.defineProperty(win.navigator, "clipboard", {
    value: {
      writeText: async (value) => {
        clipboard = value;
      },
    },
  });
  if (userOff) localStorage.setItem("portfolio-motion", "off");
  if (light) localStorage.setItem("portfolio-theme-v2", "light");
  const root = createRoot(document.getElementById("root"));
  await act(async () => {
    root.render(
      React.createElement(
        React.StrictMode,
        null,
        React.createElement(
          Shell,
          { lang },
          React.createElement(Home, { lang }),
        ),
      ),
    );
  });
  const click = async (selector) => {
    const node =
      typeof selector === "string"
        ? document.querySelector(selector)
        : selector;
    assert(node, `missing ${selector}`);
    await act(async () =>
      node.dispatchEvent(
        new win.MouseEvent("click", { bubbles: true, button: 0 }),
      ),
    );
    return node;
  };
  return {
    click,
    media,
    get clipboard() {
      return clipboard;
    },
    get transitions() {
      return transitions;
    },
    get draws() {
      return draws;
    },
    get frames() {
      return frames.size;
    },
    async unmount() {
      await act(async () => root.unmount());
      assert.equal(frames.size, 0, "animation frames must be cleaned up");
      assert.equal(
        media.listeners.size,
        0,
        "media listener must be cleaned up",
      );
      dom.window.close();
    },
  };
}

for (const lang of ["en", "pt"])
  test(`${lang}: filters, four dialogs, Escape, copy links, focus, navigation and motion cleanup`, async () => {
    const app = await mount({ lang, native: true });
    assert(app.draws > 1000);
    await app.click('[data-filter="backend"]');
    assert.equal(document.querySelectorAll(".project:not([hidden])").length, 2);
    await app.click('[data-filter="all"]');
    assert.equal(document.querySelectorAll(".project:not([hidden])").length, 4);
    for (const key of ["p1grid", "carbon", "aguia", "dca"]) {
      const trigger = await app.click(`[data-project="${key}"]`);
      const dialog = document.querySelector("dialog");
      assert(dialog.open);
      assert(document.body.classList.contains("modal-open"));
      assert.equal(
        dialog.querySelector("a.button").getAttribute("href"),
        `${lang === "pt" ? "/pt" : ""}/projects/${key}/`,
      );
      await app.click("#dialog-share button");
      assert.equal(
        app.clipboard,
        `https://guidonunes.github.io${lang === "pt" ? "/pt" : ""}/projects/${key}/`,
      );
      await act(async () =>
        dialog.dispatchEvent(
          new window.Event("cancel", { bubbles: true, cancelable: true }),
        ),
      );
      assert(!dialog.open);
      assert(!document.body.classList.contains("modal-open"));
      assert.equal(document.activeElement, trigger);
    }
    await app.click('.nav-link[href="#work"]');
    assert.equal(location.hash, "#work");
    assert.equal(app.transitions, 1);
    assert.equal(document.activeElement.id, "work");
    const disclosure = document.querySelectorAll(".expertise details")[1];
    await app.click(disclosure.querySelector("summary"));
    assert(disclosure.open);
    await app.click(disclosure.querySelector("summary"));
    assert(!disclosure.open);
    await app.click("#theme-toggle");
    assert.equal(document.documentElement.dataset.theme, "light");
    assert.equal(localStorage.getItem("portfolio-theme-v2"), "light");
    await app.click("#motion-toggle");
    assert.equal(document.documentElement.dataset.motion, "off");
    assert(document.querySelector("#pause-art").disabled);
    assert.equal(localStorage.getItem("portfolio-motion"), "off");
    await app.click('[data-shape="flow"]');
    assert.equal(
      document
        .querySelector('[data-shape="flow"]')
        .getAttribute("aria-pressed"),
      "true",
    );
    await app.click("#motion-toggle");
    assert(!document.querySelector("#pause-art").disabled);
    await act(async () => {
      app.media.matches = true;
      app.media.listeners.forEach((fn) => fn());
    });
    assert(document.querySelector("#motion-toggle").disabled);
    assert(document.querySelector("#pause-art").disabled);
    await app.unmount();
  });
test("stored preferences initialize correctly and system reduction cannot be overridden", async () => {
  const app = await mount({ reduced: true, userOff: true, light: true });
  assert.equal(document.documentElement.dataset.theme, "light");
  assert.equal(document.documentElement.dataset.motion, "off");
  assert(document.querySelector("#motion-toggle").disabled);
  await app.click("#motion-toggle");
  assert.equal(document.documentElement.dataset.motion, "off");
  await app.unmount();
});
test("navigation fallback and interrupted disclosure clean up correctly", async () => {
  const app = await mount();
  await app.click('.nav-link[href="#about"]');
  assert.equal(location.hash, "#about");
  assert.equal(app.transitions, 0);
  const summary = document.querySelectorAll(".expertise summary")[2];
  await act(async () => {
    summary.click();
    summary.click();
    summary.click();
  });
  assert(summary.parentElement.open);
  assert.equal(summary.parentElement.style.overflow, "");
  await app.unmount();
});
