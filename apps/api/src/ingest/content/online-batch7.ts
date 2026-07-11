import type { CollegeContentPack } from "./types";
import { buildOnlinePack, type OnlineUniFacts } from "./onlineHelpers";

// Online-degree content packs — "ultra-rich" tier, same 34-section/8-tab depth
// as the Manipal University Jaipur (Online) flagship template.
// Batch 7 of 9 (7 colleges): Andhra University, Annamalai University,
// Bharathiar University, Dr. B.R. Ambedkar Open University, Dr. C.V. Raman
// University, IGNOU, Jaipur National University.
// isOpenUniversity: true toggles the "About" framing to a legacy-ODL tone
// (predates UGC 2020, decades of distance-education history) rather than the
// "flexible private online wing" pitch used for newer private universities.

const stdPrograms = (tier: "premium" | "standard" = "standard"): OnlineUniFacts["programs"] => {
  const mba = tier === "premium" ? "₹1.6 L – ₹2.0 L total (indicative)" : "₹0.5 L – ₹1.2 L total (indicative)";
  const mca = tier === "premium" ? "₹1.4 L – ₹1.7 L total (indicative)" : "₹0.4 L – ₹1.0 L total (indicative)";
  const mcom = tier === "premium" ? "₹0.9 L – ₹1.2 L total (indicative)" : "₹0.2 L – ₹0.6 L total (indicative)";
  const bba = tier === "premium" ? "₹1.4 L – ₹1.7 L total (indicative)" : "₹0.4 L – ₹1.0 L total (indicative)";
  const bca = tier === "premium" ? "₹1.3 L – ₹1.6 L total (indicative)" : "₹0.4 L – ₹1.0 L total (indicative)";
  const ba = tier === "premium" ? "₹0.9 L – ₹1.1 L total (indicative)" : "₹0.15 L – ₹0.5 L total (indicative)";
  return [
    { name: "Online MBA", level: "PG", duration: "2 years (4 semesters)", feesLabel: mba },
    { name: "Online MCA", level: "PG", duration: "2 years (4 semesters)", feesLabel: mca },
    { name: "Online M.Com", level: "PG", duration: "2 years (4 semesters)", feesLabel: mcom },
    { name: "Online BBA", level: "UG", duration: "3 years (6 semesters)", feesLabel: bba },
    { name: "Online BCA", level: "UG", duration: "3 years (6 semesters)", feesLabel: bca },
    { name: "Online BA", level: "UG", duration: "3 years (6 semesters)", feesLabel: ba },
  ];
};

const andhraUni: OnlineUniFacts = {
  slug: "andhra-university-online",
  displayName: "Andhra University (Online)",
  uniName: "Andhra University",
  platformName: "Andhra University Directorate of Distance Education",
  city: "Visakhapatnam",
  state: "Andhra Pradesh",
  estd: 1926,
  universityType: "State Government University",
  wesRecognised: false,
  isOpenUniversity: true,
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("standard"),
  feeNote: "As a state government university, fees are notably lower than private online universities.",
  approvals: [],
  feesLabel: "₹0.4 L – ₹1.2 L (indicative range)",
  feesNum: 80000,
};

const annamalaiUni: OnlineUniFacts = {
  slug: "annamalai-university-online",
  displayName: "Annamalai University (Online)",
  uniName: "Annamalai University",
  platformName: "Annamalai University Directorate of Distance Education",
  city: "Chidambaram",
  state: "Tamil Nadu",
  estd: 1929,
  universityType: "State Government University",
  wesRecognised: false,
  isOpenUniversity: true,
  groupNote: "one of India's oldest and largest distance-education providers by enrolment",
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("standard"),
  feeNote: "As a state government university, fees are notably lower than private online universities.",
  approvals: [],
  feesLabel: "₹0.4 L – ₹1.2 L (indicative range)",
  feesNum: 80000,
};

const bharathiarUni: OnlineUniFacts = {
  slug: "bharathiar-university-online",
  displayName: "Bharathiar University (Online)",
  uniName: "Bharathiar University",
  platformName: "Bharathiar University School of Distance Education",
  city: "Coimbatore",
  state: "Tamil Nadu",
  estd: 1982,
  universityType: "State Government University",
  wesRecognised: false,
  isOpenUniversity: true,
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("standard"),
  feeNote: "As a state government university, fees are notably lower than private online universities.",
  approvals: [],
  feesLabel: "₹0.4 L – ₹1.2 L (indicative range)",
  feesNum: 80000,
};

const braou: OnlineUniFacts = {
  slug: "dr-b-r-ambedkar-open-university",
  displayName: "Dr. B.R. Ambedkar Open University",
  uniName: "Dr. B.R. Ambedkar Open University (BRAOU)",
  platformName: "BRAOU",
  city: "Hyderabad",
  state: "Telangana",
  estd: 1982,
  universityType: "State Open University",
  wesRecognised: false,
  isOpenUniversity: true,
  groupNote: "India's first state open university",
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("standard"),
  feeNote: "As a state open university, fees are notably lower than private online universities.",
  approvals: [],
  feesLabel: "₹0.3 L – ₹1.0 L (indicative range)",
  feesNum: 65000,
};

const cvRaman: OnlineUniFacts = {
  slug: "dr-c-v-raman-university-online",
  displayName: "Dr. C.V. Raman University (Online)",
  uniName: "Dr. C.V. Raman University",
  platformName: "Dr. C.V. Raman University Online",
  city: "Bilaspur",
  state: "Chhattisgarh",
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  approvals: [],
  feesLabel: "₹0.8 L – ₹1.4 L (indicative range)",
  feesNum: 110000,
};

const ignou: OnlineUniFacts = {
  slug: "ignou",
  displayName: "IGNOU",
  uniName: "Indira Gandhi National Open University (IGNOU)",
  platformName: "IGNOU",
  city: "New Delhi",
  state: "Delhi",
  estd: 1985,
  universityType: "Central Open University",
  naacGrade: "A++",
  wesRecognised: true,
  groupNote: "the world's largest open university by enrolment",
  flagshipProgram: "Online/Distance MBA",
  programs: stdPrograms("standard"),
  feeNote: "IGNOU is widely regarded as one of the most affordable recognised degree options in India, with fees a fraction of most private online universities.",
  isOpenUniversity: true,
  approvals: [],
  feesLabel: "₹0.15 L – ₹0.6 L (indicative range)",
  feesNum: 40000,
};

const jnuJaipur: OnlineUniFacts = {
  slug: "jaipur-national-university-online",
  displayName: "Jaipur National University (Online)",
  uniName: "Jaipur National University",
  platformName: "JNU Jaipur Online",
  city: "Jaipur",
  state: "Rajasthan",
  estd: 2007,
  universityType: "State Private University",
  wesRecognised: false,
  flagshipProgram: "Online MBA",
  programs: stdPrograms("standard"),
  approvals: [],
  feesLabel: "₹0.8 L – ₹1.4 L (indicative range)",
  feesNum: 110000,
};

export const onlineBatch7: CollegeContentPack[] = [andhraUni, annamalaiUni, bharathiarUni, braou, cvRaman, ignou, jnuJaipur].map(buildOnlinePack);
