"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "../lib/site";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const linksRef = useRef<HTMLDivElement>(null);

  // highlight the link of the section you are looking at
  useEffect(() => {
    const secs = Array.from(document.querySelectorAll<HTMLElement>("header[id],section[id]"));
    const nav = document.querySelector("nav");
    if (!nav || secs.length === 0) return;

    function spy() {
      const limit = nav!.getBoundingClientRect().bottom + 40;
      let id = secs[0].id;
      secs.forEach((s) => {
        if (s.getBoundingClientRect().top <= limit) id = s.id;
      });
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) id = secs[secs.length - 1].id;
      setActive(id);
    }

    spy();
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy);
    return () => {
      window.removeEventListener("scroll", spy);
      window.removeEventListener("resize", spy);
    };
  }, []);

  // on small screens, slide the active link into view
  useEffect(() => {
    const box = linksRef.current;
    const el = box?.querySelector<HTMLElement>("a.active");
    if (box && el && box.scrollWidth > box.clientWidth) {
      box.scrollTo({ left: el.offsetLeft - (box.clientWidth - el.offsetWidth) / 2, behavior: "smooth" });
    }
  }, [active]);

  function toggleTheme() {
    const root = document.documentElement;
    const current =
      root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  return (
    <nav>
      <div className="wrap">
        <a className="logo mono" href="#home">
          sunil<span>.rout</span>
        </a>
        <div className="links" ref={linksRef}>
          {site.nav.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href.slice(1) ? "active" : undefined}>
              {l.label}
            </a>
          ))}
        </div>
        <button className="tbtn" onClick={toggleTheme} aria-label="Toggle light/dark theme">
          <svg className="sun" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
          <svg className="moon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
