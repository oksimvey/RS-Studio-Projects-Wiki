
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

function Card({ className = "", children }: any) {
  return <div className={className}>{children}</div>;
}

function CardContent({ className = "", children }: any) {
  return <div className={className}>{children}</div>;
}

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  color: string;
};

// Add projects here.
// Each item becomes one card on the landing page.
const projects: Project[] = [
  {
    id: "physics-kit",
    title: "Physics Kit",
    description: "Movement, forces, and simple helpers for Roblox systems.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80",
    color: "from-violet-400/35 to-fuchsia-400/10",
  },
  {
    id: "ui-core",
    title: "UI Core",
    description: "Buttons, panels, menus, and overlay pieces.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    color: "from-blue-400/35 to-cyan-400/10",
  },
  {
    id: "net-sync",
    title: "Net Sync",
    description: "Client/server sync tools and event utilities.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    color: "from-indigo-400/35 to-purple-400/10",
  },
  {
    id: "ai-pathing",
    title: "AI Pathing",
    description: "NPC routes, fallbacks, and movement logic.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    color: "from-fuchsia-400/35 to-violet-400/10",
  },
  {
    id: "docs-base",
    title: "Docs Base",
    description: "A wiki structure for setup, examples, and notes.",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    color: "from-cyan-400/35 to-blue-400/10",
  },
  {
    id: "tools-pack",
    title: "Tools Pack",
    description: "Small utilities that make project workflow easier.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    color: "from-violet-300/35 to-blue-400/10",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const wobble = index % 2 === 0 ? -2 : 2;

  return (
    <motion.a
      href={`/projects/${project.id}`}
      initial={{ opacity: 0, y: 18, rotate: wobble }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      whileHover={{ y: -4, rotate: index % 2 === 0 ? -1 : 1 }}
      className="block"
    >
      <Card className="relative overflow-hidden rounded-[1.8rem] border-2 border-[#7b68ee]/20 bg-[#0b1020] shadow-[0_18px_50px_rgba(0,0,0,0.32)] transition-transform duration-200">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.7)_1px,transparent_0)] [background-size:18px_18px]" />

        <CardContent className="relative p-3">
          <div className="overflow-hidden rounded-[1.4rem] border-4 border-[#151c36] bg-[#11162b]">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-[#12162a] shadow-[0_6px_0_rgba(0,0,0,0.18)]">
                PROJECT
              </div>
            </div>

            <div className="space-y-3 bg-[#10162b] p-4 text-center">
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-white">{project.title}</h3>
                <p className="mt-1 text-sm leading-6 text-white/68">{project.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.a>
  );
}

export default function RobloxWikiLandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.25),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_24%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_20%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl"
        animate={{ y: [0, 16, 0], x: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-44 h-80 w-80 rounded-full bg-blue-500/16 blur-3xl"
        animate={{ y: [0, -14, 0], x: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <main className="relative mx-auto max-w-6xl px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl border-2 border-[#7b68ee]/25 bg-[#10162b] shadow-[0_8px_0_rgba(0,0,0,0.22)]">
              <Sparkles className="h-5 w-5 text-violet-300" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">Project archive</p>
              <h1 className="text-lg font-bold tracking-tight text-white">Nebula Index</h1>
            </div>
          </div>
        </header>

        <section className="mb-8 max-w-3xl">
          <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
            Simple cards, cartoon vibe, purple-blue mood.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/62 sm:text-lg">
            Keep the landing page light and playful. The cards do the talking.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </section>
      </main>
    </div>
  );
}
