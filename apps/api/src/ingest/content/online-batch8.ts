import type { CollegeContentPack } from "./types";
import { buildOnlinePack, type OnlineUniFacts } from "./onlineHelpers";

// Online-degree content packs — "ultra-rich" tier, same 34-section/8-tab depth
// as the Manipal University Jaipur (Online) flagship template.
// Batch 8 of 9 (7 colleges): Kalinga University, Karnataka State Open
// University, Kurukshetra University, Lingaya's Vidyapeeth, Mangalayatan
// University, Netaji Subhas Open University, Sri Sri University.

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

const kalinga: OnlineUniFacts = {
  slug: "kalinga-university-online",
  displayName: "Kalinga University (Online)",
  uniName: "Kalinga University",
  platformName: "Kalinga University Online",
  city: "Raipur",
  state: "Chhattisgarh",
  estd: 2013,
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  approvals: [],
  feesLabel: "₹0.7 L – ₹1.3 L (indicative range)",
  feesNum: 100000,
};

const ksou: OnlineUniFacts = {
  slug: "karnataka-state-open-university",
  displayName: "Karnataka State Open University",
  uniName: "Karnataka State Open University (KSOU)",
  platformName: "KSOU",
  city: "Mysuru",
  state: "Karnataka",
  estd: 1996,
  universityType: "State Open University",
  wesRecognised: false,
  isOpenUniversity: true,
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("legacy"),
  feeNote: "As a state open university, fees are notably lower than private online universities. KSOU has, in the past, faced periods of paused fresh admissions pending UGC-DEB re-approval for specific programmes/years — always verify current-year entitlement status directly with KSOU or the UGC-DEB portal before enrolling.",
  approvals: [],
  feesLabel: "₹0.3 L – ₹1.0 L (indicative range)",
  feesNum: 60000,
};

const kurukshetraUni: OnlineUniFacts = {
  slug: "kurukshetra-university-online",
  displayName: "Kurukshetra University (Online)",
  uniName: "Kurukshetra University",
  platformName: "Kurukshetra University Directorate of Distance Education",
  city: "Kurukshetra",
  state: "Haryana",
  estd: 1956,
  universityType: "State Government University",
  wesRecognised: false,
  isOpenUniversity: true,
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("legacy"),
  feeNote: "As a state government university, fees are notably lower than private online universities.",
  approvals: [],
  feesLabel: "₹0.3 L – ₹1.0 L (indicative range)",
  feesNum: 65000,
};

const lingayas: OnlineUniFacts = {
  slug: "lingaya-s-vidyapeeth-online",
  displayName: "Lingaya's Vidyapeeth (Online)",
  uniName: "Lingaya's Vidyapeeth",
  platformName: "Lingaya's Vidyapeeth Online",
  city: "Faridabad",
  state: "Haryana",
  universityType: "Deemed to be University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  approvals: [],
  feesLabel: "₹0.7 L – ₹1.3 L (indicative range)",
  feesNum: 100000,
};

const mangalayatan: OnlineUniFacts = {
  slug: "mangalayatan-university-online",
  displayName: "Mangalayatan University (Online)",
  uniName: "Mangalayatan University",
  platformName: "Mangalayatan University Online",
  city: "Aligarh",
  state: "Uttar Pradesh",
  estd: 2006,
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  approvals: [],
  feesLabel: "₹0.7 L – ₹1.3 L (indicative range)",
  feesNum: 100000,
};

const nsou: OnlineUniFacts = {
  slug: "netaji-subhas-open-university",
  displayName: "Netaji Subhas Open University",
  uniName: "Netaji Subhas Open University (NSOU)",
  platformName: "NSOU",
  city: "Kolkata",
  state: "West Bengal",
  estd: 1997,
  universityType: "State Open University",
  wesRecognised: false,
  isOpenUniversity: true,
  groupNote: "West Bengal's state open university",
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("legacy"),
  feeNote: "As a state open university, fees are notably lower than private online universities.",
  approvals: [],
  feesLabel: "₹0.3 L – ₹1.0 L (indicative range)",
  feesNum: 60000,
};

const sriSri: OnlineUniFacts = {
  slug: "sri-sri-university-online",
  displayName: "Sri Sri University (Online)",
  uniName: "Sri Sri University",
  platformName: "Sri Sri University Online",
  city: "Cuttack",
  state: "Odisha",
  estd: 2009,
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  approvals: [],
  feesLabel: "₹0.7 L – ₹1.3 L (indicative range)",
  feesNum: 100000,
};

export const onlineBatch8: CollegeContentPack[] = [kalinga, ksou, kurukshetraUni, lingayas, mangalayatan, nsou, sriSri].map(buildOnlinePack);
