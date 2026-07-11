import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 5, part 1 of 4
// (5 government/institutional colleges + 5 Karnataka private colleges).

const armyHospitalRR: CollegeContentPack = {
  slug: "army-hospital-research-and-referral",
  college: {
    estd: 2001,
    feesNum: 150000,
    feesLabel: "As per Armed Forces Medical Services norms",
    affiliation: "Armed Forces Medical Services, Guru Gobind Singh Indraprastha University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Army Hospital (Research and Referral) Dental Centre — Admission, Courses 2026",
    metaDescription: "Army Hospital (Research and Referral), Delhi Cantt: postgraduate dental training under Armed Forces Medical Services, admission and course details.",
    about:
      "Army Hospital (Research and Referral), Delhi Cantt is a premier tertiary-care armed forces hospital that runs DCI-recognised postgraduate (MDS) dental training programmes under the Armed Forces Medical Services, primarily for serving armed forces dental officers rather than as a standalone undergraduate BDS college.",
  },
  courses: [
    { name: "MDS — various specialities (Armed Forces cadre)", duration: "3 years", seats: "Limited, cadre-based", feesLabel: "As per Armed Forces Medical Services norms" },
  ],
  highlights: [
    "Premier tertiary-care armed forces referral hospital in Delhi Cantt",
    "DCI-recognised postgraduate dental (MDS) training for armed forces dental officers",
    "Access to a very large multi-speciality hospital ecosystem",
    "Distinct institutional model — postgraduate armed-forces training rather than open BDS admission",
  ],
  faqs: [
    { question: "Does Army Hospital (R&R) offer a BDS programme?", answer: "No. Army Hospital (Research and Referral) primarily runs DCI-recognised postgraduate (MDS) dental training for serving armed forces dental officers as part of the Armed Forces Medical Services training framework, rather than an open undergraduate BDS programme." },
  ],
  sections: [
    { tab: "info", heading: "About Army Hospital (Research and Referral)", body: "Army Hospital (Research and Referral), Delhi Cantt is one of India's premier tertiary-care armed forces hospitals, established as a super-speciality referral centre in 2001. Its dental wing runs DCI-recognised postgraduate (MDS) training programmes under the Armed Forces Medical Services framework, distinct from typical civilian dental colleges that admit BDS students through NEET-UG." },
    { tab: "info", heading: "Institutional Model & Clinical Facilities", body: "As a super-speciality armed forces referral hospital, Army Hospital (R&R) offers postgraduate dental trainees exposure to an exceptionally large and complex multi-speciality patient base, drawn from across the armed forces medical system and referral network." },
    { tab: "info", heading: "Why This Institution Is Different", body: "- Premier tertiary-care armed forces referral hospital\n- Postgraduate (MDS) dental training focus, not standalone BDS admission\n- Serves armed forces dental officers under the Armed Forces Medical Services\n- Exceptional clinical case complexity and volume" },
    { tab: "courses-fees", heading: "Postgraduate Dental Training", body: "| Programme | Duration | Seats | Fees |\n|---|---|---|---|\n| MDS — various specialities | 3 years | Limited, cadre-based | As per Armed Forces Medical Services norms |\n\nAdmission and fee structures follow Armed Forces Medical Services training protocols rather than standard civilian NEET-MDS counselling." },
    { tab: "courses-fees", heading: "Training Framework", body: "Postgraduate dental training at Army Hospital (R&R) is administered through the Armed Forces Medical Services training and cadre-allocation system, distinct from civilian college admission and fee norms." },
    { tab: "admissions", heading: "Admission Process", body: "Postgraduate dental training slots at Army Hospital (R&R) are filled through the Armed Forces Medical Services' internal training and cadre-allocation process for serving armed forces dental officers, not through open civilian NEET-MDS counselling." },
    { tab: "admissions", heading: "Eligibility", body: "- Serving armed forces dental officer status is typically required\n- Relevant BDS qualification and service eligibility per Armed Forces Medical Services norms\n- Specific eligibility and application details are administered internally by the Armed Forces Medical Services" },
    { tab: "placements", heading: "Career Outcomes", body: "Postgraduate trainees continue their careers as specialist dental officers within the Armed Forces Medical Services, serving across military hospitals and referral centres nationwide." },
    { tab: "placements", heading: "Clinical Training Environment", body: "Trainees benefit from Army Hospital (R&R)'s status as a super-speciality referral centre, offering exposure to complex and varied clinical cases across a very large multi-speciality hospital ecosystem." },
    { tab: "cutoffs", heading: "Selection Criteria", body: "As an internal Armed Forces Medical Services training programme, selection is based on service seniority, merit, and internal cadre-allocation criteria rather than a public NEET-MDS cutoff rank." },
    { tab: "scholarships", heading: "Financial Support", body: "Postgraduate trainees are serving armed forces officers and are compensated under standard armed forces service pay and allowances during their training period, rather than paying private-college-style fees." },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Army Hospital (Research and Referral) is not among NIRF's formally ranked top-40 dental institutes, reflecting its distinct institutional model as an armed forces referral hospital rather than a civilian dental college." },
    { tab: "hostel", heading: "Accommodation", body: "As serving armed forces officers, postgraduate trainees are accommodated per standard armed forces service quarters and mess arrangements at the Delhi Cantt facility." },
  ],
};

const jnimsImphal: CollegeContentPack = {
  slug: "dental-college-jawaharlal-nehru-institute",
  college: {
    estd: 2005,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government (Central), Manipur University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Dental College, Jawaharlal Nehru Institute of Medical Sciences Imphal — BDS Fees, Admission 2026",
    metaDescription: "Dental College, JNIMS Imphal: BDS courses, low government fees, NEET admission, cutoff, hostel details.",
    about:
      "Dental College at Jawaharlal Nehru Institute of Medical Sciences (JNIMS), Imphal, established around 2005, is a central government dental institution affiliated with Manipur University, serving Manipur and the wider Northeast region.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
  ],
  highlights: [
    "Central government dental institution at JNIMS Imphal",
    "Government fee structure, among the lowest of any dental college in India",
    "Serves Manipur and the wider Northeast region",
    "Access to JNIMS's broader multi-speciality hospital ecosystem",
  ],
  faqs: [
    { question: "How is admission to Dental College, JNIMS Imphal done?", answer: "Admission is via NEET-UG score through Manipur state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Dental College, JNIMS Imphal", body: "Dental College is part of Jawaharlal Nehru Institute of Medical Sciences (JNIMS), Imphal, a central government institution established around 2005 and affiliated with Manipur University. It runs a BDS programme across all core dental disciplines, benefiting from JNIMS's broader multi-speciality hospital ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The dental college operates within the JNIMS Imphal campus, giving students access to a large multi-speciality hospital setting alongside dedicated dental clinical facilities, serving Manipur and neighbouring Northeast states." },
    { tab: "info", heading: "Why Choose Dental College, JNIMS Imphal", body: "- Central government dental institution\n- Government fee structure, among the lowest of any dental college in India\n- Serves Manipur and the wider Northeast region\n- Part of the large JNIMS multi-speciality hospital ecosystem" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow central government/Manipur norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Manipur state-quota counselling for Manipur-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Manipur domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Manipur's public health system, private practice, or hospital-affiliated clinical positions across the Northeast." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within JNIMS's dental and broader hospital facilities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Manipur state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Manipur counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per government policy\n- Central government post-matric scholarship schemes for eligible students\n- Northeast-region specific government scholarship schemes\n- Merit scholarships for top academic performers" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Dental College, JNIMS Imphal is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Imphal under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const rimsImphal: CollegeContentPack = {
  slug: "dental-college-rims",
  college: {
    estd: 1997,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government (Central), Manipur University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Dental College, RIMS Imphal — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Dental College, Regional Institute of Medical Sciences (RIMS) Imphal: BDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Dental College at Regional Institute of Medical Sciences (RIMS), Imphal, established around 1997, is a central government dental institution affiliated with Manipur University, serving Manipur and the wider Northeast region.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
    { name: "MDS — Oral Medicine & Radiology", duration: "3 years", seats: "2", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Central government dental institution at RIMS Imphal, established around 1997",
    "Government fee structure, among the lowest of any dental college in India",
    "Serves Manipur and the wider Northeast region",
    "Access to RIMS's large multi-speciality hospital ecosystem",
  ],
  faqs: [
    { question: "How is admission to Dental College, RIMS Imphal done?", answer: "Admission is via NEET-UG score through Manipur state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About Dental College, RIMS Imphal", body: "Dental College is part of Regional Institute of Medical Sciences (RIMS), Imphal, a central government institution established around 1997 and affiliated with Manipur University. It runs BDS and MDS programmes across major dental specialities, benefiting from RIMS's broader multi-speciality hospital ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The dental college operates within the RIMS Imphal campus, giving students access to a large multi-speciality hospital setting alongside dedicated dental clinical facilities, serving Manipur and neighbouring Northeast states." },
    { tab: "info", heading: "Why Choose Dental College, RIMS Imphal", body: "- Central government dental institution, established around 1997\n- Government fee structure, among the lowest of any dental college in India\n- Serves Manipur and the wider Northeast region\n- Part of the large RIMS multi-speciality hospital ecosystem" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n| MDS — Oral Medicine & Radiology | 3 years | 2 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow central government/Manipur norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Manipur state-quota counselling for Manipur-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Manipur domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Manipur's public health system, private practice, or hospital-affiliated clinical positions across the Northeast." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within RIMS's dental and broader hospital facilities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Manipur state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Manipur counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per government policy\n- Central government post-matric scholarship schemes for eligible students\n- Northeast-region specific government scholarship schemes\n- Merit scholarships for top academic performers" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Dental College, RIMS Imphal is not among NIRF's formally ranked top-40 dental institutes but is one of Manipur's two government dental training centres." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Imphal under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const ladyHardingeDelhi: CollegeContentPack = {
  slug: "lady-hardinge-medical-college-and-hospital",
  college: {
    estd: 1916,
    feesNum: 150000,
    feesLabel: "As per Delhi government medical college norms",
    affiliation: "Government, University of Delhi",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Lady Hardinge Medical College and Hospital — Dental Training, Admission 2026",
    metaDescription: "Lady Hardinge Medical College & Hospital, New Delhi: recognised dental training, admission process, and course details.",
    about:
      "Lady Hardinge Medical College and Hospital, established in 1916 in New Delhi, is one of India's oldest and most reputed government medical institutions, affiliated with the University of Delhi, offering DCI-recognised dental training as part of its broader medical education programmes.",
  },
  courses: [
    { name: "Dental training / postgraduate dental programmes (institution-specific)", duration: "Varies by programme", seats: "Limited", feesLabel: "As per Delhi government medical college norms" },
  ],
  highlights: [
    "One of India's oldest and most reputed government medical institutions, established 1916",
    "Affiliated with the University of Delhi",
    "DCI-recognised dental training within a historic, highly regarded medical college",
    "Located in New Delhi, giving access to a very large tertiary-care patient base",
  ],
  faqs: [
    { question: "Is Lady Hardinge primarily a dental college?", answer: "No. Lady Hardinge Medical College and Hospital is primarily a government medical college (historically for women), one of India's oldest and most reputed. Its DCI-recognised dental training programmes operate within this broader medical education framework rather than as a standalone dental college." },
  ],
  sections: [
    { tab: "info", heading: "About Lady Hardinge Medical College", body: "Lady Hardinge Medical College and Hospital was established in 1916 in New Delhi and is affiliated with the University of Delhi. As one of India's oldest and most reputed government medical institutions, it offers DCI-recognised dental training within its broader medical education framework." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The institution operates from New Delhi with extensive tertiary-care hospital facilities, giving dental trainees access to a very large and diverse patient base within a historic, highly regarded government medical college." },
    { tab: "info", heading: "Why Choose Lady Hardinge Medical College", body: "- One of India's oldest and most reputed government medical institutions, established 1916\n- Affiliated with the University of Delhi\n- Very large tertiary-care patient base in New Delhi\n- DCI-recognised dental training within a historic institution" },
    { tab: "courses-fees", heading: "Dental Training Programmes", body: "| Programme | Duration | Seats | Fees |\n|---|---|---|---|\n| Dental training / postgraduate dental programmes | Varies by programme | Limited | As per Delhi government medical college norms |\n\nFees follow Delhi government medical college fee norms; confirm current programme-specific figures directly with the institution." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "As a government institution, fees are subsidised per Delhi government and central government norms. Additional fee concessions apply for SC/ST/OBC-eligible students under government policy." },
    { tab: "admissions", heading: "Admission Process", body: "Admission to dental training programmes follows the applicable NEET-UG/NEET-MDS process and Delhi/central government counselling norms for the specific programme offered." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Relevant qualifying examination pass with required minimum aggregate\n- Valid NEET-UG/NEET-MDS score/rank meeting the qualifying cutoff, as applicable to the programme\n- Documents: mark sheets, scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes", body: "Graduates and trainees commonly pursue further specialisation, government dental officer roles, private practice, or hospital-affiliated clinical positions, drawing on the institution's strong reputation." },
    { tab: "placements", heading: "Clinical Training", body: "Clinical training draws on Lady Hardinge's extensive tertiary-care hospital facilities in New Delhi, offering exposure to a large and varied patient base." },
    { tab: "cutoffs", heading: "Cutoff (Indicative)", body: "Given the institution's strong reputation and Delhi location, admission to its dental training programmes has historically been competitive. Exact cutoff figures vary by programme and year; confirm current-year details directly with the institution." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per government policy\n- Central government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the institution" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Lady Hardinge Medical College is a highly reputed government medical institution; its dental training programmes are not separately ranked among NIRF's formally ranked top-40 dental institutes, which primarily assess standalone dental colleges." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The institution provides hostel accommodation for students within its historic New Delhi campus. Student life includes academic events and clinical case discussions reflecting the institution's long-standing medical education tradition." },
  ],
};

const upRuralSaifai: CollegeContentPack = {
  slug: "u-p-rural-institute-of-medical-sciences-and-research",
  college: {
    estd: 2004,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Uttar Pradesh University of Medical Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "U.P. Rural Institute of Medical Sciences and Research Saifai — BDS Fees, Admission 2026",
    metaDescription: "U.P. Rural Institute of Medical Sciences & Research, Saifai: BDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "U.P. Rural Institute of Medical Sciences and Research, Saifai, established around 2004, is a government medical institution with a dental wing, affiliated with Uttar Pradesh University of Medical Sciences, serving rural UP's dental education demand.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
  ],
  highlights: [
    "Government medical institution with a dedicated dental wing",
    "Government fee structure, among the lowest of any dental college in India",
    "Located in Saifai, serving rural Uttar Pradesh's healthcare needs",
    "Affiliated with Uttar Pradesh University of Medical Sciences",
  ],
  faqs: [
    { question: "How is admission to U.P. Rural Institute of Medical Sciences Saifai done?", answer: "Admission is via NEET-UG score through Uttar Pradesh state-quota counselling and the MCC All India Quota process for the AIQ share." },
  ],
  sections: [
    { tab: "info", heading: "About U.P. Rural Institute of Medical Sciences, Saifai", body: "U.P. Rural Institute of Medical Sciences and Research was established around 2004 in Saifai and is affiliated with Uttar Pradesh University of Medical Sciences. Its dental wing runs a BDS programme across all core dental disciplines, serving rural Uttar Pradesh's dental education and healthcare demand." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The institution operates from Saifai with a dental facility linked to its broader medical college hospital, serving a significant rural patient population in this part of Uttar Pradesh." },
    { tab: "info", heading: "Why Choose U.P. Rural Institute of Medical Sciences Saifai", body: "- Government medical institution with a dedicated dental wing\n- Government fee structure, among the lowest of any dental college in India\n- Serves rural Uttar Pradesh's dental education and healthcare needs\n- Affiliated with Uttar Pradesh University of Medical Sciences" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Uttar Pradesh state government norms and are payable per year. Additional fee concessions apply for SC/ST/OBC-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The institution fills seats through Uttar Pradesh state-quota counselling for UP-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Uttar Pradesh domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), government dental officer roles in Uttar Pradesh's public health system, private practice, or hospital-affiliated clinical positions in rural and semi-urban UP." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the institution's own dental facility and broader hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Closing ranks for the Uttar Pradesh state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Uttar Pradesh counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC-eligible students per Uttar Pradesh government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the institution" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "U.P. Rural Institute of Medical Sciences and Research is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The institution provides on-campus hostel accommodation for students, particularly those from outside Saifai under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const ajInstituteMangaluru: CollegeContentPack = {
  slug: "a-j-institute-of-dental-sciences",
  college: {
    estd: 2004,
    feesNum: 900000,
    feesLabel: "₹9 L (indicative, total)",
    affiliation: "Private, Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "A.J. Institute of Dental Sciences Mangaluru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "A.J. Institute of Dental Sciences, Mangaluru: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "A.J. Institute of Dental Sciences, established around 2004 in Mangaluru, is a private dental institution affiliated with Rajiv Gandhi University of Health Sciences, part of the A.J. group of institutions.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹9 L total (indicative)" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "3", feesLabel: "Fees vary by speciality (indicative)" },
  ],
  highlights: [
    "Private dental college in Mangaluru, established around 2004",
    "Part of the A.J. group of institutions",
    "Affiliated with Rajiv Gandhi University of Health Sciences",
    "NEET-UG based admission through Karnataka state counselling and management quota",
  ],
  faqs: [
    { question: "How is admission to A.J. Institute of Dental Sciences done?", answer: "Admission is via NEET-UG score through Karnataka Examinations Authority (KEA) state counselling for government-quota seats and the college's own management quota process." },
  ],
  sections: [
    { tab: "info", heading: "About A.J. Institute of Dental Sciences", body: "A.J. Institute of Dental Sciences was established around 2004 in Mangaluru and is affiliated with Rajiv Gandhi University of Health Sciences. As a private dental institution and part of the A.J. group of institutions, it runs BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Mangaluru with a dental hospital covering major specialities, serving a coastal Karnataka patient base and offering students structured clinical rotations." },
    { tab: "info", heading: "Why Choose A.J. Institute of Dental Sciences", body: "- Private dental college in Mangaluru, a coastal Karnataka education hub\n- Part of the A.J. group of institutions\n- Affiliated with Rajiv Gandhi University of Health Sciences\n- Structured clinical training with a coastal Karnataka patient base" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹9 L |\n| MDS — Orthodontics | 3 years | 3 | Varies by speciality |\n\nFees vary by quota (government/management/NRI) and are set per Karnataka private dental college fee-regulation norms; confirm current-year figures directly with the college." },
    { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Karnataka typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Karnataka Examinations Authority (KEA) state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across coastal Karnataka." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with KEA or the college." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Karnataka state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "A.J. Institute of Dental Sciences is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const bgsGlobalBengaluru: CollegeContentPack = {
  slug: "bgs-global-institute-of-dental-sciences",
  college: {
    estd: 2004,
    feesNum: 900000,
    feesLabel: "₹9 L (indicative, total)",
    affiliation: "Private, Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "BGS Global Institute of Dental Sciences Bengaluru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "BGS Global Institute of Dental Sciences, Bengaluru: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "BGS Global Institute of Dental Sciences, established around 2004 in Bengaluru, is a private dental institution affiliated with Rajiv Gandhi University of Health Sciences, part of the BGS group of institutions.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹9 L total (indicative)" },
    { name: "MDS — Periodontics", duration: "3 years", seats: "3", feesLabel: "Fees vary by speciality (indicative)" },
  ],
  highlights: [
    "Private dental college in Bengaluru, part of the BGS group of institutions",
    "Affiliated with Rajiv Gandhi University of Health Sciences",
    "Established around 2004",
    "NEET-UG based admission through Karnataka state counselling and management quota",
  ],
  faqs: [
    { question: "How is admission to BGS Global Institute of Dental Sciences done?", answer: "Admission is via NEET-UG score through Karnataka Examinations Authority (KEA) state counselling for government-quota seats and the college's own management quota process." },
  ],
  sections: [
    { tab: "info", heading: "About BGS Global Institute of Dental Sciences", body: "BGS Global Institute of Dental Sciences was established around 2004 in Bengaluru and is affiliated with Rajiv Gandhi University of Health Sciences. As a private dental institution and part of the BGS group of institutions, it runs BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Bengaluru with a dental hospital covering major specialities, serving a large urban patient base and offering students structured clinical rotations." },
    { tab: "info", heading: "Why Choose BGS Global Institute of Dental Sciences", body: "- Private dental college in Bengaluru, part of the BGS group of institutions\n- Affiliated with Rajiv Gandhi University of Health Sciences\n- Large urban patient base for clinical exposure\n- Established around 2004" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹9 L |\n| MDS — Periodontics | 3 years | 3 | Varies by speciality |\n\nFees vary by quota (government/management/NRI) and are set per Karnataka private dental college fee-regulation norms; confirm current-year figures directly with the college." },
    { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Karnataka typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Karnataka Examinations Authority (KEA) state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Bengaluru and Karnataka." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with KEA or the college." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Karnataka state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "BGS Global Institute of Dental Sciences is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const daPanduBengaluru: CollegeContentPack = {
  slug: "d-a-pandu-memorial-r-v-dental-college",
  college: {
    estd: 2001,
    feesNum: 900000,
    feesLabel: "₹9 L (indicative, total)",
    affiliation: "Private, Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "D.A. Pandu Memorial R.V. Dental College Bengaluru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "D.A. Pandu Memorial R.V. Dental College, Bengaluru: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "D.A. Pandu Memorial R.V. Dental College, established around 2001 in Bengaluru, is a private dental institution affiliated with Rajiv Gandhi University of Health Sciences, part of the well-known RV group of institutions.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹9 L total (indicative)" },
    { name: "MDS — Public Health Dentistry", duration: "3 years", seats: "2", feesLabel: "Fees vary by speciality (indicative)" },
  ],
  highlights: [
    "Part of the well-known RV group of institutions",
    "Located in Bengaluru, Karnataka's capital",
    "Affiliated with Rajiv Gandhi University of Health Sciences",
    "NEET-UG based admission through Karnataka state counselling and management quota",
  ],
  faqs: [
    { question: "How is admission to D.A. Pandu Memorial R.V. Dental College done?", answer: "Admission is via NEET-UG score through Karnataka Examinations Authority (KEA) state counselling for government-quota seats and the college's own management quota process." },
  ],
  sections: [
    { tab: "info", heading: "About D.A. Pandu Memorial R.V. Dental College", body: "D.A. Pandu Memorial R.V. Dental College was established around 2001 in Bengaluru and is affiliated with Rajiv Gandhi University of Health Sciences. As a private dental institution and part of the well-known RV group of institutions, it runs BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Bengaluru with a dental hospital covering major specialities, serving a large urban patient base and offering students structured clinical rotations within the broader RV institutional ecosystem." },
    { tab: "info", heading: "Why Choose D.A. Pandu Memorial R.V. Dental College", body: "- Part of the well-known RV group of institutions\n- Located in Bengaluru, Karnataka's capital\n- Affiliated with Rajiv Gandhi University of Health Sciences\n- Large urban patient base for clinical exposure" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹9 L |\n| MDS — Public Health Dentistry | 3 years | 2 | Varies by speciality |\n\nFees vary by quota (government/management/NRI) and are set per Karnataka private dental college fee-regulation norms; confirm current-year figures directly with the college." },
    { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Karnataka typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Karnataka Examinations Authority (KEA) state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Bengaluru and Karnataka." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with KEA or the college." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Karnataka state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "D.A. Pandu Memorial R.V. Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const msRamaiahBengaluru: CollegeContentPack = {
  slug: "m-s-ramaiah-dental-college",
  college: {
    estd: 1997,
    feesNum: 950000,
    feesLabel: "₹9.5 L (indicative, total)",
    affiliation: "Private, Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "M.S. Ramaiah Dental College Bengaluru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "M.S. Ramaiah Dental College, Bengaluru: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "M.S. Ramaiah Dental College, established around 1997 in Bengaluru, is a private dental institution affiliated with Rajiv Gandhi University of Health Sciences, part of the well-regarded Ramaiah group of institutions.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹9.5 L total (indicative)" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "3", feesLabel: "Fees vary by speciality (indicative)" },
  ],
  highlights: [
    "Part of the well-regarded Ramaiah group of institutions",
    "Established around 1997, one of Bengaluru's more established private dental colleges",
    "Affiliated with Rajiv Gandhi University of Health Sciences",
    "NEET-UG based admission through Karnataka state counselling and management quota",
  ],
  faqs: [
    { question: "How is admission to M.S. Ramaiah Dental College done?", answer: "Admission is via NEET-UG score through Karnataka Examinations Authority (KEA) state counselling for government-quota seats and the college's own management quota process." },
  ],
  sections: [
    { tab: "info", heading: "About M.S. Ramaiah Dental College", body: "M.S. Ramaiah Dental College was established around 1997 in Bengaluru and is affiliated with Rajiv Gandhi University of Health Sciences. As a private dental institution and part of the well-regarded Ramaiah group of institutions, it runs BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Bengaluru with a dental hospital covering major specialities, serving a large urban patient base and offering students structured clinical rotations within the broader Ramaiah institutional ecosystem." },
    { tab: "info", heading: "Why Choose M.S. Ramaiah Dental College", body: "- Part of the well-regarded Ramaiah group of institutions\n- One of Bengaluru's more established private dental colleges\n- Affiliated with Rajiv Gandhi University of Health Sciences\n- Large urban patient base for clinical exposure" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹9.5 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 3 | Varies by speciality |\n\nFees vary by quota (government/management/NRI) and are set per Karnataka private dental college fee-regulation norms; confirm current-year figures directly with the college." },
    { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Karnataka typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Karnataka Examinations Authority (KEA) state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Bengaluru and Karnataka." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with KEA or the college." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Karnataka state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "M.S. Ramaiah Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

const kvgSullia: CollegeContentPack = {
  slug: "k-v-g-dental-college-and-hospital",
  college: {
    estd: 2004,
    feesNum: 850000,
    feesLabel: "₹8.5 L (indicative, total)",
    affiliation: "Private, Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "K.V.G. Dental College and Hospital Sullia — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "K.V.G. Dental College & Hospital, Sullia, Karnataka: BDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "K.V.G. Dental College and Hospital, established around 2004 in Sullia, is a private dental institution affiliated with Rajiv Gandhi University of Health Sciences, serving coastal and interior Karnataka.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8.5 L total (indicative)" },
  ],
  highlights: [
    "Private dental college in Sullia, serving coastal and interior Karnataka",
    "Affiliated with Rajiv Gandhi University of Health Sciences",
    "Established around 2004",
    "NEET-UG based admission through Karnataka state counselling and management quota",
  ],
  faqs: [
    { question: "How is admission to K.V.G. Dental College done?", answer: "Admission is via NEET-UG score through Karnataka Examinations Authority (KEA) state counselling for government-quota seats and the college's own management quota process." },
  ],
  sections: [
    { tab: "info", heading: "About K.V.G. Dental College", body: "K.V.G. Dental College and Hospital was established around 2004 in Sullia and is affiliated with Rajiv Gandhi University of Health Sciences. As a private dental institution, it runs a BDS programme across all core dental disciplines, serving coastal and interior Karnataka." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from Sullia with a dental hospital covering major specialities, serving a regional patient base and offering students structured clinical rotations." },
    { tab: "info", heading: "Why Choose K.V.G. Dental College", body: "- Private dental college serving coastal and interior Karnataka\n- Affiliated with Rajiv Gandhi University of Health Sciences\n- Established around 2004\n- NEET-UG based transparent admission process" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8.5 L |\n\nFees vary by quota (government/management/NRI) and are set per Karnataka private dental college fee-regulation norms; confirm current-year figures directly with the college." },
    { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Karnataka typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Karnataka Examinations Authority (KEA) state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Karnataka." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with KEA or the college." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Karnataka state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "K.V.G. Dental College is not among NIRF's formally ranked top-40 dental institutes." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
  ],
};

export const dentalBatch13: CollegeContentPack[] = [
  armyHospitalRR,
  jnimsImphal,
  rimsImphal,
  ladyHardingeDelhi,
  upRuralSaifai,
  ajInstituteMangaluru,
  bgsGlobalBengaluru,
  daPanduBengaluru,
  msRamaiahBengaluru,
  kvgSullia,
];
