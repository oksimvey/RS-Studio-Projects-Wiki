import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

type MediaItem =
  | {
    type: "image";
    src: string;
    alt: string;
    caption?: string;
  }
  | {
    type: "video";
    src: string;
    caption?: string;
  };

type WikiSection =
  | {
    type: "text";
    title: string;
    content: string[];
  }
  | {
    type: "media";
    title?: string;
    items: MediaItem[];
  }
  | {
    type: "list";
    title: string;
    items: string[];
  }
  | {
    type: "callout";
    title?: string;
    content: string;
    tone?: "info" | "warning" | "success";
  };

type ProjectWiki = {
  id: string;
  title: string;
  subtitle: string;
  status: "available" | "comingSoon";
  color: string;
  cover: string;
  updatedAt: string;
  tags: string[];
  sections: WikiSection[];
};

import cutsceneShowcase from "./assets/camera_system/cutscene_showcase.mp4";

const wikiPages: Record<string, ProjectWiki> = {
  "camera-system": {
    id: "camera-system",
    title: "Camera System",
    subtitle: "A modular smooth camera system with built-in customizeable shift, cutscenes and lock-in.",
    status: "available",
    color: "from-violet-400/35 to-fuchsia-400/10",
    cover: "/assets/camera_system.jpg",
    updatedAt: "June 2026",
    tags: ["Camera", "Roblox", "Animation", "Systems"],
    sections: [
      {
        type: "text",
        title: "Overview",
        content: [
          "A premium, fully customizable camera system built to make your game feel smoother, more polished, and way more immersive. Designed with flexibility in mind, it gives you everything you need to create a cinematic player experience without fighting clunky camera code.",

          "It includes smooth follow and interpolation for fluid movement, dynamic FOV effects for speed and intensity, wind and shake effects for extra impact, and a custom first-person mode that feels clean and responsive. You also get custom shift lock, target lock-on, full cutscene support, and auto-adjustable zoom for a seamless experience across different gameplay styles.",

          "Whether you are making a fast-paced action game, a story-driven experience, or a polished simulator, this system adapts to your needs. It is extremely customizable, easy to fit into different projects, and built with multi-platform support so it works naturally on PC, mobile, and console.",

          "If you want a camera system that adds real quality, improves immersion, and gives your game a professional feel out of the box, this is the kind of upgrade players notice immediately."
        ],
      },
      {
        type: "media",
        title: "Smooth follow and interpolation",
        items: [
          {
            type: "video",
            src: "",
            caption: "Smooth camera interpolation with configurable responsiveness.",
          },
        ],
      },
      {
        type: "media",
        title: "Cutscene System",
        items: [
          {
            type: "video",
            src: cutsceneShowcase,
            caption: "Create cinematic cutscenes with keyframes, filters and transitions.",
          },
        ],
      },
      {
        type: "media",
        title: "Custom shift lock",
        items: [
          {
            type: "video",
            src: "",
            caption: "Smooth camera interpolation with configurable responsiveness.",
          },
        ],
      },
      {
        type: "media",
        title: "Custom first person",
        items: [
          {
            type: "video",
            src: "",
            caption: "Smooth camera interpolation with configurable responsiveness.",
          },
        ],
      },
       {
        type: "media",
        title: "Target Lock",
        items: [
          {
            type: "video",
            src: "",
            caption: "Lock onto enemies with smooth target switching.",
          },
        ],
      },
      {
        type: "media",
        title: "Adaptative zoom",
        items: [
          {
            type: "video",
            src: cutsceneShowcase,
            caption: "Create cinematic cutscenes with keyframes, filters and transitions.",
          },
        ],
      },
       {
        type: "media",
        title: "Wind effect",
        items: [
          {
            type: "video",
            src: cutsceneShowcase,
            caption: "Create cinematic cutscenes with keyframes, filters and transitions.",
          },
        ],
      },
       {
        type: "media",
        title: "Multi plataform support",
        items: [
          {
            type: "video",
            src: cutsceneShowcase,
            caption: "Create cinematic cutscenes with keyframes, filters and transitions.",
          },
        ],
      },
       {
        type: "media",
        title: "Shake effect",
        items: [
          {
            type: "video",
            src: cutsceneShowcase,
            caption: "Create cinematic cutscenes with keyframes, filters and transitions.",
          },
        ],
      },

    
     
      {
        type: "list",
        title: "Instalattion",
        items: [
          "Smooth follow and interpolation",
          "Cutscene support",
          "Lock-on mode",
          "Custom transition easing",
          "Easy expansion for future camera states",
        ],
      },
      {
        type: "list",

        title: "Usage",
        items: [
          "The goal was to keep the logic clean and easy to extend, while still feeling polished in-game.",

        ]
      },
    ],
  },

  "leaves-system": {
    id: "leaves-system",
    title: "Leaves System",
    subtitle: "Animated, interactive and optimized leaves system.",
    status: "comingSoon",
    color: "from-blue-400/35 to-cyan-400/10",
    cover: "/assets/leaves_system.jpg",
    updatedAt: "Coming soon",
    tags: ["Particles", "Nature", "Optimization"],
    sections: [
      {
        type: "text",
        title: "What it does",
        content: [
          "This project focuses on animated leaves that feel alive but still remain lightweight.",
          "It is built to look good in motion without destroying performance.",
        ],
      },
      {
        type: "media",
        title: "Mood / reference",
        items: [
          {
            type: "image",
            src: "/assets/leaves_demo.gif",
            alt: "Leaves gif",
            caption: "Animated prototype.",
          },
        ],
      },
      {
        type: "callout",
        tone: "warning",
        content:
          "This project is still under development, so some parts of the wiki may change later.",
      },
    ],
  },
};

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={className}>{children}</div>;
}

function SectionRenderer({ section }: { section: WikiSection }) {
  if (section.type === "text") {
    return (
      <Card className="rounded-[1.8rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur">
        <CardContent className="p-5 sm:p-6">
          <h2 className="text-2xl font-black text-center tracking-tight text-white">{section.title}</h2>
          <div className="mt-4 space-y-4 text-sm leading-7 text-white/72">
            {section.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (section.type === "list") {
    return (
      <Card className="rounded-[1.8rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur">
        <CardContent className="p-5 sm:p-6">
          <h2 className="text-2xl font-black text-center tracking-tight text-white">{section.title}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/74">
            {section.items.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white/60" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  if (section.type === "callout") {
    const toneClass =
      section.tone === "warning"
        ? "border-amber-400/30 bg-amber-400/10 text-amber-100"
        : section.tone === "success"
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-100"
          : "border-sky-400/30 bg-sky-400/10 text-sky-100";

    return (
      <Card className={`rounded-[1.8rem] border shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur ${toneClass}`}>
        <CardContent className="p-5 sm:p-6">
          {section.title && <h2 className="text-lg font-bold">{section.title}</h2>}
          <p className={`mt-2 text-sm leading-7 ${section.title ? "opacity-90" : ""}`}>
            {section.content}
          </p>
        </CardContent>
      </Card>
    );
  }

 if (section.type === "media") {
  return (
    <Card className="rounded-[1.8rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur">
      <CardContent className="p-5 sm:p-6">
        {section.title && (
          <h2 className="text-2xl font-black text-center tracking-tight text-white">
            {section.title}
          </h2>
        )}

        <div className="mt-4 flex flex-col items-center gap-4">
          {section.items.map((item, i) => (
            <div
              key={i}
              className="w-full max-w-4xl overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#11162b]"
            >
              {item.type === "video" ? (
                <video
                  className="w-full"
                  controls
                  loop
                  muted
                  playsInline
                >
                  <source src={item.src} type="video/mp4" />
                  Your browser doesnt support videos.
                </video>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full"
                  loading="lazy"
                />
              )}

              {item.caption && (
                <div className="border-t border-white/10 px-4 py-3 text-sm text-white/65">
                  {item.caption}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

  return null;
}






export default function ProjectWikiPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const page = projectId ? wikiPages[projectId] : undefined;

  useEffect(() => {
    if (!location.hash) return;

    const target = document.getElementById(location.hash.slice(1));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [location.hash, page]);

  if (!page) {
    return (
      <motion.div
        className="min-h-screen bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mx-auto max-w-3xl rounded-[1.8rem] border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h1 className="text-3xl font-black">Project not found</h1>
          <p className="mt-3 text-white/70">
            This wiki page does not exist yet.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to home
          </Link>
        </div>
      </motion.div>
    );
  }

  const toc = page.sections.map((section, index) => ({
    id: `section-${index}`,
    title: section.title ?? `Section ${index + 1}`,
  }));

  return (
    <motion.div
      className="relative min-h-screen overflow-hidden bg-[#050816] text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
    >
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.25),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_24%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_20%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />

      <main className="relative mx-auto max-w-7xl px-5 py-6 pb-20 sm:px-6 lg:px-8 lg:py-8 lg:pb-24">

        {/* TOP BAR */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/80 backdrop-blur transition hover:bg-white/10"
          >
            ← Back
          </Link>

          <div className="hidden text-sm text-white/45 sm:block">
            Updated: {page.updatedAt}
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className={`absolute inset-0 bg-gradient-to-br ${page.color}`} />
          <div className="absolute inset-0 bg-black/40" />

          <div className="relative grid gap-0 lg:grid-cols-[1.35fr_0.85fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                Project wiki
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
                {page.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
                {page.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {page.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative p-4 sm:p-6 lg:p-8">
              <div className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#11162b] shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
                <img
                  src={page.cover}
                  alt={page.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">

          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-[1.8rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
              <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-white/50">
                Contents
              </h2>

              <nav className="mt-4 space-y-2">
                {toc.map((item, index) => (
                  <Link
                    key={item.id}
                    to={{
                      pathname: `/projects/${projectId}`,
                      hash: `#${item.id}`,
                    }}
                    className="block rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-white/75 transition hover:bg-white/10 hover:text-white"
                  >
                    {index + 1}. {item.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* SECTIONS */}
          <div className="space-y-6">
            {page.sections.map((section, index) => (
              <motion.section
                key={index}
                id={`section-${index}`}
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
              >
                <SectionRenderer section={section} />
              </motion.section>
            ))}
          </div>

        </section>
      </main>
    </motion.div>
  );
}
