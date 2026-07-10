import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 3, part 1 of 2 (13 colleges).
// Same 13-section/8-tab quality bar as every prior batch.

const vishnuDental: CollegeContentPack = {
  slug: "vishnu-dental-college",
  college: {
    estd: 1997,
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private, Affiliated to NTR University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Vishnu Dental College Bhimavaram — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Vishnu Dental College, Bhimavaram: BDS/MDS courses, fees, NEET admission, cutoff, hostel and scholarship details.",
    about:
      "Vishnu Dental College, established in 1997 in Bhimavaram, Andhra Pradesh, is a private dental institution affiliated with Dr. NTR University of Health Sciences, serving the West Godavari district's dental education demand with programmes across BDS and MDS specialities.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "3", feesLabel: "₹19.0 L total (indicative)" },
  ],
  highlights: [
    "Established 1997, affiliated with Dr. NTR University of Health Sciences",
    "Serves West Godavari district's dental education demand",
    "Located in Bhimavaram, Andhra Pradesh",
    "Standard NEET-based admission process",
  ],
  faqs: [
    { question: "How is admission to Vishnu Dental College done?", answer: "Admission is via NEET-UG score through Andhra Pradesh state counselling and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About Vishnu Dental College", body: "Vishnu Dental College was established in 1997 in Bhimavaram, Andhra Pradesh, affiliated with Dr. NTR University of Health Sciences. The college runs BDS and MDS programmes across major dental specialities, serving the West Godavari district's growing demand for dental education.\n\nOver more than two decades, the college has built a regional presence within Andhra Pradesh's private dental education landscape, alongside a cluster of other dental colleges in the state." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Bhimavaram with facilities across major specialities, serving a regional patient base drawn from West Godavari and neighbouring districts." },
    { tab: "info", heading: "Why Choose Vishnu Dental College", body: "- Nearly three decades of dental education history\n- Affiliated with Dr. NTR University of Health Sciences\n- Serves West Godavari district's regional dental education demand\n- Standard NEET-based admission" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n| MDS — Orthodontics | 3 years | 3 | ₹19.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Andhra Pradesh state-regulated norms for convener-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Andhra Pradesh state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Andhra Pradesh, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Andhra Pradesh counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Andhra Pradesh state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Vishnu Dental College is not among NIRF's formally ranked top-40 dental institutes but holds a regional presence within Andhra Pradesh's dental education landscape." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Bhimavaram, with mess facilities." },
  ],
};

const ternaDental: CollegeContentPack = {
  slug: "terna-dental-college-and-hospital",
  college: {
    estd: 2002,
    feesNum: 1400000,
    feesLabel: "₹14.0 L",
    affiliation: "Private, Affiliated to Maharashtra University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Terna Dental College Navi Mumbai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Terna Dental College & Hospital, Navi Mumbai: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Terna Dental College and Hospital, established in 2002 in Navi Mumbai, is run by the Terna Public Charitable Trust, part of a broader group also running engineering and medical institutions in the region, affiliated with Maharashtra University of Health Sciences.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹14.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "3", feesLabel: "₹20.0 L total (indicative)" },
  ],
  highlights: [
    "Established 2002, run by the Terna Public Charitable Trust",
    "Part of a broader group also running engineering and medical institutions",
    "Located in Navi Mumbai, Maharashtra",
    "Affiliated with Maharashtra University of Health Sciences",
  ],
  faqs: [
    { question: "How is admission to Terna Dental College done?", answer: "Admission is via NEET-UG score through Maharashtra state counselling and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About Terna Dental College", body: "Terna Dental College and Hospital was established in 2002 in Navi Mumbai, run by the Terna Public Charitable Trust, part of a broader group that also operates engineering and medical institutions in the region. The college runs BDS and MDS programmes across major dental specialities, affiliated with Maharashtra University of Health Sciences.\n\nThe Terna group's broader institutional presence in Navi Mumbai gives the dental college access to a regional professional and educational network." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Navi Mumbai with facilities across major specialities, alongside the broader Terna group's engineering and medical institutions." },
    { tab: "info", heading: "Why Choose Terna Dental College", body: "- Part of the broader Terna group's education network\n- Located in Navi Mumbai with access to Mumbai's metropolitan healthcare ecosystem\n- Affiliated with Maharashtra University of Health Sciences\n- Over two decades of dental education history" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹14.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 3 | ₹20.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Maharashtra state-regulated norms for state-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Maharashtra state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Maharashtra domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in Mumbai's competitive dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Maharashtra counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Maharashtra state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Terna Dental College is not among NIRF's formally ranked top-40 dental institutes but has a solid presence within Navi Mumbai's private dental education landscape." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Navi Mumbai, with mess facilities." },
  ],
};

const patnaDental: CollegeContentPack = {
  slug: "patna-dental-college-and-hospital",
  college: {
    estd: 1951,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Aryabhatta Knowledge University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Patna Dental College and Hospital — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Patna Dental College & Hospital, Bihar: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Patna Dental College and Hospital, established in 1951, is one of India's oldest government dental institutions and Bihar's premier dental college, affiliated with Aryabhatta Knowledge University. It combines heavily subsidised fees with a long clinical training legacy.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Established 1951, among India's oldest government dental colleges",
    "Bihar's premier government dental institution",
    "Government fee structure, among the lowest of any dental college in India",
    "Affiliated with Aryabhatta Knowledge University",
  ],
  faqs: [
    { question: "How is admission to Patna Dental College done?", answer: "Admission is via NEET-UG score through Bihar state-quota counselling and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About Patna Dental College", body: "Patna Dental College and Hospital was established in 1951, making it one of India's oldest government dental institutions. Affiliated with Aryabhatta Knowledge University, it serves as Bihar's premier dental training institution, running BDS and MDS programmes across major dental specialities.\n\nWith over seven decades of continuous academic and clinical operation, Patna Dental College has built a long-standing reputation across Bihar and neighbouring states." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from a dedicated campus in Patna with a full-service dental hospital covering major specialities, serving a large public patient base drawn from across Bihar." },
    { tab: "info", heading: "Why Choose Patna Dental College", body: "- Among India's oldest government dental colleges, with over seven decades of history\n- Bihar's premier government dental institution\n- Government fee structure, among the lowest of any dental college in India\n- Long-standing regional clinical training reputation" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Prosthodontics | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Bihar state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Bihar state-quota counselling for Bihar-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Bihar domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Bihar's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As Bihar's premier government dental college, closing ranks for the state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Bihar counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Bihar government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Patna Dental College is not among NIRF's formally ranked top-40 dental institutes but is widely regarded as Bihar's premier government dental college given its long institutional history." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Patna under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const bangaloreInstitute: CollegeContentPack = {
  slug: "bangalore-institute-of-dental-sciences-and-hospital",
  college: {
    estd: 1985,
    feesNum: 1500000,
    feesLabel: "₹15.0 L",
    affiliation: "Private, Affiliated to Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Bangalore Institute of Dental Sciences — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Bangalore Institute of Dental Sciences & Hospital, Bengaluru: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Bangalore Institute of Dental Sciences and Hospital, established in 1985 in Bengaluru, is a long-standing private dental college affiliated with Rajiv Gandhi University of Health Sciences, part of Karnataka's dense dental education ecosystem.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹15.0 L total" },
    { name: "MDS — Periodontics", duration: "3 years", seats: "3", feesLabel: "₹22.0 L total (indicative)" },
  ],
  highlights: [
    "Established 1985, nearly four decades of dental education history",
    "Affiliated with Rajiv Gandhi University of Health Sciences",
    "Located in Bengaluru, within Karnataka's dense dental education ecosystem",
    "Standard NEET-based admission via KEA counselling",
  ],
  faqs: [
    { question: "How is admission to Bangalore Institute of Dental Sciences done?", answer: "Admission is via NEET-UG score through Karnataka Examinations Authority (KEA) state-quota counselling and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About Bangalore Institute of Dental Sciences", body: "Bangalore Institute of Dental Sciences and Hospital was established in 1985 in Bengaluru, Karnataka, affiliated with Rajiv Gandhi University of Health Sciences. The college runs BDS and MDS programmes across major dental specialities, part of Karnataka's dense concentration of dental education institutions, particularly in Bengaluru.\n\nWith nearly four decades of continuous operation, the college has built a stable regional reputation within Bengaluru's competitive private dental education landscape." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Bengaluru with facilities across major specialities, serving a large urban patient base." },
    { tab: "info", heading: "Why Choose Bangalore Institute of Dental Sciences", body: "- Nearly four decades of dental education history\n- Affiliated with Rajiv Gandhi University of Health Sciences\n- Located in Bengaluru, India's largest technology and healthcare hub\n- Established presence within Karnataka's dense dental education landscape" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹15.0 L |\n| MDS — Periodontics | 3 years | 3 | ₹22.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Karnataka state-regulated norms for KEA-counselled seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Karnataka Examinations Authority (KEA) state-quota counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in Bengaluru's competitive dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately competitive for its KEA and management-quota BDS seats given strong Bengaluru demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with KEA." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Karnataka state government scholarship and fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Bangalore Institute of Dental Sciences is not among NIRF's formally ranked top-40 dental institutes but holds an established presence within Karnataka's competitive dental education landscape." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Bengaluru, with mess facilities." },
  ],
};

const dayanandSagar: CollegeContentPack = {
  slug: "dayanand-sagar-college-of-dental-sciences",
  college: {
    estd: 2001,
    feesNum: 1500000,
    feesLabel: "₹15.0 L",
    affiliation: "Private (Dayananda Sagar Institutions), Affiliated to Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Dayananda Sagar College of Dental Sciences Bengaluru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Dayananda Sagar College of Dental Sciences, Bengaluru: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Dayananda Sagar College of Dental Sciences, established around 2001 in Bengaluru, is part of the Dayananda Sagar Institutions group, a large multi-disciplinary education network in Karnataka also running well-known engineering and medical colleges.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹15.0 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "3", feesLabel: "₹22.0 L total (indicative)" },
  ],
  highlights: [
    "Part of Dayananda Sagar Institutions, a large multi-disciplinary Karnataka education group",
    "Also runs well-known engineering and medical colleges under the same group",
    "Located in Bengaluru, India's largest technology hub",
    "Standard NEET-based admission via KEA counselling",
  ],
  faqs: [
    { question: "Is Dayananda Sagar College of Dental Sciences linked to Dayananda Sagar engineering colleges?", answer: "Yes — it is part of the broader Dayananda Sagar Institutions group, which also runs well-known engineering (Dayananda Sagar College of Engineering) and medical institutions in Bengaluru." },
  ],
  sections: [
    { tab: "info", heading: "About Dayananda Sagar College of Dental Sciences", body: "Dayananda Sagar College of Dental Sciences was established around 2001 in Bengaluru, Karnataka, as part of the Dayananda Sagar Institutions group, a large multi-disciplinary education network that also runs well-known engineering and medical colleges in the city. The dental college runs BDS and MDS programmes across major dental specialities.\n\nThe broader Dayananda Sagar group's institutional scale gives the dental college access to shared academic infrastructure and a large multi-disciplinary alumni network." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Dayananda Sagar campus in Bengaluru houses a dedicated dental hospital alongside the group's broader engineering and medical institutions, giving dental students access to a wider multi-disciplinary academic environment." },
    { tab: "info", heading: "Why Choose Dayananda Sagar College of Dental Sciences", body: "- Part of the well-established Dayananda Sagar Institutions group\n- Located in Bengaluru, India's largest technology and healthcare hub\n- Access to a large multi-disciplinary academic ecosystem\n- Standard NEET-based admission" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹15.0 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 3 | ₹22.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Karnataka state-regulated norms for KEA-counselled seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Karnataka Examinations Authority (KEA) state-quota counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in Bengaluru's competitive dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the Dayananda Sagar group's broader alumni network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately competitive for its KEA and management-quota BDS seats given strong Bengaluru demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with KEA." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Karnataka state government scholarship and fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Dayananda Sagar College of Dental Sciences is not among NIRF's formally ranked top-40 dental institutes, though the broader Dayananda Sagar group ranks in NIRF's Engineering category." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Bengaluru, with mess facilities. Student life includes access to the broader Dayananda Sagar multi-disciplinary campus culture." },
  ],
};

const oxfordDental: CollegeContentPack = {
  slug: "the-oxford-dental-college",
  college: {
    estd: 1990,
    feesNum: 1500000,
    feesLabel: "₹15.0 L",
    affiliation: "Private (Oxford Educational Institutions), Affiliated to Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "The Oxford Dental College Bengaluru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "The Oxford Dental College, Bengaluru: BDS/MDS courses, fees, NEET admission, cutoff, hostel and scholarship details.",
    about:
      "The Oxford Dental College, established around 1990 in Bengaluru, is part of the Oxford Educational Institutions group, one of Karnataka's established private education networks also running engineering and management colleges.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹15.0 L total" },
    { name: "MDS — Public Health Dentistry", duration: "3 years", seats: "2", feesLabel: "₹20.0 L total (indicative)" },
  ],
  highlights: [
    "Part of the Oxford Educational Institutions group in Karnataka",
    "Established around 1990, over three decades of dental education history",
    "Located in Bengaluru, India's largest technology hub",
    "Standard NEET-based admission via KEA counselling",
  ],
  faqs: [
    { question: "How is admission to The Oxford Dental College done?", answer: "Admission is via NEET-UG score through Karnataka Examinations Authority (KEA) state-quota counselling and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About The Oxford Dental College", body: "The Oxford Dental College was established around 1990 in Bengaluru, Karnataka, as part of the Oxford Educational Institutions group, one of Karnataka's established private education networks that also runs engineering and management colleges. The college runs BDS and MDS programmes across major dental specialities.\n\nOver three decades, the college has built a regional reputation within Bengaluru's dense private dental education ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Bengaluru with facilities across major specialities, alongside the broader Oxford Educational Institutions group's academic infrastructure." },
    { tab: "info", heading: "Why Choose The Oxford Dental College", body: "- Over three decades of dental education history\n- Part of the established Oxford Educational Institutions group\n- Located in Bengaluru, India's largest technology and healthcare hub\n- Standard NEET-based admission" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹15.0 L |\n| MDS — Public Health Dentistry | 3 years | 2 | ₹20.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Karnataka state-regulated norms for KEA-counselled seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Karnataka Examinations Authority (KEA) state-quota counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in Bengaluru's competitive dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately competitive for its KEA and management-quota BDS seats given strong Bengaluru demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with KEA." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Karnataka state government scholarship and fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "The Oxford Dental College is not among NIRF's formally ranked top-40 dental institutes but holds an established presence within Bengaluru's competitive dental education landscape." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Bengaluru, with mess facilities." },
  ],
};

const vydehiDental: CollegeContentPack = {
  slug: "vydehi-institute-of-dental-sciences-and-research",
  college: {
    estd: 2000,
    feesNum: 1500000,
    feesLabel: "₹15.0 L",
    affiliation: "Private (Vydehi Institute of Medical Sciences), Affiliated to Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Vydehi Institute of Dental Sciences Bengaluru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Vydehi Institute of Dental Sciences & Research, Bengaluru: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Vydehi Institute of Dental Sciences and Research, established around 2000 in Bengaluru, operates as part of the broader Vydehi Institute of Medical Sciences and Research Centre campus, giving dental students access to an integrated medical hospital ecosystem.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹15.0 L total" },
    { name: "MDS — Oral Medicine & Radiology", duration: "3 years", seats: "2", feesLabel: "₹20.0 L total (indicative)" },
  ],
  highlights: [
    "Part of the integrated Vydehi Institute of Medical Sciences campus",
    "Established around 2000 in Bengaluru, Karnataka",
    "Access to a broader medical hospital ecosystem",
    "Standard NEET-based admission via KEA counselling",
  ],
  faqs: [
    { question: "Is Vydehi Dental linked to a medical hospital?", answer: "Yes — Vydehi Institute of Dental Sciences and Research operates as part of the broader Vydehi Institute of Medical Sciences and Research Centre campus in Bengaluru, giving dental students access to cross-specialty clinical resources." },
  ],
  sections: [
    { tab: "info", heading: "About Vydehi Institute of Dental Sciences", body: "Vydehi Institute of Dental Sciences and Research was established around 2000 in Bengaluru, Karnataka, operating as part of the broader Vydehi Institute of Medical Sciences and Research Centre campus. The dental college runs BDS and MDS programmes across major dental specialities.\n\nBeing part of an integrated medical campus gives Vydehi Dental students access to a wider clinical and research ecosystem than a standalone dental college, including cross-specialty exposure through the affiliated medical hospital." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Vydehi campus in Bengaluru houses a dedicated dental hospital alongside a large multi-specialty medical hospital, giving dental students access to cross-specialty clinical exposure and shared research infrastructure." },
    { tab: "info", heading: "Why Choose Vydehi Institute of Dental Sciences", body: "- Part of an integrated medical campus with cross-specialty clinical exposure\n- Located in Bengaluru, India's largest technology and healthcare hub\n- Access to a broader multi-specialty hospital ecosystem\n- Standard NEET-based admission" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹15.0 L |\n| MDS — Oral Medicine & Radiology | 3 years | 2 | ₹20.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Karnataka state-regulated norms for KEA-counselled seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Karnataka Examinations Authority (KEA) state-quota counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in Bengaluru's competitive dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital and, where relevant, the broader Vydehi medical hospital network — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately competitive for its KEA and management-quota BDS seats given strong Bengaluru demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with KEA." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Karnataka state government scholarship and fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Vydehi Institute of Dental Sciences is not among NIRF's formally ranked top-40 dental institutes but benefits from association with the broader Vydehi medical campus." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Bengaluru, with mess facilities, as part of the broader Vydehi integrated campus." },
  ],
};

const amritaSchoolDentistry: CollegeContentPack = {
  slug: "amrita-school-of-dentistry",
  college: {
    estd: 2003,
    website: "https://www.amrita.edu",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Deemed University (Amrita)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Amrita School of Dentistry Kochi — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Amrita School of Dentistry, Kochi: BDS/MDS courses, fees, NEET admission, cutoff, hostel and scholarship details.",
    about:
      "Amrita School of Dentistry operates from Amrita Vishwa Vidyapeetham's Kochi, Kerala campus, part of a larger multi-campus deemed university, running BDS and MDS programmes alongside the co-located Amrita Institute of Medical Sciences.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹16.0 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "2", feesLabel: "₹24.0 L total (indicative)" },
  ],
  highlights: [
    "Part of Amrita Vishwa Vidyapeetham's Kochi medical campus",
    "Access to the co-located Amrita Institute of Medical Sciences",
    "Deemed university with strong overall NIRF standing",
    "Standard NEET-based admission",
  ],
  faqs: [
    { question: "Is this the same as the NIRF-ranked Amrita Dental listing?", answer: "Amrita School of Dentistry is Amrita's dental programme in Kochi; Amrita Vishwa Vidyapeetham (Dental) is separately ranked #14 in NIRF 2024 Dental as the overall Amrita dental entry — both refer to the same underlying dental education programme under the Amrita deemed university." },
  ],
  sections: [
    { tab: "info", heading: "About Amrita School of Dentistry", body: "Amrita School of Dentistry operates from Amrita Vishwa Vidyapeetham's Kochi, Kerala campus, part of a larger multi-campus deemed university with a strong overall NIRF standing across engineering, medical, and other categories. The dental school runs BDS and MDS programmes across major dental specialities, established in the early 2000s.\n\nThe school benefits from co-location with Amrita Institute of Medical Sciences, giving dental students access to cross-specialty clinical exposure and shared research infrastructure." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Kochi campus houses a dedicated dental hospital alongside Amrita's medical school, giving dental students access to cross-specialty clinical exposure and a large multi-disciplinary research ecosystem." },
    { tab: "info", heading: "Why Choose Amrita School of Dentistry", body: "- Part of a strong overall multi-campus deemed university\n- Cross-specialty exposure via the co-located Amrita medical hospital\n- Substantial institutional research investment\n- Kochi location within Kerala's healthcare ecosystem" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹16.0 L |\n| MDS — Orthodontics | 3 years | 2 | ₹24.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with Amrita admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Amrita sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Amrita conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from Amrita's strong overall brand recognition." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within Amrita's dental hospital and, where relevant, its broader medical hospital network — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, Amrita School of Dentistry's NEET cutoff has historically been moderately competitive, benefiting from the university's strong overall brand demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Amrita admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Amrita School of Dentistry's parent entity, Amrita Vishwa Vidyapeetham, is ranked #14 in NIRF 2024 Dental, and also ranks strongly across NIRF's Engineering, Medical, and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Amrita provides on-campus hostel accommodation for men and women at the Kochi campus, with mess facilities. Student life includes technical events, clinical case competitions, and access to Amrita's broader multi-campus culture." },
  ],
};

const pushpagiriDental: CollegeContentPack = {
  slug: "pushpagiri-college-of-dental-sciences",
  college: {
    estd: 1999,
    feesNum: 1400000,
    feesLabel: "₹14.0 L",
    affiliation: "Private (Pushpagiri Medical Society), Affiliated to Kerala University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Pushpagiri College of Dental Sciences Tiruvalla — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Pushpagiri College of Dental Sciences, Tiruvalla: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Pushpagiri College of Dental Sciences, established around 1999 in Tiruvalla, Kerala, is run by the Pushpagiri Medical Society, part of a broader medical education group also operating a well-regarded medical college in the region.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹14.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "2", feesLabel: "₹20.0 L total (indicative)" },
  ],
  highlights: [
    "Run by the Pushpagiri Medical Society, part of a broader medical education group",
    "Established around 1999 in Tiruvalla, Kerala",
    "Access to the broader Pushpagiri medical hospital ecosystem",
    "Affiliated with Kerala University of Health Sciences",
  ],
  faqs: [
    { question: "Is Pushpagiri Dental linked to a medical college?", answer: "Yes — Pushpagiri College of Dental Sciences is run by the Pushpagiri Medical Society, which also operates Pushpagiri Institute of Medical Sciences and Research Institute in Tiruvalla, giving dental students access to a broader medical hospital ecosystem." },
  ],
  sections: [
    { tab: "info", heading: "About Pushpagiri College of Dental Sciences", body: "Pushpagiri College of Dental Sciences was established around 1999 in Tiruvalla, Kerala, run by the Pushpagiri Medical Society, which also operates a well-regarded medical college and hospital in the region. The dental college runs BDS and MDS programmes across major dental specialities, affiliated with Kerala University of Health Sciences.\n\nThe college's association with the broader Pushpagiri medical ecosystem gives dental students access to cross-specialty clinical exposure and shared institutional infrastructure." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Pushpagiri campus in Tiruvalla houses a dedicated dental hospital alongside the society's broader medical institutions, giving dental students access to a wider clinical ecosystem." },
    { tab: "info", heading: "Why Choose Pushpagiri College of Dental Sciences", body: "- Run by the well-regarded Pushpagiri Medical Society\n- Access to the broader Pushpagiri medical hospital ecosystem\n- Affiliated with Kerala University of Health Sciences\n- Over two decades of dental education history" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹14.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 2 | ₹20.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Kerala state-regulated norms for state-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Kerala state-quota counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Kerala domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Kerala, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, including opportunities in the Gulf given Kerala's strong healthcare-emigration pipeline." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital and, where relevant, the broader Pushpagiri medical hospital network — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Kerala counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Kerala state government scholarship and fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Pushpagiri College of Dental Sciences is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Tiruvalla, with mess facilities, as part of the broader Pushpagiri campus." },
  ],
};

const collegeOfDentalIndore: CollegeContentPack = {
  slug: "college-of-dental-sciences-and-hospital",
  college: {
    estd: 1993,
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private, Affiliated to Devi Ahilya Vishwavidyalaya",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "College of Dental Sciences and Hospital Indore — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "College of Dental Sciences & Hospital, Indore: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "College of Dental Sciences and Hospital, established around 1993 in Indore, Madhya Pradesh, is one of the state's older private dental institutions, affiliated with Devi Ahilya Vishwavidyalaya, serving central India's dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "2", feesLabel: "₹18.0 L total (indicative)" },
  ],
  highlights: [
    "Established around 1993, one of Madhya Pradesh's older private dental colleges",
    "Affiliated with Devi Ahilya Vishwavidyalaya",
    "Serves central India's dental education demand",
    "Located in Indore, Madhya Pradesh's largest city",
  ],
  faqs: [
    { question: "How is admission to College of Dental Sciences Indore done?", answer: "Admission is via NEET-UG score through Madhya Pradesh state counselling and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About College of Dental Sciences, Indore", body: "College of Dental Sciences and Hospital was established around 1993 in Indore, Madhya Pradesh, affiliated with Devi Ahilya Vishwavidyalaya. As one of the state's older private dental institutions, it has built over three decades of continuous academic and clinical operation, running BDS and MDS programmes across major dental specialities.\n\nThe college serves central India's growing demand for dental education, drawing students from across Madhya Pradesh and neighbouring states." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Indore with facilities across major specialities, serving a large regional patient base." },
    { tab: "info", heading: "Why Choose College of Dental Sciences, Indore", body: "- One of Madhya Pradesh's older private dental colleges, over three decades of history\n- Affiliated with Devi Ahilya Vishwavidyalaya\n- Located in Indore, Madhya Pradesh's largest city\n- Serves central India's growing dental education demand" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n| MDS — Prosthodontics | 3 years | 2 | ₹18.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Madhya Pradesh state-regulated norms for state-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Madhya Pradesh state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Madhya Pradesh, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Madhya Pradesh counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Madhya Pradesh state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "College of Dental Sciences, Indore is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Indore, with mess facilities." },
  ],
};

const peoplesCollegeDental: CollegeContentPack = {
  slug: "peoples-college-of-dental-sciences",
  college: {
    estd: 1997,
    feesNum: 1300000,
    feesLabel: "₹13.0 L",
    affiliation: "Private (People's Education Society), Affiliated to Barkatullah University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Peoples College of Dental Sciences Bhopal — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Peoples College of Dental Sciences, Bhopal: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Peoples College of Dental Sciences, established around 1997 in Bhopal, Madhya Pradesh, is run by the People's Education Society, part of a broader group also operating medical, nursing, and management institutions in the state capital.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹13.0 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "2", feesLabel: "₹18.0 L total (indicative)" },
  ],
  highlights: [
    "Run by the People's Education Society, a broader Bhopal-based education group",
    "Established around 1997 in Bhopal, Madhya Pradesh's capital",
    "Part of a group also running medical, nursing, and management institutions",
    "Standard NEET-based admission",
  ],
  faqs: [
    { question: "How is admission to Peoples College of Dental Sciences done?", answer: "Admission is via NEET-UG score through Madhya Pradesh state counselling and the college's own management-quota process." },
  ],
  sections: [
    { tab: "info", heading: "About Peoples College of Dental Sciences", body: "Peoples College of Dental Sciences was established around 1997 in Bhopal, Madhya Pradesh, run by the People's Education Society, a broader education group also operating medical, nursing, and management institutions in the state capital. The college runs BDS and MDS programmes across major dental specialities.\n\nThe group's broader institutional presence in Bhopal gives the dental college access to a regional professional network across multiple health-sciences disciplines." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Peoples campus in Bhopal houses a dedicated dental hospital alongside the group's broader medical and nursing institutions." },
    { tab: "info", heading: "Why Choose Peoples College of Dental Sciences", body: "- Part of the broader People's Education Society group\n- Located in Bhopal, Madhya Pradesh's capital\n- Access to a regional multi-disciplinary health-sciences network\n- Standard NEET-based admission" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹13.0 L |\n| MDS — Orthodontics | 3 years | 2 | ₹18.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Madhya Pradesh state-regulated norms for state-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Madhya Pradesh state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice across Madhya Pradesh, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately accessible for its state and management-quota BDS seats. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Madhya Pradesh counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Madhya Pradesh state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Peoples College of Dental Sciences is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Bhopal, with mess facilities, as part of the broader Peoples group campus." },
  ],
};

const dyPatilPuneStandalone: CollegeContentPack = {
  slug: "dr-d-y-patil-dental-college-and-hospital",
  college: {
    estd: 2003,
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Private (D.Y. Patil Group), Affiliated to Maharashtra University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Dr. D.Y. Patil Dental College Pune — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Dr. D.Y. Patil Dental College & Hospital, Pune: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Dr. D.Y. Patil Dental College and Hospital, established in 2003 in Pune, is part of the broader D.Y. Patil group's substantial investment in medical and health-sciences infrastructure across Maharashtra, distinct from the group's deemed-university dental college.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Periodontics", duration: "3 years", seats: "3", feesLabel: "₹24.0 L total (indicative)" },
  ],
  highlights: [
    "Part of the broader D.Y. Patil group's Maharashtra health-sciences infrastructure",
    "Established 2003 in Pune",
    "Affiliated with Maharashtra University of Health Sciences",
    "Standard NEET-based admission",
  ],
  faqs: [
    { question: "How is this different from D.Y. Patil Vidyapeeth's dental college?", answer: "This college operates under the D.Y. Patil group's broader institutional network affiliated with Maharashtra University of Health Sciences, distinct from Dr. D.Y. Patil Vidyapeeth (Dental), which is a separate deemed-university entity ranked #5 in NIRF 2024 Dental." },
  ],
  sections: [
    { tab: "info", heading: "About Dr. D.Y. Patil Dental College, Pune", body: "Dr. D.Y. Patil Dental College and Hospital was established in 2003 in Pune, Maharashtra, part of the broader D.Y. Patil group's substantial investment in medical and health-sciences infrastructure across the state. The college runs BDS and MDS programmes across major dental specialities, affiliated with Maharashtra University of Health Sciences.\n\nThe D.Y. Patil group's broader institutional scale gives students access to shared clinical and research infrastructure across its multiple Maharashtra campuses." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates a dedicated dental hospital in Pune with facilities across major specialities, part of the broader D.Y. Patil group's regional healthcare infrastructure." },
    { tab: "info", heading: "Why Choose Dr. D.Y. Patil Dental College, Pune", body: "- Part of the well-resourced D.Y. Patil group's Maharashtra health-sciences network\n- Affiliated with Maharashtra University of Health Sciences\n- Located in Pune, a major Maharashtra education and IT hub\n- Standard NEET-based admission" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Periodontics | 3 years | 3 | ₹24.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Maharashtra state-regulated norms for state-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Maharashtra state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Maharashtra domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in Pune's competitive dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the D.Y. Patil group's broader Maharashtra hospital network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately competitive for its state and management-quota BDS seats given strong Pune demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Maharashtra counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Maharashtra state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Dr. D.Y. Patil Dental College, Pune is not separately listed in NIRF's formally ranked top-40 dental institutes (a related D.Y. Patil entity, Dr. D.Y. Patil Vidyapeeth, is ranked #5)." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Pune, with mess facilities, as part of the broader D.Y. Patil group campus." },
  ],
};

const bharatiVidyapeethNaviMumbai: CollegeContentPack = {
  slug: "bharati-vidyapeeth-dental-college-and-hospital-navi-mumbai",
  college: {
    estd: 1994,
    website: "https://bharatividyapeeth.edu",
    feesNum: 1500000,
    feesLabel: "₹15.0 L",
    affiliation: "Deemed University (Bharati Vidyapeeth)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Bharati Vidyapeeth Dental College Navi Mumbai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Bharati Vidyapeeth Dental College & Hospital, Navi Mumbai: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Bharati Vidyapeeth Dental College and Hospital, Navi Mumbai, is one of several dental campuses run by Bharati Vidyapeeth, one of India's largest multi-disciplinary deemed universities, distinct from the group's Pune dental campus.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹15.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "2", feesLabel: "₹22.0 L total (indicative)" },
  ],
  highlights: [
    "One of several dental campuses under Bharati Vidyapeeth, a large multi-disciplinary deemed university",
    "Located in Navi Mumbai, distinct from the group's Pune dental campus",
    "Access to Bharati Vidyapeeth's broad academic and professional network",
    "Standard NEET-based admission",
  ],
  faqs: [
    { question: "Is this different from Bharati Vidyapeeth Dental College in Pune?", answer: "Yes — Bharati Vidyapeeth runs multiple dental campuses; this one is located in Navi Mumbai, distinct from the group's original Pune dental campus (ranked #36 in NIRF 2024 Dental)." },
  ],
  sections: [
    { tab: "info", heading: "About Bharati Vidyapeeth Dental College, Navi Mumbai", body: "Bharati Vidyapeeth Dental College and Hospital, Navi Mumbai, operates as one of several dental campuses under Bharati Vidyapeeth, one of India's largest multi-disciplinary deemed universities running dozens of colleges across engineering, medical, dental, management, and law disciplines. The dental college runs BDS and MDS programmes across major dental specialities.\n\nBharati Vidyapeeth's very large institutional scale gives the college access to shared research infrastructure and one of India's broadest alumni networks across professional fields." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Navi Mumbai campus houses a dedicated dental hospital alongside Bharati Vidyapeeth's broader academic infrastructure, giving dental students access to a wide multi-disciplinary environment." },
    { tab: "info", heading: "Why Choose Bharati Vidyapeeth Dental College, Navi Mumbai", body: "- Part of one of India's largest multi-disciplinary deemed universities\n- Located in Navi Mumbai with access to Mumbai's metropolitan healthcare ecosystem\n- Access to Bharati Vidyapeeth's very broad academic and professional network\n- Standard NEET-based admission" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹15.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 2 | ₹22.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with Bharati Vidyapeeth admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Bharati Vidyapeeth sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Bharati Vidyapeeth conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from Bharati Vidyapeeth's very large alumni network across all professional fields." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, this campus's NEET cutoff has historically been moderately competitive. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Bharati Vidyapeeth admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Bharati Vidyapeeth's Pune dental campus is ranked #36 in NIRF 2024 Dental; the Navi Mumbai campus is not separately ranked but shares the parent university's Engineering, Medical, Management, and Overall University NIRF presence." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Bharati Vidyapeeth provides on-campus hostel accommodation for men and women in Navi Mumbai, with mess facilities. Student life includes access to Bharati Vidyapeeth's broader multi-campus culture." },
  ],
};

const mgmDental: CollegeContentPack = {
  slug: "mahatma-gandhi-missions-dental-college",
  college: {
    estd: 1991,
    feesNum: 1500000,
    feesLabel: "₹15.0 L",
    affiliation: "Private (MGM Trust), Affiliated to Maharashtra University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Mahatma Gandhi Missions Dental College Navi Mumbai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Mahatma Gandhi Missions Dental College, Navi Mumbai: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Mahatma Gandhi Missions Dental College, established in 1991 in Navi Mumbai, is run by the MGM Trust, a large education group also operating well-known medical and engineering institutions across Maharashtra.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹15.0 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "3", feesLabel: "₹22.0 L total (indicative)" },
  ],
  highlights: [
    "Established 1991, run by the large MGM Trust education group",
    "Part of a group also operating well-known medical and engineering institutions",
    "Located in Navi Mumbai, Maharashtra",
    "Over three decades of dental education history",
  ],
  faqs: [
    { question: "Is MGM Dental linked to MGM Medical College?", answer: "Yes — Mahatma Gandhi Missions Dental College is run by the MGM Trust, which also operates MGM Medical College and other institutions across Maharashtra." },
  ],
  sections: [
    { tab: "info", heading: "About Mahatma Gandhi Missions Dental College", body: "Mahatma Gandhi Missions Dental College was established in 1991 in Navi Mumbai, Maharashtra, run by the MGM Trust, a large education group that also operates well-known medical and engineering institutions across the state. The college runs BDS and MDS programmes across major dental specialities, affiliated with Maharashtra University of Health Sciences.\n\nOver more than three decades, the college has built a regional reputation within Navi Mumbai's dense private dental education ecosystem, benefiting from the MGM Trust's broader institutional scale." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The MGM campus in Navi Mumbai houses a dedicated dental hospital alongside the trust's broader medical and engineering institutions, giving dental students access to a wider multi-disciplinary environment." },
    { tab: "info", heading: "Why Choose Mahatma Gandhi Missions Dental College", body: "- Over three decades of dental education history\n- Part of the large MGM Trust education group\n- Located in Navi Mumbai with access to Mumbai's metropolitan healthcare ecosystem\n- Standard NEET-based admission" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹15.0 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 3 | ₹22.0 L (indicative) |\n\nFees are charged per year; confirm the current year's exact figures with the college's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "Fees follow Maharashtra state-regulated norms for state-quota seats, with a separate structure for management-quota seats. Fees are payable per year." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Maharashtra state counselling and its own management-quota process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Maharashtra domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in Mumbai's competitive dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the MGM Trust's broader Maharashtra professional network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "The college's NEET cutoff has historically been moderately competitive for its state and management-quota BDS seats given strong Mumbai-region demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Maharashtra counselling authorities." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Maharashtra state government fee-reimbursement schemes for SC/ST/OBC-eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Mahatma Gandhi Missions Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for men and women in Navi Mumbai, with mess facilities, as part of the broader MGM Trust campus." },
  ],
};

export const dentalBatch7: CollegeContentPack[] = [
  vishnuDental,
  ternaDental,
  patnaDental,
  bangaloreInstitute,
  dayanandSagar,
  oxfordDental,
  vydehiDental,
  amritaSchoolDentistry,
  pushpagiriDental,
  collegeOfDentalIndore,
  peoplesCollegeDental,
  dyPatilPuneStandalone,
  bharatiVidyapeethNaviMumbai,
  mgmDental,
];
