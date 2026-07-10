import type { CollegeContentPack } from "./types";

// NIRF Dental 2024 #21-30 — hand-authored, matches dental-batch1/2.ts depth.

const govtDentalTrivandrum: CollegeContentPack = {
  slug: "government-dental-college-thiruvananthapuram",
  college: {
    estd: 1964,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Kerala University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Government Dental College Thiruvananthapuram — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Government Dental College, Thiruvananthapuram NIRF #21 Dental: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Government Dental College, Thiruvananthapuram, established in 1964, is Kerala's premier government dental institution, affiliated with Kerala University of Health Sciences. It combines heavily subsidised fees with a strong clinical training reputation across the state, ranked #21 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Kerala's premier government dental college, established 1964",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #21 in NIRF 2024 Dental",
    "Strong clinical training reputation across Kerala",
  ],
  faqs: [
    { question: "How is admission to Government Dental College Thiruvananthapuram done?", answer: "Admission is via NEET-UG score through Kerala state-quota counselling for Kerala-domicile candidates and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Government Dental College, Thiruvananthapuram", body: "Government Dental College, Thiruvananthapuram was established in 1964 and is affiliated with Kerala University of Health Sciences. It serves as Kerala's premier government dental training institution, running BDS and MDS programmes across major dental specialities.\n\nAs a government institute, the college combines heavily subsidised fees with a strong clinical training reputation, drawing highly competitive NEET-UG applicants for its limited seats from across Kerala and beyond." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Kerala's capital city with a full-service dental hospital covering major specialities, serving a large public patient base and giving students substantial hands-on clinical exposure." },
    { tab: "info", heading: "Why Choose Government Dental College Thiruvananthapuram", body: "- Kerala's premier government dental college with six decades of history\n- Government fee structure, among the lowest of any top-tier dental institute\n- Ranked #21 nationally in NIRF 2024 Dental\n- Strong statewide clinical training reputation" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Kerala state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Kerala state-quota counselling for Kerala-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Kerala domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Kerala's public health system, private practice, or hospital-affiliated clinical positions, including opportunities in the Gulf given Kerala's strong healthcare-emigration pipeline." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As Kerala's premier government dental college, closing ranks for the state quota and AIQ have historically required scores well above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Kerala counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per Kerala government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Government Dental College, Thiruvananthapuram is ranked #21 in NIRF 2024 Dental, Kerala's highest-ranked government dental institution." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Thiruvananthapuram under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const kiitDental: CollegeContentPack = {
  slug: "kalinga-institute-of-industrial-technology-dental",
  college: {
    estd: 1992,
    website: "https://kiit.ac.in",
    feesNum: 1700000,
    feesLabel: "₹17.0 L",
    affiliation: "Deemed University (KIIT)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "KIIT Dental College Bhubaneswar — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Kalinga Institute of Industrial Technology Dental NIRF #22: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "KIIT's dental college is part of Kalinga Institute of Industrial Technology, a large deemed university in Bhubaneswar, Odisha, best known for its School of Computer Engineering but also running well-resourced medical and dental schools. It is ranked #22 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹17.0 L total" },
    { name: "MDS — Oral Medicine & Radiology", duration: "3 years", seats: "3", feesLabel: "₹25.0 L total (indicative)" },
  ],
  highlights: [
    "Part of KIIT, a large multi-disciplinary deemed university in Bhubaneswar",
    "Ranked #22 in NIRF 2024 Dental",
    "Access to KIIT's broader medical, engineering, and management ecosystem",
    "Modern campus infrastructure built through significant institutional investment",
  ],
  faqs: [
    { question: "Is KIIT primarily known for engineering?", answer: "KIIT is best known nationally for its large School of Computer Engineering, but it also runs well-resourced medical and dental schools as part of its broader multi-disciplinary deemed-university structure." },
    { question: "How is admission to KIIT Dental done?", answer: "Admission is via NEET-UG score; as a deemed university, KIIT conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About KIIT Dental College", body: "KIIT's dental college operates under Kalinga Institute of Industrial Technology, a deemed university founded in 1992 in Bhubaneswar, Odisha. While KIIT is best known nationally for its large School of Computer Engineering, it has also invested substantially in medical and dental education, running BDS and MDS programmes across major dental specialities.\n\nThe dental college benefits from KIIT's broader institutional scale, including access to shared research infrastructure and a large multi-disciplinary campus community." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The KIIT campus in Bhubaneswar houses a dedicated dental hospital alongside the university's broader medical and engineering schools, giving dental students access to a wide multi-disciplinary academic environment." },
    { tab: "info", heading: "Why Choose KIIT Dental", body: "- Part of a large, well-resourced multi-disciplinary deemed university\n- Ranked #22 nationally in NIRF 2024 Dental\n- Modern campus infrastructure in Bhubaneswar\n- Access to KIIT's broader academic and international-student ecosystem" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹17.0 L |\n| MDS — Oral Medicine & Radiology | 3 years | 3 | ₹25.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with KIIT admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, KIIT sets its own fee structure. Fees are typically payable per year through KIIT's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. KIIT conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from KIIT's growing eastern India professional network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, KIIT Dental's NEET cutoff has historically been moderately competitive. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with KIIT admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Kalinga Institute of Industrial Technology (Dental) is ranked #22 in NIRF 2024 Dental, and KIIT also ranks strongly across NIRF's Engineering, Medical, and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "KIIT provides on-campus hostel accommodation for men and women in Bhubaneswar, with mess facilities. Student life includes technical events, clinical case competitions, and access to KIIT's broader multi-disciplinary and international-student campus culture." },
  ],
};

const pgidsRohtak: CollegeContentPack = {
  slug: "postgraduate-institute-of-dental-sciences-rohtak",
  college: {
    estd: 1975,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Pandit Bhagwat Dayal Sharma University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Postgraduate Institute of Dental Sciences Rohtak — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "PGIDS Rohtak NIRF #23 Dental: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Postgraduate Institute of Dental Sciences (PGIDS), Rohtak, established in 1975, is Haryana's premier government dental institution, affiliated with Pandit Bhagwat Dayal Sharma University of Health Sciences. As its name suggests, PGIDS has a particularly strong postgraduate (MDS) focus alongside its BDS programme, ranked #23 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "4", feesLabel: "₹1.5 L total (indicative)" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Haryana's premier government dental college, established 1975",
    "Particularly strong postgraduate (MDS) programme focus, reflected in its name",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #23 in NIRF 2024 Dental",
  ],
  faqs: [
    { question: "Why is it called 'Postgraduate Institute' if it offers BDS too?", answer: "PGIDS Rohtak was originally established with a strong postgraduate (MDS) focus, and while it has since added a BDS undergraduate programme, its name reflects its historical emphasis on postgraduate dental education and specialist training." },
  ],
  sections: [
    { tab: "info", heading: "About PGIDS Rohtak", body: "Postgraduate Institute of Dental Sciences was established in 1975 in Rohtak, Haryana, and is affiliated with Pandit Bhagwat Dayal Sharma University of Health Sciences. As its name suggests, the institute has historically maintained a particularly strong postgraduate (MDS) focus across major dental specialities, alongside its BDS undergraduate programme.\n\nAs Haryana's premier government dental institution, PGIDS combines heavily subsidised fees with a strong specialist-training reputation." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "PGIDS operates from a dedicated campus in Rohtak with a full-service dental hospital covering all major specialities, giving both undergraduate and postgraduate students substantial hands-on clinical and surgical exposure." },
    { tab: "info", heading: "Why Choose PGIDS Rohtak", body: "- Haryana's premier government dental college with a strong postgraduate focus\n- Government fee structure, among the lowest of any top-tier dental institute\n- Ranked #23 nationally in NIRF 2024 Dental\n- Deep MDS specialisation training reputation" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 4 | ₹1.5 L (indicative) |\n| MDS — Orthodontics | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Haryana state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. PGIDS fills seats through Haryana state-quota counselling for Haryana-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Haryana domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Given PGIDS's strong postgraduate focus, many BDS graduates pursue MDS specialisation (NEET-MDS), either at PGIDS itself or elsewhere, alongside pathways into government dental officer roles, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within PGIDS's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As Haryana's premier government dental college, closing ranks for the state quota and AIQ have historically required scores well above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Haryana counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per Haryana government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the institute" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Postgraduate Institute of Dental Sciences, Rohtak is ranked #23 in NIRF 2024 Dental, Haryana's highest-ranked government dental institution." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "PGIDS provides on-campus hostel accommodation for both undergraduate and postgraduate students. Student life includes dental-specific clinical and surgical case discussions typical of a strongly postgraduate-oriented institute." },
  ],
};

const dattaMeghe: CollegeContentPack = {
  slug: "datta-meghe-institute-of-higher-education-and-research-dental",
  college: {
    estd: 1990,
    website: "https://dmiher.edu.in",
    feesNum: 1700000,
    feesLabel: "₹17.0 L",
    affiliation: "Deemed University (DMIHER)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Datta Meghe Institute of Higher Education Dental — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Datta Meghe Institute of Higher Education and Research Dental, Wardha NIRF #24: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Datta Meghe Institute of Higher Education and Research (DMIHER), based in Wardha, Maharashtra, runs a well-resourced dental college as part of a broader deemed university spanning medical, dental, nursing, and physiotherapy education. It is ranked #24 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹17.0 L total" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "4", feesLabel: "₹25.0 L total (indicative)" },
  ],
  highlights: [
    "Part of DMIHER, a broad multi-disciplinary deemed university in Wardha, Maharashtra",
    "Ranked #24 in NIRF 2024 Dental",
    "Access to DMIHER's medical, nursing, and physiotherapy research ecosystem",
    "Growing institutional research investment across all its schools",
  ],
  faqs: [
    { question: "What is DMIHER?", answer: "Datta Meghe Institute of Higher Education and Research is a deemed university based in Wardha, Maharashtra, running medical, dental, nursing, and physiotherapy institutions under a shared academic and administrative framework." },
    { question: "How is admission to DMIHER Dental done?", answer: "Admission is via NEET-UG score; as a deemed university, DMIHER conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About DMIHER Dental", body: "Datta Meghe Institute of Higher Education and Research was established around 1990 and is based in Wardha, Maharashtra, running a broad multi-disciplinary portfolio spanning medical, dental, nursing, and physiotherapy education under a deemed-university framework. The dental college runs BDS and MDS programmes across major dental specialities.\n\nDMIHER has invested in growing its research output across its various schools, contributing to its strengthening NIRF presence across Dental, Medical, and Overall University categories." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The DMIHER campus in Wardha houses a dedicated dental hospital alongside the institute's broader medical and allied health-sciences schools, giving dental students access to a wider clinical and research ecosystem." },
    { tab: "info", heading: "Why Choose DMIHER Dental", body: "- Part of a broad multi-disciplinary deemed university with growing research output\n- Ranked #24 nationally in NIRF 2024 Dental\n- Access to DMIHER's medical, nursing, and physiotherapy ecosystem\n- Central India (Wardha) location" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹17.0 L |\n| MDS — Prosthodontics | 3 years | 4 | ₹25.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with DMIHER admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, DMIHER sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. DMIHER conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from DMIHER's growing central India professional network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, DMIHER's NEET cutoff has historically been moderately competitive. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with DMIHER admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Datta Meghe Institute of Higher Education and Research (Dental) is ranked #24 in NIRF 2024 Dental, and DMIHER also ranks in NIRF's Medical and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "DMIHER provides on-campus hostel accommodation for men and women in Wardha, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader DMIHER multi-disciplinary campus culture." },
  ],
};

const govtDentalMumbai: CollegeContentPack = {
  slug: "government-dental-college-mumbai",
  college: {
    estd: 1953,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Maharashtra University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Government Dental College and Hospital Mumbai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Government Dental College & Hospital, Mumbai NIRF #25 Dental: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Government Dental College and Hospital, Mumbai, established in 1953, is one of India's oldest and most respected government dental institutions, affiliated with Maharashtra University of Health Sciences. Its long history, central Mumbai location, and very high patient volume make it a top government dental destination, ranked #25 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "4", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "One of India's oldest government dental colleges, established 1953",
    "Very high patient volume given its central Mumbai location",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #25 in NIRF 2024 Dental",
  ],
  faqs: [
    { question: "Is Government Dental College Mumbai the same as Nair Hospital Dental College?", answer: "No — they are separate government dental institutions in Mumbai, both affiliated with Maharashtra University of Health Sciences, though sharing the city's dense public healthcare ecosystem." },
  ],
  sections: [
    { tab: "info", heading: "About Government Dental College and Hospital, Mumbai", body: "Government Dental College and Hospital, Mumbai was established in 1953 and is affiliated with Maharashtra University of Health Sciences. As one of India's oldest government dental institutions, it has built a strong national reputation over seven decades, running BDS and MDS programmes across major dental specialities.\n\nIts central Mumbai location and the city's very high patient volume give students exceptional hands-on clinical exposure relative to most other government dental colleges." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from central Mumbai with a full-service dental hospital covering major specialities, serving one of India's densest urban patient populations and giving students substantial clinical case volume and diversity." },
    { tab: "info", heading: "Why Choose Government Dental College Mumbai", body: "- Seven decades of history, among India's oldest government dental colleges\n- Very high patient volume given its central Mumbai location\n- Government fee structure, among the lowest of any top-tier dental institute\n- Ranked #25 nationally in NIRF 2024 Dental" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 4 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Maharashtra state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Maharashtra state-quota counselling for Maharashtra-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Maharashtra domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Maharashtra's public health system, private practice in Mumbai's competitive dental market, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital, serving one of India's highest-volume public patient bases — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As one of India's oldest and most reputed government dental colleges, closing ranks for the state quota and AIQ have historically required scores well above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Maharashtra counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per Maharashtra government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Government Dental College and Hospital, Mumbai is ranked #25 in NIRF 2024 Dental, among the highest positions of any government dental college in India." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Mumbai under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const yenepoya: CollegeContentPack = {
  slug: "yenepoya-dental-college",
  college: {
    estd: 1999,
    website: "https://yenepoya.edu.in",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Deemed University (Yenepoya)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Yenepoya Dental College Mangaluru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Yenepoya Dental College, Mangaluru NIRF #26 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Yenepoya Dental College, established in 1999 in Mangaluru, Karnataka, is part of Yenepoya (Deemed to be University), one of coastal Karnataka's growing private education groups spanning medical, dental, nursing, and allied health-sciences education. It is ranked #26 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Periodontics", duration: "3 years", seats: "3", feesLabel: "₹24.0 L total (indicative)" },
  ],
  highlights: [
    "Part of Yenepoya (Deemed to be University), a growing coastal Karnataka education group",
    "Ranked #26 in NIRF 2024 Dental",
    "Access to Yenepoya's broader medical and health-sciences campus",
    "Established presence within Mangaluru's dense dental-education ecosystem",
  ],
  faqs: [
    { question: "How is admission to Yenepoya Dental College done?", answer: "Admission is via NEET-UG score; as a deemed university, Yenepoya conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Yenepoya Dental College", body: "Yenepoya Dental College was established in 1999 in Mangaluru, Karnataka, as part of Yenepoya (Deemed to be University), a growing private education group spanning medical, dental, nursing, and allied health-sciences education. The college runs BDS and MDS programmes across major dental specialities.\n\nMangaluru has become a dense hub for dental education in India, with Yenepoya joining Manipal (MCODS) and Nitte (A.B. Shetty) as one of the city's several established dental colleges." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Yenepoya campus in Mangaluru houses a dedicated dental hospital alongside the university's broader medical school, giving dental students access to a wider clinical and research ecosystem." },
    { tab: "info", heading: "Why Choose Yenepoya Dental", body: "- Part of Yenepoya's growing coastal Karnataka health-sciences ecosystem\n- Ranked #26 nationally in NIRF 2024 Dental\n- Located within Mangaluru's dense dental-education hub\n- Deemed-university curriculum flexibility" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Periodontics | 3 years | 3 | ₹24.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with Yenepoya admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Yenepoya sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Yenepoya conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Karnataka and Kerala, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within Yenepoya's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, Yenepoya Dental's NEET cutoff has historically been moderately competitive, reflecting strong demand across coastal Karnataka. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Yenepoya admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Yenepoya Dental College is ranked #26 in NIRF 2024 Dental, and Yenepoya also ranks in NIRF's Medical category." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Yenepoya provides on-campus hostel accommodation for men and women in Mangaluru, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader Yenepoya campus culture." },
  ],
};

const panjabUniversityDental: CollegeContentPack = {
  slug: "panjab-university-dental",
  college: {
    estd: 1946,
    website: "https://puchd.ac.in",
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, State University, Chandigarh",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Panjab University Dental Institute Chandigarh — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Panjab University Dr. Harvansh Singh Judge Institute of Dental Sciences NIRF #27: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Panjab University's dental institute — the Dr. Harvansh Singh Judge Institute of Dental Sciences and Hospital — operates within one of North India's oldest and most respected state universities, based in Chandigarh. It is ranked #27 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "50", feesLabel: "₹1.5 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Dental institute within Panjab University, one of North India's oldest state universities",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #27 in NIRF 2024 Dental",
    "Located in Chandigarh, a planned city with strong regional connectivity",
  ],
  faqs: [
    { question: "What is the full name of Panjab University's dental institute?", answer: "It is officially the Dr. Harvansh Singh Judge Institute of Dental Sciences and Hospital, operating as a constituent department of Panjab University in Chandigarh." },
    { question: "How is admission to Panjab University Dental done?", answer: "Admission is via NEET-UG score through Panjab University's own centralised counselling process, alongside participation in relevant state/UT and MCC processes for reserved-quota seats." },
  ],
  sections: [
    { tab: "info", heading: "About Panjab University Dental Institute", body: "Panjab University, established in 1946 and based in Chandigarh, runs the Dr. Harvansh Singh Judge Institute of Dental Sciences and Hospital as a constituent department. The institute offers BDS and MDS programmes across major dental specialities, backed by Panjab University's overall reputation as one of North India's oldest and most respected state universities.\n\nChandigarh's status as a well-planned, jointly administered capital city for both Punjab and Haryana gives the institute a distinctive regional draw beyond Punjab alone." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The dental institute operates from Panjab University's Chandigarh campus, with a dedicated dental hospital serving the broader Chandigarh, Punjab, and Haryana region." },
    { tab: "info", heading: "Why Choose Panjab University Dental", body: "- Part of one of North India's oldest and most respected state universities\n- Government fee structure at among the lowest cost of any top-ranked dental institute\n- Ranked #27 nationally in NIRF 2024 Dental\n- Chandigarh location with strong regional connectivity" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 50 | ₹1.5 L |\n| MDS — Orthodontics | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government state university, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees are payable per year through the university's designated channels. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Panjab University conducts its own centralised counselling process for its BDS seats, alongside relevant state/UT and MCC processes for reserved-quota seats." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, government dental officer roles across Punjab, Haryana, and Chandigarh, private practice, or hospital-affiliated clinical positions, benefiting from Panjab University's long-standing regional reputation." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the institute's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a well-regarded government dental institute, closing ranks have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Panjab University admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the university" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Panjab University is ranked #27 in NIRF 2024 Dental, and also ranks strongly across NIRF's Management, Overall University, and other categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Panjab University provides on-campus hostel accommodation for dental students as part of its large Chandigarh campus. Student life includes access to the university's broader academic and cultural events." },
  ],
};

const nairDental: CollegeContentPack = {
  slug: "nair-hospital-dental-college",
  college: {
    estd: 1953,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Maharashtra University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Nair Hospital Dental College Mumbai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Nair Hospital Dental College, Mumbai NIRF #28 Dental: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Nair Hospital Dental College, established in 1953 in Mumbai, is one of the city's premier government dental institutions, closely linked to the broader Topiwala National Medical College and B.Y.L. Nair Charitable Hospital ecosystem. It is ranked #28 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Oral Pathology & Microbiology", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "One of Mumbai's premier government dental colleges, established 1953",
    "Linked to the broader Nair Hospital and Topiwala National Medical College ecosystem",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #28 in NIRF 2024 Dental",
  ],
  faqs: [
    { question: "Is Nair Hospital Dental College linked to a medical college?", answer: "Yes — it is closely associated with Topiwala National Medical College and B.Y.L. Nair Charitable Hospital, giving dental students access to a broader Mumbai municipal hospital ecosystem." },
  ],
  sections: [
    { tab: "info", heading: "About Nair Hospital Dental College", body: "Nair Hospital Dental College was established in 1953 in Mumbai, closely linked to the broader Topiwala National Medical College and B.Y.L. Nair Charitable Hospital ecosystem, run under Mumbai's municipal hospital system. The college runs BDS and MDS programmes across major dental specialities.\n\nAs one of Mumbai's premier government dental institutions, Nair Hospital Dental College combines heavily subsidised fees with access to a very high-volume public hospital patient base." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates within Mumbai's Nair Hospital complex, giving dental students access to substantial clinical case volume and, where relevant, cross-specialty exposure through the broader hospital's medical departments." },
    { tab: "info", heading: "Why Choose Nair Hospital Dental College", body: "- Seven decades of history as one of Mumbai's premier government dental colleges\n- Access to a high-volume public hospital patient base\n- Government fee structure, among the lowest of any top-tier dental institute\n- Ranked #28 nationally in NIRF 2024 Dental" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Oral Pathology & Microbiology | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Maharashtra state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Maharashtra state-quota counselling for Maharashtra-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Maharashtra domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Maharashtra's public health system, private practice in Mumbai's competitive dental market, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital and the broader Nair Hospital complex — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As one of Mumbai's premier government dental colleges, closing ranks for the state quota and AIQ have historically required scores well above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Maharashtra counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per Maharashtra government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Nair Hospital Dental College is ranked #28 in NIRF 2024 Dental, among the highest positions of any government dental college in India." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Mumbai under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const kleDental: CollegeContentPack = {
  slug: "kle-vishwanath-katti-institute-of-dental-sciences",
  college: {
    estd: 1985,
    website: "https://klevkidshb.edu.in",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Deemed University (KLE)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "KLE VK Institute of Dental Sciences Belagavi — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "KLE Vishwanath Katti Institute of Dental Sciences, Belagavi NIRF #29 Dental: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "KLE Vishwanath Katti Institute of Dental Sciences, established in 1985 in Belagavi, Karnataka, is part of KLE Academy of Higher Education and Research, a well-regarded deemed university under the century-old KLE Society trust, with a strong presence across medical, dental, and engineering education in North Karnataka. It is ranked #29 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Public Health Dentistry", duration: "3 years", seats: "3", feesLabel: "₹22.0 L total (indicative)" },
  ],
  highlights: [
    "Part of KLE Academy of Higher Education and Research, under the century-old KLE Society trust",
    "Established 1985, nearly four decades of dental education history",
    "Ranked #29 in NIRF 2024 Dental",
    "Strong North Karnataka regional reputation across medical and dental education",
  ],
  faqs: [
    { question: "What is KLE Society?", answer: "KLE Society is a century-old educational trust based in Belagavi, Karnataka, running numerous medical, dental, engineering, and arts/science institutions across North Karnataka under the KLE Academy of Higher Education and Research deemed university umbrella." },
  ],
  sections: [
    { tab: "info", heading: "About KLE VK Institute of Dental Sciences", body: "KLE Vishwanath Katti Institute of Dental Sciences was established in 1985 in Belagavi, Karnataka, as part of KLE Academy of Higher Education and Research, a deemed university under the century-old KLE Society educational trust. The trust runs numerous institutions across North Karnataka, giving the dental college a strong regional institutional backing.\n\nThe college runs BDS and MDS programmes across major dental specialities, benefiting from KLE's broader medical and health-sciences ecosystem in Belagavi." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The KLE campus in Belagavi houses a dedicated dental hospital alongside the trust's broader medical and engineering institutions, giving dental students access to a wider academic and research ecosystem." },
    { tab: "info", heading: "Why Choose KLE VK Institute", body: "- Backed by the century-old KLE Society educational trust\n- Ranked #29 nationally in NIRF 2024 Dental\n- Strong North Karnataka regional reputation across medical and dental education\n- Access to KLE's broader multi-disciplinary academic ecosystem" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Public Health Dentistry | 3 years | 3 | ₹22.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with KLE admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, KLE Academy sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. KLE conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across North Karnataka, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the KLE Society's extensive regional alumni network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the institute's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, KLE VK Institute's NEET cutoff has historically been moderately competitive, reflecting strong regional demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with KLE admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "KLE Vishwanath Katti Institute of Dental Sciences is ranked #29 in NIRF 2024 Dental, and KLE Academy also ranks in NIRF's Medical category." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "KLE provides on-campus hostel accommodation for men and women in Belagavi, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader KLE multi-disciplinary campus culture." },
  ],
};

const christianDentalLudhiana: CollegeContentPack = {
  slug: "christian-dental-college-ludhiana",
  college: {
    estd: 1973,
    feesNum: 1400000,
    feesLabel: "₹14.0 L",
    affiliation: "Private (Christian Medical College Trust)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Christian Dental College Ludhiana — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Christian Dental College, Ludhiana NIRF #30 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Christian Dental College, Ludhiana, established in 1973 and affiliated with the Christian Medical College and Hospital trust, is one of Punjab's older private dental institutions with a strong mission-driven healthcare heritage. It is ranked #30 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹14.0 L total" },
    { name: "MDS — Community Dentistry", duration: "3 years", seats: "2", feesLabel: "₹20.0 L total (indicative)" },
  ],
  highlights: [
    "Established 1973, affiliated with the Christian Medical College and Hospital trust",
    "Mission-driven healthcare heritage with a strong community-dentistry focus",
    "Ranked #30 in NIRF 2024 Dental",
    "One of Punjab's older private dental institutions",
  ],
  faqs: [
    { question: "Is Christian Dental College linked to CMC Vellore?", answer: "Christian Dental College, Ludhiana is affiliated with the Christian Medical College and Hospital trust network, part of the broader mission-hospital tradition in India, though it operates as a distinct institution from CMC Vellore." },
  ],
  sections: [
    { tab: "info", heading: "About Christian Dental College, Ludhiana", body: "Christian Dental College, Ludhiana was established in 1973 and is affiliated with the Christian Medical College and Hospital trust network, part of India's broader mission-hospital tradition dating back over a century. The college runs BDS and MDS programmes with a particular emphasis on community dentistry and public-health-oriented clinical training.\n\nAs one of Punjab's older private dental institutions, Christian Dental College has built a distinctive reputation combining clinical rigour with a service-oriented healthcare mission." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Ludhiana, Punjab, with a dedicated dental hospital and community outreach programmes reflecting its mission-hospital heritage, giving students exposure to both clinical and public-health dentistry." },
    { tab: "info", heading: "Why Choose Christian Dental College", body: "- Over five decades of history with a distinctive mission-driven healthcare heritage\n- Strong community-dentistry and public-health training focus\n- Ranked #30 nationally in NIRF 2024 Dental\n- Established presence in Punjab's dental education landscape" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹14.0 L |\n| MDS — Community Dentistry | 3 years | 2 | ₹20.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with Christian Dental College admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a private institution, Christian Dental College sets its own fee structure. Fees are typically payable per year, with need-based concessions available given the institution's mission-hospital heritage." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Christian Dental College fills its BDS seats through Punjab state-quota counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, community and public-health dentistry roles (a particular strength of this college), government dental officer positions, or mission-hospital-network clinical roles." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital and community outreach programmes — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Christian Dental College's NEET cutoff has historically been moderately competitive for its private-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with the college's admissions office." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Need-based fee concessions reflecting the institution's mission-hospital heritage\n- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Education loan facilitation support" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Christian Dental College, Ludhiana is ranked #30 in NIRF 2024 Dental, a strong position for a mission-hospital-affiliated private dental college." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Christian Dental College provides on-campus hostel accommodation for men and women in Ludhiana, with mess facilities. Student life includes community health outreach events reflecting the college's service-oriented heritage." },
  ],
};

export const dentalBatch3: CollegeContentPack[] = [
  govtDentalTrivandrum,
  kiitDental,
  pgidsRohtak,
  dattaMeghe,
  govtDentalMumbai,
  yenepoya,
  panjabUniversityDental,
  nairDental,
  kleDental,
  christianDentalLudhiana,
];
