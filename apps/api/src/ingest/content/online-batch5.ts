import type { CollegeContentPack } from "./types";
import { buildOnlinePack, type OnlineUniFacts } from "./onlineHelpers";

// Online-degree content packs — "ultra-rich" tier, same 34-section/8-tab depth
// as the Manipal University Jaipur (Online) flagship template.
// Batch 5 of 5 (6 colleges): Amrita AHEAD, Hindustan IT&S, Uttaranchal, Shoolini,
// Symbiosis Centre for Distance Learning, Arka Jain.
// Completes the 25-college batch requested.

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

const amritaAhead: OnlineUniFacts = {
  slug: "amrita-ahead-online",
  displayName: "Amrita AHEAD (Online)",
  uniName: "Amrita Vishwa Vidyapeetham",
  platformName: "Amrita AHEAD",
  city: "Coimbatore",
  state: "Tamil Nadu",
  estd: 2003,
  universityType: "Deemed to be University",
  naacGrade: "A++",
  wesRecognised: true,
  groupNote: "recognised by the UGC as an Institution of Eminence",
  flagshipProgram: "Online MBA",
  programs: stdPrograms("premium"),
  website: "https://ahead.amrita.edu",
  approvals: [],
  feesLabel: "₹1.3 L – ₹2.0 L (indicative range)",
  feesNum: 160000,
};

const hindustanITS: OnlineUniFacts = {
  slug: "hindustan-institute-of-technology-and-science-online",
  displayName: "Hindustan Institute of Technology & Science (Online)",
  uniName: "Hindustan Institute of Technology and Science",
  platformName: "Hindustan Online",
  city: "Chennai",
  state: "Tamil Nadu",
  estd: 2008,
  universityType: "Deemed to be University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.hindustanuniv.ac.in",
  approvals: [],
  feesLabel: "₹1.0 L – ₹1.6 L (indicative range)",
  feesNum: 130000,
};

const uttaranchal: OnlineUniFacts = {
  slug: "uttaranchal-university-online",
  displayName: "Uttaranchal University (Online)",
  uniName: "Uttaranchal University",
  platformName: "Uttaranchal University Online",
  city: "Dehradun",
  state: "Uttarakhand",
  estd: 2013,
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.uttaranchaluniversity.ac.in",
  approvals: [],
  feesLabel: "₹1.0 L – ₹1.5 L (indicative range)",
  feesNum: 125000,
};

const shoolini: OnlineUniFacts = {
  slug: "shoolini-university-online",
  displayName: "Shoolini University (Online)",
  uniName: "Shoolini University",
  platformName: "Shoolini Online",
  city: "Solan",
  state: "Himachal Pradesh",
  estd: 2009,
  universityType: "State Private University",
  naacGrade: "A+",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.shooliniuniversity.com",
  approvals: [],
  feesLabel: "₹1.0 L – ₹1.6 L (indicative range)",
  feesNum: 130000,
};

const scdl: OnlineUniFacts = {
  slug: "symbiosis-centre-for-distance-learning",
  displayName: "Symbiosis Centre for Distance Learning",
  uniName: "Symbiosis International (Deemed University)",
  platformName: "Symbiosis Centre for Distance Learning (SCDL)",
  city: "Pune",
  state: "Maharashtra",
  universityType: "Deemed to be University",
  naacGrade: "A++",
  wesRecognised: true,
  groupNote: "SCDL is Symbiosis International's dedicated distance-and-online learning division",
  flagshipProgram: "Online MBA / PGDBA",
  programs: stdPrograms("standard"),
  website: "https://www.scdl.net",
  approvals: [],
  feesLabel: "₹0.9 L – ₹1.5 L (indicative range)",
  feesNum: 120000,
};

const arkaJain: OnlineUniFacts = {
  slug: "arka-jain-university-online",
  displayName: "Arka Jain University (Online)",
  uniName: "Arka Jain University",
  platformName: "Arka Jain Online",
  city: "Jamshedpur",
  state: "Jharkhand",
  estd: 2016,
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.arkajainuniversity.ac.in",
  approvals: [],
  feesLabel: "₹0.9 L – ₹1.4 L (indicative range)",
  feesNum: 115000,
};

export const onlineBatch5: CollegeContentPack[] = [amritaAhead, hindustanITS, uttaranchal, shoolini, scdl, arkaJain].map(buildOnlinePack);
