import type { CollegeContentPack } from "./types";
import { buildOnlinePack, type OnlineUniFacts } from "./onlineHelpers";

// Online-degree content packs — "ultra-rich" tier, same 34-section/8-tab depth
// as the Manipal University Jaipur (Online) flagship template.
// Batch 3 of 4 (6 colleges): UPES, Parul, Bharati Vidyapeeth, DY Patil Vidyapeeth, NMIMS ×2.

const stdPrograms = (tier: "premium" | "standard" = "standard"): OnlineUniFacts["programs"] => {
  const mba = tier === "premium" ? "₹1.6 L – ₹2.0 L total (indicative)" : "₹1.3 L – ₹1.7 L total (indicative)";
  const mca = tier === "premium" ? "₹1.4 L – ₹1.7 L total (indicative)" : "₹1.2 L – ₹1.5 L total (indicative)";
  const mcom = tier === "premium" ? "₹0.9 L – ₹1.2 L total (indicative)" : "₹0.8 L – ₹1.0 L total (indicative)";
  const bba = tier === "premium" ? "₹1.4 L – ₹1.7 L total (indicative)" : "₹1.1 L – ₹1.4 L total (indicative)";
  const bca = tier === "premium" ? "₹1.3 L – ₹1.6 L total (indicative)" : "₹1.1 L – ₹1.4 L total (indicative)";
  const ba = tier === "premium" ? "₹0.9 L – ₹1.1 L total (indicative)" : "₹0.7 L – ₹0.9 L total (indicative)";
  return [
    { name: "Online MBA", level: "PG", duration: "2 years (4 semesters)", feesLabel: mba },
    { name: "Online MCA", level: "PG", duration: "2 years (4 semesters)", feesLabel: mca },
    { name: "Online M.Com", level: "PG", duration: "2 years (4 semesters)", feesLabel: mcom },
    { name: "Online BBA", level: "UG", duration: "3 years (6 semesters)", feesLabel: bba },
    { name: "Online BCA", level: "UG", duration: "3 years (6 semesters)", feesLabel: bca },
    { name: "Online BA", level: "UG", duration: "3 years (6 semesters)", feesLabel: ba },
  ];
};

const upes: OnlineUniFacts = {
  slug: "upes-online",
  displayName: "UPES Online",
  uniName: "UPES (University of Petroleum and Energy Studies)",
  platformName: "UPES Online",
  city: "Dehradun",
  state: "Uttarakhand",
  estd: 2003,
  universityType: "State Private University",
  naacGrade: "A",
  wesRecognised: true,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.upes.ac.in",
  approvals: ["AICTE-approved (relevant programmes)"],
  feesLabel: "₹1.1 L – ₹1.7 L (indicative range)",
  feesNum: 140000,
};

const parul: OnlineUniFacts = {
  slug: "parul-university-online",
  displayName: "Parul University (Online)",
  uniName: "Parul University",
  platformName: "Parul Online",
  city: "Vadodara",
  state: "Gujarat",
  estd: 2015,
  universityType: "State Private University",
  naacGrade: "A+",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.paruluniversity.ac.in",
  approvals: [],
  feesLabel: "₹1.0 L – ₹1.6 L (indicative range)",
  feesNum: 130000,
};

const bharatiVidyapeeth: OnlineUniFacts = {
  slug: "bharati-vidyapeeth-online",
  displayName: "Bharati Vidyapeeth (Online)",
  uniName: "Bharati Vidyapeeth (Deemed to be University)",
  platformName: "Bharati Vidyapeeth Online",
  city: "Pune",
  state: "Maharashtra",
  estd: 1964,
  universityType: "Deemed to be University",
  naacGrade: "A",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://www.bharatividyapeeth.edu",
  approvals: [],
  feesLabel: "₹1.0 L – ₹1.6 L (indicative range)",
  feesNum: 130000,
};

const dyPatilVidyapeeth: OnlineUniFacts = {
  slug: "dr-d-y-patil-vidyapeeth-online",
  displayName: "Dr. D.Y. Patil Vidyapeeth (Online)",
  uniName: "Dr. D.Y. Patil Vidyapeeth",
  platformName: "DY Patil Vidyapeeth Online",
  city: "Pune",
  state: "Maharashtra",
  universityType: "Deemed to be University",
  wesRecognised: false,
  groupNote: "part of the D.Y. Patil Group of institutions",
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://dpuonline.in",
  approvals: [],
  feesLabel: "₹1.0 L – ₹1.6 L (indicative range)",
  feesNum: 130000,
};

const nmimsGlobal: OnlineUniFacts = {
  slug: "nmims-global-access",
  displayName: "NMIMS Global Access",
  uniName: "SVKM's NMIMS (Deemed to be University)",
  platformName: "NMIMS Global Access School for Continuing Education (NGA-SCE)",
  city: "Mumbai",
  state: "Maharashtra",
  universityType: "Deemed to be University",
  naacGrade: "A++",
  wesRecognised: true,
  groupNote: "run by the SVKM group",
  flagshipProgram: "Online MBA",
  programs: stdPrograms("premium"),
  website: "https://online.nmims.edu",
  approvals: [],
  feesLabel: "₹1.4 L – ₹2.0 L (indicative range)",
  feesNum: 165000,
};

const nmimsDistance: OnlineUniFacts = {
  slug: "nmims-online-distance",
  displayName: "NMIMS Online (Distance)",
  uniName: "SVKM's NMIMS (Deemed to be University)",
  platformName: "NMIMS Centre for Distance and Online Education (NCDOE)",
  city: "Mumbai",
  state: "Maharashtra",
  universityType: "Deemed to be University",
  naacGrade: "A++",
  wesRecognised: true,
  groupNote: "NMIMS's distance-and-online education division, distinct from NGA-SCE",
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://ncdoe.nmims.edu",
  approvals: [],
  feesLabel: "₹1.1 L – ₹1.7 L (indicative range)",
  feesNum: 140000,
};

export const onlineBatch3: CollegeContentPack[] = [upes, parul, bharatiVidyapeeth, dyPatilVidyapeeth, nmimsGlobal, nmimsDistance].map(buildOnlinePack);
