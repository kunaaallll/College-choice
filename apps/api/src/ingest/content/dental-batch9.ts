import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 4, part 1 of 4 (10 government colleges).
// Same 13-section/8-tab quality bar as every prior batch.

const goaDental: CollegeContentPack = {
  slug: "goa-dental-college-and-hospital",
  college: {
    estd: 1975,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Goa University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Goa Dental College and Hospital — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Goa Dental College & Hospital, Panaji: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Goa Dental College and Hospital, established in 1975, is Goa's sole government dental institution, affiliated with Goa University, combining heavily subsidised fees with a long clinical training legacy serving the state.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Goa's sole government dental institution, established 1975",
    "Government fee structure, among the lowest of any dental college in India",
    "Affiliated with Goa University",
    "Small, highly selective intake given the state's limited seat count",
  ],
  faqs: [
    { question: "How is admission to Goa Dental College done?", answer: "Admission is via NEET-UG score through Goa state-quota counselling and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About Goa Dental College", body: "Goa Dental College and Hospital was established in 1975 and is affiliated with Goa University. As Goa's sole government dental institution, it runs BDS and MDS programmes across major dental specialities, serving the state's dental education and healthcare needs.\n\nGiven Goa's small size, the college maintains a compact but well-regarded intake, drawing highly competitive NEET-UG applicants for its limited government-quota seats." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Panaji with a full-service dental hospital covering major specialities, serving Goa's public healthcare system and giving students substantial hands-on clinical exposure relative to the state's population." },
    { tab: "info", heading: "Why Choose Goa Dental College", body: "- Goa's sole government dental institution\n- Government fee structure, among the lowest of any dental college in India\n- Affiliated with Goa University\n- Compact, highly selective government-quota intake" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Orthodontics | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Goa state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Goa state-quota counselling for Goa-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Goa domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Goa's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Given the very small government-quota seat count, closing ranks for the Goa state quota and AIQ have historically required strong NEET scores. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Goa counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Goa government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Goa Dental College is not among NIRF's formally ranked top-40 dental institutes but holds strong regional significance as Goa's sole government dental college." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Goa under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const regionalDentalGuwahati: CollegeContentPack = {
  slug: "regional-dental-college",
  college: {
    estd: 1961,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Srimanta Sankaradeva University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Regional Dental College Guwahati — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Regional Dental College, Guwahati: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Regional Dental College, Guwahati, established in 1961, is Assam's premier government dental institution, affiliated with Srimanta Sankaradeva University of Health Sciences, serving the wider Northeast region's dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Assam's premier government dental college, established 1961",
    "Government fee structure, among the lowest of any dental college in India",
    "Serves the wider Northeast India region",
    "Affiliated with Srimanta Sankaradeva University of Health Sciences",
  ],
  faqs: [
    { question: "How is admission to Regional Dental College Guwahati done?", answer: "Admission is via NEET-UG score through Assam state-quota counselling and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About Regional Dental College, Guwahati", body: "Regional Dental College, Guwahati was established in 1961 and is affiliated with Srimanta Sankaradeva University of Health Sciences. As Assam's premier government dental institution, it runs BDS and MDS programmes across major dental specialities, drawing students from across Assam and the wider Northeast region.\n\nOver more than six decades, the college has built a strong regional reputation as the primary dental training destination for Assam and neighbouring states." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Guwahati with a full-service dental hospital covering major specialities, serving a large public patient base drawn from across Assam and the broader Northeast." },
    { tab: "info", heading: "Why Choose Regional Dental College Guwahati", body: "- Assam's premier government dental college with over six decades of history\n- Government fee structure, among the lowest of any dental college in India\n- Serves the wider Northeast India region\n- Strong clinical training reputation" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Assam state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Assam state-quota counselling for Assam-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Assam domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Assam's public health system, private practice, or hospital-affiliated clinical positions across the Northeast region." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As Assam's premier government dental college, closing ranks for the state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Assam counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Assam government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Northeast-region specific government scholarship schemes\n- Merit scholarships for top academic performers" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Regional Dental College, Guwahati is not among NIRF's formally ranked top-40 dental institutes but is widely regarded as the Northeast's leading government dental college alongside NIT-affiliated dental institutions in the region." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Assam under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events reflecting the college's Northeast regional setting." },
  ],
};

const govtDentalDibrugarh: CollegeContentPack = {
  slug: "govt-dental-college",
  college: {
    estd: 1998,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Srimanta Sankaradeva University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Government Dental College Dibrugarh — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Government Dental College, Dibrugarh, Assam: BDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Government Dental College, Dibrugarh, established around 1998, is Assam's second government dental institution, affiliated with Srimanta Sankaradeva University of Health Sciences, serving upper Assam's dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
  ],
  highlights: [
    "Assam's second government dental institution",
    "Government fee structure, among the lowest of any dental college in India",
    "Serves upper Assam's dental education demand",
    "Affiliated with Srimanta Sankaradeva University of Health Sciences",
  ],
  faqs: [
    { question: "How is admission to Government Dental College Dibrugarh done?", answer: "Admission is via NEET-UG score through Assam state-quota counselling and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About Government Dental College, Dibrugarh", body: "Government Dental College, Dibrugarh was established around 1998 and is affiliated with Srimanta Sankaradeva University of Health Sciences. As Assam's second government dental institution, it runs a BDS programme across all core dental disciplines, serving upper Assam's dental education demand alongside Regional Dental College, Guwahati." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Dibrugarh with a dental hospital covering major specialities, serving upper Assam's public healthcare system." },
    { tab: "info", heading: "Why Choose Government Dental College Dibrugarh", body: "- Assam's second government dental institution\n- Government fee structure, among the lowest of any dental college in India\n- Serves upper Assam's dental education demand\n- Affiliated with Srimanta Sankaradeva University of Health Sciences" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Assam state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Assam state-quota counselling for Assam-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Assam domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), government dental officer roles in Assam's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Assam state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Assam counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Assam government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Government Dental College, Dibrugarh is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Dibrugarh under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const amcDentalAhmedabad: CollegeContentPack = {
  slug: "amc-dental-college",
  college: {
    estd: 1985,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government (Ahmedabad Municipal Corporation), Gujarat University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "AMC Dental College Ahmedabad — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "AMC Dental College, Ahmedabad: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "AMC Dental College, established around 1985 and run by the Ahmedabad Municipal Corporation, is one of Gujarat's government dental institutions, affiliated with Gujarat University, serving the city's public healthcare and dental education needs.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Periodontics", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Run by the Ahmedabad Municipal Corporation, established around 1985",
    "Government fee structure, among the lowest of any dental college in India",
    "Affiliated with Gujarat University",
    "Serves Ahmedabad's public healthcare and dental education needs",
  ],
  faqs: [
    { question: "How is admission to AMC Dental College done?", answer: "Admission is via NEET-UG score through Gujarat state-quota counselling and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About AMC Dental College", body: "AMC Dental College was established around 1985, run by the Ahmedabad Municipal Corporation, affiliated with Gujarat University. As one of Gujarat's government dental institutions, it runs BDS and MDS programmes across major dental specialities, serving Ahmedabad's public healthcare and dental education needs." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Ahmedabad with a dental hospital covering major specialities, tied to the municipal healthcare system and serving a large urban public patient base." },
    { tab: "info", heading: "Why Choose AMC Dental College", body: "- Run by the Ahmedabad Municipal Corporation with strong civic healthcare integration\n- Government fee structure, among the lowest of any dental college in India\n- Affiliated with Gujarat University\n- Large urban public patient base for clinical exposure" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Periodontics | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Gujarat state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Gujarat state-quota counselling for Gujarat-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Gujarat domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Gujarat's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Gujarat state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Gujarat counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Gujarat government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "AMC Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides hostel accommodation for students, particularly those from outside Ahmedabad under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const govtDentalJamnagar: CollegeContentPack = {
  slug: "govt-dental-college-hospital",
  college: {
    estd: 1965,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Gujarat University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Government Dental College Hospital Jamnagar — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Govt. Dental College Hospital, Jamnagar: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Government Dental College Hospital, Jamnagar, established around 1965, is one of Gujarat's older government dental institutions, affiliated with Gujarat University, serving the Saurashtra region's dental education and healthcare needs.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "One of Gujarat's older government dental colleges, established around 1965",
    "Government fee structure, among the lowest of any dental college in India",
    "Serves the Saurashtra region's dental education needs",
    "Affiliated with Gujarat University",
  ],
  faqs: [
    { question: "How is admission to Government Dental College Jamnagar done?", answer: "Admission is via NEET-UG score through Gujarat state-quota counselling and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About Government Dental College, Jamnagar", body: "Government Dental College Hospital, Jamnagar was established around 1965 and is affiliated with Gujarat University. As one of Gujarat's older government dental institutions, it runs BDS and MDS programmes across major dental specialities, serving the Saurashtra region's dental education and healthcare needs." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Jamnagar with a dental hospital covering major specialities, serving a large regional public patient base drawn from the Saurashtra region." },
    { tab: "info", heading: "Why Choose Government Dental College Jamnagar", body: "- One of Gujarat's older government dental colleges\n- Government fee structure, among the lowest of any dental college in India\n- Serves the Saurashtra region's dental education needs\n- Affiliated with Gujarat University" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Prosthodontics | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Gujarat state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Gujarat state-quota counselling for Gujarat-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Gujarat domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Gujarat's public health system, private practice, or hospital-affiliated clinical positions across the Saurashtra region." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Gujarat state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Gujarat counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Gujarat government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Government Dental College, Jamnagar is not among NIRF's formally ranked top-40 dental institutes but holds regional significance for the Saurashtra region." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Jamnagar under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const siddhpurDental: CollegeContentPack = {
  slug: "siddhpur-dental-college",
  college: {
    estd: 2001,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Gujarat University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Siddhpur Dental College Patan — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Siddhpur Dental College, Patan, Gujarat: BDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Siddhpur Dental College, established around 2001 in Patan district, Gujarat, is a government dental institution affiliated with Gujarat University, serving north Gujarat's dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
  ],
  highlights: [
    "Government dental college serving north Gujarat, established around 2001",
    "Government fee structure, among the lowest of any dental college in India",
    "Located in Patan district, Gujarat",
    "Affiliated with Gujarat University",
  ],
  faqs: [
    { question: "How is admission to Siddhpur Dental College done?", answer: "Admission is via NEET-UG score through Gujarat state-quota counselling and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About Siddhpur Dental College", body: "Siddhpur Dental College was established around 2001 in Patan district, Gujarat, affiliated with Gujarat University. As a government dental institution, it runs a BDS programme across all core dental disciplines, serving north Gujarat's dental education demand." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Patan district with a dental hospital covering major specialities, serving north Gujarat's public healthcare needs." },
    { tab: "info", heading: "Why Choose Siddhpur Dental College", body: "- Government dental college serving north Gujarat\n- Government fee structure, among the lowest of any dental college in India\n- Affiliated with Gujarat University\n- Regional healthcare and clinical training focus" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Gujarat state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Gujarat state-quota counselling for Gujarat-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Gujarat domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), government dental officer roles in Gujarat's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Gujarat state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Gujarat counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Gujarat government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Siddhpur Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside the region under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const govtDentalJodhpur: CollegeContentPack = {
  slug: "government-dental-college",
  college: {
    estd: 2003,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Rajasthan University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Government Dental College Jodhpur — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Government Dental College, Jodhpur: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Government Dental College, Jodhpur, established around 2003, is one of Rajasthan's government dental institutions, affiliated with Rajasthan University of Health Sciences, serving western Rajasthan's dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Oral Pathology & Microbiology", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Government dental college serving western Rajasthan, established around 2003",
    "Government fee structure, among the lowest of any dental college in India",
    "Located in Jodhpur, a major western Rajasthan city",
    "Affiliated with Rajasthan University of Health Sciences",
  ],
  faqs: [
    { question: "How is admission to Government Dental College Jodhpur done?", answer: "Admission is via NEET-UG score through Rajasthan state-quota counselling and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About Government Dental College, Jodhpur", body: "Government Dental College, Jodhpur was established around 2003 and is affiliated with Rajasthan University of Health Sciences. As one of Rajasthan's government dental institutions, it runs BDS and MDS programmes across major dental specialities, serving western Rajasthan's dental education demand." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Jodhpur with a dental hospital covering major specialities, serving a large regional public patient base drawn from western Rajasthan." },
    { tab: "info", heading: "Why Choose Government Dental College Jodhpur", body: "- Government dental college serving western Rajasthan\n- Government fee structure, among the lowest of any dental college in India\n- Located in Jodhpur, a major western Rajasthan city\n- Affiliated with Rajasthan University of Health Sciences" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Oral Pathology & Microbiology | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Rajasthan state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Rajasthan state-quota counselling for Rajasthan-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Rajasthan domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Rajasthan's public health system, private practice, or hospital-affiliated clinical positions across western Rajasthan." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Rajasthan state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Rajasthan counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Rajasthan government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Government Dental College, Jodhpur is not among NIRF's formally ranked top-40 dental institutes but holds regional significance for western Rajasthan." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Jodhpur under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const hpGovtDentalShimla: CollegeContentPack = {
  slug: "h-p-govt-dental-college-and-hospital",
  college: {
    estd: 1979,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Himachal Pradesh University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "H.P. Government Dental College Shimla — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "H.P. Govt. Dental College & Hospital, Shimla: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Himachal Pradesh Government Dental College and Hospital, established in 1979, is the state's sole government dental institution, affiliated with Himachal Pradesh University, serving the hill state's dental education and healthcare needs.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Community Dentistry", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Himachal Pradesh's sole government dental institution, established 1979",
    "Government fee structure, among the lowest of any dental college in India",
    "Located in Shimla, the state capital",
    "Affiliated with Himachal Pradesh University",
  ],
  faqs: [
    { question: "How is admission to H.P. Government Dental College done?", answer: "Admission is via NEET-UG score through Himachal Pradesh state-quota counselling and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About H.P. Government Dental College", body: "Himachal Pradesh Government Dental College and Hospital was established in 1979 and is affiliated with Himachal Pradesh University. As the state's sole government dental institution, it runs BDS and MDS programmes across major dental specialities, serving Himachal Pradesh's dental education and healthcare needs." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Shimla, Himachal Pradesh's capital, with a dental hospital covering major specialities, serving the hill state's public healthcare system." },
    { tab: "info", heading: "Why Choose H.P. Government Dental College", body: "- Himachal Pradesh's sole government dental institution\n- Government fee structure, among the lowest of any dental college in India\n- Located in Shimla, the scenic state capital\n- Affiliated with Himachal Pradesh University" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Community Dentistry | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Himachal Pradesh state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Himachal Pradesh state-quota counselling for HP-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Himachal Pradesh domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Himachal Pradesh's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Given its sole-government-college status, closing ranks for the HP state quota and AIQ have historically required competitive NEET scores. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/HP counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Himachal Pradesh government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "H.P. Government Dental College is not among NIRF's formally ranked top-40 dental institutes but is Himachal Pradesh's premier and sole government dental college." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Shimla under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events set against Shimla's hill-station backdrop." },
  ],
};

const indiraGandhiJammu: CollegeContentPack = {
  slug: "indira-gandhi-government-dental-college",
  college: {
    estd: 1990,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, University of Jammu",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Indira Gandhi Government Dental College Jammu — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Indira Gandhi Government Dental College, Jammu: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Indira Gandhi Government Dental College, Jammu, established around 1990, is Jammu and Kashmir's premier government dental institution in the Jammu region, affiliated with the University of Jammu.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Jammu region's premier government dental institution, established around 1990",
    "Government fee structure, among the lowest of any dental college in India",
    "Affiliated with the University of Jammu",
    "Strong regional clinical training reputation",
  ],
  faqs: [
    { question: "How is admission to Indira Gandhi Government Dental College Jammu done?", answer: "Admission is via NEET-UG score through Jammu and Kashmir state-quota counselling and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
  ],
  sections: [
    { tab: "info", heading: "About Indira Gandhi Government Dental College, Jammu", body: "Indira Gandhi Government Dental College, Jammu was established around 1990 and is affiliated with the University of Jammu. As the Jammu region's premier government dental institution, it runs BDS and MDS programmes across major dental specialities, serving Jammu and Kashmir's dental education demand alongside Govt. Dental College, Srinagar." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Jammu with a dental hospital covering major specialities, serving a large public patient base drawn from across the Jammu region." },
    { tab: "info", heading: "Why Choose Indira Gandhi Government Dental College", body: "- Jammu region's premier government dental institution\n- Government fee structure, among the lowest of any dental college in India\n- Affiliated with the University of Jammu\n- Strong regional clinical training reputation" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Orthodontics | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Jammu and Kashmir government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Jammu and Kashmir state-quota counselling and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Jammu and Kashmir domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Jammu and Kashmir's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Jammu and Kashmir counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per government policy\n- Central government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Indira Gandhi Government Dental College, Jammu is not among NIRF's formally ranked top-40 dental institutes but holds regional significance as the Jammu region's premier government dental institution." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Jammu under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const esicDelhi: CollegeContentPack = {
  slug: "esic-dental-college",
  college: {
    estd: 2004,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government (Employees' State Insurance Corporation), Guru Gobind Singh Indraprastha University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "ESIC Dental College Delhi — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "ESIC Dental College, Rohini, Delhi: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "ESIC Dental College, established around 2004 in Rohini, New Delhi, is run by the Employees' State Insurance Corporation, a central government body, giving it a distinctive institutional identity tied to India's social security healthcare system.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Public Health Dentistry", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Run by the Employees' State Insurance Corporation, a central government body",
    "Government fee structure, among the lowest of any dental college in India",
    "Located in Rohini, New Delhi",
    "Distinctive tie to India's social security healthcare system",
  ],
  faqs: [
    { question: "What is ESIC Dental College's connection to ESI?", answer: "ESIC Dental College is run by the Employees' State Insurance Corporation, the central government body that administers India's social security health insurance scheme for organised-sector workers, giving the college's hospital a distinctive patient base tied to the ESI scheme." },
    { question: "How is admission to ESIC Dental College done?", answer: "Admission is via NEET-UG score through Delhi state counselling and the college's own centralised admission process." },
  ],
  sections: [
    { tab: "info", heading: "About ESIC Dental College", body: "ESIC Dental College was established around 2004 in Rohini, New Delhi, run by the Employees' State Insurance Corporation (ESIC), a central government body that administers India's social security health insurance scheme. The college runs BDS and MDS programmes across major dental specialities, affiliated with Guru Gobind Singh Indraprastha University.\n\nThe college's tie to the ESI healthcare system gives it a distinctive institutional identity and access to ESI Hospital's broader patient base for clinical training." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Rohini, New Delhi, with a dental hospital covering major specialities, linked to the broader ESIC hospital network serving organised-sector workers and their families." },
    { tab: "info", heading: "Why Choose ESIC Dental College", body: "- Run by the Employees' State Insurance Corporation, a central government body\n- Government fee structure, among the lowest of any dental college in India\n- Located in Delhi with strong healthcare-system connectivity\n- Distinctive access to the ESI Hospital patient base" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Public Health Dentistry | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees are payable per year through the college's designated channels. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under central government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. ESIC Dental College fills seats through Delhi state counselling and its own centralised admission process based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles within the ESIC system or broader public health sector, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital and, where relevant, the broader ESIC hospital network — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Given the college's government status and Delhi location, closing ranks have historically required competitive NEET scores. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with ESIC Dental College admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per central government policy\n- Central government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "ESIC Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides hostel accommodation for students in Delhi, with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const govtDentalBellary: CollegeContentPack = {
  slug: "govt-dental-college-and-research-institute",
  college: {
    estd: 1970,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Government Dental College and Research Institute Bellary — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Govt. Dental College & Research Institute, Bellary: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Government Dental College and Research Institute, Bellary, established around 1970, is one of Karnataka's government dental institutions, affiliated with Rajiv Gandhi University of Health Sciences, serving north Karnataka's dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Government dental college serving north Karnataka, established around 1970",
    "Government fee structure, among the lowest of any dental college in India",
    "Located in Bellary (Ballari), Karnataka",
    "Affiliated with Rajiv Gandhi University of Health Sciences",
  ],
  faqs: [
    { question: "How is admission to Government Dental College Bellary done?", answer: "Admission is via NEET-UG score through Karnataka Examinations Authority (KEA) state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Government Dental College, Bellary", body: "Government Dental College and Research Institute, Bellary was established around 1970 and is affiliated with Rajiv Gandhi University of Health Sciences. As one of Karnataka's government dental institutions, it runs BDS and MDS programmes across major dental specialities, serving north Karnataka's dental education demand." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Bellary (Ballari) with a dental hospital covering major specialities, serving a large regional public patient base drawn from north Karnataka." },
    { tab: "info", heading: "Why Choose Government Dental College Bellary", body: "- Government dental college serving north Karnataka\n- Government fee structure, among the lowest of any dental college in India\n- Located in Bellary (Ballari)\n- Affiliated with Rajiv Gandhi University of Health Sciences" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Karnataka state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Karnataka Examinations Authority (KEA) state-quota counselling and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Karnataka domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Karnataka's public health system, private practice, or hospital-affiliated clinical positions across north Karnataka." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Karnataka state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/KEA counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Karnataka government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Government Dental College, Bellary is not among NIRF's formally ranked top-40 dental institutes but holds regional significance for north Karnataka." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Bellary under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

export const dentalBatch9: CollegeContentPack[] = [
  goaDental,
  regionalDentalGuwahati,
  govtDentalDibrugarh,
  amcDentalAhmedabad,
  govtDentalJamnagar,
  siddhpurDental,
  govtDentalJodhpur,
  hpGovtDentalShimla,
  indiraGandhiJammu,
  esicDelhi,
  govtDentalBellary,
];
