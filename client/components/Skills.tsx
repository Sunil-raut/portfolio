import { skillGroups } from "../lib/data";

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <span className="sec-tag mono">// 01 skills</span>
        <h2>Technical toolkit</h2>
        <p className="sub">Grouped by what I use them for.</p>
        <div className="grid g4">
          {skillGroups.map((g) => (
            <div className="card" key={g.title}>
              <h3>{g.title}</h3>
              <div className="pills">
                {g.pills.map((p) => (
                  <span key={p.name} className={`pill ${p.kind}`.trim()}>
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
