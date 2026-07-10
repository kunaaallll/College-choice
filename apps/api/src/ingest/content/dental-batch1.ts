import type { CollegeContentPack } from "./types";

// NIRF Dental 2024 #1-13 — hand-authored, matches iit-madras.ts / eng-batch quality depth.
// Dental careers differ structurally from engineering: most BDS graduates go into
// private practice, PG (MDS), government dental-officer roles, or corporate dental
// chains rather than a corporate campus-placement cycle — the Placements tab and
// highlights reflect that instead of forcing an engineering-style stats card.

const saveethaDental: CollegeContentPack = {
  slug: "saveetha-institute-of-medical-and-technical-sciences-dental",
  college: {
    estd: 1996,
    website: "https://www.saveetha.com",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Deemed University (SIMATS)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Saveetha Dental College Chennai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Saveetha Dental College, Chennai — NIRF #1 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel and scholarship details.",
    about:
      "Saveetha Dental College, founded in 1996 and now part of the Saveetha Institute of Medical and Technical Sciences (SIMATS) deemed university at Thandalam near Chennai, has grown into one of India's largest dental colleges by patient footfall and one of its most research-active, publishing heavily in international dental journals. It is ranked #1 for Dental in NIRF 2024, reflecting a deliberate institutional strategy of investing in faculty research output alongside clinical training capacity.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "6", feesLabel: "₹25.0 L total (indicative)" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "6", feesLabel: "₹25.0 L total (indicative)" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "6", feesLabel: "₹25.0 L total (indicative)" },
  ],
  highlights: [
    "Ranked #1 in NIRF 2024 Dental — India's top-ranked dental institution",
    "Part of SIMATS deemed university, alongside Saveetha Medical College on the same Thandalam campus",
    "One of India's highest patient-footfall dental hospitals, giving students very high clinical case exposure",
    "Strong research-publication output across international dental journals",
  ],
  faqs: [
    { question: "How is admission to Saveetha Dental College done?", answer: "Admission is via NEET-UG score; as a deemed university, Saveetha conducts its own centralised counselling for BDS seats based on NEET rank, separate from the state or All India Quota government counselling." },
    { question: "Why does Saveetha rank #1 in NIRF Dental?", answer: "Saveetha's NIRF Dental ranking is driven substantially by very high research-publication output and citation metrics, alongside strong perception and clinical-case-volume scores, reflecting the institute's deliberate research-first strategy." },
  ],
  sections: [
    { tab: "info", heading: "About Saveetha Dental College", body: "Saveetha Dental College was founded in 1996 and is now the flagship dental institution of the Saveetha Institute of Medical and Technical Sciences (SIMATS), a deemed university headquartered at Thandalam, near Chennai. It sits alongside Saveetha Medical College on the same large multi-disciplinary campus, giving dental students access to a broader clinical and research ecosystem than a standalone dental college.\n\nThe college has built a reputation as one of India's most research-active dental institutions, with faculty publishing heavily in indexed international journals — a strategy that has driven its #1 NIRF Dental ranking in 2024, ahead of much older and more traditionally prestigious institutions." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Thandalam campus houses a large dental hospital with extensive outpatient clinical facilities across all specialities — Conservative Dentistry, Orthodontics, Oral Surgery, Periodontics, Prosthodontics, Pedodontics, and Oral Pathology. The college reports very high daily patient footfall, which translates into substantial hands-on clinical case exposure for undergraduate and postgraduate students alike." },
    { tab: "info", heading: "Why Choose Saveetha Dental College", body: "- India's #1 NIRF-ranked dental college, with a strong research and publication culture\n- Very high patient footfall giving students extensive real-world clinical exposure\n- Access to SIMATS's broader medical and multi-disciplinary research ecosystem\n- Deemed-university flexibility in curriculum and specialisation offerings" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 6 | ₹25.0 L (indicative) |\n| MDS — Orthodontics | 3 years | 6 | ₹25.0 L (indicative) |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 6 | ₹25.0 L (indicative) |\n\nBDS is a 5-year programme including a mandatory 1-year rotating clinical internship; MDS specialisations run 3 years. Fees are charged per year and vary by specialisation intake — confirm the current year's exact figures with SIMATS admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Saveetha sets its own fee structure (not government-regulated like a state quota seat). Fees are typically payable in yearly or semester instalments through the institute's online portal, with an education-loan facilitation cell available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for all BDS admissions in India, including deemed universities. Candidates register on the NEET portal, sit the exam, and Saveetha (as a deemed university) then conducts its own centralised counselling process based on NEET rank/score for its management and NRI quota seats, separate from the state government or MCC All India Quota counselling used for government college seats." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard/admit card, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Most BDS graduates from Saveetha pursue one of several paths: postgraduate MDS specialisation (either at Saveetha or elsewhere via NEET-MDS), private dental practice (independent or as an associate), roles with corporate dental chains (Clove Dental and similar), government dental officer positions via state PSC exams, or further studies/licensing abroad (particularly USMLE-equivalent pathways for the US, UK, Australia, or Gulf countries). The mandatory 1-year rotating internship at the end of BDS gives every graduate structured clinical experience before choosing a path." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The final year of the BDS programme is a mandatory rotating internship across all dental specialities within the college's own dental hospital, given its very high patient footfall. This internship year is a Dental Council of India (now National Dental Commission) requirement for all BDS graduates before they can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed university with a large management-quota BDS intake, Saveetha's NEET cutoff has historically been more accessible than government college state-quota seats — typically requiring a NEET score/percentile within the qualifying range for BDS rather than a highly competitive government-college-level cutoff. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with SIMATS admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance during the BDS programme\n- Need-based fee concessions for economically weaker students, assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Saveetha Dental College is ranked #1 in NIRF 2024 Dental, the top position nationally, driven substantially by strong research-publication output and perception metrics alongside its large clinical case volume." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "SIMATS provides on-campus hostel accommodation for men and women at the Thandalam campus, with mess facilities. Student life includes dental-specific technical events, clinical case competitions, and access to the broader SIMATS multi-disciplinary campus culture shared with medical and engineering students." },
  ],
};

const manipalManipal: CollegeContentPack = {
  slug: "manipal-college-of-dental-sciences-manipal",
  college: {
    estd: 1957,
    website: "https://manipal.edu/mcods-manipal.html",
    feesNum: 1800000,
    feesLabel: "₹18.0 L",
    affiliation: "Deemed University (MAHE)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Manipal College of Dental Sciences, Manipal — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "MCODS Manipal NIRF #2 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel and scholarship details.",
    about:
      "Manipal College of Dental Sciences (MCODS), Manipal, established in 1957, is one of India's oldest private dental colleges and the founding dental institution of what is now Manipal Academy of Higher Education (MAHE). Its long institutional history, strong faculty depth, and MAHE's broader academic ecosystem in coastal Karnataka have made it one of the most recognised names in Indian dental education, ranked #2 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹18.0 L total" },
    { name: "MDS — Prosthodontics & Crown and Bridge", duration: "3 years", seats: "6", feesLabel: "₹28.0 L total (indicative)" },
    { name: "MDS — Periodontics", duration: "3 years", seats: "4", feesLabel: "₹28.0 L total (indicative)" },
    { name: "MDS — Oral Medicine & Radiology", duration: "3 years", seats: "4", feesLabel: "₹28.0 L total (indicative)" },
  ],
  highlights: [
    "One of India's oldest private dental colleges, founded 1957",
    "Founding dental institution of Manipal Academy of Higher Education (MAHE)",
    "Ranked #2 in NIRF 2024 Dental, among the top two dental colleges in India",
    "Part of MAHE's large, self-contained residential university town in coastal Karnataka",
  ],
  faqs: [
    { question: "Is Manipal College of Dental Sciences good for MDS?", answer: "MCODS Manipal offers MDS across all major dental specialities and is widely regarded as one of India's stronger postgraduate dental destinations, backed by nearly seven decades of clinical and academic infrastructure." },
    { question: "How is admission to MCODS Manipal done?", answer: "Admission is via NEET-UG score; as part of MAHE, a deemed university, MCODS conducts its own centralised counselling based on NEET rank for its BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About MCODS Manipal", body: "Manipal College of Dental Sciences was established in 1957 by Dr. T.M.A. Pai, making it one of the founding institutions of what later became Manipal Academy of Higher Education (MAHE), a deemed university. It holds the distinction of being one of the oldest private dental colleges in India, with nearly seven decades of continuous academic and clinical operation.\n\nMCODS Manipal offers BDS and MDS across all major dental specialities, supported by MAHE's broader multi-disciplinary campus, which includes Kasturba Medical College and several allied health sciences institutions on the same Manipal campus." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Manipal campus is a large, self-contained university town in coastal Karnataka near Udupi, with MCODS operating a dedicated dental hospital alongside extensive teaching and research infrastructure. Students benefit from MAHE's shared medical campus ecosystem, including access to Kasturba Hospital for cross-disciplinary clinical exposure where relevant." },
    { tab: "info", heading: "Why Choose MCODS Manipal", body: "- Among India's oldest and most established private dental colleges\n- Ranked #2 nationally in NIRF 2024 Dental\n- Access to MAHE's large multi-disciplinary university ecosystem\n- Strong postgraduate (MDS) programme depth across all major specialities" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹18.0 L |\n| MDS — Prosthodontics & Crown and Bridge | 3 years | 6 | ₹28.0 L (indicative) |\n| MDS — Periodontics | 3 years | 4 | ₹28.0 L (indicative) |\n| MDS — Oral Medicine & Radiology | 3 years | 4 | ₹28.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with MAHE admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As part of MAHE, a deemed university, MCODS Manipal sets its own fee structure. Fees are typically payable per year through MAHE's online portal, with education-loan support available through the university's financial aid cell." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. MAHE conducts its own centralised counselling for MCODS Manipal's BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "MCODS graduates commonly pursue MDS specialisation (many stay within MAHE's own postgraduate programmes, competitive given the strong faculty base), private practice, roles with corporate dental chains, government dental officer positions, or licensing pathways abroad. MAHE's long-standing alumni network across dentistry provides additional mentorship and referral pathways relative to newer dental colleges." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed at MCODS's own dental hospital across all specialities, a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "MCODS Manipal's BDS admissions, as a deemed-university management-quota-heavy intake, have historically required a NEET score/percentile within a moderately competitive range — generally more accessible than top government dental colleges but reflecting strong demand given the institute's reputation. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with MAHE admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- MAHE's education-loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Manipal College of Dental Sciences, Manipal is ranked #2 in NIRF 2024 Dental, and MAHE as a whole ranks highly across NIRF's Medical, Overall University, and other categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "MAHE provides extensive on-campus hostel accommodation as part of its large residential university town. Campus life includes the annual Revels cultural fest and access to MAHE's broader sports, cultural, and international-student community." },
  ],
};

const maulanaAzad: CollegeContentPack = {
  slug: "maulana-azad-institute-of-dental-sciences",
  college: {
    estd: 1997,
    website: "https://www.maids.ac.in",
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government (Delhi), Institute of National Importance status pending recognition",
    approvedBy: "Dental Council of India / National Dental Commission, Govt. of NCT Delhi",
    metaTitle: "Maulana Azad Institute of Dental Sciences — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "MAIDS Delhi NIRF #3 Dental: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Maulana Azad Institute of Dental Sciences (MAIDS), New Delhi, is a Delhi government dental institute closely linked to the erstwhile Maulana Azad Medical College campus, named after India's first Education Minister. As a government institute, MAIDS combines heavily subsidised fees with a strong academic and clinical reputation, ranked #3 in NIRF 2024 Dental — the highest-ranked government dental college in India.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "4", feesLabel: "₹1.5 L total (indicative)" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
    { name: "MDS — Pedodontics & Preventive Dentistry", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Highest-ranked government dental college in India — #3 in NIRF 2024 Dental",
    "Heavily subsidised government fee structure",
    "Named after Maulana Abul Kalam Azad, India's first Education Minister",
    "Admission via NEET-UG through Delhi government/MCC counselling",
  ],
  faqs: [
    { question: "Is MAIDS a good government dental college?", answer: "MAIDS is the top-ranked government dental college in NIRF 2024, combining low government fees with strong clinical training and faculty quality, making it one of the most sought-after BDS destinations for NEET aspirants targeting government seats." },
    { question: "How is admission to MAIDS done?", answer: "Admission is via NEET-UG score through Delhi government counselling for the state quota and the MCC All India Quota process for the AIQ share of seats, following the standard government dental college admission process." },
  ],
  sections: [
    { tab: "info", heading: "About MAIDS", body: "Maulana Azad Institute of Dental Sciences was established in 1997 as a Delhi government dental institute, named after Maulana Abul Kalam Azad, India's first Minister of Education and a key freedom-movement leader. It has grown into the highest-ranked government dental college in the country, offering BDS and MDS programmes across all major dental specialities.\n\nAs a government institute, MAIDS combines heavily subsidised fees — among the lowest of any NIRF top-ranked dental college — with a strong academic and clinical reputation, drawing highly competitive NEET-UG applicants for its limited seats." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "MAIDS operates from a dedicated campus in New Delhi with a full-service dental hospital covering all major specialities, along with academic blocks and a library. As a Delhi government institution, it serves a large public patient base, giving students substantial hands-on clinical exposure." },
    { tab: "info", heading: "Why Choose MAIDS", body: "- Highest-ranked government dental college in India (NIRF 2024 Dental #3)\n- Government fee structure, among the lowest of any top-tier dental institute\n- Strong faculty and clinical training reputation\n- Central Delhi location with strong connectivity" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 4 | ₹1.5 L (indicative) |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 3 | ₹1.5 L (indicative) |\n| MDS — Pedodontics & Preventive Dentistry | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Delhi government norms and are payable per year through the institute's designated channels. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. MAIDS fills seats through Delhi government state-quota counselling for Delhi-domicile candidates and the MCC (Medical Counselling Committee) All India Quota process for the AIQ share, following the standard government dental college admission route." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Delhi domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "MAIDS graduates are well-positioned for MDS entrance (NEET-MDS) given the institute's strong academic reputation, government dental officer roles via state/central PSC exams, private practice, and clinical positions at leading hospitals. The government-institute pedigree carries particular weight for public-sector dental career paths." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within MAIDS's own dental hospital, serving a large public patient base — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As India's top-ranked government dental college, MAIDS's NEET cutoff is highly competitive — closing ranks for the Delhi state quota and AIQ have historically required scores well above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Delhi counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per Delhi government policy\n- Central and Delhi government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the institute" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "MAIDS is ranked #3 in NIRF 2024 Dental — the highest position of any government dental college in India, reflecting strong faculty quality and clinical training standards." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "MAIDS provides on-campus hostel accommodation for students, particularly those from outside Delhi under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events typical of a government dental institute." },
  ],
};

const kgmuDental: CollegeContentPack = {
  slug: "king-george-s-medical-university-dental",
  college: {
    estd: 1949,
    website: "https://www.kgmu.org",
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, State University, Uttar Pradesh",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "KGMU Faculty of Dental Sciences Lucknow — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "King George's Medical University Faculty of Dental Sciences, Lucknow NIRF #4 Dental: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "King George's Medical University (KGMU), Lucknow, one of India's oldest medical institutions with origins dating to 1911, runs its Faculty of Dental Sciences as part of a much larger, multi-disciplinary government medical university. This gives dental students unusually deep access to cross-specialty clinical exposure and a century-plus institutional legacy, reflected in its #4 NIRF 2024 Dental ranking.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "50", feesLabel: "₹1.5 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
    { name: "MDS — Orthodontics & Dentofacial Orthopaedics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Faculty of Dentistry within one of India's oldest medical universities (origins date to 1911)",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Access to KGMU's large, multi-disciplinary hospital ecosystem for cross-specialty exposure",
    "Ranked #4 in NIRF 2024 Dental",
  ],
  faqs: [
    { question: "Is KGMU's dental faculty separate from its medical college?", answer: "The Faculty of Dental Sciences operates as part of the broader King George's Medical University, sharing the university's large hospital infrastructure and administrative framework, which gives dental students access to a wider clinical and academic ecosystem than a standalone dental college." },
    { question: "How is admission to KGMU dental done?", answer: "Admission is via NEET-UG score through Uttar Pradesh state-quota counselling for UP-domicile candidates and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About KGMU Faculty of Dental Sciences", body: "King George's Medical University traces its origins to 1911 as King George's Medical College, one of India's oldest medical institutions, located in Lucknow, Uttar Pradesh. Its Faculty of Dental Sciences operates within this much larger, multi-disciplinary government university framework, offering BDS and MDS programmes across major dental specialities.\n\nBeing embedded within a full medical university gives KGMU dental students access to a broader hospital ecosystem and cross-specialty clinical exposure — for example in oral-maxillofacial trauma cases — that is harder to replicate at standalone dental colleges." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "KGMU's Lucknow campus is one of India's largest government medical university campuses, with dedicated dental hospital facilities alongside the university's broader network of specialty hospitals. This scale gives dental students substantial patient volume and case diversity, including complex referred cases from across Uttar Pradesh." },
    { tab: "info", heading: "Why Choose KGMU Dental", body: "- Faculty of Dentistry within one of India's oldest and largest medical universities\n- Government fee structure at among the lowest cost of any top-ranked dental institute\n- Cross-specialty clinical exposure through KGMU's broader hospital network\n- Ranked #4 nationally in NIRF 2024 Dental" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 50 | ₹1.5 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 3 | ₹1.5 L (indicative) |\n| MDS — Orthodontics & Dentofacial Orthopaedics | 3 years | 3 | ₹1.5 L (indicative) |\n| MDS — Prosthodontics | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government university, fees follow Uttar Pradesh state norms and are heavily subsidised relative to private/deemed dental colleges." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees are payable per year through KGMU's designated channels. Additional fee concessions apply for SC/ST/OBC/EWS-eligible Uttar Pradesh-domicile students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. KGMU fills seats through Uttar Pradesh state-quota counselling for UP-domicile candidates and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Uttar Pradesh domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "KGMU dental graduates commonly pursue MDS specialisation (aided by the university's strong overall academic reputation), government dental officer roles in Uttar Pradesh and central government health services, private practice, or hospital-affiliated clinical positions. The KGMU name carries particular weight for public-sector and further-study pathways given the university's century-plus legacy." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within KGMU's dental hospital and, where relevant, its broader hospital network — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a highly-ranked government dental faculty within a major medical university, KGMU's NEET cutoff is competitive — state-quota and AIQ closing ranks have historically required scores well above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/UP counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible UP-domicile students per state government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the university" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "King George's Medical University is ranked #4 in NIRF 2024 Dental; the university as a whole also ranks strongly in NIRF's Medical and Overall University categories, reflecting its scale and long institutional history." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "KGMU provides on-campus hostel accommodation for dental students as part of its large university campus. Student life includes access to the university's broader medical-campus culture, including inter-departmental academic and cultural events." },
  ],
};

const dyPatilDental: CollegeContentPack = {
  slug: "dr-d-y-patil-vidyapeeth-dental",
  college: {
    estd: 1998,
    website: "https://dpu.edu.in",
    feesNum: 1700000,
    feesLabel: "₹17.0 L",
    affiliation: "Deemed University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Dr. D.Y. Patil Dental College Pune — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Dr. D.Y. Patil Vidyapeeth Dental College Pune NIRF #5 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Dr. D.Y. Patil Dental College, part of Dr. D.Y. Patil Vidyapeeth (a deemed university) in Pune, Maharashtra, has built a strong dental education reputation since its founding in the late 1990s, backed by the broader D.Y. Patil group's substantial investment in medical and health-sciences infrastructure across Maharashtra. It is ranked #5 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹17.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "5", feesLabel: "₹26.0 L total (indicative)" },
    { name: "MDS — Periodontics", duration: "3 years", seats: "4", feesLabel: "₹26.0 L total (indicative)" },
    { name: "MDS — Pedodontics & Preventive Dentistry", duration: "3 years", seats: "4", feesLabel: "₹26.0 L total (indicative)" },
  ],
  highlights: [
    "Part of the D.Y. Patil group's substantial Maharashtra health-sciences infrastructure",
    "Deemed university with modern dental hospital facilities in Pune",
    "Ranked #5 in NIRF 2024 Dental",
    "Strong MDS programme depth across major specialities",
  ],
  faqs: [
    { question: "Is D.Y. Patil Dental College part of the same group as D.Y. Patil Medical College?", answer: "Yes — both operate under Dr. D.Y. Patil Vidyapeeth, a deemed university in Pune, giving dental students access to the group's broader medical and health-sciences campus infrastructure." },
    { question: "How is admission to D.Y. Patil Dental College done?", answer: "Admission is via NEET-UG score; as a deemed university, D.Y. Patil Vidyapeeth conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About D.Y. Patil Dental College", body: "Dr. D.Y. Patil Dental College was established in the late 1990s in Pune, Maharashtra, as part of the broader Dr. D.Y. Patil Vidyapeeth, a deemed university with substantial investment across medical, dental, nursing, and allied health-sciences education throughout Maharashtra. It runs BDS and MDS programmes across all major dental specialities.\n\nThe college benefits from the D.Y. Patil group's broader institutional scale and hospital network, giving students exposure to a wide range of clinical case volumes and cross-disciplinary academic resources." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The D.Y. Patil Dental College campus in Pune includes a dedicated dental hospital with facilities across all major specialities, alongside academic blocks and research labs typical of the broader D.Y. Patil Vidyapeeth infrastructure investment." },
    { tab: "info", heading: "Why Choose D.Y. Patil Dental College", body: "- Part of a well-resourced, established Maharashtra health-sciences group\n- Ranked #5 nationally in NIRF 2024 Dental\n- Strong MDS programme depth across major specialities\n- Modern dental hospital facilities in Pune" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹17.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 5 | ₹26.0 L (indicative) |\n| MDS — Periodontics | 3 years | 4 | ₹26.0 L (indicative) |\n| MDS — Pedodontics & Preventive Dentistry | 3 years | 4 | ₹26.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with D.Y. Patil Vidyapeeth admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, D.Y. Patil Vidyapeeth sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. D.Y. Patil Vidyapeeth conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions via state PSC exams, or licensing pathways abroad. The D.Y. Patil group's broader hospital network in Maharashtra also provides some clinical-affiliation pathways for graduates." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, D.Y. Patil Dental College's NEET cutoff has historically been moderately competitive, reflecting strong regional demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with D.Y. Patil Vidyapeeth admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Dr. D.Y. Patil Vidyapeeth (Dental) is ranked #5 in NIRF 2024 Dental, and the broader D.Y. Patil Vidyapeeth also ranks in NIRF's Medical and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "D.Y. Patil Vidyapeeth provides on-campus hostel accommodation for men and women in Pune, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader D.Y. Patil multi-campus culture." },
  ],
};

const abShetty: CollegeContentPack = {
  slug: "a-b-shetty-memorial-institute-of-dental-sciences",
  college: {
    estd: 1988,
    website: "https://nitte.edu.in/mangalore/abshetty",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Deemed University (Nitte)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "A.B. Shetty Memorial Institute of Dental Sciences — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "ABSMIDS Mangaluru NIRF #6 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel and scholarship details.",
    about:
      "A.B. Shetty Memorial Institute of Dental Sciences (ABSMIDS), established in 1988 in Mangaluru, Karnataka, is part of Nitte (Deemed to be University), one of coastal Karnataka's established private education groups. It has built a strong regional reputation for dental education over more than three decades, ranked #6 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "4", feesLabel: "₹24.0 L total (indicative)" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "4", feesLabel: "₹24.0 L total (indicative)" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "4", feesLabel: "₹24.0 L total (indicative)" },
  ],
  highlights: [
    "Part of Nitte (Deemed to be University), an established coastal Karnataka education group",
    "Over three decades of dental education history, founded 1988",
    "Ranked #6 in NIRF 2024 Dental",
    "Strong regional reputation across coastal Karnataka and Kerala",
  ],
  faqs: [
    { question: "Is A.B. Shetty part of Manipal?", answer: "No — A.B. Shetty Memorial Institute of Dental Sciences is part of Nitte (Deemed to be University), a separate education group based in Mangaluru, distinct from Manipal Academy of Higher Education, though both are prominent coastal Karnataka institutions." },
    { question: "How is admission to A.B. Shetty done?", answer: "Admission is via NEET-UG score; as part of Nitte, a deemed university, ABSMIDS conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About ABSMIDS", body: "A.B. Shetty Memorial Institute of Dental Sciences was established in 1988 in Mangaluru, Karnataka, as part of Nitte (Deemed to be University), one of coastal Karnataka's established private education groups spanning medical, dental, engineering, and management education. The institute runs BDS and MDS programmes across all major dental specialities.\n\nOver more than three decades, ABSMIDS has built a strong regional reputation, drawing students from across Karnataka, Kerala, and beyond, supported by Nitte's broader multi-disciplinary campus infrastructure in Mangaluru." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The ABSMIDS campus in Mangaluru includes a dedicated dental hospital with facilities across all major specialities, alongside academic blocks and research infrastructure as part of the broader Nitte university campus." },
    { tab: "info", heading: "Why Choose ABSMIDS", body: "- Over three decades of dental education history and regional reputation\n- Part of Nitte, an established coastal Karnataka multi-disciplinary education group\n- Ranked #6 nationally in NIRF 2024 Dental\n- Strong MDS programme depth across major specialities" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 4 | ₹24.0 L (indicative) |\n| MDS — Orthodontics | 3 years | 4 | ₹24.0 L (indicative) |\n| MDS — Prosthodontics | 3 years | 4 | ₹24.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with Nitte admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As part of Nitte, a deemed university, ABSMIDS sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Nitte conducts its own centralised counselling for ABSMIDS's BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "ABSMIDS graduates commonly pursue MDS specialisation, private practice across Karnataka and Kerala, corporate dental chain roles, government dental officer positions, or licensing pathways abroad. Nitte's regional alumni network provides additional referral and mentorship pathways." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within ABSMIDS's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, ABSMIDS's NEET cutoff has historically been moderately competitive, reflecting strong regional demand across coastal Karnataka. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Nitte admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "A.B. Shetty Memorial Institute of Dental Sciences is ranked #6 in NIRF 2024 Dental, and Nitte also ranks in NIRF's Medical and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Nitte provides on-campus hostel accommodation for men and women in Mangaluru, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader Nitte multi-disciplinary campus culture." },
  ],
};

export const dentalBatch1: CollegeContentPack[] = [
  saveethaDental,
  manipalManipal,
  maulanaAzad,
  kgmuDental,
  dyPatilDental,
  abShetty,
];
