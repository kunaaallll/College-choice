import type { CollegeContentPack } from "./types";
import { buildOnlinePack, type OnlineUniFacts } from "./onlineHelpers";

// Online-degree content packs — "ultra-rich" tier, same 34-section/8-tab depth
// as the Manipal University Jaipur (Online) flagship template.
// Batch 6 of 9: these 7 slugs are apparent DUPLICATE DB rows for institutions
// already authored in online-batch1/2/3 (same institution, same city, a
// second college record). Content reuses the same facts as the sibling slug
// rather than inventing a distinct identity — flagged separately for the
// user to decide whether to merge/delete the duplicate rows.

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

const amityNoida: OnlineUniFacts = {
  slug: "amity-university-online-noida",
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
  website: "https://amityonline.com",
  approvals: ["AICTE-approved (relevant programmes)"],
  feesLabel: "₹1.3 L – ₹2.0 L (indicative range)",
  feesNum: 160000,
};

const chandigarhMohali: OnlineUniFacts = {
  slug: "chandigarh-university-online-mohali",
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

const dyPatilUniversity: OnlineUniFacts = {
  slug: "dy-patil-university-online",
  displayName: "DY Patil University Online",
  uniName: "D.Y. Patil University",
  platformName: "DY Patil University Online",
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

const jainBengaluru: OnlineUniFacts = {
  slug: "jain-university-online-bengaluru",
  displayName: "Jain University (Online)",
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

const lpuPhagwara: OnlineUniFacts = {
  slug: "lovely-professional-university-online-phagwara",
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
  website: "https://www.lpuonline.com",
  approvals: ["AICTE-approved (relevant programmes)"],
  feesLabel: "₹1.1 L – ₹1.7 L (indicative range)",
  feesNum: 140000,
};

const mujJaipur: OnlineUniFacts = {
  slug: "manipal-university-jaipur-online-jaipur",
  displayName: "Manipal University Jaipur (Online)",
  uniName: "Manipal University Jaipur",
  platformName: "Online Manipal",
  city: "Jaipur",
  state: "Rajasthan",
  estd: 2011,
  universityType: "State Private University",
  naacGrade: "A+",
  wesRecognised: true,
  groupNote: "part of the Manipal Education & Medical Group (MEMG)",
  flagshipProgram: "Online MBA",
  programs: stdPrograms("premium"),
  website: "https://online.manipal.edu",
  approvals: [],
  feesLabel: "₹1.3 L – ₹2.0 L (indicative range)",
  feesNum: 160000,
};

const upesDehradun: OnlineUniFacts = {
  slug: "upes-online-dehradun",
  displayName: "UPES (Online)",
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

export const onlineBatch6: CollegeContentPack[] = [
  amityNoida,
  chandigarhMohali,
  dyPatilUniversity,
  jainBengaluru,
  lpuPhagwara,
  mujJaipur,
  upesDehradun,
].map(buildOnlinePack);
