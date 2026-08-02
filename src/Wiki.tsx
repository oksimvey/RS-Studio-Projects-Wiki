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

import closedAmbientShowcase from "./assets/camera_system/closed_ambience.mp4"

import cutsceneShowcase from "./assets/camera_system/cutscene_showcase.mp4"

import firstPersonShowcase from "./assets/camera_system/first_person.mp4"

import lockInShowcase from "./assets/camera_system/lock_in.mp4"

import mobileShowcase from "./assets/camera_system/mobile.mp4"

import shakeShowcase from "./assets/camera_system/shake.mp4"

import shiftLockShowcase from "./assets/camera_system/shift_lock.mp4"

import smoothFollowShowcase from "./assets/camera_system/smooth_follow.mp4"

import windEffectShowcase from "./assets/camera_system/wind_effect.mp4"

import cameraSystem from "./assets/camera_system/camsystemcover.png"

const wikiPages: Record<string, ProjectWiki> = {
  "camera-system": {
    id: "camera-system",
    title: "Camera System",
    subtitle: "A modular smooth camera system with built-in customizeable shift, cutscenes and lock-in.",
    status: "available",
    color: "from-violet-400/35 to-fuchsia-400/10",
    cover: cameraSystem,
    updatedAt: "August 2026",
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
        title: "Smooth Follow & Interpolation",
        items: [
          {
            type: "video",
            src: smoothFollowShowcase,
            caption: "Smoothly interpolates camera movement and rotation for responsive, natural-looking motion.",
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
            caption: "Create cinematic cutscenes with keyframes, camera filters, and seamless transitions.",
          },
        ],
      },
      {
        type: "media",
        title: "Custom Shift Lock",
        items: [
          {
            type: "video",
            src: shiftLockShowcase,
            caption: "A fully customizable shift lock with smooth transitions and configurable behavior.",
          },
        ],
      },
      {
        type: "media",
        title: "Custom First Person",
        items: [
          {
            type: "video",
            src: firstPersonShowcase,
            caption: "An immersive first-person mode with customizable camera positioning and controls.",
          },
        ],
      },
      {
        type: "media",
        title: "Target Lock",
        items: [
          {
            type: "video",
            src: lockInShowcase,
            caption: "Lock onto targets with smooth tracking and effortless target switching.",
          },
        ],
      },
      {
        type: "media",
        title: "Adaptive Zoom",
        items: [
          {
            type: "video",
            src: closedAmbientShowcase,
            caption: "Automatically adjusts camera zoom in tight spaces to prevent clipping and improve visibility.",
          },
        ],
      },
      {
        type: "media",
        title: "Wind Effect",
        items: [
          {
            type: "video",
            src: windEffectShowcase,
            caption: "Adds subtle camera movement to simulate wind and enhance environmental immersion.",
          },
        ],
      },
      {
        type: "media",
        title: "Multi-Platform Support",
        items: [
          {
            type: "video",
            src: mobileShowcase,
            caption: "Built for desktop, mobile, console, and gamepad with platform-specific controls.",
          },
        ],
      },
      {
        type: "media",
        title: "Shake Effect",
        items: [
          {
            type: "video",
            src: shakeShowcase,
            caption: "Create dynamic camera shakes for impacts, explosions, and other gameplay events.",
          },
        ],
      },




      {
        type: "text",
        title: "Installation",
        content: [
          "Setting up the camera system only takes a few steps:",
          "1. Import the provided .rbxm model into your place.",
          "2. Move the CameraSystem folder into ReplicatedStorage.",
          "3. Create a new LocalScript inside StarterPlayer > StarterPlayerScripts.",
          "4. Paste the following code into the LocalScript:",
          "---",
          "local CameraInitializer = require(game.ReplicatedStorage.CameraSystem.CameraInitializer)",
          "",
          "CameraInitializer.init()",
          "---",
          "That's it! The camera system will automatically initialize when the player joins the game."
        ],
      },
      {
        type: "text",
        title: "Configuration",
        content: [
          "Usage guide for the CamConfig module.",
          "◆ Enabled: Master switch for the entire camera system. When false, all custom camera behavior is disabled.",
          "◆ DefaultCrosshair: The image asset used for the default crosshair in normal camera mode.",
          "◆ DefaultCrosshairSize: The size of the default crosshair in pixels.",
          "◆ DefaultCrossHairTransparency: The transparency of the default crosshair.",
          "◆ DefaultCamMaxDistance: The maximum distance the default camera can stay from the character.",
          "◆ CamFollowSpeed: Controls how quickly the camera follows the character movement.",
          "◆ MinZoom: The minimum allowed zoom distance.",
          "◆ MaxZoom: The maximum allowed zoom distance.",
          "◆ DefaultOffset: The default camera offset relative to the character.",
          "◆ DefaultCamMode: The default camera mode used when the system starts. Common values are free or locked.",
          "◆ DefaultCameraRotationMode: Defines how camera rotation behaves by default. Common values are default, disabled, or follow.",
          "◆ RotationSensibility: The sensitivity of camera rotation input.",
          "◆ ManualZoom: Enables or disables manual zoom input.",
          "◆ ZoomSensibility: Controls how fast zoom changes when the player zooms in or out.",
          "◆ ControlZoomIn: The controller key used to zoom in.",
          "◆ ControlZoomOut: The controller key used to zoom out.",
          "◆ PlayerMovementRotationEnabled: Enables character rotation based on movement.",
          "◆ PlayerMovementRotationLeftRight: Rotation influence applied when the player moves left or right.",
          "◆ PlayerMovementRotationFrontBack: Rotation influence applied when the player moves forward or backward.",
          "◆ RotatePlayerWhenPressingButtons: A list of keys that manually rotate the player.",
          "◆ FOVEffectContext: Determines where the FOV effect applies. Common values are first person, third person, none, or both.",
          "◆ CameraRollContext: Determines where camera roll effects apply.",
          "◆ CameraRollAmount: The maximum amount of roll applied to the camera.",
          "◆ WindEffectContext: Determines where wind effects apply.",
          "◆ WindEffectMinSpeed: The minimum speed required before wind effects start.",
          "◆ WindEffectIntensityFactor: A multiplier that controls how strong the wind effect is.",
          "◆ AdaptativeZoomOnClosedAmbient: Enables automatic zoom adjustment when the player is in a tight or closed space.",
          "◆ AdaptativeZoomOnClosedAmbientIntensity: Controls how strong the adaptive zoom effect becomes in closed spaces.",
          "◆ AdjustZoomBasedOnVehicle: Automatically adjusts zoom when the player is inside a vehicle.",
          "◆ DefaultFOV: The default field of view used by the camera.",
          "◆ FirstPersonDefaultFOV: The field of view used in first person mode.",
          "◆ SpeedFOVModifierFactor: How much player movement speed influences the FOV.",
          "◆ MaxCameraFOV: The maximum allowed field of view.",
          "◆ CustomShiftLock: Enables the custom shift lock system.",
          "◆ ShiftLockCamMaxDistance: The maximum camera distance while shift lock is active.",
          "◆ ShiftLockMobileButton: The mobile button used to toggle shift lock.",
          "◆ ShiftLockButtons: The keys or buttons used to toggle shift lock.",
          "◆ ShiftLockCrosshair: The image asset used for the shift lock crosshair.",
          "◆ ShiftLockCrossHairSize: The size of the shift lock crosshair in pixels.",
          "◆ ShiftLockCrossHairTransparency: The transparency of the shift lock crosshair.",
          "◆ ShiftLockOffset: The camera offset used while shift lock is active.",
          "◆ CustomFirstPerson: Enables the custom first person system.",
          "◆ FirstPersonButtons: The keys used to toggle first person mode.",
          "◆ FirstPersonMobileButton: The mobile button used to toggle first person mode.",
          "◆ FirstPersonMode: Defines how first person can be activated. Common values are disabled, key, zoom, or both.",
          "◆ FirstPersonCrosshair: The image asset used for the first person crosshair.",
          "◆ FirstPersonCrosshairSize: The size of the first person crosshair in pixels.",
          "◆ FirstPersonCrosshairTransparency: The transparency of the first person crosshair.",
          "◆ ShowBodyFirstPerson: Makes the character body visible while in first person.",
          "◆ CustomLockIn: Enables the target lock-in system.",
          "◆ LockInButtons: The inputs used to activate lock-in.",
          "◆ LockInMobileButton: The mobile button used to activate lock-in.",
          "◆ LockInCamMaxDistance: The maximum camera distance while locked onto a target.",
          "◆ LockInIconSize: The size of the lock-in icon.",
          "◆ AdjustZoomBasedOnTarget: Automatically adjusts zoom depending on the target’s size.",
          "◆ LockInIconTransparency: The transparency of the lock-in icon.",
          "◆ LockInIcon: The image asset used for the lock-in icon.",
          "◆ LockInSpin: Makes the lock-in icon spin while a target is locked.",
          "◆ LockInPump: Makes the lock-in icon pulse with a scaling animation.",
          "◆ LockInSpinSpeed: The speed of the lock-in spin animation.",
          "◆ LockInPumpSpeed: The speed of the lock-in pulsing animation.",
          "◆ LockInHighlight: Highlights the locked target.",
          "◆ LockInHighlightColor: The highlight color applied to the locked target.",
          "◆ LockInOffset: The camera offset used while locked onto a target.",
          "◆ DragToChangeTarget: Allows the player to drag to switch between targets while lock-in is active.",
          "Every option is fully customizable, so you can tune the camera system for cinematic, competitive, realistic, or arcade-style gameplay."
        ]
      },


      {
        type: "text",
        title: "Usage",
        content: [
          "The camera system is designed to be fully modular. You can use individual features independently or combine them to create more immersive gameplay.",

          "◆ Camera Shake",
          "Add dynamic camera shake for explosions, impacts, earthquakes, weapon recoil, or any other event.",
          "The shake system uses smooth interpolation instead of instantly changing the camera offset, producing natural-looking movement.",
          "Intensity controls the maximum displacement, Duration controls how long the shake lasts, and Frequency controls how quickly the shake changes direction.",
          "Example:",
          "---",
          "CustomCameraState.shake(1.5, 0.4, 8)",
          "---",

          "◆ Camera Filters",
          "Camera filters let you temporarily modify the game's visual appearance during gameplay or cutscenes.",
          "Each filter can control:",
          "• Brightness",
          "• Contrast",
          "• Saturation",
          "• Tint Color",
          "• Atmospheric Haze Color",
          "• Atmospheric Haze Density",
          "Filters are tweened automatically, allowing smooth transitions between effects.",
          "You can also create your own filters using CameraFilter.new().",
          "Example:",
          "---",
          "local filter = CameraFilter.new(",
          "    0.2,",
          "    0.4,",
          "    -0.2,",
          "    Color3.fromRGB(255,220,220),",
          "    Color3.fromRGB(255,170,120),",
          "    0.35",
          ")",
          "",
          "filter:apply(TweenInfo.new(1))",
          "",
          "-- Remove the filter later",
          "filter:remove(TweenInfo.new(1))",
          "---",

          "◆ Keyframes",
          "Camera keyframes define the path, rotation, FOV, and timing of a cutscene. Each keyframe stores three values:",
          "• cframe: The camera position and orientation.",
          "• fov: The field of view at that moment.",
          "• time: The timestamp used to place the keyframe in the cutscene timeline.",

          "◆ Creating Keyframes",
          "You can create keyframes in four different ways depending on how much control you need:",

          "1. CameraKeyframe.new(cframe, fov, time)",
          "Use this when you already have a full CFrame prepared.",
          "This is the most direct constructor and gives you full control over both position and rotation.",
          "Example:",
          "---",
          "local keyframe = CameraKeyframe.new(",
          "    CFrame.new(0, 10, 20) * CFrame.Angles(0, math.rad(180), 0),",
          "    70,",
          "    1.5",
          ")",
          "---",

          "2. CameraKeyframe.fromPos(pos, fov, time)",
          "Use this when you only want to place the camera at a position and do not need custom rotation.",
          "This creates a CFrame from the position only.",
          "Example:",
          "---",
          "local keyframe = CameraKeyframe.fromPos(Vector3.new(0, 10, 20), 70, 1.5)",
          "---",

          "3. CameraKeyframe.fromPosAndRotation(pos, rotation, fov, time)",
          "Use this when you want to define the camera position and a custom orientation manually.",
          "The rotation value is a Vector3 of Euler angles, using X, Y, and Z rotation values.",
          "Example:",
          "---",
          "local keyframe = CameraKeyframe.fromPosAndRotation(",
          "    Vector3.new(0, 10, 20),",
          "    Vector3.new(0, math.rad(180), 0),",
          "    70,",
          "    1.5",
          ")",
          "---",

          "4. CameraKeyframe.fromPosAndTargetPos(pos, targetpos, fov, time)",
          "Use this when you want the camera to automatically face a specific point.",
          "The camera will look from pos toward targetpos, which is very useful for cinematic shots, dialogue scenes, and reveals.",
          "Example:",
          "---",
          "local keyframe = CameraKeyframe.fromPosAndTargetPos(",
          "    Vector3.new(0, 10, 20),",
          "    Vector3.new(0, 5, 0),",
          "    70,",
          "    1.5",
          ")",
          "---",



          "CameraCutscene is the main class responsible for playing cinematic camera sequences. It combines camera keyframes with optional features such as interpolation, target tracking, relative positioning, collision handling, visual filters, and cinematic UI.",

          "Constructor:",
          "---",
          "CameraCutscene.new(",
          "    keyframes,",
          "    playMode,",
          "    cutsceneUI,",
          "    canPlayerMove,",
          "    cameraFilter,",
          "    target,",
          "    reference,",
          "    referenceRaycast,",
          "    targetRaycast",
          ")",
          "---",

          "◆ keyframes",
          "A table containing every CameraKeyframe that makes up the cutscene. The keyframes should be ordered by time, starting at 0 and increasing until the final shot.",

          "◆ playMode",
          "Determines how the camera moves between keyframes.",
          "• None - Instantly switches between keyframes with no interpolation.",
          "• Linear - Smoothly interpolates between each keyframe using linear interpolation.",
          "• Catmull - Uses Catmull-Rom spline interpolation to generate smooth cinematic camera paths. This is the recommended mode for most cutscenes.",

          "◆ cutsceneUI",
          "Enables the built-in cinematic UI.",
          "When enabled, cinematic bars and the cutscene interface automatically appear when the cutscene starts and disappear when it ends. Disable this if you want to create your own UI or use the camera system without any cinematic overlay.",

          "◆ canPlayerMove",
          "Controls whether the player can move during the cutscene.",
          "If false, the player's WalkSpeed is temporarily set to 0 while the cutscene plays and restored afterward. This is ideal for story moments, intros, or scripted events.",
          "If true, the player can continue moving normally while the camera is controlled by the cutscene.",

          "◆ cameraFilter",
          "An optional CameraFilter applied automatically when the cutscene begins.",
          "Filters can modify brightness, contrast, saturation, tint color, atmospheric haze, and more.",
          "Pass nil if you don't want any visual filter.",

          "◆ target",
          "An optional Model or BasePart that the camera should continuously look at.",
          "Instead of using the rotation stored inside each keyframe, the camera automatically rotates every frame to keep this object centered.",
          "This is perfect for dialogue scenes, boss introductions, NPC interactions, or showcasing moving objects.",

          "◆ reference",
          "An optional Model or BasePart used as the origin of the cutscene.",
          "Every keyframe becomes relative to this object instead of world space.",
          "This allows the exact same cutscene to be reused anywhere simply by changing the reference object.",
          "For example, you can create a vehicle intro once and reuse it for every vehicle by passing a different vehicle model as the reference.",

          "◆ referenceRaycast",
          "Enables collision detection between the reference object and the camera.",
          "If a wall blocks the camera, it automatically moves closer instead of clipping through the geometry.",
          "Only affects cutscenes using a reference object.",

          "◆ targetRaycast",
          "Enables collision detection between the target object and the camera.",
          "The system raycasts from the target toward the desired camera position and automatically adjusts the camera if an obstacle is found.",
          "This is especially useful when the target is moving through buildings, caves, or other enclosed environments.",

          "◆ Example",
          "---",
          "local cutscene = CameraCutscene.new(",
          "    keyframes,",
          "    \"Catmull\",",
          "    true,",
          "    false,",
          "    CameraFilter.BlackAndWhite,",
          "    boss,",
          "    arena,",
          "    true,",
          "    true",
          ")",
          "CustomCameraState.setCutsceneAndPlay(cutscene, TweenInfo.new(1))",
          "---",
          "You can also provide TweenInfo when starting or stopping a cutscene to smoothly transition between gameplay and the cinematic camera. ",

          "Useful CameraState functions:",
          "• setCutsceneAndPlay(cutscene, transition)",
          "Starts a cutscene immediately.",
          "• setCutsceneAndPlayAndStop(cutscene, startTransition, endTransition)",
          "Automatically plays and removes the cutscene when it finishes.",
          "• stopCutscene(transition)",
          "Stops the current cutscene while preserving it.",
          "• removeCutscene(transition)",
          "Stops and completely removes the active cutscene.",
          "• resetCutscene()",
          "Resets the cutscene back to its first keyframe.",
          "• isCutsceneActive()",
          "Returns whether a cutscene is currently assigned."
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
  return <div className={`w-full min-w-0 ${className}`}>{children}</div>;
}

function CardContent({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`min-w-0 ${className}`}>{children}</div>;
}

function SectionRenderer({ section }: { section: WikiSection }) {
  if (section.type === "text") {
    return (
      <Card className="rounded-[1.8rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-xl font-black text-center tracking-tight text-white sm:text-2xl">{section.title}</h2>
          <div
            className="mt-4 space-y-4 text-sm leading-7 text-white/72 break-words"
            style={{ overflowWrap: "anywhere" }}
          >
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
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-xl font-black text-center tracking-tight text-white sm:text-2xl">{section.title}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-white/74 break-words">
            {section.items.map((item, i) => (
              <li key={i} className="flex min-w-0 gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-white/60" />
                <span className="min-w-0 break-words" style={{ overflowWrap: "anywhere" }}>
                  {item}
                </span>
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
        <CardContent className="p-4 sm:p-6">
          {section.title && <h2 className="text-lg font-bold">{section.title}</h2>}
          <p
            className={`mt-2 text-sm leading-7 break-words ${section.title ? "opacity-90" : ""}`}
            style={{ overflowWrap: "anywhere" }}
          >
            {section.content}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (section.type === "media") {
    return (
      <Card className="rounded-[1.8rem] border border-white/10 bg-white/5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur">
        <CardContent className="p-4 sm:p-6">
          {section.title && (
            <h2 className="text-xl font-black text-center tracking-tight text-white sm:text-2xl">
              {section.title}
            </h2>
          )}

          <div className="mt-4 flex min-w-0 flex-col items-center gap-4">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="w-full min-w-0 max-w-4xl overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#11162b]"
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
                  <div className="border-t border-white/10 px-4 py-3 text-sm text-white/65 break-words" style={{ overflowWrap: "anywhere" }}>
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

      <main className="relative mx-auto max-w-7xl min-w-0 px-5 py-6 pb-20 sm:px-6 lg:px-8 lg:py-8 lg:pb-24">

        {/* TOP BAR */}
        <div className="mb-6 flex min-w-0 items-center justify-between gap-4">
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
        <section className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[240px_1fr]">

          {/* TOC */}
          <aside className="hidden min-w-0 lg:block">
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
          <div className="min-w-0 space-y-6">
            {page.sections.map((section, index) => (
              <motion.section
                key={index}
                id={`section-${index}`}
                className="scroll-mt-24 min-w-0"
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
