"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "../lib/site";
import CopyButton from "./CopyButton";

// pdf.js is loaded from a CDN so we don't need any bundler setup for its worker
const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
const PDFJS_WORKER = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

interface Viewport { width: number; height: number }
interface PdfPage {
  getViewport(o: { scale: number }): Viewport;
  render(o: { canvasContext: CanvasRenderingContext2D; viewport: Viewport }): { promise: Promise<void> };
}
interface PdfDoc { numPages: number; getPage(n: number): Promise<PdfPage> }
interface PdfLib {
  GlobalWorkerOptions: { workerSrc: string };
  getDocument(src: string): { promise: Promise<PdfDoc> };
}
type PdfWindow = Window & { pdfjsLib?: PdfLib };

function loadPdfJs(): Promise<PdfLib> {
  const w = window as PdfWindow;
  if (w.pdfjsLib) return Promise.resolve(w.pdfjsLib);
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = PDFJS;
    s.onload = () => (w.pdfjsLib ? resolve(w.pdfjsLib) : reject(new Error("pdf.js missing")));
    s.onerror = () => reject(new Error("pdf.js failed to load"));
    document.head.appendChild(s);
  });
}

const PLAIN_TEXT = [
  "SUNIL ROUT",
  "sunilrout547@gmail.com | linkedin.com/in/sunil-rout-738546312 | github.com/Sunil-raut",
  "",
  "TECHNICAL SKILLS",
  "Languages: JavaScript (ES6+)",
  "Frontend: React.js, HTML, CSS, Responsive Web Design, Component Architecture",
  "Backend: Node.js, Express.js, RESTful APIs",
  "Databases: MongoDB, MongoDB Atlas, Mongoose",
  "Tools: Git, GitHub, npm, Figma, Linux/macOS Shell",
  "",
  "EDUCATION",
  "World College of Technology and Management (WCTM) - Gurugram, Haryana",
  "B.Tech in Computer Science and Engineering (AI & ML), 3rd Year (2024 - 2028)",
  "DUCAT - MERN Stack and AI Course",
].join("\n");

export default function Resume() {
  const box = useRef<HTMLDivElement>(null); // the scrolling frame
  const pages = useRef<HTMLDivElement>(null); // where the canvases go
  const [status, setStatus] = useState<"loading" | "ready" | "failed">("loading");
  const [count, setCount] = useState("PDF");

  // draw every page of the PDF
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const lib = await loadPdfJs();
        lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
        const pdf = await lib.getDocument(site.resume).promise;
        if (cancelled || !box.current || !pages.current) return;
        setCount(`${pdf.numPages} ${pdf.numPages > 1 ? "pages" : "page"}`);
        const width = Math.min(box.current.clientWidth - 32, 780);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        pages.current.innerHTML = "";
        for (let n = 1; n <= pdf.numPages; n++) {
          const page = await pdf.getPage(n);
          if (cancelled) return;
          const scale = width / page.getViewport({ scale: 1 }).width;
          const viewport = page.getViewport({ scale: scale * dpr });
          const canvas = document.createElement("canvas");
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.style.width = `${width}px`;
          canvas.setAttribute("role", "img");
          canvas.setAttribute("aria-label", `Resume page ${n}`);
          pages.current.appendChild(canvas);
          await page.render({ canvasContext: canvas.getContext("2d")!, viewport }).promise;
        }
        if (!cancelled) setStatus("ready");
      } catch {
        if (!cancelled) setStatus("failed");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // at the end (or start) of the resume, hand scrolling straight to the page
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      if (e.ctrlKey || !el) return;
      const d = e.deltaY * (e.deltaMode === 1 ? 16 : 1);
      const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      const atTop = el.scrollTop <= 0;
      if ((d > 0 && atEnd) || (d < 0 && atTop)) {
        e.preventDefault();
        window.scrollBy({ top: d, behavior: "instant" });
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section id="resume">
      <div className="wrap">
        <span className="sec-tag mono">// 03 resume</span>
        <h2>Resume</h2>
        <p className="sub">A one-page snapshot. Preview it here, or take the PDF with you.</p>

        <div className="rv">
          <div className="rv-bar mono">
            <i style={{ background: "#FF5F57" }} />
            <i style={{ background: "#FEBC2E" }} />
            <i style={{ background: "#28C840" }} />
            <span className="rv-name">Sunil_Rout_Resume.pdf</span>
            <span>{count}</span>
          </div>
          <div className="rv-body" ref={box}>
            {status === "loading" && (
              <p className="mono" style={{ textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
                Loading resume…
              </p>
            )}
            {status === "failed" ? (
              <iframe src={site.resume} title="Resume PDF" />
            ) : (
              <div ref={pages} />
            )}
          </div>
        </div>

        <div className="rcta">
          <a className="btn p" href={site.resume} download>⬇ Download PDF</a>
          <a className="btn" href={site.resume} target="_blank" rel="noopener noreferrer">↗ Open in new tab</a>
          <CopyButton text={PLAIN_TEXT} label="⧉ Copy plaintext version" />
          <a className="btn" href={site.overleaf} target="_blank" rel="noopener noreferrer">⌘ View LaTeX source</a>
        </div>
      </div>
    </section>
  );
}
