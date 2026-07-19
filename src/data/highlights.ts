import type { Highlight, ResumeData } from "./types";

/** Short portfolio about — not the full résumé summary. */
export const ABOUT_BLURB =
  "I build automation and robotics systems. At Symbotic I operate and maintain robotic fleet systems, PLC safety devices, conveyors, and ABB robotic arms — while studying AI Engineering and shipping personal software projects.";

/**
 * Curated Experience Highlights (3–5). Derived from resume.json but intentionally
 * short for a portfolio, not a full public CV dump.
 */
export function buildHighlights(data: ResumeData): Highlight[] {
  const mil = data.military_service;
  const edu = data.education.find((e) => e.status === "In Progress");

  return [
    {
      id: "symbotic-aso",
      title: "Automation System Operator",
      org: "Symbotic",
      period: "Jul 2025 — Present",
      blurb:
        "Fleet/system operator role: conveyors, PLC safety devices, Rovers, and ABB robotic arms under LOTO — partnering with engineers and trainers on live automation systems.",
      tag: "Robotics",
    },
    {
      id: "symbotic-ro",
      title: "Robotics Operator → Trainer track",
      org: "Symbotic",
      period: "May 2024 — Aug 2025",
      blurb:
        "Robotic cell operations, training responsibilities, and workflow optimization with sensor data and robot programming feedback loops.",
      tag: "Automation",
    },
    {
      id: "gm",
      title: "Restaurant General Manager",
      org: "Walter Enterprises",
      period: "2017 — 2023",
      blurb:
        "Opened and scaled daily operations (150–300 customers/day by year two). Hiring, training, inventory, cash flow, and quality standards.",
      tag: "Leadership",
    },
    {
      id: "military",
      title: `${mil.rank} · ${mil.mos}`,
      org: mil.branch,
      period: mil.service_period,
      blurb: `${mil.deployment.operation} — ${mil.deployment.type} (${mil.deployment.location}). ${mil.unit}.`,
      tag: "Service",
    },
    ...(edu
      ? [
          {
            id: "edu",
            title: edu.credential,
            org: edu.institution,
            period: `${edu.start} — ${edu.end}`,
            blurb: `${edu.status}. Building software and AI skills alongside hands-on robotics work.`,
            tag: "Education",
          } satisfies Highlight,
        ]
      : []),
  ].slice(0, 5);
}
