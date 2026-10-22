import { projects as defaultProjects, type Project } from "../lib/data";
import { site } from "../lib/site";

// turns **bold** and `code` in a string into elements
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**")) return <b key={i}>{part.slice(2, -2)}</b>;
    if (part.startsWith("`")) return <span key={i} className="mono">{part.slice(1, -1)}</span>;
    return part;
  });
}

// "projects" is a prop so we can feed it from the API later (Step 6)
export default function Projects({ projects = defaultProjects }: { projects?: Project[] }) {
  return (
    <section id="projects">
      <div className="wrap">
        <span className="sec-tag mono">// 02 projects</span>
        <h2>Selected work</h2>
        <p className="sub">More case studies are on the way.</p>
        <div className="grid g2">
          {projects.map((p) => (
            <article className="card proj" key={p.title}>
              <h3>{p.title}</h3>
              <p className="tag">{p.tagline}</p>
              <div className="pills">
                {p.stack.map((s) => (
                  <span key={s.name} className={`pill ${s.kind}`.trim()}>
                    {s.name}
                  </span>
                ))}
              </div>
              <ul>
                {p.points.map((pt, i) => (
                  <li key={i}>{rich(pt)}</li>
                ))}
              </ul>
              {p.github && (
                <a className="btn" href={p.github} target="_blank" rel="noopener noreferrer">
                  GitHub Repository ↗
                </a>
              )}
              {p.live && (
                <a className="btn" href={p.live} target="_blank" rel="noopener noreferrer" style={{ marginLeft: 10 }}>
                  Live Demo ↗
                </a>
              )}
            </article>
          ))}

          <article className="card soon">
            <h3 className="mono" style={{ color: "var(--status)" }}>&gt; next_project --loading</h3>
            <p style={{ margin: "8px 0 16px" }}>More AI agent, RAG and MERN projects are in progress.</p>
            <div>
              <a className="btn" href={`${site.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                Browse all repositories ↗
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
