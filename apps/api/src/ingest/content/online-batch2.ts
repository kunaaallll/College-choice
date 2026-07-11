import type { CollegeContentPack } from "./types";
import { buildOnlinePack, type OnlineUniFacts } from "./onlineHelpers";

// Online-degree content packs — "ultra-rich" tier, same 34-section/8-tab depth
// as the Manipal University Jaipur (Online) flagship template.
// Batch 2 of 4 (7 colleges): Amity, LPU, Chandigarh University, Jain, SRM, VIT, Sharda.

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

const amity: OnlineUniFacts = {
  slug: "amity-university-online",
  displayName: "Amity University (Online)",
  uniName: "Amity University",
  platformName: "Amity University Online",
  city: "Noida",
  state: "Uttar Pradesh",
  estd: 2005,
  universityType: "State Private University",
  naacGrade: "A+",
  wesRecognised: true,
  groupNote: "part of the Ritnand Balved Education Foundation (Amity Group)",
  flagshipProgram: "Online MBA",
  programs: stdPrograms("premium"),
  feeNote: "The Online MBA is typically split across 4 semesters of roughly ₹40,000–₹50,000 each.",
  website: "https://amityonline.com",
  approvals: ["AICTE-approved (relevant programmes)"],
  feesLabel: "₹1.3 L – ₹2.0 L (indicative range)",
  feesNum: 160000,
};

const lpu: OnlineUniFacts = {
  slug: "lovely-professional-university-online",
  displayName: "Lovely Professional University (Online)",
  uniName: "Lovely Professional University",
  platformName: "LPU Online",
  city: "Phagwara",
  state: "Punjab",
  estd: 2005,
  universityType: "State Private University",
  naacGrade: "A++",
  wesRecognised: true,
  groupNote: "one of India's largest private universities by student strength",
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  feeNote: "LPU Online is generally positioned as one of the more affordable options among large private-university online programmes.",
  website: "https://www.lpuonline.com",
  approvals: ["AICTE-approved (relevant programmes)"],
  feesLabel: "₹1.1 L – ₹1.7 L (indicative range)",
  feesNum: 140000,
};

const chandigarhUni: OnlineUniFacts = {
  slug: "chandigarh-university-online",
  displayName: "Chandigarh University (Online)",
  uniName: "Chandigarh University",
  platformName: "Chandigarh University Online",
  city: "Mohali",
  state: "Punjab",
  estd: 2012,
  universityType: "State Private University",
  naacGrade: "A+",
  wesRecognised: true,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.cuchd.in",
  approvals: ["AICTE-approved (relevant programmes)"],
  feesLabel: "₹1.1 L – ₹1.7 L (indicative range)",
  feesNum: 140000,
};

const jain: OnlineUniFacts = {
  slug: "jain-university-online",
  displayName: "Jain University Online",
  uniName: "Jain (Deemed-to-be University)",
  platformName: "Jain Online",
  city: "Bengaluru",
  state: "Karnataka",
  universityType: "Deemed to be University",
  naacGrade: "A+",
  wesRecognised: true,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://www.jainonline.ac.in",
  approvals: [],
  feesLabel: "₹1.1 L – ₹1.7 L (indicative range)",
  feesNum: 140000,
};

const srm: OnlineUniFacts = {
  slug: "srm-university-online",
  displayName: "SRM University Online",
  uniName: "SRM Institute of Science and Technology",
  platformName: "SRM Online",
  city: "Chennai",
  state: "Tamil Nadu",
  universityType: "Deemed to be University",
  naacGrade: "A++",
  wesRecognised: true,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("premium"),
  website: "https://online.srmuniv.ac.in",
  approvals: [],
  feesLabel: "₹1.3 L – ₹2.0 L (indicative range)",
  feesNum: 160000,
};

const vit: OnlineUniFacts = {
  slug: "vit-online",
  displayName: "VIT Online",
  uniName: "Vellore Institute of Technology (VIT)",
  platformName: "VIT Online",
  city: "Vellore",
  state: "Tamil Nadu",
  estd: 1984,
  universityType: "Deemed to be University",
  naacGrade: "A++",
  wesRecognised: true,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("premium"),
  website: "https://online.vit.ac.in",
  approvals: [],
  feesLabel: "₹1.3 L – ₹2.0 L (indicative range)",
  feesNum: 160000,
};

const sharda: OnlineUniFacts = {
  slug: "sharda-university-online",
  displayName: "Sharda University (Online)",
  uniName: "Sharda University",
  platformName: "Sharda Online",
  city: "Greater Noida",
  state: "Uttar Pradesh",
  estd: 2009,
  universityType: "State Private University",
  naacGrade: "A+",
  wesRecognised: true,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  website: "https://online.sharda.ac.in",
  approvals: ["AICTE-approved (relevant programmes)"],
  feesLabel: "₹1.1 L – ₹1.7 L (indicative range)",
  feesNum: 140000,
};

export const onlineBatch2: CollegeContentPack[] = [amity, lpu, chandigarhUni, jain, srm, vit, sharda].map(buildOnlinePack);
