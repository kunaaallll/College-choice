import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 4, part 2 of 4 (10 colleges: govt WB/Odisha/Bihar/Punjab/TN/Kerala/MP + Jharkhand/Tripura).

const dentalInstituteRanchi: CollegeContentPack = {
  slug: "dental-institute-rajendra-institute",
  college: {
    estd: 1965,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Ranchi University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Dental Institute, Rajendra Institute Ranchi — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Dental Institute, RIMS Ranchi: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Dental Institute, part of Rajendra Institute of Medical Sciences (RIMS) Ranchi, established around 1965, is Jharkhand's premier government dental institution, affiliated with Ranchi University.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Jharkhand's premier government dental institution, part of RIMS Ranchi",
    "Government fee structure, among the lowest of any dental college in India",
    "Affiliated with Ranchi University",
    "Access to RIMS's large multi-speciality hospital for broader clinical exposure",
  ],
  faqs: [
    { question: "How is admission to Dental Institute, RIMS Ranchi done?", answer: "Admission is via NEET-UG score through Jharkhand state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Dental Institute, RIMS Ranchi", body: "Dental Institute is part of Rajendra Institute of Medical Sciences (RIMS), Ranchi, established around 1965 and affiliated with Ranchi University. As Jharkhand's premier government dental institution, it runs BDS and MDS programmes across major dental specialities, benefiting from RIMS's large multi-speciality hospital ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The dental institute operates within the RIMS Ranchi campus, giving students access to a broad multi-speciality hospital setting alongside dedicated dental clinical facilities, serving a large public patient base across Jharkhand." },
    { tab: "info", heading: "Why Choose Dental Institute, RIMS Ranchi", body: "- Jharkhand's premier government dental institution\n- Government fee structure, among the lowest of any dental college in India\n- Part of the large RIMS multi-speciality hospital ecosystem\n- Affiliated with Ranchi University" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Jharkhand state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Jharkhand state-quota counselling for Jharkhand-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Jharkhand domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Jharkhand's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within RIMS's dental and broader hospital facilities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Given its status as Jharkhand's premier government dental college, closing ranks for the state quota and AIQ have historically required competitive NEET scores. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Jharkhand counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Jharkhand government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the institute" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Dental Institute, RIMS Ranchi is not among NIRF's formally ranked top-40 dental institutes but is Jharkhand's leading government dental institution." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The institute provides on-campus hostel accommodation for students, particularly those from outside Ranchi under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const agartalaDental: CollegeContentPack = {
  slug: "agartala-government-dental-college-and-igm-hospital",
  college: {
    estd: 2004,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Tripura University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Agartala Government Dental College — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Agartala Government Dental College and IGM Hospital, Tripura: BDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Agartala Government Dental College and IGM Hospital, established around 2004, is Tripura's sole government dental institution, affiliated with Tripura University, serving the state's dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
  ],
  highlights: [
    "Tripura's sole government dental institution, established around 2004",
    "Government fee structure, among the lowest of any dental college in India",
    "Attached to Indira Gandhi Memorial (IGM) Hospital for broad clinical exposure",
    "Affiliated with Tripura University",
  ],
  faqs: [
    { question: "How is admission to Agartala Government Dental College done?", answer: "Admission is via NEET-UG score through Tripura state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Agartala Government Dental College", body: "Agartala Government Dental College and IGM Hospital was established around 2004 and is affiliated with Tripura University. As Tripura's sole government dental institution, it runs a BDS programme across all core dental disciplines, attached to Indira Gandhi Memorial (IGM) Hospital." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Agartala, attached to Indira Gandhi Memorial (IGM) Hospital, giving students exposure to a broad multi-speciality hospital setting alongside dedicated dental clinical facilities." },
    { tab: "info", heading: "Why Choose Agartala Government Dental College", body: "- Tripura's sole government dental institution\n- Government fee structure, among the lowest of any dental college in India\n- Attached to Indira Gandhi Memorial (IGM) Hospital\n- Affiliated with Tripura University" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Tripura state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Tripura state-quota counselling for Tripura-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Tripura domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), government dental officer roles in Tripura's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental facility and IGM Hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Given its sole-government-college status, closing ranks for the Tripura state quota and AIQ have historically required competitive NEET scores. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Tripura counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Tripura government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Northeast-region specific government scholarship schemes\n- Merit scholarships for top academic performers" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Agartala Government Dental College is not among NIRF's formally ranked top-40 dental institutes but is Tripura's sole and premier government dental college." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Agartala under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const drRAhmedKolkata: CollegeContentPack = {
  slug: "dr-r-ahmed-dental-college-and-hospital",
  college: {
    estd: 1948,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, West Bengal University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Dr. R. Ahmed Dental College and Hospital Kolkata — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Dr. R. Ahmed Dental College & Hospital, Kolkata: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Dr. R. Ahmed Dental College and Hospital, Kolkata, established in 1948, is one of India's oldest dental colleges and West Bengal's premier government dental institution, affiliated with the West Bengal University of Health Sciences.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "One of India's oldest dental colleges, established 1948",
    "West Bengal's premier government dental institution",
    "Government fee structure, among the lowest of any dental college in India",
    "Affiliated with the West Bengal University of Health Sciences",
  ],
  faqs: [
    { question: "How old is Dr. R. Ahmed Dental College?", answer: "Established in 1948, Dr. R. Ahmed Dental College and Hospital is one of the oldest dental colleges in India, with a long-standing reputation in eastern India." },
    { question: "How is admission done?", answer: "Admission is via NEET-UG score through West Bengal state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Dr. R. Ahmed Dental College", body: "Dr. R. Ahmed Dental College and Hospital, Kolkata was established in 1948, making it one of India's oldest dental colleges. Affiliated with the West Bengal University of Health Sciences, it is West Bengal's premier government dental institution, running BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Kolkata with a well-established dental hospital covering major specialities, serving a very large urban patient base built up over more than seven decades of continuous operation." },
    { tab: "info", heading: "Why Choose Dr. R. Ahmed Dental College", body: "- One of India's oldest dental colleges, established 1948\n- West Bengal's premier government dental institution\n- Government fee structure, among the lowest of any dental college in India\n- Very large patient base for extensive clinical exposure" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Prosthodontics | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow West Bengal state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through West Bengal state-quota counselling for WB-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- West Bengal domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in West Bengal's public health system, private practice, or hospital-affiliated clinical positions, drawing on the college's long-standing reputation in eastern India." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Given its status as one of the oldest and most established government dental colleges, closing ranks for the West Bengal state quota and AIQ have historically required strong NEET scores. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/West Bengal counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per West Bengal government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Dr. R. Ahmed Dental College is not among NIRF's formally ranked top-40 dental institutes but is widely regarded as West Bengal's most established government dental college given its 1948 founding." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Kolkata under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events reflecting the college's long institutional history." },
  ],
};

const burdwanDental: CollegeContentPack = {
  slug: "burdwan-dental-college",
  college: {
    estd: 2013,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, West Bengal University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Burdwan Dental College and Hospital — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Burdwan Dental College & Hospital, West Bengal: BDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Burdwan Dental College and Hospital, established around 2013 in Bardhaman, is one of West Bengal's government dental institutions, affiliated with the West Bengal University of Health Sciences.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
  ],
  highlights: [
    "Government dental college serving western West Bengal",
    "Government fee structure, among the lowest of any dental college in India",
    "Located in Bardhaman (Burdwan)",
    "Affiliated with the West Bengal University of Health Sciences",
  ],
  faqs: [
    { question: "How is admission to Burdwan Dental College done?", answer: "Admission is via NEET-UG score through West Bengal state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Burdwan Dental College", body: "Burdwan Dental College and Hospital was established around 2013 in Bardhaman and is affiliated with the West Bengal University of Health Sciences. As one of West Bengal's government dental institutions, it runs a BDS programme across all core dental disciplines, serving western West Bengal's dental education demand." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Bardhaman with a dental hospital covering major specialities, serving western West Bengal's public healthcare needs." },
    { tab: "info", heading: "Why Choose Burdwan Dental College", body: "- Government dental college serving western West Bengal\n- Government fee structure, among the lowest of any dental college in India\n- Located in Bardhaman (Burdwan)\n- Affiliated with the West Bengal University of Health Sciences" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow West Bengal state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through West Bengal state-quota counselling for WB-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- West Bengal domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), government dental officer roles in West Bengal's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the West Bengal state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/West Bengal counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per West Bengal government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Burdwan Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Bardhaman under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const northBengalDental: CollegeContentPack = {
  slug: "the-north-bengal-dental-college",
  college: {
    estd: 2011,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, West Bengal University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "North Bengal Dental College and Hospital Siliguri — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "The North Bengal Dental College & Hospital, Siliguri: BDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "The North Bengal Dental College and Hospital, established around 2011 in Siliguri, is one of West Bengal's government dental institutions, affiliated with the West Bengal University of Health Sciences, serving the northern part of the state.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
  ],
  highlights: [
    "Government dental college serving north Bengal",
    "Government fee structure, among the lowest of any dental college in India",
    "Located in Siliguri, a major north Bengal city",
    "Affiliated with the West Bengal University of Health Sciences",
  ],
  faqs: [
    { question: "How is admission to North Bengal Dental College done?", answer: "Admission is via NEET-UG score through West Bengal state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About The North Bengal Dental College", body: "The North Bengal Dental College and Hospital was established around 2011 in Siliguri and is affiliated with the West Bengal University of Health Sciences. As one of West Bengal's government dental institutions, it runs a BDS programme across all core dental disciplines, serving north Bengal's dental education demand." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Siliguri with a dental hospital covering major specialities, serving north Bengal's public healthcare needs, including patients from neighbouring hill districts." },
    { tab: "info", heading: "Why Choose North Bengal Dental College", body: "- Government dental college serving north Bengal\n- Government fee structure, among the lowest of any dental college in India\n- Located in Siliguri, a major gateway city to the northeast\n- Affiliated with the West Bengal University of Health Sciences" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow West Bengal state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through West Bengal state-quota counselling for WB-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- West Bengal domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), government dental officer roles in West Bengal's public health system, private practice, or hospital-affiliated clinical positions across north Bengal." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the West Bengal state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/West Bengal counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per West Bengal government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "The North Bengal Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Siliguri under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const scbCuttack: CollegeContentPack = {
  slug: "s-c-b-dental-college-and-hospital",
  college: {
    estd: 1961,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Utkal University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "S.C.B. Dental College and Hospital Cuttack — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "S.C.B. Dental College & Hospital, Cuttack: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "S.C.B. Dental College and Hospital, established in 1961, is Odisha's premier government dental institution, attached to S.C.B. Medical College, Cuttack, and affiliated with Utkal University.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Odisha's premier government dental institution, established 1961",
    "Attached to S.C.B. Medical College, Cuttack, for broad clinical exposure",
    "Government fee structure, among the lowest of any dental college in India",
    "Affiliated with Utkal University",
  ],
  faqs: [
    { question: "How is admission to S.C.B. Dental College done?", answer: "Admission is via NEET-UG score through Odisha state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About S.C.B. Dental College", body: "S.C.B. Dental College and Hospital was established in 1961, attached to S.C.B. Medical College, Cuttack, and affiliated with Utkal University. As Odisha's premier government dental institution, it runs BDS and MDS programmes across major dental specialities, benefiting from the wider S.C.B. Medical College hospital ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Cuttack, attached to S.C.B. Medical College's large multi-speciality hospital, giving students exposure to a very large public patient base alongside dedicated dental clinical facilities." },
    { tab: "info", heading: "Why Choose S.C.B. Dental College", body: "- Odisha's premier government dental institution, established 1961\n- Attached to S.C.B. Medical College's large multi-speciality hospital\n- Government fee structure, among the lowest of any dental college in India\n- Affiliated with Utkal University" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Orthodontics | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Odisha state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Odisha state-quota counselling for Odisha-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Odisha domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Odisha's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital and S.C.B. Medical College's broader facilities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Given its status as Odisha's premier government dental college, closing ranks for the state quota and AIQ have historically required strong NEET scores. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Odisha counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Odisha government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "S.C.B. Dental College is not among NIRF's formally ranked top-40 dental institutes but is widely regarded as Odisha's leading government dental college." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Cuttack under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const govtDentalNalanda: CollegeContentPack = {
  slug: "government-dental-college-and-hospital",
  college: {
    estd: 2019,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Aryabhatta Knowledge University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Government Dental College and Hospital Nalanda — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Government Dental College & Hospital, Nalanda, Bihar: BDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Government Dental College and Hospital, Nalanda, established around 2019, is one of Bihar's newer government dental institutions, affiliated with Aryabhatta Knowledge University, serving the state's growing dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
  ],
  highlights: [
    "One of Bihar's newer government dental institutions",
    "Government fee structure, among the lowest of any dental college in India",
    "Located in Nalanda district, Bihar",
    "Affiliated with Aryabhatta Knowledge University",
  ],
  faqs: [
    { question: "How is admission to Government Dental College Nalanda done?", answer: "Admission is via NEET-UG score through Bihar state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Government Dental College, Nalanda", body: "Government Dental College and Hospital, Nalanda was established around 2019 and is affiliated with Aryabhatta Knowledge University. As one of Bihar's newer government dental institutions, it runs a BDS programme across all core dental disciplines, serving Bihar's growing dental education demand." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Nalanda district with a dental hospital covering major specialities, part of Bihar's expanding government medical and dental education infrastructure." },
    { tab: "info", heading: "Why Choose Government Dental College Nalanda", body: "- One of Bihar's newer government dental institutions\n- Government fee structure, among the lowest of any dental college in India\n- Located in the historically significant Nalanda district\n- Affiliated with Aryabhatta Knowledge University" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Bihar state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Bihar state-quota counselling for Bihar-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Bihar domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), government dental officer roles in Bihar's public health system, private practice, or hospital-affiliated clinical positions." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a newer government college, closing ranks for the Bihar state quota and AIQ have historically been accessible to a broader NEET score range than long-established institutions. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Bihar counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Bihar government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Government Dental College, Nalanda is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Nalanda under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const pbGovtAmritsar: CollegeContentPack = {
  slug: "pb-govt-dental-college-and-hospital",
  college: {
    estd: 1949,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Baba Farid University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Punjab Government Dental College and Hospital Amritsar — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Pb. Govt. Dental College & Hospital, Amritsar: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Punjab Government Dental College and Hospital, Amritsar, established in 1949, is one of India's oldest dental colleges and Punjab's premier government dental institution, affiliated with Baba Farid University of Health Sciences.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Oral Medicine & Radiology", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "One of India's oldest dental colleges, established 1949",
    "Punjab's premier government dental institution",
    "Government fee structure, among the lowest of any dental college in India",
    "Affiliated with Baba Farid University of Health Sciences",
  ],
  faqs: [
    { question: "How is admission to Punjab Government Dental College Amritsar done?", answer: "Admission is via NEET-UG score through Punjab state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Punjab Government Dental College, Amritsar", body: "Punjab Government Dental College and Hospital, Amritsar was established in 1949, making it one of India's oldest dental colleges. Affiliated with Baba Farid University of Health Sciences, it is Punjab's premier government dental institution, running BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Amritsar with a well-established dental hospital covering major specialities, serving a very large regional public patient base built up over more than seven decades." },
    { tab: "info", heading: "Why Choose Punjab Government Dental College Amritsar", body: "- One of India's oldest dental colleges, established 1949\n- Punjab's premier government dental institution\n- Government fee structure, among the lowest of any dental college in India\n- Very large patient base for extensive clinical exposure" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Oral Medicine & Radiology | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Punjab state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Punjab state-quota counselling for Punjab-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Punjab domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Punjab's public health system, private practice, or hospital-affiliated clinical positions, drawing on the college's long-standing regional reputation." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Given its status as one of the oldest and most established government dental colleges, closing ranks for the Punjab state quota and AIQ have historically required strong NEET scores. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Punjab counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Punjab government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Punjab Government Dental College, Amritsar is not among NIRF's formally ranked top-40 dental institutes but is widely regarded as Punjab's most established government dental college." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Amritsar under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events reflecting the college's long institutional history." },
  ],
};

const tnGovtDentalChennai: CollegeContentPack = {
  slug: "tamil-nadu-government-dental-college",
  college: {
    estd: 1954,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, The Tamil Nadu Dr. M.G.R. Medical University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Tamil Nadu Government Dental College Chennai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Tamil Nadu Government Dental College & Hospital, Chennai: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Tamil Nadu Government Dental College and Hospital, established in 1954, is Tamil Nadu's flagship government dental institution, affiliated with The Tamil Nadu Dr. M.G.R. Medical University.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹1.5 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "4", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Tamil Nadu's flagship government dental institution, established 1954",
    "Government fee structure, among the lowest of any dental college in India",
    "Large intake and strong clinical training reputation in Chennai",
    "Affiliated with The Tamil Nadu Dr. M.G.R. Medical University",
  ],
  faqs: [
    { question: "How is admission to Tamil Nadu Government Dental College done?", answer: "Admission is via NEET-UG score through Tamil Nadu state-quota counselling (Directorate of Medical Education) and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Tamil Nadu Government Dental College", body: "Tamil Nadu Government Dental College and Hospital was established in 1954 and is affiliated with The Tamil Nadu Dr. M.G.R. Medical University. As Tamil Nadu's flagship government dental institution, it runs BDS and MDS programmes across major dental specialities from its Chennai campus." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Chennai with a large, well-established dental hospital covering major specialities, serving one of the largest urban patient bases of any government dental college in south India." },
    { tab: "info", heading: "Why Choose Tamil Nadu Government Dental College", body: "- Tamil Nadu's flagship government dental institution, established 1954\n- Government fee structure, among the lowest of any dental college in India\n- Large intake with strong Chennai-based clinical training\n- Affiliated with The Tamil Nadu Dr. M.G.R. Medical University" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹1.5 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 4 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Tamil Nadu state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Tamil Nadu's Directorate of Medical Education state-quota counselling for TN-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Tamil Nadu domicile/community certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Tamil Nadu's public health system, private practice, or hospital-affiliated clinical positions across south India." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Given its status as Tamil Nadu's flagship government dental college, closing ranks for the state quota and AIQ have historically required strong NEET scores. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Tamil Nadu counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Tamil Nadu government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Tamil Nadu Government Dental College is not among NIRF's formally ranked top-40 dental institutes but is widely regarded as Tamil Nadu's leading government dental college given its scale and history." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Chennai under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const pariyaramDental: CollegeContentPack = {
  slug: "pariyaram-dental-college",
  college: {
    estd: 2000,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Kerala University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Pariyaram Dental College Kannur — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Pariyaram Dental College, Kannur, Kerala: BDS/MDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Pariyaram Dental College, established around 2000 and part of the Government Medical College Pariyaram campus in Kannur, is one of Kerala's government dental institutions, affiliated with Kerala University of Health Sciences.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Pedodontics & Preventive Dentistry", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Part of the Government Medical College Pariyaram campus, Kannur",
    "Government fee structure, among the lowest of any dental college in India",
    "Affiliated with Kerala University of Health Sciences",
    "Access to a broader multi-speciality medical college hospital ecosystem",
  ],
  faqs: [
    { question: "How is admission to Pariyaram Dental College done?", answer: "Admission is via NEET-UG score through Kerala state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Pariyaram Dental College", body: "Pariyaram Dental College was established around 2000 as part of the Government Medical College Pariyaram campus in Kannur, affiliated with Kerala University of Health Sciences. As one of Kerala's government dental institutions, it runs BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates within the Government Medical College Pariyaram campus, giving students access to a broader multi-speciality hospital ecosystem alongside dedicated dental clinical facilities, serving north Kerala's public healthcare needs." },
    { tab: "info", heading: "Why Choose Pariyaram Dental College", body: "- Part of the Government Medical College Pariyaram campus\n- Government fee structure, among the lowest of any dental college in India\n- Affiliated with Kerala University of Health Sciences\n- Broader multi-speciality hospital ecosystem for clinical exposure" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Pedodontics & Preventive Dentistry | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Kerala state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Kerala state-quota counselling for Kerala-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Kerala domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Kerala's public health system, private practice, or hospital-affiliated clinical positions across north Kerala." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental facility and the broader Government Medical College Pariyaram hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Kerala state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Kerala counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Kerala government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Pariyaram Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Kannur under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const collegeOfDentistryIndore: CollegeContentPack = {
  slug: "college-of-dentistry",
  college: {
    estd: 1994,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Devi Ahilya Vishwavidyalaya",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "College of Dentistry Indore — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "College of Dentistry, Indore, Madhya Pradesh: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "College of Dentistry, Indore, established around 1994, is one of Madhya Pradesh's government dental institutions, affiliated with Devi Ahilya Vishwavidyalaya, serving the state's dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Government dental college serving western Madhya Pradesh",
    "Government fee structure, among the lowest of any dental college in India",
    "Located in Indore, MP's largest city",
    "Affiliated with Devi Ahilya Vishwavidyalaya",
  ],
  faqs: [
    { question: "How is admission to College of Dentistry Indore done?", answer: "Admission is via NEET-UG score through Madhya Pradesh state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About College of Dentistry, Indore", body: "College of Dentistry, Indore was established around 1994 and is affiliated with Devi Ahilya Vishwavidyalaya. As one of Madhya Pradesh's government dental institutions, it runs BDS and MDS programmes across major dental specialities, serving western MP's dental education demand from its Indore campus." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Indore with a dental hospital covering major specialities, serving a large urban public patient base drawn from western Madhya Pradesh." },
    { tab: "info", heading: "Why Choose College of Dentistry Indore", body: "- Government dental college serving western Madhya Pradesh\n- Government fee structure, among the lowest of any dental college in India\n- Located in Indore, MP's largest and most commercially developed city\n- Affiliated with Devi Ahilya Vishwavidyalaya" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Madhya Pradesh state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Madhya Pradesh state-quota counselling for MP-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Madhya Pradesh domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Madhya Pradesh's public health system, private practice, or hospital-affiliated clinical positions across western MP." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Madhya Pradesh state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Madhya Pradesh counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Madhya Pradesh government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "College of Dentistry, Indore is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Indore under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

export const dentalBatch10: CollegeContentPack[] = [
  dentalInstituteRanchi,
  agartalaDental,
  drRAhmedKolkata,
  burdwanDental,
  northBengalDental,
  scbCuttack,
  govtDentalNalanda,
  pbGovtAmritsar,
  tnGovtDentalChennai,
  pariyaramDental,
  collegeOfDentistryIndore,
];
