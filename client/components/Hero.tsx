"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "../lib/site";
import { GithubIcon, LinkedinIcon, MailIcon } from "./Icons";

const ROLES = ["AI Engineer", "Full-Stack Developer"];

export default function Hero() {
  const [role, setRole] = useState(ROLES[0]);

  // typewriter: type a role, hold, delete it, move to the next one
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let j = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    function tick() {
      const word = ROLES[i];
      setRole(word.slice(0, j));
      if (!deleting && j < word.length) {
        j++;
        timer = setTimeout(tick, 55);
      } else if (!deleting) {
        deleting = true;
        timer = setTimeout(tick, 1000);
      } else if (j > 0) {
        j--;
        timer = setTimeout(tick, 30);
      } else {
        deleting = false;
        i = (i + 1) % ROLES.length;
        timer = setTimeout(tick, 200);
      }
    }

    tick();
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="hero" id="home">
      <div className="wrap hero-grid">
        <div className="hero-text">
          <span className="badge mono">
            <span className="dot" />
            Open to work
          </span>
          <h1>
            {site.name}
            <br />
            <em>
              <span>{role}</span>
              <span className="caret" />
            </em>
          </h1>
          <p className="prompt mono">$ building agents, RAG systems &amp; MERN apps — Gurugram, India</p>
          <p className="lead" style={{ marginTop: 14 }}>
            Third-year B.Tech (CSE, AI &amp; ML) student building autonomous AI agents, Retrieval-Augmented
            Generation pipelines and responsive full-stack web applications.
          </p>
          <div className="cta">
            <a className="btn p" href="#projects">View Projects</a>
            <a className="btn" href={site.resume} download>⬇ Download PDF</a>
            <a className="btn" href="#contact">Get in Touch</a>
          </div>
          <div className="soc mono">
            <a className="btn ib" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
              <GithubIcon />
            </a>
            <a className="btn ib" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
              <LinkedinIcon />
            </a>
            <a className="btn ib" href={`mailto:${site.email}`} aria-label="Email" title="Email">
              <MailIcon />
            </a>
          </div>
        </div>
        <div className="pfp">
          <Image src="/avatar.webp" alt={site.name} width={280} height={280} priority unoptimized/>
        </div>
      </div>
    </header>
  );
}
