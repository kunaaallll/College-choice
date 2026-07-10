import type { CollegeContentPack } from "./types";

// NIRF Dental 2024 #31-40 — hand-authored, matches dental-batch1/2/3.ts depth.
// Completes the NIRF-ranked dental top-40.

const sdmDental: CollegeContentPack = {
  slug: "sdm-college-of-dental-sciences-and-hospital",
  college: {
    estd: 1988,
    website: "https://sdmcds.org",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Private (SDM Trust)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "SDM College of Dental Sciences Dharwad — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "SDM College of Dental Sciences & Hospital, Dharwad NIRF #31 Dental: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "SDM College of Dental Sciences and Hospital, established in 1988 in Dharwad, Karnataka, is run by the Shri Dharmasthala Manjunatheshwara (SDM) Educational Trust, a well-regarded North Karnataka education group with a strong reputation across medical, dental, and management education. It is ranked #31 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "3", feesLabel: "₹22.0 L total (indicative)" },
  ],
  highlights: [
    "Run by the well-regarded Shri Dharmasthala Manjunatheshwara (SDM) Educational Trust",
    "Established 1988, over three decades of dental education history",
    "Ranked #31 in NIRF 2024 Dental",
    "Strong North Karnataka regional reputation",
  ],
  faqs: [
    { question: "What is the SDM Trust?", answer: "The Shri Dharmasthala Manjunatheshwara (SDM) Educational Trust is a well-regarded North Karnataka education group running medical, dental, management, and other professional institutions, associated with the Dharmasthala temple town's broader philanthropic and educational activities." },
  ],
  sections: [
    { tab: "info", heading: "About SDM College of Dental Sciences", body: "SDM College of Dental Sciences and Hospital was established in 1988 in Dharwad, Karnataka, run by the Shri Dharmasthala Manjunatheshwara (SDM) Educational Trust, a well-regarded North Karnataka education group with a strong reputation across medical, dental, and management education. The college runs BDS and MDS programmes across major dental specialities.\n\nSDM's broader institutional network across North Karnataka gives the dental college a strong regional professional and alumni ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The SDM campus in Dharwad houses a dedicated dental hospital with facilities across major specialities, alongside academic blocks typical of the broader SDM Trust's institutional infrastructure." },
    { tab: "info", heading: "Why Choose SDM Dental", body: "- Run by the well-regarded SDM Educational Trust with strong North Karnataka presence\n- Ranked #31 nationally in NIRF 2024 Dental\n- Over three decades of dental education history\n- Strong regional professional and alumni network" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 3 | ₹22.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with SDM admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a private institution, SDM sets its own fee structure. Fees are typically payable per year, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. SDM fills its BDS seats through Karnataka state-quota counselling (KEA) and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across North Karnataka, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the SDM Trust's extensive regional network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "SDM Dental's NEET cutoff has historically been moderately competitive for its management/state-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with SDM/KEA admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation support" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "SDM College of Dental Sciences & Hospital is ranked #31 in NIRF 2024 Dental, and the broader SDM Trust also runs NIRF-ranked medical and management institutions." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "SDM provides on-campus hostel accommodation for men and women in Dharwad, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader SDM Trust campus culture." },
  ],
};

const srmKattankulathur: CollegeContentPack = {
  slug: "srm-kattankulathur-dental-college",
  college: {
    estd: 2005,
    website: "https://www.srmist.edu.in",
    feesNum: 1700000,
    feesLabel: "₹17.0 L",
    affiliation: "Deemed University (SRM)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "SRM Kattankulathur Dental College — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "SRM Kattankulathur Dental College & Hospital, Chennai NIRF #32 Dental: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "SRM Kattankulathur Dental College and Hospital, part of SRM Institute of Science and Technology's flagship Kattankulathur campus near Chennai, benefits from being embedded within one of India's largest and most well-resourced deemed university campuses. It is ranked #32 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹17.0 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "3", feesLabel: "₹25.0 L total (indicative)" },
  ],
  highlights: [
    "Located on SRM's flagship Kattankulathur campus near Chennai",
    "Access to one of India's largest, most well-resourced deemed university campuses",
    "Ranked #32 in NIRF 2024 Dental",
    "Distinct from SRM Dental College at the separate Ramapuram campus",
  ],
  faqs: [
    { question: "How is this different from SRM Dental College (Ramapuram)?", answer: "SRM Kattankulathur Dental College operates from SRM's main flagship Kattankulathur campus near Chennai, a separate location from SRM Dental College at the Ramapuram campus — both are part of SRM Institute of Science and Technology but function as distinct dental colleges." },
    { question: "How is admission to SRM Kattankulathur Dental done?", answer: "Admission is via NEET-UG score; as a deemed university, SRM conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About SRM Kattankulathur Dental College", body: "SRM Kattankulathur Dental College and Hospital operates on SRM Institute of Science and Technology's flagship Kattankulathur campus near Chennai — one of India's largest and most well-resourced deemed university campuses, spanning engineering, medical, dental, management, and law schools. Established in 2005, the dental college runs BDS and MDS programmes across major dental specialities.\n\nBeing embedded within SRM's largest campus gives dental students access to extensive shared infrastructure, research facilities, and a very large multi-disciplinary student community." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Kattankulathur campus houses a dedicated dental hospital alongside SRM's massive engineering, medical, and management schools, giving dental students access to one of India's largest single university campuses." },
    { tab: "info", heading: "Why Choose SRM Kattankulathur Dental", body: "- Located on one of India's largest and best-resourced university campuses\n- Ranked #32 nationally in NIRF 2024 Dental\n- Access to SRM's extensive shared research and sports infrastructure\n- Very large multi-disciplinary student community" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹17.0 L |\n| MDS — Orthodontics | 3 years | 3 | ₹25.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with SRM admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, SRM sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. SRM conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from SRM's very large alumni network across all disciplines." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, SRM Kattankulathur Dental's NEET cutoff has historically been moderately competitive. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with SRM admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "SRM Kattankulathur Dental College is ranked #32 in NIRF 2024 Dental, and SRM Institute of Science and Technology also ranks strongly across NIRF's Engineering, Medical, and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "SRM provides extensive on-campus hostel accommodation at Kattankulathur, one of its largest residential campuses. Student life includes technical events, clinical case competitions, and access to SRM's very large multi-campus culture." },
  ],
};

const chettinadDental: CollegeContentPack = {
  slug: "chettinad-dental-college-and-research-institute",
  college: {
    estd: 2005,
    website: "https://chettinadhealthcity.com",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Deemed University (Chettinad Academy)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Chettinad Dental College Kelambakkam — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Chettinad Dental College and Research Institute, Kelambakkam NIRF #33 Dental: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Chettinad Dental College and Research Institute, part of Chettinad Academy of Research and Education near Kelambakkam, Chennai, operates within the broader Chettinad Health City ecosystem — a large integrated medical campus combining hospital, medical college, and dental college infrastructure. It is ranked #33 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Pedodontics & Preventive Dentistry", duration: "3 years", seats: "3", feesLabel: "₹22.0 L total (indicative)" },
  ],
  highlights: [
    "Part of the integrated Chettinad Health City ecosystem near Chennai",
    "Combined hospital, medical college, and dental college infrastructure",
    "Ranked #33 in NIRF 2024 Dental",
    "Deemed university with growing research investment",
  ],
  faqs: [
    { question: "What is Chettinad Health City?", answer: "Chettinad Health City is a large integrated medical campus near Kelambakkam, Chennai, combining a multi-specialty hospital, medical college, and dental college under Chettinad Academy of Research and Education, a deemed university." },
  ],
  sections: [
    { tab: "info", heading: "About Chettinad Dental College", body: "Chettinad Dental College and Research Institute operates under Chettinad Academy of Research and Education, a deemed university based within the broader Chettinad Health City near Kelambakkam, Chennai — a large integrated campus combining a multi-specialty hospital, medical college, and dental college. Established around 2005, the dental college runs BDS and MDS programmes across major dental specialities.\n\nThe integrated health-city model gives Chettinad Dental College students access to a large hospital's cross-specialty clinical ecosystem uncommon among standalone dental colleges." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Chettinad Health City campus near Kelambakkam houses a dedicated dental hospital alongside a large multi-specialty hospital and medical college, giving dental students access to cross-specialty clinical exposure and shared research infrastructure." },
    { tab: "info", heading: "Why Choose Chettinad Dental", body: "- Part of the integrated Chettinad Health City medical ecosystem\n- Ranked #33 nationally in NIRF 2024 Dental\n- Cross-specialty clinical exposure via the affiliated multi-specialty hospital\n- Growing deemed-university research investment" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Pedodontics & Preventive Dentistry | 3 years | 3 | ₹22.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with Chettinad admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Chettinad Academy sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Chettinad Academy conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the Chettinad Health City's broader clinical network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital and, where relevant, the broader Chettinad Health City hospital network — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, Chettinad Dental's NEET cutoff has historically been moderately competitive. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Chettinad admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Chettinad Dental College and Research Institute is ranked #33 in NIRF 2024 Dental, and Chettinad Academy of Research and Education also ranks in NIRF's Medical category." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The Chettinad Health City campus provides on-campus hostel accommodation for men and women, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader integrated health-city campus culture." },
  ],
};

const govtDentalAhmedabad: CollegeContentPack = {
  slug: "government-dental-college-ahmedabad",
  college: {
    estd: 1961,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Gujarat University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Government Dental College and Hospital Ahmedabad — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Government Dental College & Hospital, Ahmedabad NIRF #34 Dental: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Government Dental College and Hospital, Ahmedabad, established in 1961, is Gujarat's premier government dental institution, affiliated with Gujarat University. It combines heavily subsidised fees with a strong clinical training reputation across the state, ranked #34 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Gujarat's premier government dental college, established 1961",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #34 in NIRF 2024 Dental",
    "Strong statewide clinical training reputation",
  ],
  faqs: [
    { question: "How is admission to Government Dental College Ahmedabad done?", answer: "Admission is via NEET-UG score through Gujarat state-quota counselling for Gujarat-domicile candidates and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Government Dental College, Ahmedabad", body: "Government Dental College and Hospital, Ahmedabad was established in 1961 and is affiliated with Gujarat University. It serves as Gujarat's premier government dental training institution, running BDS and MDS programmes across major dental specialities.\n\nAs a government institute, the college combines heavily subsidised fees with a strong clinical training reputation, drawing highly competitive NEET-UG applicants for its limited seats from across Gujarat and beyond." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Ahmedabad with a full-service dental hospital covering major specialities, serving a large public patient base and giving students substantial hands-on clinical exposure." },
    { tab: "info", heading: "Why Choose Government Dental College Ahmedabad", body: "- Gujarat's premier government dental college with over six decades of history\n- Government fee structure, among the lowest of any top-tier dental institute\n- Ranked #34 nationally in NIRF 2024 Dental\n- Strong statewide clinical training reputation" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Gujarat state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Gujarat state-quota counselling for Gujarat-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Gujarat domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Gujarat's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As Gujarat's premier government dental college, closing ranks for the state quota and AIQ have historically required scores well above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Gujarat counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per Gujarat government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Government Dental College and Hospital, Ahmedabad is ranked #34 in NIRF 2024 Dental, Gujarat's highest-ranked government dental institution." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Ahmedabad under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const mgpgidsPondicherry: CollegeContentPack = {
  slug: "mahatma-gandhi-p-g-institute-of-dental-sciences",
  college: {
    estd: 1966,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Puducherry",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Mahatma Gandhi P.G. Institute of Dental Sciences Puducherry — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "MGPGIDS Puducherry NIRF #35 Dental: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Mahatma Gandhi Postgraduate Institute of Dental Sciences (MGPGIDS), Puducherry, established in 1966, is a government dental institution serving the union territory of Puducherry, with a strong postgraduate specialisation focus reflected in its name. It is ranked #35 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Established 1966, Puducherry's premier government dental institution",
    "Strong postgraduate specialisation focus reflected in its name",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #35 in NIRF 2024 Dental",
  ],
  faqs: [
    { question: "How is admission to MGPGIDS done?", answer: "Admission is via NEET-UG score through Puducherry union territory counselling and the MCC All India Quota process, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About MGPGIDS Puducherry", body: "Mahatma Gandhi Postgraduate Institute of Dental Sciences was established in 1966 in Puducherry, serving as the union territory's premier government dental institution. As its name suggests, MGPGIDS maintains a strong postgraduate (MDS) specialisation focus alongside its BDS undergraduate programme.\n\nAs a government institute, MGPGIDS combines heavily subsidised fees with a solid regional clinical training reputation across Puducherry and neighbouring Tamil Nadu." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "MGPGIDS operates from a dedicated campus in Puducherry with a full-service dental hospital covering major specialities, giving both undergraduate and postgraduate students substantial hands-on clinical exposure." },
    { tab: "info", heading: "Why Choose MGPGIDS", body: "- Puducherry's premier government dental college with nearly six decades of history\n- Government fee structure, among the lowest of any top-tier dental institute\n- Ranked #35 nationally in NIRF 2024 Dental\n- Strong postgraduate specialisation training focus" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Orthodontics | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Puducherry government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. MGPGIDS fills seats through Puducherry union territory counselling and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS) given MGPGIDS's strong postgraduate focus, government dental officer roles, private practice across Puducherry and Tamil Nadu, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within MGPGIDS's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As Puducherry's premier government dental college, closing ranks have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Puducherry counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per government policy\n- Central government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the institute" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Mahatma Gandhi Postgraduate Institute of Dental Sciences is ranked #35 in NIRF 2024 Dental, Puducherry's highest-ranked government dental institution." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "MGPGIDS provides on-campus hostel accommodation for both undergraduate and postgraduate students. Student life includes dental-specific clinical and surgical case discussions typical of a postgraduate-oriented institute." },
  ],
};

const bharatiVidyapeethDental: CollegeContentPack = {
  slug: "bharati-vidyapeeth-dental-college-and-hospital",
  college: {
    estd: 1994,
    website: "https://bharatividyapeeth.edu",
    feesNum: 1500000,
    feesLabel: "₹15.0 L",
    affiliation: "Deemed University (Bharati Vidyapeeth)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Bharati Vidyapeeth Dental College Pune — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Bharati Vidyapeeth Dental College and Hospital, Pune NIRF #36 Dental: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Bharati Vidyapeeth Dental College and Hospital, established in 1994 in Pune, Maharashtra, is part of Bharati Vidyapeeth, one of India's largest multi-disciplinary deemed universities with campuses across Maharashtra. It is ranked #36 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹15.0 L total" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "3", feesLabel: "₹22.0 L total (indicative)" },
  ],
  highlights: [
    "Part of Bharati Vidyapeeth, one of India's largest multi-disciplinary deemed universities",
    "Established 1994, three decades of dental education history",
    "Ranked #36 in NIRF 2024 Dental",
    "Access to Bharati Vidyapeeth's very broad academic and professional network",
  ],
  faqs: [
    { question: "How many campuses does Bharati Vidyapeeth run?", answer: "Bharati Vidyapeeth is one of India's largest deemed universities, running dozens of colleges across engineering, medical, dental, management, law, and other disciplines across multiple campuses in Maharashtra and beyond." },
  ],
  sections: [
    { tab: "info", heading: "About Bharati Vidyapeeth Dental College", body: "Bharati Vidyapeeth Dental College and Hospital was established in 1994 in Pune, Maharashtra, as part of Bharati Vidyapeeth, one of India's largest multi-disciplinary deemed universities running dozens of colleges across engineering, medical, dental, management, and law disciplines. The dental college runs BDS and MDS programmes across major dental specialities.\n\nBharati Vidyapeeth's very large institutional scale gives the dental college access to shared research infrastructure and one of India's broadest alumni networks across professional fields." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Pune campus houses a dedicated dental hospital alongside Bharati Vidyapeeth's broader medical and engineering schools, giving dental students access to a very large multi-disciplinary academic environment." },
    { tab: "info", heading: "Why Choose Bharati Vidyapeeth Dental", body: "- Part of one of India's largest multi-disciplinary deemed universities\n- Ranked #36 nationally in NIRF 2024 Dental\n- Three decades of dental education history\n- Access to Bharati Vidyapeeth's very broad academic and professional network" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹15.0 L |\n| MDS — Prosthodontics | 3 years | 3 | ₹22.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with Bharati Vidyapeeth admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Bharati Vidyapeeth sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Bharati Vidyapeeth conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from Bharati Vidyapeeth's very large alumni network across all professional fields." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, Bharati Vidyapeeth Dental's NEET cutoff has historically been moderately competitive. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Bharati Vidyapeeth admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Bharati Vidyapeeth Dental College and Hospital is ranked #36 in NIRF 2024 Dental, and Bharati Vidyapeeth also ranks strongly across NIRF's Engineering, Medical, Management, and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Bharati Vidyapeeth provides on-campus hostel accommodation for men and women in Pune, with mess facilities. Student life includes technical events, clinical case competitions, and access to Bharati Vidyapeeth's broader multi-campus culture." },
  ],
};

const bapujiDental: CollegeContentPack = {
  slug: "bapuji-dental-college-and-hospital",
  college: {
    estd: 1970,
    feesNum: 1200000,
    feesLabel: "₹12.0 L",
    affiliation: "Private (Bapuji Educational Association)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Bapuji Dental College Davangere — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Bapuji Dental College & Hospital, Davangere NIRF #37 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Bapuji Dental College and Hospital, established in 1970 in Davangere, Karnataka, is one of India's older private dental colleges, run by the Bapuji Educational Association — a trust also known for engineering and medical education in the region. It is ranked #37 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "80", feesLabel: "₹12.0 L total" },
    { name: "MDS — Periodontics", duration: "3 years", seats: "3", feesLabel: "₹18.0 L total (indicative)" },
  ],
  highlights: [
    "Established 1970, one of India's older private dental colleges",
    "Run by the Bapuji Educational Association, also known for engineering and medical education",
    "Ranked #37 in NIRF 2024 Dental",
    "Over five decades of dental education history in Davangere, Karnataka",
  ],
  faqs: [
    { question: "How is admission to Bapuji Dental College done?", answer: "Admission is via NEET-UG score through Karnataka state-quota counselling (KEA) and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About Bapuji Dental College", body: "Bapuji Dental College and Hospital was established in 1970 in Davangere, Karnataka, run by the Bapuji Educational Association, a trust also known for its engineering (Bapuji Institute of Engineering and Technology) and medical education institutions in the region. As one of India's older private dental colleges, it has built over five decades of continuous academic and clinical operation.\n\nThe college runs BDS and MDS programmes across major dental specialities, with a long-standing regional reputation across Karnataka." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Bapuji campus in Davangere houses a dedicated dental hospital with facilities across major specialities, alongside the broader Bapuji Educational Association's engineering and medical institutions in the city." },
    { tab: "info", heading: "Why Choose Bapuji Dental", body: "- Among India's older private dental colleges, with over five decades of history\n- Ranked #37 nationally in NIRF 2024 Dental\n- Run by the well-established Bapuji Educational Association\n- Long-standing regional reputation across Karnataka" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 80 | ₹12.0 L |\n| MDS — Periodontics | 3 years | 3 | ₹18.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with Bapuji admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a private institution, Bapuji Dental College sets its own fee structure. Fees are typically payable per year, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Bapuji Dental College fills its BDS seats through Karnataka state-quota counselling (KEA) and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Karnataka, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the Bapuji trust's long-standing regional network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Bapuji Dental's NEET cutoff has historically been moderately competitive for its state-quota and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Bapuji/KEA admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation support" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Bapuji Dental College and Hospital is ranked #37 in NIRF 2024 Dental, a strong position for one of India's older private dental colleges." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Bapuji Dental College provides on-campus hostel accommodation for men and women in Davangere, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader Bapuji Educational Association campus culture." },
  ],
};

const manavRachnaDental: CollegeContentPack = {
  slug: "manav-rachna-international-institute-of-research-and-studies",
  college: {
    estd: 1997,
    website: "https://manavrachna.edu.in",
    feesNum: 1500000,
    feesLabel: "₹15.0 L",
    affiliation: "Deemed University (Manav Rachna)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Manav Rachna Dental College Faridabad — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Manav Rachna Dental College, Faridabad NIRF #38 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Manav Rachna Dental College, part of Manav Rachna International Institute of Research and Studies (a deemed university) in Faridabad, Haryana, benefits from its proximity to Delhi-NCR alongside the broader Manav Rachna group's engineering and management education presence. It is ranked #38 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹15.0 L total" },
    { name: "MDS — Oral Medicine & Radiology", duration: "3 years", seats: "2", feesLabel: "₹20.0 L total (indicative)" },
  ],
  highlights: [
    "Faridabad location gives direct access to Delhi-NCR",
    "Part of the broader Manav Rachna group's engineering and management education presence",
    "Ranked #38 in NIRF 2024 Dental",
    "Deemed-university curriculum flexibility",
  ],
  faqs: [
    { question: "How is admission to Manav Rachna Dental College done?", answer: "Admission is via NEET-UG score; as a deemed university, Manav Rachna conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Manav Rachna Dental College", body: "Manav Rachna Dental College operates under Manav Rachna International Institute of Research and Studies, a deemed university based in Faridabad, Haryana, part of the broader Manav Rachna group that also runs well-known engineering and management institutions in the Delhi-NCR region. The dental college runs BDS and MDS programmes across major dental specialities.\n\nFaridabad's proximity to Delhi gives the dental college access to a dense healthcare and professional ecosystem beyond the immediate Manav Rachna campus." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Manav Rachna campus in Faridabad houses a dedicated dental hospital alongside the group's broader engineering and management schools, giving dental students access to a wider multi-disciplinary academic environment near Delhi-NCR." },
    { tab: "info", heading: "Why Choose Manav Rachna Dental", body: "- Faridabad location with direct access to Delhi-NCR\n- Ranked #38 nationally in NIRF 2024 Dental\n- Part of the established Manav Rachna group's education ecosystem\n- Deemed-university curriculum flexibility" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹15.0 L |\n| MDS — Oral Medicine & Radiology | 3 years | 2 | ₹20.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with Manav Rachna admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Manav Rachna sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Manav Rachna conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in the competitive Delhi-NCR dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, Manav Rachna Dental's NEET cutoff has historically been moderately competitive, benefiting from Delhi-NCR demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Manav Rachna admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Manav Rachna International Institute of Research and Studies (Dental) is ranked #38 in NIRF 2024 Dental, and Manav Rachna also ranks in NIRF's Engineering category." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Manav Rachna provides on-campus hostel accommodation for men and women in Faridabad, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader Manav Rachna campus culture near Delhi-NCR." },
  ],
};

const adhiparasakthiDental: CollegeContentPack = {
  slug: "adhiparasakthi-dental-college-and-hospital",
  college: {
    estd: 1998,
    feesNum: 1200000,
    feesLabel: "₹12.0 L",
    affiliation: "Private (Adhiparasakthi Charitable Medical Educational and Cultural Trust)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Adhiparasakthi Dental College Melmaruvathur — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Adhiparasakthi Dental College and Hospital, Melmaruvathur NIRF #39 Dental: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Adhiparasakthi Dental College and Hospital, established in 1998 in Melmaruvathur, Tamil Nadu, is run by the Adhiparasakthi Charitable Medical Educational and Cultural Trust, associated with the well-known Melmaruvathur Adhiparasakthi temple and its broader philanthropic and educational activities. It is ranked #39 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "80", feesLabel: "₹12.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "3", feesLabel: "₹18.0 L total (indicative)" },
  ],
  highlights: [
    "Run by the Adhiparasakthi Charitable Medical Educational and Cultural Trust",
    "Associated with the Melmaruvathur Adhiparasakthi temple's broader philanthropic activities",
    "Ranked #39 in NIRF 2024 Dental",
    "Established 1998, over two decades of dental education history",
  ],
  faqs: [
    { question: "What is the Adhiparasakthi Trust?", answer: "The Adhiparasakthi Charitable Medical Educational and Cultural Trust is associated with the Melmaruvathur Adhiparasakthi temple in Tamil Nadu, running medical, dental, and other educational institutions as part of its broader philanthropic activities." },
  ],
  sections: [
    { tab: "info", heading: "About Adhiparasakthi Dental College", body: "Adhiparasakthi Dental College and Hospital was established in 1998 in Melmaruvathur, Tamil Nadu, run by the Adhiparasakthi Charitable Medical Educational and Cultural Trust, associated with the well-known Melmaruvathur Adhiparasakthi temple and its broader philanthropic and educational activities. The college runs BDS and MDS programmes across major dental specialities.\n\nThe trust's broader institutional network, which also includes medical education, gives the dental college a solid regional presence within Tamil Nadu's dense private dental education ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Adhiparasakthi campus in Melmaruvathur houses a dedicated dental hospital with facilities across major specialities, alongside the trust's broader medical education institutions." },
    { tab: "info", heading: "Why Choose Adhiparasakthi Dental", body: "- Run by the well-established Adhiparasakthi Charitable Trust\n- Ranked #39 nationally in NIRF 2024 Dental\n- Over two decades of dental education history\n- Access to the trust's broader medical education ecosystem" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 80 | ₹12.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 3 | ₹18.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with Adhiparasakthi admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a private trust-run institution, Adhiparasakthi Dental College sets its own fee structure. Fees are typically payable per year, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Adhiparasakthi Dental College fills its BDS seats through TNEA/TN state-quota counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Tamil Nadu, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the Adhiparasakthi trust's regional network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Adhiparasakthi Dental's NEET cutoff has historically been moderately competitive for its state-quota and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with the college's admissions office." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case, reflecting the trust's charitable heritage\n- Education loan facilitation support" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Adhiparasakthi Dental College and Hospital is ranked #39 in NIRF 2024 Dental, a strong position within Tamil Nadu's competitive private dental education landscape." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Adhiparasakthi Dental College provides on-campus hostel accommodation for men and women in Melmaruvathur, with mess facilities. Student life includes technical events, clinical case competitions, and cultural events tied to the trust's temple-town setting." },
  ],
};

const armyDental: CollegeContentPack = {
  slug: "army-college-of-dental-sciences",
  college: {
    estd: 2005,
    feesNum: 1200000,
    feesLabel: "₹12.0 L",
    affiliation: "Private (Army Welfare Education Society)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Army College of Dental Sciences Secunderabad — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Army College of Dental Sciences, Secunderabad NIRF #40 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Army College of Dental Sciences, established in 2005 in Secunderabad, Telangana, is run by the Army Welfare Education Society, giving it a distinctive institutional identity tied to India's armed forces welfare network, alongside standard NEET-based civilian admission. It is ranked #40 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹12.0 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "3", feesLabel: "₹18.0 L total (indicative)" },
  ],
  highlights: [
    "Run by the Army Welfare Education Society, tied to India's armed forces welfare network",
    "Established 2005 in Secunderabad, Telangana",
    "Ranked #40 in NIRF 2024 Dental, the final entry in NIRF's formally ranked dental list",
    "Priority quota for wards of defence personnel alongside standard NEET-based admission",
  ],
  faqs: [
    { question: "Is Army College of Dental Sciences only for defence-family students?", answer: "No — while it offers a priority quota for wards of defence personnel, the majority of BDS seats are open to all NEET-UG qualified candidates through standard admission routes." },
    { question: "How is admission to Army College of Dental Sciences done?", answer: "Admission is via NEET-UG score, with a defined quota reserved for wards of defence personnel and the remaining seats open to general NEET-UG qualified applicants through the college's own counselling process." },
  ],
  sections: [
    { tab: "info", heading: "About Army College of Dental Sciences", body: "Army College of Dental Sciences was established in 2005 in Secunderabad, Telangana, run by the Army Welfare Education Society (AWES), an organisation that manages a network of educational institutions serving defence-personnel families alongside the broader public. The college runs BDS and MDS programmes across major dental specialities.\n\nAs the final entry in NIRF's formally ranked dental top-40, Army College of Dental Sciences combines a distinctive institutional identity with standard NEET-based civilian admission for the majority of its seats." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The campus in Secunderabad houses a dedicated dental hospital with facilities across major specialities, run under the disciplined institutional framework typical of AWES-managed educational institutions." },
    { tab: "info", heading: "Why Choose Army College of Dental Sciences", body: "- Ranked #40 nationally, the final entry in NIRF's formally ranked dental list\n- Run by the well-organised Army Welfare Education Society\n- Priority quota available for wards of defence personnel\n- Disciplined institutional and clinical training framework" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹12.0 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 3 | ₹18.0 L (indicative) |\n\nFees are charged per year; a defined quota for wards of defence personnel may carry different fee terms — confirm current-year figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a private trust-run institution, Army College of Dental Sciences sets its own fee structure for general-category seats, with distinct terms for the defence-personnel-wards quota. Fees are typically payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. A defined quota is reserved for wards of defence personnel, with the remaining seats filled through general NEET-UG-based admission via the college's own counselling process and/or state quota routes." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Defence-personnel dependent certificate (for the defence quota, where applicable)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government or defence-medical-adjacent dental officer positions, or licensing pathways abroad. The Army/AWES institutional network provides some additional pathways for defence-affiliated graduates specifically." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Army College of Dental Sciences' NEET cutoff has historically been moderately competitive for its general-category BDS seats, with a separate (typically less competitive) threshold for the defence-personnel-wards quota. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with the college's admissions office." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions/priority quota for wards of defence personnel\n- Merit scholarships for top NEET rank-holders among general-category admitted students\n- Continuing merit scholarships tied to academic performance\n- Education loan facilitation support" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Army College of Dental Sciences is ranked #40 in NIRF 2024 Dental — the last position in NIRF's formally ranked dental list, beyond which the Ministry of Education does not assign numeric ranks to India's remaining 290-plus DCI-recognised dental colleges." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Army College of Dental Sciences provides on-campus hostel accommodation for men and women in Secunderabad, with mess facilities. Student life includes technical events, clinical case competitions, and the disciplined campus culture typical of AWES-managed institutions." },
  ],
};

export const dentalBatch4: CollegeContentPack[] = [
  sdmDental,
  srmKattankulathur,
  chettinadDental,
  govtDentalAhmedabad,
  mgpgidsPondicherry,
  bharatiVidyapeethDental,
  bapujiDental,
  manavRachnaDental,
  adhiparasakthiDental,
  armyDental,
];
