import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 2.
// Same 13-section/8-tab quality bar as the NIRF-ranked batches.

const ragasDental: CollegeContentPack = {
  slug: "ragas-dental-college-and-hospital",
  college: {
    estd: 1991,
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private, Affiliated to The Tamil Nadu Dr. M.G.R. Medical University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Ragas Dental College Chennai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Ragas Dental College & Hospital, Chennai: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Ragas Dental College and Hospital, established in 1991 in Chennai, Tamil Nadu, is one of the city's well-regarded private dental institutions, affiliated with The Tamil Nadu Dr. M.G.R. Medical University. It has built a solid academic and clinical reputation over more than three decades.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "3", feesLabel: "₹19.0 L total (indicative)" },
  ],
  highlights: [
    "Established 1991, over three decades of dental education history in Chennai",
    "Affiliated with The Tamil Nadu Dr. M.G.R. Medical University",
    "Well-regarded within Chennai's dense private dental education ecosystem",
    "Strong MDS programme offerings across major specialities",
  ],
  faqs: [
    { question: "How is admission to Ragas Dental College done?", answer: "The bulk of seats are filled through TNEA/TN state-quota counselling based on NEET-UG score, with a management-quota share filled through the college's own admission process." },
  ],
  sections: [
    { tab: "info", heading: "About Ragas Dental College", body: "Ragas Dental College and Hospital was established in 1991 in Chennai, Tamil Nadu, affiliated with The Tamil Nadu Dr. M.G.R. Medical University. Over more than three decades, the college has built a solid academic and clinical reputation within Chennai's dense private dental education ecosystem, running BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Chennai with facilities across major specialities, serving a large urban patient base and giving students substantial clinical exposure." },
    { tab: "info", heading: "Why Choose Ragas Dental College", body: "- Over three decades of dental education history\n- Affiliated with The Tamil Nadu Dr. M.G.R. Medical University\n- Well-regarded within Chennai's competitive private dental landscape\n- Strong MDS programme offerings" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n| MDS — Prosthodontics | 3 years | 3 | ₹19.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "TNEA-counselled seats follow Tamil Nadu government-regulated fee norms; management-quota seats carry a separate fee structure. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The bulk of seats are filled through TNEA (Tamil Nadu) state-quota counselling based on NEET-UG score, with a management-quota share filled through the college's own process." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, community/category certificate (Tamil Nadu candidates), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Tamil Nadu, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "TNEA-route BDS admissions have historically required a moderately competitive NEET score/rank for open category. Exact cutoff ranks vary by counselling round and category; confirm current-year figures on the TNEA portal." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Tamil Nadu government scholarship and fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Continuing merit scholarships tied to semester performance\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Ragas Dental College is not among NIRF's formally ranked top-40 dental institutes but holds a solid reputation within Tamil Nadu's private dental education landscape." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Chennai, with mess facilities." },
  ],
};

const tagoreDental: CollegeContentPack = {
  slug: "tagore-dental-college-and-hospital",
  college: {
    estd: 2004,
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private (Tagore group of institutions)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Tagore Dental College Chennai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Tagore Dental College & Hospital, Chennai: BDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Tagore Dental College and Hospital, part of the Tagore group of institutions in Chennai, Tamil Nadu, operates alongside the group's Tagore Medical College within a shared campus, established in the mid-2000s.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
  ],
  highlights: [
    "Part of the Tagore group of institutions, also running Tagore Medical College",
    "Shared campus with cross-specialty clinical exposure potential",
    "Located in Chennai, Tamil Nadu's largest dental-education hub",
  ],
  faqs: [
    { question: "How is admission to Tagore Dental College done?", answer: "The bulk of seats are filled through TNEA/TN state-quota counselling based on NEET-UG score, with a management-quota share filled through the college's own admission process." },
  ],
  sections: [
    { tab: "info", heading: "About Tagore Dental College", body: "Tagore Dental College and Hospital operates as part of the Tagore group of institutions in Chennai, Tamil Nadu, alongside the group's Tagore Medical College on a shared campus, established in the mid-2000s. The college runs a BDS programme across all core dental disciplines." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Tagore campus in Chennai houses a dedicated dental hospital alongside the group's medical college, giving students access to a broader clinical ecosystem where relevant." },
    { tab: "info", heading: "Why Choose Tagore Dental College", body: "- Part of a broader Tagore group medical/dental campus\n- Located in Chennai, one of India's densest dental-education hubs\n- Shared campus clinical resources" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "TNEA-counselled seats follow Tamil Nadu government-regulated fee norms; management-quota seats carry a separate fee structure. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The bulk of seats are filled through TNEA (Tamil Nadu) state-quota counselling based on NEET-UG score, with a management-quota share filled through the college's own process." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, community/category certificate (Tamil Nadu candidates), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "TNEA-route BDS admissions have historically required a moderately accessible NEET score/rank. Exact cutoff ranks vary by counselling round and category; confirm current-year figures on the TNEA portal." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Tamil Nadu government scholarship and fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Tagore Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Chennai, with mess facilities." },
  ],
};

const vinayakaMissions: CollegeContentPack = {
  slug: "vinayaka-mission-s-sankarachariyar-dental-college",
  college: {
    estd: 2001,
    website: "https://vmrfDU.ac.in",
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Deemed University (Vinayaka Mission's Research Foundation)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Vinayaka Mission's Sankarachariyar Dental College Salem — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Vinayaka Mission's Sankarachariyar Dental College, Salem: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Vinayaka Mission's Sankarachariyar Dental College, established around 2001 in Salem, Tamil Nadu, is part of Vinayaka Mission's Research Foundation, a deemed university running multiple medical, dental, and allied health-sciences campuses across Tamil Nadu and Puducherry.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
    { name: "MDS — Oral Pathology & Microbiology", duration: "3 years", seats: "2", feesLabel: "₹19.0 L total (indicative)" },
  ],
  highlights: [
    "Part of Vinayaka Mission's Research Foundation, a multi-campus deemed university",
    "Located in Salem, Tamil Nadu",
    "Access to the broader Vinayaka Missions medical/health-sciences network",
    "Deemed-university curriculum flexibility",
  ],
  faqs: [
    { question: "How is admission to Vinayaka Mission's Dental College done?", answer: "Admission is via NEET-UG score; as a deemed university, Vinayaka Mission's Research Foundation conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Vinayaka Mission's Sankarachariyar Dental College", body: "Vinayaka Mission's Sankarachariyar Dental College was established around 2001 in Salem, Tamil Nadu, as part of Vinayaka Mission's Research Foundation, a deemed university running multiple medical, dental, and allied health-sciences campuses across Tamil Nadu and Puducherry. The college runs BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Salem campus houses a dedicated dental hospital with facilities across major specialities, part of the broader Vinayaka Missions multi-campus network." },
    { tab: "info", heading: "Why Choose Vinayaka Mission's Dental College", body: "- Part of a multi-campus deemed university network\n- Access to the broader Vinayaka Missions health-sciences ecosystem\n- Located in Salem, Tamil Nadu\n- Deemed-university curriculum flexibility" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n| MDS — Oral Pathology & Microbiology | 3 years | 2 | ₹19.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with Vinayaka Mission's admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Vinayaka Mission's Research Foundation sets its own fee structure. Fees are typically payable per year, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Vinayaka Mission's Research Foundation conducts its own centralised counselling for BDS seats based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, the college's NEET cutoff has historically been moderately accessible. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Vinayaka Mission's admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Vinayaka Mission's Sankarachariyar Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The Salem campus provides on-campus hostel accommodation for men and women, with mess facilities." },
  ],
};

const saraswatiLucknow: CollegeContentPack = {
  slug: "saraswati-dental-college",
  college: {
    estd: 2008,
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Saraswati Dental College Lucknow — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Saraswati Dental College, Lucknow: BDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Saraswati Dental College, established around 2008 in Lucknow, Uttar Pradesh, is a private dental institution serving the state's growing demand for dental education beyond its government colleges.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
  ],
  highlights: [
    "Established around 2008 in Lucknow, Uttar Pradesh",
    "Private dental college serving UP's growing dental-education demand",
    "Located in Lucknow, the state capital",
  ],
  faqs: [
    { question: "How is admission to Saraswati Dental College done?", answer: "Admission is via NEET-UG score through Uttar Pradesh state counselling and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About Saraswati Dental College", body: "Saraswati Dental College was established around 2008 in Lucknow, Uttar Pradesh, as a private dental institution serving the state's growing demand for dental education beyond its limited government college seats. The college runs a BDS programme across all core dental disciplines." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Lucknow with facilities across major specialities." },
    { tab: "info", heading: "Why Choose Saraswati Dental College", body: "- Located in Lucknow, Uttar Pradesh's capital\n- Serves UP's growing private dental-education demand\n- Standard NEET-based admission process" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Uttar Pradesh state-regulated norms for state-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Uttar Pradesh state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Uttar Pradesh, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with UP counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Uttar Pradesh state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Saraswati Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Lucknow, with mess facilities." },
  ],
};

const teerthankerMahaveer: CollegeContentPack = {
  slug: "teerthanker-mahaveer-dental-college-and-research",
  college: {
    estd: 2007,
    website: "https://www.tmu.ac.in",
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private University (Teerthanker Mahaveer University)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Teerthanker Mahaveer Dental College Moradabad — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Teerthanker Mahaveer Dental College & Research Centre, Moradabad: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Teerthanker Mahaveer Dental College and Research Centre, part of Teerthanker Mahaveer University in Moradabad, Uttar Pradesh, benefits from the university's broader multi-disciplinary campus spanning medical, engineering, and management education.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
    { name: "MDS — Pedodontics & Preventive Dentistry", duration: "3 years", seats: "2", feesLabel: "₹18.0 L total (indicative)" },
  ],
  highlights: [
    "Part of Teerthanker Mahaveer University's broad multi-disciplinary campus",
    "Located in Moradabad, western Uttar Pradesh",
    "Access to the university's medical, engineering, and management schools",
    "Private-university curriculum flexibility",
  ],
  faqs: [
    { question: "How is admission to Teerthanker Mahaveer Dental College done?", answer: "Admission is via NEET-UG score; the university conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Teerthanker Mahaveer Dental College", body: "Teerthanker Mahaveer Dental College and Research Centre operates under Teerthanker Mahaveer University in Moradabad, Uttar Pradesh, established around 2007. The university runs a broad multi-disciplinary portfolio spanning medical, dental, engineering, and management education. The dental college runs BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Moradabad campus houses a dedicated dental hospital alongside the university's broader medical and engineering schools, giving dental students access to a wide multi-disciplinary academic environment." },
    { tab: "info", heading: "Why Choose Teerthanker Mahaveer Dental College", body: "- Part of a broad multi-disciplinary private university\n- Located in Moradabad, western Uttar Pradesh\n- Access to the university's medical and engineering schools\n- Private-university curriculum flexibility" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n| MDS — Pedodontics & Preventive Dentistry | 3 years | 2 | ₹18.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with Teerthanker Mahaveer University admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a private university, Teerthanker Mahaveer sets its own fee structure. Fees are typically payable per year, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The university conducts its own centralised counselling for BDS seats based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a private-university management-quota-heavy intake, the college's NEET cutoff has historically been moderately accessible. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Teerthanker Mahaveer admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Teerthanker Mahaveer Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Teerthanker Mahaveer University provides on-campus hostel accommodation for men and women in Moradabad, with mess facilities." },
  ],
};

const santoshDental: CollegeContentPack = {
  slug: "santosh-dental-college-and-hospital",
  college: {
    estd: 2000,
    website: "https://www.santosh.ac.in",
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Deemed University (Santosh)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Santosh Dental College Ghaziabad — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Santosh Dental College & Hospital, Ghaziabad: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Santosh Dental College and Hospital, part of Santosh Deemed to be University in Ghaziabad, Uttar Pradesh, benefits from a Delhi-NCR location and the university's broader medical education presence.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "2", feesLabel: "₹19.0 L total (indicative)" },
  ],
  highlights: [
    "Delhi-NCR location in Ghaziabad, Uttar Pradesh",
    "Part of Santosh Deemed to be University's broader medical education presence",
    "Access to a dense NCR healthcare and professional ecosystem",
    "Deemed-university curriculum flexibility",
  ],
  faqs: [
    { question: "How is admission to Santosh Dental College done?", answer: "Admission is via NEET-UG score; as a deemed university, Santosh conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Santosh Dental College", body: "Santosh Dental College and Hospital operates under Santosh Deemed to be University in Ghaziabad, Uttar Pradesh, established around 2000. Its Delhi-NCR location and the university's broader medical education presence give the dental college access to a dense healthcare and professional ecosystem. The college runs BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Santosh campus in Ghaziabad houses a dedicated dental hospital alongside the university's medical school, giving dental students access to cross-specialty clinical exposure where relevant." },
    { tab: "info", heading: "Why Choose Santosh Dental College", body: "- Delhi-NCR location with dense healthcare and professional access\n- Part of Santosh Deemed to be University's medical education ecosystem\n- Ghaziabad campus close to Delhi\n- Deemed-university curriculum flexibility" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n| MDS — Orthodontics | 3 years | 2 | ₹19.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with Santosh University admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Santosh sets its own fee structure. Fees are typically payable per year, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Santosh conducts its own centralised counselling for BDS seats based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in the competitive Delhi-NCR dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, the college's NEET cutoff has historically been moderately accessible, benefiting from NCR demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Santosh admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Santosh Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Santosh University provides on-campus hostel accommodation for men and women in Ghaziabad, with mess facilities." },
  ],
};

const mallaReddyWomen: CollegeContentPack = {
  slug: "malla-reddy-dental-college-for-women",
  college: {
    estd: 2003,
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private (Malla Reddy group)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Malla Reddy Dental College for Women Hyderabad — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Malla Reddy Dental College for Women, Hyderabad: BDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Malla Reddy Dental College for Women, established around 2003 in Hyderabad, Telangana, is a women-only dental college run by the Malla Reddy group, one of Telangana's larger private education groups also running engineering and medical institutions.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery) — Women only", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
  ],
  highlights: [
    "Women-only dental college, part of the Malla Reddy group",
    "Located in Hyderabad, Telangana's capital",
    "Part of a broader group also running engineering and medical institutions",
  ],
  faqs: [
    { question: "Is Malla Reddy Dental College for Women only for women?", answer: "Yes — as its name indicates, this college admits only women students for its BDS programme." },
    { question: "How is admission done?", answer: "Admission is via NEET-UG score through Telangana state (TS EAMCET-linked) counselling and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About Malla Reddy Dental College for Women", body: "Malla Reddy Dental College for Women was established around 2003 in Hyderabad, Telangana, run by the Malla Reddy group, one of Telangana's larger private education groups that also operates engineering and medical institutions in the region. The college runs a women-only BDS programme across all core dental disciplines." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Hyderabad with facilities across major specialities, exclusively serving its women student body." },
    { tab: "info", heading: "Why Choose Malla Reddy Dental College for Women", body: "- Women-only dental education environment\n- Part of the broader Malla Reddy education group\n- Located in Hyderabad, Telangana's capital" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS (Women only) | 5 years (incl. internship) | 100 | ₹13.0 L |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Telangana state-regulated norms for convener-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Telangana state counselling and its own management-quota process, for women applicants only." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Female applicants only, Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Telangana, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Telangana counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Telangana state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Malla Reddy Dental College for Women is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for its women student body in Hyderabad, with mess facilities." },
  ],
};

const kamineniNalgonda: CollegeContentPack = {
  slug: "kamineni-institute-of-dental-sciences",
  college: {
    estd: 2001,
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private (Kamineni group)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Kamineni Institute of Dental Sciences Nalgonda — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Kamineni Institute of Dental Sciences, Nalgonda: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Kamineni Institute of Dental Sciences, established around 2001 in Nalgonda, Telangana, is part of the Kamineni group, which also runs engineering and medical institutions across Telangana.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
    { name: "MDS — Public Health Dentistry", duration: "3 years", seats: "2", feesLabel: "₹18.0 L total (indicative)" },
  ],
  highlights: [
    "Part of the Kamineni group, also running engineering and medical institutions",
    "Located in Nalgonda, Telangana",
    "Access to the broader Kamineni multi-disciplinary academic ecosystem",
  ],
  faqs: [
    { question: "How is admission to Kamineni Institute of Dental Sciences done?", answer: "Admission is via NEET-UG score through Telangana state counselling and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About Kamineni Institute of Dental Sciences", body: "Kamineni Institute of Dental Sciences was established around 2001 in Nalgonda, Telangana, as part of the Kamineni group, which also runs engineering (Kamineni Institute of Technology) and medical (Kamineni Academy of Medical Sciences) institutions across Telangana. The college runs BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Kamineni campus in Nalgonda houses a dedicated dental hospital alongside the group's broader engineering and medical institutions." },
    { tab: "info", heading: "Why Choose Kamineni Institute of Dental Sciences", body: "- Part of the broader Kamineni multi-disciplinary education group\n- Located in Nalgonda, Telangana\n- Access to shared group infrastructure and network" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n| MDS — Public Health Dentistry | 3 years | 2 | ₹18.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Telangana state-regulated norms for convener-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Telangana state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Telangana, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Telangana counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Telangana state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Kamineni Institute of Dental Sciences is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Nalgonda, with mess facilities." },
  ],
};

const darshanUdaipur: CollegeContentPack = {
  slug: "darshan-dental-college-and-hospital",
  college: {
    estd: 2007,
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Darshan Dental College Udaipur — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Darshan Dental College & Hospital, Udaipur: BDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Darshan Dental College and Hospital, established around 2007 in Udaipur, Rajasthan, is a private dental institution serving southern Rajasthan's dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
  ],
  highlights: [
    "Established around 2007 in Udaipur, Rajasthan",
    "Serves southern Rajasthan's dental-education demand",
    "Located in the scenic Lake City of Udaipur",
  ],
  faqs: [
    { question: "How is admission to Darshan Dental College done?", answer: "Admission is via NEET-UG score through Rajasthan state counselling (NEET-based) and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About Darshan Dental College", body: "Darshan Dental College and Hospital was established around 2007 in Udaipur, Rajasthan, as a private dental institution serving southern Rajasthan's dental education demand. The college runs a BDS programme across all core dental disciplines." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Udaipur with facilities across major specialities." },
    { tab: "info", heading: "Why Choose Darshan Dental College", body: "- Serves southern Rajasthan's private dental-education demand\n- Located in Udaipur, the scenic Lake City\n- Standard NEET-based admission process" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Rajasthan state-regulated norms for state-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Rajasthan state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Rajasthan, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Rajasthan counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Rajasthan state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Darshan Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Udaipur, with mess facilities." },
  ],
};

const nimsJaipur: CollegeContentPack = {
  slug: "nims-dental-college",
  college: {
    estd: 2007,
    website: "https://www.nimsuniversity.org",
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private University (NIMS University)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "NIMS Dental College Jaipur — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "NIMS Dental College, Jaipur: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "NIMS Dental College, part of NIMS University in Jaipur, Rajasthan, benefits from the university's broader medical and health-sciences campus, established around 2007.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "2", feesLabel: "₹18.0 L total (indicative)" },
  ],
  highlights: [
    "Part of NIMS University's broader medical and health-sciences campus",
    "Located in Jaipur, Rajasthan's capital",
    "Access to a large multi-disciplinary university ecosystem",
  ],
  faqs: [
    { question: "How is admission to NIMS Dental College done?", answer: "Admission is via NEET-UG score; NIMS University conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About NIMS Dental College", body: "NIMS Dental College operates under NIMS University (National Institute of Medical Sciences) in Jaipur, Rajasthan, established around 2007. NIMS University runs a broad medical and health-sciences campus, and the dental college benefits from this shared institutional infrastructure. The college runs BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The NIMS campus in Jaipur houses a dedicated dental hospital alongside the university's broader medical school, giving dental students access to cross-specialty clinical exposure where relevant." },
    { tab: "info", heading: "Why Choose NIMS Dental College", body: "- Part of a large multi-disciplinary university ecosystem\n- Located in Jaipur, Rajasthan's capital\n- Access to NIMS University's medical school and research infrastructure" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 2 | ₹18.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with NIMS University admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a private university, NIMS sets its own fee structure. Fees are typically payable per year, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. NIMS University conducts its own centralised counselling for BDS seats based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Rajasthan, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a private-university management-quota-heavy intake, the college's NEET cutoff has historically been moderately accessible. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with NIMS admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "NIMS Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "NIMS University provides on-campus hostel accommodation for men and women in Jaipur, with mess facilities." },
  ],
};

const modernIndore: CollegeContentPack = {
  slug: "modern-dental-college-and-research-centre",
  college: {
    estd: 2008,
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private, Affiliated to Devi Ahilya Vishwavidyalaya",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Modern Dental College Indore — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Modern Dental College & Research Centre, Indore: BDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Modern Dental College and Research Centre, established around 2008 in Indore, Madhya Pradesh, is a private dental institution serving central India's dental education demand, affiliated with Devi Ahilya Vishwavidyalaya.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
  ],
  highlights: [
    "Established around 2008 in Indore, Madhya Pradesh",
    "Serves central India's dental-education demand",
    "Affiliated with Devi Ahilya Vishwavidyalaya",
  ],
  faqs: [
    { question: "How is admission to Modern Dental College done?", answer: "Admission is via NEET-UG score through Madhya Pradesh state counselling and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About Modern Dental College", body: "Modern Dental College and Research Centre was established around 2008 in Indore, Madhya Pradesh, affiliated with Devi Ahilya Vishwavidyalaya. The college serves central India's growing dental education demand, running a BDS programme across all core dental disciplines." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Indore with facilities across major specialities." },
    { tab: "info", heading: "Why Choose Modern Dental College", body: "- Serves central India's growing private dental-education demand\n- Located in Indore, Madhya Pradesh's largest city\n- Affiliated with Devi Ahilya Vishwavidyalaya" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Madhya Pradesh state-regulated norms for state-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Madhya Pradesh state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Madhya Pradesh, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Madhya Pradesh counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Madhya Pradesh state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Modern Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Indore, with mess facilities." },
  ],
};

const sinhgadPune: CollegeContentPack = {
  slug: "sinhgad-dental-college-and-hospital",
  college: {
    estd: 2004,
    website: "https://sinhgad.edu",
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private (Sinhgad Technical Education Society)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Sinhgad Dental College Pune — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Sinhgad Dental College & Hospital, Pune: BDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Sinhgad Dental College and Hospital, established around 2004 in Pune, Maharashtra, is part of the Sinhgad Technical Education Society, one of Maharashtra's largest private education groups, primarily known for its extensive engineering college network.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
  ],
  highlights: [
    "Part of Sinhgad Technical Education Society, one of Maharashtra's largest private education groups",
    "Located in Pune, a major Maharashtra education and IT hub",
    "Established around 2004",
  ],
  faqs: [
    { question: "Is Sinhgad Dental College related to Sinhgad's engineering colleges?", answer: "Yes — Sinhgad Dental College and Hospital is run by the Sinhgad Technical Education Society, the same trust that operates a large network of engineering colleges across Pune and Maharashtra." },
  ],
  sections: [
    { tab: "info", heading: "About Sinhgad Dental College", body: "Sinhgad Dental College and Hospital was established around 2004 in Pune, Maharashtra, run by the Sinhgad Technical Education Society, one of Maharashtra's largest private education groups, primarily known for its extensive network of engineering colleges across the state. The dental college runs a BDS programme across all core dental disciplines." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Pune with facilities across major specialities, part of the broader Sinhgad institutional network." },
    { tab: "info", heading: "Why Choose Sinhgad Dental College", body: "- Part of one of Maharashtra's largest private education groups\n- Located in Pune, a major education and IT hub\n- Access to the broader Sinhgad institutional network" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Maharashtra state-regulated norms for state-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Maharashtra state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Maharashtra domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in Pune's competitive dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Maharashtra counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Maharashtra state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Sinhgad Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Pune, with mess facilities." },
  ],
};

export const dentalBatch6: CollegeContentPack[] = [
  ragasDental,
  tagoreDental,
  vinayakaMissions,
  saraswatiLucknow,
  teerthankerMahaveer,
  santoshDental,
  mallaReddyWomen,
  kamineniNalgonda,
  darshanUdaipur,
  nimsJaipur,
  modernIndore,
  sinhgadPune,
];
