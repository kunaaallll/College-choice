import type { CollegeContentPack } from "./types";
import { buildOnlinePack, type OnlineUniFacts } from "./onlineHelpers";

// Online-degree content packs — "ultra-rich" tier, same 34-section/8-tab depth
// as the Manipal University Jaipur (Online) flagship template.
// Batch 4 of 4a (6 colleges): ICFAI, O.P. Jindal Global University, Chitkara, GLA, Sikkim Manipal, Alliance.

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

const icfai: OnlineUniFacts = {
  slug: "icfai-university-online",
  displayName: "ICFAI University (Online)",
  uniName: "ICFAI Foundation for Higher Education (IFHE), Hyderabad",
  platformName: "ICFAI Online",
  city: "Hyderabad",
  state: "Telangana",
  universityType: "Deemed to be University",
  wesRecognised: false,
  groupNote: "part of the ICFAI Group of institutions",
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://www.icfaionline.com",
  approvals: [],
  feesLabel: "₹1.0 L – ₹1.6 L (indicative range)",
  feesNum: 130000,
};

const jgu: OnlineUniFacts = {
  slug: "o-p-jindal-global-university-online",
  displayName: "O.P. Jindal Global University (Online)",
  uniName: "O.P. Jindal Global University (JGU)",
  platformName: "JGU Online",
  city: "Sonipat",
  state: "Haryana",
  estd: 2009,
  universityType: "Deemed to be University",
  naacGrade: "A++",
  wesRecognised: true,
  groupNote: "recognised by the UGC as an Institution of Eminence",
  flagshipProgram: "Online MBA",
  programs: stdPrograms("premium"),
  website: "https://online.jgu.edu.in",
  approvals: [],
  feesLabel: "₹1.4 L – ₹2.0 L (indicative range)",
  feesNum: 165000,
};

const chitkara: OnlineUniFacts = {
  slug: "chitkara-university-online",
  displayName: "Chitkara University (Online)",
  uniName: "Chitkara University",
  platformName: "Chitkara Online",
  city: "Rajpura",
  state: "Punjab",
  estd: 2010,
  universityType: "State Private University",
  naacGrade: "A+",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.chitkara.edu.in",
  approvals: [],
  feesLabel: "₹1.0 L – ₹1.6 L (indicative range)",
  feesNum: 130000,
};

const gla: OnlineUniFacts = {
  slug: "gla-university-online",
  displayName: "GLA University (Online)",
  uniName: "GLA University",
  platformName: "GLA Online",
  city: "Mathura",
  state: "Uttar Pradesh",
  estd: 2010,
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.gla.ac.in",
  approvals: [],
  feesLabel: "₹1.0 L – ₹1.5 L (indicative range)",
  feesNum: 125000,
};

const sikkimManipal: OnlineUniFacts = {
  slug: "sikkim-manipal-university-online",
  displayName: "Sikkim Manipal University (Online)",
  uniName: "Sikkim Manipal University",
  platformName: "Sikkim Manipal University Online",
  city: "Gangtok",
  state: "Sikkim",
  universityType: "State Private University",
  wesRecognised: false,
  groupNote: "part of the Manipal Education & Medical Group (MEMG)",
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://www.smu.edu.in",
  approvals: [],
  feesLabel: "₹1.0 L – ₹1.6 L (indicative range)",
  feesNum: 130000,
};

const alliance: OnlineUniFacts = {
  slug: "alliance-university-online",
  displayName: "Alliance University (Online)",
  uniName: "Alliance University",
  platformName: "Alliance Online",
  city: "Bengaluru",
  state: "Karnataka",
  estd: 2010,
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.alliance.edu.in",
  approvals: [],
  feesLabel: "₹1.1 L – ₹1.7 L (indicative range)",
  feesNum: 140000,
};

export const onlineBatch4: CollegeContentPack[] = [icfai, jgu, chitkara, gla, sikkimManipal, alliance].map(buildOnlinePack);
