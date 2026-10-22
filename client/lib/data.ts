// Content for the Skills and Projects sections.
// "kind" picks the pill color: ai (accent), be (backend/data), fe (frontend), "" (neutral)
export type Kind = "ai" | "be" | "fe" | "";
export type Pill = { name: string; kind: Kind };

export type SkillGroup = { title: string; pills: Pill[] };

const pills = (kind: Kind, names: string[]): Pill[] => names.map((name) => ({ name, kind }));

export const skillGroups: SkillGroup[] = [
  { title: "Languages", pills: pills("", ["Python", "JavaScript (ES6+)"]) },
  {
    title: "Frontend",
    pills: pills("fe", ["React.js", "HTML", "CSS", "Responsive Design", "Component Architecture"]),
  },
  { title: "Backend", pills: pills("be", ["Node.js", "Express.js", "Flask", "RESTful APIs"]) },
  { title: "Databases", pills: pills("be", ["MongoDB", "MongoDB Atlas", "Mongoose"]) },
  {
    title: "AI & ML",
    pills: pills("ai", ["RAG", "Agentic Workflows", "LangChain", "LangGraph", "Apple MLX", "LLM APIs"]),
  },
  { title: "Tools", pills: pills("", ["Git", "GitHub", "npm", "Figma", "Linux / macOS Shell"]) },
];

export type Project = {
  title: string;
  tagline: string;
  stack: Pill[];
  // **bold** and `code` are supported inside the points
  points: string[];
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Director_AI",
    tagline:
      "Local AI-powered video editor for Apple Silicon — natural language editing, transcription, smart cuts & captions.",
    stack: pills("ai", ["Python", "Apple MLX", "NLP"]),
    points: [
      "Runs **fully on-device** with the MLX framework — low-latency inference, no external cloud APIs.",
      "Modular backend (`ai_core.py`, `edit_engine.py`) turns natural language prompts into automated editing workflows.",
      "Automated **speech-to-text**, silence/scene detection for smart cuts, and dynamic caption generation.",
    ],
    github: "https://github.com/Sunil-raut/Director_AI",
  },
];
