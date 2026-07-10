import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 1.
// Content depth matches NIRF-ranked batches (13 sections/8 tabs) but without
// a numeric NIRF rank, since NIRF only formally ranks the top 40 nationally.

const gitamDental: CollegeContentPack = {
  slug: "gitam-dental-college-and-hospital",
  college: {
    estd: 2000,
    website: "https://www.gitam.edu",
    feesNum: 1200000,
    feesLabel: "₹12.0 L",
    affiliation: "Deemed University (GITAM)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "GITAM Dental College Visakhapatnam — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "GITAM Dental College & Hospital, Visakhapatnam: BDS/MDS courses, fees, NEET admission, cutoff, hostel and scholarship details.",
    about:
      "GITAM Dental College and Hospital, part of GITAM (Gandhi Institute of Technology and Management) deemed university in Visakhapatnam, Andhra Pradesh, benefits from the broader GITAM group's established presence in engineering, management, and pharmacy education across multiple Indian campuses.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹12.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "3", feesLabel: "₹18.0 L total (indicative)" },
  ],
  highlights: [
    "Part of GITAM, a multi-campus deemed university with established engineering and management schools",
    "Located in Visakhapatnam, Andhra Pradesh's largest port city",
    "Access to GITAM's broader academic and research ecosystem",
    "Deemed-university curriculum flexibility",
  ],
  faqs: [
    { question: "How is admission to GITAM Dental College done?", answer: "Admission is via NEET-UG score; as a deemed university, GITAM conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About GITAM Dental College", body: "GITAM Dental College and Hospital operates under GITAM (Gandhi Institute of Technology and Management), a deemed university with campuses in Visakhapatnam, Bengaluru, and Hyderabad, established around 2000. The dental college runs BDS and MDS programmes across major dental specialities, benefiting from GITAM's broader multi-disciplinary academic reputation, particularly strong in engineering and management education.\n\nVisakhapatnam's status as Andhra Pradesh's largest port city and a growing IT/pharma hub gives the college access to a diverse regional patient base and professional network." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The GITAM campus in Visakhapatnam houses a dedicated dental hospital alongside the university's broader engineering, management, and pharmacy schools." },
    { tab: "info", heading: "Why Choose GITAM Dental", body: "- Part of a multi-campus deemed university with strong engineering/management reputation\n- Located in Visakhapatnam, a major Andhra Pradesh port city\n- Access to GITAM's broader academic ecosystem\n- Deemed-university curriculum flexibility" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹12.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 3 | ₹18.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with GITAM admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, GITAM sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. GITAM conducts its own centralised counselling for BDS seats based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, GITAM Dental's NEET cutoff has historically been moderately accessible. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with GITAM admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "GITAM Dental College is not among NIRF's formally ranked top-40 dental institutes, but GITAM as a whole ranks in NIRF's Engineering and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "GITAM provides on-campus hostel accommodation for men and women in Visakhapatnam, with mess facilities. Student life includes technical events and access to GITAM's broader multi-disciplinary campus culture." },
  ],
};

const kmcVadodara: CollegeContentPack = {
  slug: "k-m-shah-dental-college-and-hospital",
  college: {
    estd: 1986,
    website: "https://www.sumandeepvidyapeeth.edu.in",
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Deemed University (Sumandeep Vidyapeeth)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "K.M. Shah Dental College Vadodara — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "K.M. Shah Dental College & Hospital, Vadodara: BDS/MDS courses, fees, NEET admission, cutoff, hostel and scholarship details.",
    about:
      "K.M. Shah Dental College and Hospital, established in 1986 near Vadodara, Gujarat, operates under Sumandeep Vidyapeeth, a deemed university with a broader medical and health-sciences campus. The college has built a regional reputation across Gujarat over nearly four decades.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "3", feesLabel: "₹19.0 L total (indicative)" },
  ],
  highlights: [
    "Established 1986, nearly four decades of dental education history",
    "Part of Sumandeep Vidyapeeth's broader medical and health-sciences campus",
    "Strong regional reputation across Gujarat",
    "Deemed-university curriculum flexibility",
  ],
  faqs: [
    { question: "How is admission to K.M. Shah Dental College done?", answer: "Admission is via NEET-UG score; as a deemed university, Sumandeep Vidyapeeth conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About K.M. Shah Dental College", body: "K.M. Shah Dental College and Hospital was established in 1986 near Vadodara, Gujarat, operating under Sumandeep Vidyapeeth, a deemed university with a broader medical and health-sciences campus. The dental college runs BDS and MDS programmes across major dental specialities.\n\nOver nearly four decades, the college has built a strong regional reputation across Gujarat, benefiting from Sumandeep Vidyapeeth's integrated medical campus ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Sumandeep Vidyapeeth campus near Vadodara houses a dedicated dental hospital alongside the university's medical school, giving dental students access to cross-specialty clinical exposure." },
    { tab: "info", heading: "Why Choose K.M. Shah Dental College", body: "- Nearly four decades of dental education history\n- Access to Sumandeep Vidyapeeth's integrated medical campus\n- Strong regional Gujarat reputation\n- Deemed-university curriculum flexibility" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n| MDS — Orthodontics | 3 years | 3 | ₹19.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with Sumandeep Vidyapeeth admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Sumandeep Vidyapeeth sets its own fee structure. Fees are typically payable per year, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Sumandeep Vidyapeeth conducts its own centralised counselling for BDS seats based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Gujarat, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, the college's NEET cutoff has historically been moderately accessible. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Sumandeep Vidyapeeth admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "K.M. Shah Dental College is not among NIRF's formally ranked top-40 dental institutes but holds a solid regional reputation across Gujarat." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The Sumandeep Vidyapeeth campus provides on-campus hostel accommodation for men and women, with mess facilities. Student life includes technical events and access to the broader integrated medical-campus culture." },
  ],
};

const meenakshiAmmalStandalone: CollegeContentPack = {
  slug: "meenakshi-ammal-dental-college-and-hospital",
  college: {
    estd: 1985,
    feesNum: 1400000,
    feesLabel: "₹14.0 L",
    affiliation: "Deemed University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Meenakshi Ammal Dental College Chennai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Meenakshi Ammal Dental College & Hospital, Chennai: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Meenakshi Ammal Dental College and Hospital, established in 1985 in Chennai, Tamil Nadu, is a long-standing private dental institution within the city's dense private dental education ecosystem, distinct from its NIRF-ranked sister listing under Meenakshi Academy of Higher Education and Research.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹14.0 L total" },
  ],
  highlights: [
    "Established 1985, nearly four decades of dental education history in Chennai",
    "Long-standing presence within Tamil Nadu's dense private dental education ecosystem",
    "Deemed-university curriculum flexibility",
  ],
  faqs: [
    { question: "How is admission to Meenakshi Ammal Dental College done?", answer: "Admission is via NEET-UG score through the institution's own centralised counselling process for its BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Meenakshi Ammal Dental College", body: "Meenakshi Ammal Dental College and Hospital was established in 1985 in Chennai, Tamil Nadu, as a long-standing private dental institution within the city's dense private dental education ecosystem. The college runs a BDS programme across all core dental disciplines.\n\nOver nearly four decades, the college has built a stable regional reputation within Chennai's competitive private dental landscape." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Chennai with facilities across major specialities, serving a large urban patient base." },
    { tab: "info", heading: "Why Choose Meenakshi Ammal Dental College", body: "- Nearly four decades of dental education history\n- Established presence within Chennai's competitive dental landscape\n- Deemed-university curriculum flexibility" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹14.0 L |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a private deemed institution, the college sets its own fee structure. Fees are typically payable per year, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college conducts its own centralised counselling for BDS seats based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its private-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with the college's admissions office." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation support" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Meenakshi Ammal Dental College is not separately listed in NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Chennai, with mess facilities." },
  ],
};

export const dentalBatch5: CollegeContentPack[] = [
  gitamDental,
  kmcVadodara,
  meenakshiAmmalStandalone,
];
