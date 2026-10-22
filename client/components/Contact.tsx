import { site } from "../lib/site";
import CopyButton from "./CopyButton";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <span className="sec-tag mono">// 05 contact</span>
        <h2>Let&apos;s build something</h2>
        <p className="sub">Open to work and to conversations about agents, RAG and full-stack engineering.</p>
        <div className="mail">
          <code className="mono">{site.email}</code>
          <CopyButton text={site.email} label="Copy email" />
          <a className="btn p" href={`mailto:${site.email}`}>Send email</a>
        </div>
        <div className="soc mono" style={{ justifyContent: "center" }}>
          <a className="btn ib" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <GithubIcon />
          </a>
          <a className="btn ib" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <LinkedinIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
