import type { CollegeContentPack } from "./types";
import { buildOnlinePack, type OnlineUniFacts } from "./onlineHelpers";

// Online-degree content packs — "ultra-rich" tier, same 34-section/8-tab depth
// as the Manipal University Jaipur (Online) flagship template.
// Batch 9 of 9 (7 colleges): Suresh Gyan Vihar University, Tamil Nadu Open
// University, University of Madras, Vardhman Mahaveer Open University,
// Vignan's Foundation, Vivekananda Global University, Yashwantrao Chavan
// Maharashtra Open University.
// Completes all 54 online colleges.

const stdPrograms = (tier: "premium" | "standard" | "legacy" = "standard"): OnlineUniFacts["programs"] => {
  const mba = tier === "premium" ? "₹1.6 L – ₹2.0 L total (indicative)" : tier === "legacy" ? "₹0.5 L – ₹1.2 L total (indicative)" : "₹0.8 L – ₹1.4 L total (indicative)";
  const mca = tier === "premium" ? "₹1.4 L – ₹1.7 L total (indicative)" : tier === "legacy" ? "₹0.4 L – ₹1.0 L total (indicative)" : "₹0.7 L – ₹1.2 L total (indicative)";
  const mcom = tier === "premium" ? "₹0.9 L – ₹1.2 L total (indicative)" : tier === "legacy" ? "₹0.2 L – ₹0.6 L total (indicative)" : "₹0.6 L – ₹0.9 L total (indicative)";
  const bba = tier === "premium" ? "₹1.4 L – ₹1.7 L total (indicative)" : tier === "legacy" ? "₹0.4 L – ₹1.0 L total (indicative)" : "₹0.7 L – ₹1.2 L total (indicative)";
  const bca = tier === "premium" ? "₹1.3 L – ₹1.6 L total (indicative)" : tier === "legacy" ? "₹0.4 L – ₹1.0 L total (indicative)" : "₹0.7 L – ₹1.2 L total (indicative)";
  const ba = tier === "premium" ? "₹0.9 L – ₹1.1 L total (indicative)" : tier === "legacy" ? "₹0.15 L – ₹0.5 L total (indicative)" : "₹0.5 L – ₹0.8 L total (indicative)";
  return [
    { name: "Online MBA", level: "PG", duration: "2 years (4 semesters)", feesLabel: mba },
    { name: "Online MCA", level: "PG", duration: "2 years (4 semesters)", feesLabel: mca },
    { name: "Online M.Com", level: "PG", duration: "2 years (4 semesters)", feesLabel: mcom },
    { name: "Online BBA", level: "UG", duration: "3 years (6 semesters)", feesLabel: bba },
    { name: "Online BCA", level: "UG", duration: "3 years (6 semesters)", feesLabel: bca },
    { name: "Online BA", level: "UG", duration: "3 years (6 semesters)", feesLabel: ba },
  ];
};

const sureshGyanVihar: OnlineUniFacts = {
  slug: "suresh-gyan-vihar-university-online",
  displayName: "Suresh Gyan Vihar University (Online)",
  uniName: "Suresh Gyan Vihar University",
  platformName: "Suresh Gyan Vihar University Online",
  city: "Jaipur",
  state: "Rajasthan",
  estd: 2008,
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  approvals: [],
  feesLabel: "₹0.7 L – ₹1.3 L (indicative range)",
  feesNum: 100000,
};

const tnou: OnlineUniFacts = {
  slug: "tamil-nadu-open-university",
  displayName: "Tamil Nadu Open University",
  uniName: "Tamil Nadu Open University (TNOU)",
  platformName: "TNOU",
  city: "Chennai",
  state: "Tamil Nadu",
  estd: 2002,
  universityType: "State Open University",
  wesRecognised: false,
  isOpenUniversity: true,
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("legacy"),
  feeNote: "As a state open university, fees are notably lower than private online universities.",
  approvals: [],
  feesLabel: "₹0.3 L – ₹1.0 L (indicative range)",
  feesNum: 60000,
};

const madrasUni: OnlineUniFacts = {
  slug: "university-of-madras-online",
  displayName: "University of Madras (Online)",
  uniName: "University of Madras",
  platformName: "University of Madras Institute of Distance Education (IDE)",
  city: "Chennai",
  state: "Tamil Nadu",
  estd: 1857,
  universityType: "State Government University",
  wesRecognised: false,
  isOpenUniversity: true,
  groupNote: "one of India's oldest universities, with a long-established Institute of Distance Education",
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("legacy"),
  feeNote: "As a state government university, fees are notably lower than private online universities.",
  approvals: [],
  feesLabel: "₹0.3 L – ₹1.0 L (indicative range)",
  feesNum: 65000,
};

const vmou: OnlineUniFacts = {
  slug: "vardhman-mahaveer-open-university",
  displayName: "Vardhman Mahaveer Open University",
  uniName: "Vardhman Mahaveer Open University (VMOU)",
  platformName: "VMOU",
  city: "Kota",
  state: "Rajasthan",
  estd: 1987,
  universityType: "State Open University",
  wesRecognised: false,
  isOpenUniversity: true,
  groupNote: "Rajasthan's state open university",
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("legacy"),
  feeNote: "As a state open university, fees are notably lower than private online universities.",
  approvals: [],
  feesLabel: "₹0.3 L – ₹1.0 L (indicative range)",
  feesNum: 60000,
};

const vignans: OnlineUniFacts = {
  slug: "vignan-s-foundation-online",
  displayName: "Vignan's Foundation (Online)",
  uniName: "Vignan's Foundation for Science, Technology and Research",
  platformName: "Vignan Online",
  city: "Guntur",
  state: "Andhra Pradesh",
  universityType: "Deemed to be University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  approvals: [],
  feesLabel: "₹0.7 L – ₹1.3 L (indicative range)",
  feesNum: 100000,
};

const vivekanandaGlobal: OnlineUniFacts = {
  slug: "vivekananda-global-university-online",
  displayName: "Vivekananda Global University (Online)",
  uniName: "Vivekananda Global University",
  platformName: "Vivekananda Global University Online",
  city: "Jaipur",
  state: "Rajasthan",
  estd: 2012,
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  approvals: [],
  feesLabel: "₹0.7 L – ₹1.3 L (indicative range)",
  feesNum: 100000,
};

const ycmou: OnlineUniFacts = {
  slug: "yashwantrao-chavan-maharashtra-open-university",
  displayName: "Yashwantrao Chavan Maharashtra Open University",
  uniName: "Yashwantrao Chavan Maharashtra Open University (YCMOU)",
  platformName: "YCMOU",
  city: "Nashik",
  state: "Maharashtra",
  estd: 1989,
  universityType: "State Open University",
  wesRecognised: false,
  isOpenUniversity: true,
  groupNote: "Maharashtra's state open university",
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("legacy"),
  feeNote: "As a state open university, fees are notably lower than private online universities.",
  approvals: [],
  feesLabel: "₹0.3 L – ₹1.0 L (indicative range)",
  feesNum: 60000,
};

export const onlineBatch9: CollegeContentPack[] = [
  sureshGyanVihar,
  tnou,
  madrasUni,
  vmou,
  vignans,
  vivekanandaGlobal,
  ycmou,
].map(buildOnlinePack);
