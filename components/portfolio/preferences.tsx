"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale } from "@/lib/portfolio/content";

type Preferences = {
  dark: boolean;
  reduced: boolean;
  deviceReduced: boolean;
  toggleTheme: () => void;
  toggleMotion: () => void;
  notify: (message: string) => void;
  copy: (value: string, success: string, failure: string) => Promise<void>;
};
const Context = createContext<Preferences | null>(null);
export function usePreferences() {
  const context = useContext(Context);
  if (!context) throw new Error("Preferences provider is missing");
  return context;
}
export function PreferencesProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: Locale;
}) {
  const [ready, setReady] = useState(false);
  const [dark, setDark] = useState(true);
  const [userOff, setUserOff] = useState(false);
  const [deviceReduced, setDeviceReduced] = useState(false);
  const [message, setMessage] = useState("");
  const reduced = !ready || userOff || deviceReduced;
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const syncDevice = () => setDeviceReduced(media.matches);
    syncDevice();
    setDark(document.documentElement.dataset.theme !== "light");
    try {
      setUserOff(localStorage.getItem("portfolio-motion") === "off");
    } catch {}
    setReady(true);
    media.addEventListener("change", syncDevice);
    const syncStorage = (event: StorageEvent) => {
      if (event.key === "portfolio-motion")
        setUserOff(event.newValue === "off");
      if (event.key === "portfolio-theme-v2")
        setDark(event.newValue !== "light");
    };
    window.addEventListener("storage", syncStorage);
    return () => {
      media.removeEventListener("change", syncDevice);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#17191e" : "#f3f5f7");
  }, [dark, ready]);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.motion = reduced ? "off" : "on";
  }, [reduced, ready]);
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(""), 3200);
    return () => clearTimeout(id);
  }, [message]);
  const toggleTheme = () =>
    setDark((value) => {
      try {
        localStorage.setItem("portfolio-theme-v2", value ? "light" : "dark");
      } catch {}
      return !value;
    });
  const toggleMotion = () => {
    if (deviceReduced) return;
    setUserOff((value) => {
      try {
        localStorage.setItem("portfolio-motion", value ? "on" : "off");
      } catch {}
      return !value;
    });
  };
  const copy = async (value: string, success: string, failure: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(success);
    } catch {
      setMessage(failure);
    }
  };
  return (
    <Context.Provider
      value={{
        dark,
        reduced,
        deviceReduced,
        toggleTheme,
        toggleMotion,
        notify: setMessage,
        copy,
      }}
    >
      {children}
      <div
        role="status"
        aria-live="polite"
        className={`toast${message ? " visible" : ""}`}
        lang={lang === "pt" ? "pt-BR" : "en"}
      >
        {message}
      </div>
    </Context.Provider>
  );
}
