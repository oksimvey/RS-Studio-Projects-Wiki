/* eslint-disable @typescript-eslint/no-explicit-any */

import { motion } from "framer-motion";


import leavsimg from "./assets/leaves_system.jpg"

import camimg from "./assets/camera_system.jpg"

import combatimg from "./assets/combat_system.jpg"

import advcombatimg from "./assets/advanced_combat_system.jpg"

import fpsimg from "./assets/fps_system.jpg"

import movementimg from "./assets/movement_system.jpg"

import npcimg from "./assets/npc_system.jpg"

import physicsimg from "./assets/physics_system.jpg"

import simulatorimg from "./assets/simulator_template.jpg"

import soccerimg from "./assets/soccer_system.jpg"

import towerimg from "./assets/tower_defense_template.jpg"

import tycoonimg from "./assets/tycoon_template.jpg"

import vehicleimg from "./assets/vehicle_system.jpg"

import waterimg from "./assets/water_system.jpg"

import weatherimg from "./assets/weather_system.jpg"



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
  commingSoon: boolean;
};


// Add projects here.
// Each item becomes one card on the landing page.
const projects: Project[] = [
  {
    id: "camera-system",
    title: "Camera System",
    description: "A modular smooth camera system with built-in customizeable shift, cutscenes and lock-in.",
    image: camimg,
    color: "from-violet-400/35 to-fuchsia-400/10",
    commingSoon: false,
  },
  {
    id : "leaves-system",
    title: "Leaves System",
    description: "Animated, interactive and optimized leaves system.",
    image: leavsimg,
    color: "from-blue-400/35 to-cyan-400/10",
    commingSoon: true
  },
  {
    id : "combat system",
    title: "Combat System",
    description: "A modular combat system with built-in melee and ranged combat.",
    image: combatimg,
    color: "from-red-400/35 to-orange-400/10",
    commingSoon: true
  },
  {
    id : "advanced-combat-system",
    title: "Advanced Combat System",
    description: "A modular advanced combat system with built-in melee and ranged combat.",
    image: advcombatimg,
    color: "from-red-400/35 to-orange-400/10",
    commingSoon: true
  }
];

import { Link } from "react-router-dom";

const MotionLink = motion(Link);

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const wobble = index % 2 === 0 ? -2 : 2;
  // Nota: Atenção ao erro de digitação no seu objeto original (commingSoon com dois 'm')
  const comingSoon = project.commingSoon;

  return (
  <MotionLink
    to={comingSoon ? "#" : `/projects/${project.id}`}
    initial={{ opacity: 0, y: 18, rotate: wobble }}
    animate={{ opacity: 1, y: 0, rotate: 0 }}
    transition={{ duration: 0.35, delay: index * 0.04 }}
    whileHover={
      comingSoon
        ? undefined
        : { y: -4, rotate: index % 2 === 0 ? -1 : 1 }
    }
    className={`block ${comingSoon ? "pointer-events-none" : ""}`}
    aria-disabled={comingSoon}
    onClick={(e) => comingSoon && e.preventDefault()}
  >

  
      {/* 1. Mudança no bg- do Card base se for comingSoon */}
      <Card className={`relative overflow-hidden rounded-[1.8rem] border-2 border-[#cfd3df]/35 shadow-[0_18px_50px_rgba(0,0,0,0.32)] ${comingSoon ? "bg-[#27272a]" : "bg-[#131a31]"
        }`}>

        {/* 2. O gradiente de cor só aparece se NÃO for comingSoon */}
        {!comingSoon && (
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
        )}

        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.7)_1px,transparent_0)] [background-size:18px_18px]" />

        <CardContent className="relative p-3">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] border-4 border-[#cfd3df]/35 bg-[#11162b]">
            <img
              src={project.image}
              alt={project.title}
              className={`h-full w-full object-cover ${comingSoon ? "grayscale opacity-50" : ""}`}
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />

            {comingSoon && <div className="absolute inset-0 bg-black/25" />}
          </div>

          <div className="absolute top-[-1px] left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full border-2 border-[#cfd3df]/35 bg-[#ceced6]/90 px-3 py-1 text-[14px] font-semibold text-[#12162a] shadow-[0_6px_0_rgba(0,0,0,0.18)]">
            {comingSoon ? "COMING SOON 🔒" : "AVAILABLE PROJECT ✅"}
          </div>

          <div className="mt-3 space-y-3 p-4 text-center">
            {/* 3. Ajuste opcional na cor do texto para dar aspecto de desativado */}
            <h3 className={`text-xl font-extrabold tracking-tight ${comingSoon ? "text-zinc-400" : "text-white"}`}>
              {project.title}
            </h3>

            <p className={`mt-1 text-sm leading-6 ${comingSoon ? "text-zinc-500" : "text-white/68"}`}>
              {project.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </MotionLink>
  );
}

export default function RobloxWikiLandingPage() {
  return (
   <motion.div
  className="min-h-screen bg-black"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
>
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.25),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_24%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_20%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:72px_72px]" />

      {/* FLOATING ORBS */}
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

      {/* MAIN CONTENT */}
      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center px-5 py-6 sm:px-6 lg:px-8 lg:py-8">

        {/* HEADER */}
        <header className="mb-10 flex flex-col items-center gap-4 text-center">
          <div>
            <p className="text-2xl uppercase tracking-[0.3em] text-white/40">
              Project archive
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white">
              Roblox Studio Projects
            </h1>
          </div>
        </header>

        {/* SUBTITLE */}
        <section className="mb-8 max-w-3xl text-center">
          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Complete Dev Wiki of my projects.
          </h2>
        </section>

        {/* PROJECT GRID */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </section>

      </main>
    </motion.div>
  );
}