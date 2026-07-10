import type { CollegeContentPack } from "./types";

// NIRF Dental 2024 #7-20 — hand-authored, matches dental-batch1.ts depth.

const srmDental: CollegeContentPack = {
  slug: "srm-dental-college",
  college: {
    estd: 2001,
    website: "https://www.srmdentalcollege.com",
    feesNum: 1700000,
    feesLabel: "₹17.0 L",
    affiliation: "Deemed University (SRM)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "SRM Dental College Chennai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "SRM Dental College Ramapuram, Chennai NIRF #7 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "SRM Dental College, established in 2001 at Ramapuram, Chennai, is part of SRM Institute of Science and Technology, one of India's largest deemed universities. It combines modern dental hospital infrastructure with access to SRM's broader multi-campus academic ecosystem, ranked #7 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹17.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "5", feesLabel: "₹26.0 L total (indicative)" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "4", feesLabel: "₹26.0 L total (indicative)" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "4", feesLabel: "₹26.0 L total (indicative)" },
  ],
  highlights: [
    "Part of SRM Institute of Science and Technology, one of India's largest deemed universities",
    "Modern dental hospital infrastructure at the Ramapuram campus, Chennai",
    "Ranked #7 in NIRF 2024 Dental",
    "Access to SRM's broader multi-campus, multi-disciplinary academic ecosystem",
  ],
  faqs: [
    { question: "Is SRM Dental College the same as SRM's main Kattankulathur campus?", answer: "No — SRM Dental College operates from SRM's Ramapuram campus in Chennai, a separate location from the main Kattankulathur engineering-focused campus, though both fall under SRM Institute of Science and Technology." },
    { question: "How is admission to SRM Dental College done?", answer: "Admission is via NEET-UG score; as a deemed university, SRM conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About SRM Dental College", body: "SRM Dental College was established in 2001 at Ramapuram, Chennai, as part of SRM Institute of Science and Technology, one of India's largest deemed universities with campuses across multiple states. The dental college runs BDS and MDS programmes across all major dental specialities, backed by SRM's substantial institutional scale and infrastructure investment.\n\nSRM Dental College benefits from being part of a large, well-resourced deemed university, giving students access to shared research facilities and a broad multi-disciplinary academic environment beyond dentistry alone." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Ramapuram campus houses a dedicated dental hospital with modern facilities across all major specialities, alongside academic blocks and research labs. The campus is distinct from SRM's larger Kattankulathur campus but shares the university's administrative and academic framework." },
    { tab: "info", heading: "Why Choose SRM Dental College", body: "- Part of one of India's largest and most resourced deemed universities\n- Ranked #7 nationally in NIRF 2024 Dental\n- Modern dental hospital infrastructure in Chennai\n- Access to SRM's broader multi-campus academic and research ecosystem" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹17.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 5 | ₹26.0 L (indicative) |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 4 | ₹26.0 L (indicative) |\n| MDS — Orthodontics | 3 years | 4 | ₹26.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with SRM admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, SRM sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. SRM conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "SRM Dental graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad. SRM's large alumni network across its multi-disciplinary campuses provides additional professional connections beyond dentistry." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, SRM Dental's NEET cutoff has historically been moderately competitive. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with SRM admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "SRM Dental College is ranked #7 in NIRF 2024 Dental, and SRM Institute of Science and Technology also ranks strongly across NIRF's Engineering, Medical, and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "SRM provides on-campus hostel accommodation for men and women at the Ramapuram campus, with mess facilities. Student life includes technical events, clinical case competitions, and access to SRM's broader multi-campus culture." },
  ],
};

const jmiDental: CollegeContentPack = {
  slug: "jamia-millia-islamia-dental",
  college: {
    estd: 2015,
    website: "https://jmi.ac.in",
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Central University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Jamia Millia Islamia Faculty of Dentistry — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Jamia Millia Islamia Faculty of Dentistry, New Delhi NIRF #8 Dental: BDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Jamia Millia Islamia, a central university in New Delhi with roots dating to 1920, runs a comparatively newer Faculty of Dentistry as part of its broader academic portfolio. As a central government institution, it combines heavily subsidised fees with growing dental education infrastructure, ranked #8 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
  ],
  highlights: [
    "Faculty of Dentistry within Jamia Millia Islamia, a central university founded in 1920",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #8 in NIRF 2024 Dental",
    "Central Delhi location with strong connectivity",
  ],
  faqs: [
    { question: "Is Jamia Millia Islamia's dental faculty new?", answer: "Yes — relative to Jamia's century-long overall history, its Faculty of Dentistry is a more recently established addition to the university's academic portfolio, though it has quickly built a strong NIRF ranking." },
    { question: "How is admission to Jamia dental done?", answer: "Admission is via NEET-UG score through Jamia's own centralised counselling process for its central-university BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Jamia Millia Islamia Faculty of Dentistry", body: "Jamia Millia Islamia was founded in 1920 and holds central university status, with campuses in New Delhi spanning a wide range of disciplines. Its Faculty of Dentistry is a comparatively more recent addition to the university's academic portfolio, offering a BDS programme built on Jamia's broader institutional reputation and central-government funding.\n\nAs a central university, Jamia's dental faculty benefits from heavily subsidised fees while building out its clinical and research infrastructure." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "Jamia's dental faculty operates from the university's New Delhi campus, with dedicated dental clinical facilities supporting undergraduate training. The broader Jamia campus provides students access to the university's shared academic and library resources." },
    { tab: "info", heading: "Why Choose Jamia Dental", body: "- Central university with heavily subsidised government fees\n- Ranked #8 nationally in NIRF 2024 Dental\n- Central Delhi location with strong connectivity\n- Backed by Jamia's century-long overall institutional reputation" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n\nAs a central university, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees are payable per year through Jamia's designated channels. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under central government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Jamia conducts its own centralised counselling for its BDS seats based on NEET-UG rank/score, given its central-university status." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Jamia dental graduates commonly pursue MDS specialisation, government dental officer roles, private practice, or hospital-affiliated clinical positions, benefiting from Jamia's overall central-university reputation for further-study and government-sector pathways." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within Jamia's dental clinical facilities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a central university with a small BDS intake, Jamia's NEET cutoff has historically been competitive given strong demand for its subsidised fees. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Jamia admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per central government policy\n- Central government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the university" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Jamia Millia Islamia is ranked #8 in NIRF 2024 Dental, and also ranks strongly across NIRF's Overall University, Engineering, and other categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Jamia provides on-campus hostel accommodation for students as part of its large central-university campus. Student life includes access to Jamia's broader academic and cultural events." },
  ],
};

const soaDental: CollegeContentPack = {
  slug: "siksha-o-anusandhan-dental",
  college: {
    estd: 2007,
    website: "https://www.soa.ac.in",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Deemed University (SOA)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "SOA Institute of Dental Sciences Bhubaneswar — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Siksha 'O' Anusandhan Institute of Dental Sciences NIRF #9 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "Institute of Dental Sciences, part of Siksha 'O' Anusandhan (SOA), a deemed university in Bhubaneswar, Odisha, benefits from SOA's large integrated health-sciences campus, which also includes SOA's medical college and engineering school. It is ranked #9 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "5", feesLabel: "₹24.0 L total (indicative)" },
    { name: "MDS — Oral Pathology & Microbiology", duration: "3 years", seats: "3", feesLabel: "₹24.0 L total (indicative)" },
  ],
  highlights: [
    "Part of SOA's large integrated health-sciences campus in Bhubaneswar",
    "Access to SOA's medical college and broader multi-disciplinary infrastructure",
    "Ranked #9 in NIRF 2024 Dental",
    "Deemed-university curriculum flexibility",
  ],
  faqs: [
    { question: "Is SOA's dental college linked to its medical college?", answer: "Yes — both operate under Siksha 'O' Anusandhan, a deemed university, on an integrated campus in Bhubaneswar, giving dental students access to shared clinical and research infrastructure." },
    { question: "How is admission to SOA dental done?", answer: "Admission is via NEET-UG score; SOA, as a deemed university, conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About SOA Institute of Dental Sciences", body: "Institute of Dental Sciences operates under Siksha 'O' Anusandhan (SOA), a deemed university in Bhubaneswar, Odisha, that has grown rapidly since being granted deemed-university status in 2007. The institute runs BDS and MDS programmes across major dental specialities, benefiting from SOA's large integrated health-sciences campus, which also houses SOA's medical college (IMS and SUM Hospital).\n\nSOA has invested significantly in research infrastructure across its health-sciences and engineering schools, which has helped drive its NIRF rankings across multiple categories including Dental." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The SOA campus in Bhubaneswar integrates dental, medical, nursing, and engineering schools, giving dental students access to a broad multi-disciplinary research and clinical ecosystem, including proximity to SUM Hospital for cross-specialty exposure where relevant." },
    { tab: "info", heading: "Why Choose SOA Dental", body: "- Access to SOA's large integrated health-sciences campus\n- Ranked #9 nationally in NIRF 2024 Dental\n- Deemed-university flexibility in curriculum design\n- Growing research output across SOA's multiple schools" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 5 | ₹24.0 L (indicative) |\n| MDS — Oral Pathology & Microbiology | 3 years | 3 | ₹24.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with SOA admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, SOA sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. SOA conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "SOA dental graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, aided by SOA's growing regional reputation in eastern India." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the institute's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, SOA's NEET cutoff has historically been moderately competitive, reflecting growing demand across eastern India. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with SOA admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Siksha 'O' Anusandhan (Dental) is ranked #9 in NIRF 2024 Dental, and SOA also ranks strongly across NIRF's Engineering, Medical, and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "SOA provides on-campus hostel accommodation for men and women in Bhubaneswar, with mess facilities. Student life includes technical events, clinical case competitions, and access to SOA's broader multi-disciplinary campus culture." },
  ],
};

const sriRamachandraDental: CollegeContentPack = {
  slug: "sri-ramachandra-institute-of-higher-education-and-research-dental",
  college: {
    estd: 1985,
    website: "https://sriramachandra.edu.in",
    feesNum: 1700000,
    feesLabel: "₹17.0 L",
    affiliation: "Deemed University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Sri Ramachandra Dental College Chennai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Sri Ramachandra Dental College and Hospital, Chennai NIRF #10 Dental: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Sri Ramachandra Dental College and Hospital, established in 1985 at Porur, Chennai, is part of Sri Ramachandra Institute of Higher Education and Research, a well-regarded deemed university with a strong medical and health-sciences reputation across South India. It is ranked #10 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹17.0 L total" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "5", feesLabel: "₹27.0 L total (indicative)" },
    { name: "MDS — Periodontics", duration: "3 years", seats: "4", feesLabel: "₹27.0 L total (indicative)" },
  ],
  highlights: [
    "Established 1985, nearly four decades of dental education history",
    "Part of Sri Ramachandra Institute of Higher Education and Research, a well-regarded South Indian medical deemed university",
    "Ranked #10 in NIRF 2024 Dental",
    "Strong cross-specialty exposure via the affiliated Sri Ramachandra medical hospital",
  ],
  faqs: [
    { question: "Is Sri Ramachandra Dental College linked to its medical hospital?", answer: "Yes — both operate under Sri Ramachandra Institute of Higher Education and Research at the Porur campus in Chennai, giving dental students access to the broader hospital's cross-specialty clinical resources." },
    { question: "How is admission to Sri Ramachandra Dental done?", answer: "Admission is via NEET-UG score; as a deemed university, Sri Ramachandra conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Sri Ramachandra Dental College", body: "Sri Ramachandra Dental College and Hospital was established in 1985 at Porur, Chennai, as part of Sri Ramachandra Institute of Higher Education and Research, a deemed university with a well-regarded medical and health-sciences reputation across South India. The dental college runs BDS and MDS programmes across major dental specialities.\n\nWith nearly four decades of continuous operation, Sri Ramachandra Dental College has built a strong regional reputation, benefiting from its integration with the broader Sri Ramachandra medical hospital ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Porur campus houses a dedicated dental hospital alongside Sri Ramachandra's broader medical hospital network, giving dental students access to cross-specialty clinical exposure — for example in oral-maxillofacial trauma or oncology cases referred from the medical side." },
    { tab: "info", heading: "Why Choose Sri Ramachandra Dental", body: "- Nearly four decades of dental education history\n- Ranked #10 nationally in NIRF 2024 Dental\n- Cross-specialty clinical exposure via the affiliated medical hospital\n- Strong South Indian regional reputation" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹17.0 L |\n| MDS — Prosthodontics | 3 years | 5 | ₹27.0 L (indicative) |\n| MDS — Periodontics | 3 years | 4 | ₹27.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with Sri Ramachandra admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Sri Ramachandra sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Sri Ramachandra conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, aided by the institute's strong South Indian alumni network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within Sri Ramachandra's dental hospital and, where relevant, its broader medical hospital network — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, Sri Ramachandra's NEET cutoff has historically been moderately competitive, reflecting the institute's strong regional reputation. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Sri Ramachandra admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Sri Ramachandra Institute of Higher Education and Research is ranked #10 in NIRF 2024 Dental, and also ranks strongly across NIRF's Medical and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Sri Ramachandra provides on-campus hostel accommodation for men and women at the Porur campus, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader medical-campus culture." },
  ],
};

const manipalMangalore: CollegeContentPack = {
  slug: "manipal-college-of-dental-sciences-mangalore",
  college: {
    estd: 1994,
    website: "https://manipal.edu/mcods-mangalore.html",
    feesNum: 1700000,
    feesLabel: "₹17.0 L",
    affiliation: "Deemed University (MAHE)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Manipal College of Dental Sciences, Mangalore — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "MCODS Mangalore NIRF #11 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel and scholarship details.",
    about:
      "Manipal College of Dental Sciences, Mangalore, established in 1994 as a second campus under Manipal Academy of Higher Education (MAHE), extends the Manipal dental education legacy to coastal Karnataka's port city. It is ranked #11 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹17.0 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "4", feesLabel: "₹27.0 L total (indicative)" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "4", feesLabel: "₹27.0 L total (indicative)" },
  ],
  highlights: [
    "Second MCODS campus, established 1994 under MAHE in Mangalore",
    "Extends the Manipal dental education legacy to coastal Karnataka's port city",
    "Ranked #11 in NIRF 2024 Dental",
    "Access to MAHE's broader multi-disciplinary academic ecosystem",
  ],
  faqs: [
    { question: "How does MCODS Mangalore differ from MCODS Manipal?", answer: "Both are separate campuses under Manipal Academy of Higher Education (MAHE) — MCODS Manipal (established 1957) is the older founding campus, while MCODS Mangalore (established 1994) is a second campus extending MAHE's dental education to the port city of Mangalore." },
    { question: "How is admission to MCODS Mangalore done?", answer: "Admission is via NEET-UG score; as part of MAHE, a deemed university, MCODS Mangalore conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About MCODS Mangalore", body: "Manipal College of Dental Sciences, Mangalore was established in 1994 as a second campus under Manipal Academy of Higher Education (MAHE), extending the Manipal dental education legacy — founded originally in 1957 at Manipal — to the coastal Karnataka port city of Mangalore. The college runs BDS and MDS programmes across major dental specialities.\n\nMCODS Mangalore benefits from MAHE's shared academic standards, faculty recruitment practices, and administrative framework, while operating as a distinct campus with its own dental hospital." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Mangalore campus houses a dedicated dental hospital with facilities across all major specialities, located in Mangalore's broader healthcare and educational ecosystem alongside other coastal Karnataka medical institutions." },
    { tab: "info", heading: "Why Choose MCODS Mangalore", body: "- Part of the well-established Manipal (MAHE) dental education legacy\n- Ranked #11 nationally in NIRF 2024 Dental\n- Located in Mangalore's dense healthcare and educational ecosystem\n- Access to MAHE's broader multi-disciplinary academic resources" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹17.0 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 4 | ₹27.0 L (indicative) |\n| MDS — Orthodontics | 3 years | 4 | ₹27.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with MAHE admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As part of MAHE, a deemed university, MCODS Mangalore sets its own fee structure. Fees are typically payable per year through MAHE's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. MAHE conducts its own centralised counselling for MCODS Mangalore's BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "MCODS Mangalore graduates commonly pursue MDS specialisation (including at MAHE's own campuses), private practice across Karnataka and Kerala, corporate dental chain roles, government dental officer positions, or licensing pathways abroad." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within MCODS Mangalore's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, MCODS Mangalore's NEET cutoff has historically been moderately competitive, benefiting from the Manipal brand's strong regional demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with MAHE admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- MAHE's education-loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Manipal College of Dental Sciences, Mangalore is ranked #11 in NIRF 2024 Dental, and MAHE as a whole ranks highly across NIRF's Medical, Overall University, and other categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "MAHE provides on-campus hostel accommodation for men and women at the Mangalore campus, with mess facilities. Student life includes technical events, clinical case competitions, and access to MAHE's broader academic culture." },
  ],
};

const jssDental: CollegeContentPack = {
  slug: "jss-dental-college-and-hospital",
  college: {
    estd: 1984,
    website: "https://jssuni.edu.in",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Deemed University (JSS)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "JSS Dental College and Hospital Mysuru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "JSS Dental College and Hospital, Mysuru NIRF #12 Dental: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "JSS Dental College and Hospital, established in 1984 in Mysuru, Karnataka, is part of JSS Academy of Higher Education and Research, a well-regarded deemed university under the JSS Mahavidyapeetha trust with a strong reputation across medical and pharmacy education in South India. It is ranked #12 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "5", feesLabel: "₹24.0 L total (indicative)" },
    { name: "MDS — Pedodontics & Preventive Dentistry", duration: "3 years", seats: "3", feesLabel: "₹24.0 L total (indicative)" },
  ],
  highlights: [
    "Established 1984, four decades of dental education history",
    "Part of JSS Academy of Higher Education and Research under the JSS Mahavidyapeetha trust",
    "Ranked #12 in NIRF 2024 Dental",
    "Strong reputation across South India's medical and pharmacy education network",
  ],
  faqs: [
    { question: "Is JSS Dental College linked to JSS's pharmacy and medical colleges?", answer: "Yes — JSS Dental College operates under JSS Academy of Higher Education and Research, part of the broader JSS Mahavidyapeetha trust that also runs well-regarded medical and pharmacy institutions across South India." },
    { question: "How is admission to JSS Dental done?", answer: "Admission is via NEET-UG score; as a deemed university, JSS conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About JSS Dental College", body: "JSS Dental College and Hospital was established in 1984 in Mysuru, Karnataka, as part of JSS Academy of Higher Education and Research, a deemed university under the JSS Mahavidyapeetha trust. The trust also runs well-regarded medical and pharmacy institutions across South India, giving JSS Dental College a strong institutional pedigree.\n\nWith four decades of continuous operation, JSS Dental College has built a solid academic and clinical reputation, particularly known for its pharmacy-adjacent research strength given the trust's broader health-sciences focus." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The JSS campus in Mysuru houses a dedicated dental hospital alongside the broader JSS medical and pharmacy institutions, giving dental students access to a wider health-sciences research ecosystem." },
    { tab: "info", heading: "Why Choose JSS Dental", body: "- Four decades of dental education history under a well-regarded South Indian trust\n- Ranked #12 nationally in NIRF 2024 Dental\n- Access to JSS's broader medical and pharmacy research ecosystem\n- Strong regional academic reputation" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 5 | ₹24.0 L (indicative) |\n| MDS — Pedodontics & Preventive Dentistry | 3 years | 3 | ₹24.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with JSS admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, JSS sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. JSS conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "JSS Dental graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, aided by the JSS trust's broader South Indian professional network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within JSS Dental College's own hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, JSS Dental's NEET cutoff has historically been moderately competitive. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with JSS admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "JSS Dental College and Hospital is ranked #12 in NIRF 2024 Dental, and JSS Academy of Higher Education and Research also ranks strongly across NIRF's Pharmacy, Medical, and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "JSS provides on-campus hostel accommodation for men and women in Mysuru, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader JSS multi-disciplinary campus culture." },
  ],
};

const meenakshiDental: CollegeContentPack = {
  slug: "meenakshi-academy-of-higher-education-and-research-dental",
  college: {
    estd: 1985,
    website: "https://maher.ac.in",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Deemed University (MAHER)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Meenakshi Ammal Dental College Chennai — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Meenakshi Academy of Higher Education and Research Dental NIRF #13: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Meenakshi Ammal Dental College, founded in the mid-1980s in Chennai and now part of Meenakshi Academy of Higher Education and Research (MAHER), a deemed university, has built a long-standing reputation within Tamil Nadu's dense private dental education ecosystem. It is ranked #13 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "4", feesLabel: "₹24.0 L total (indicative)" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "4", feesLabel: "₹24.0 L total (indicative)" },
  ],
  highlights: [
    "Long-standing dental college founded in the mid-1980s in Chennai",
    "Part of Meenakshi Academy of Higher Education and Research (MAHER), a deemed university",
    "Ranked #13 in NIRF 2024 Dental",
    "Established presence within Tamil Nadu's dense private dental education ecosystem",
  ],
  faqs: [
    { question: "What is MAHER?", answer: "Meenakshi Academy of Higher Education and Research (MAHER) is the deemed university umbrella that includes Meenakshi Ammal Dental College along with medical, engineering, and other professional schools in Chennai." },
    { question: "How is admission to Meenakshi Dental done?", answer: "Admission is via NEET-UG score; as a deemed university, MAHER conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Meenakshi Ammal Dental College", body: "Meenakshi Ammal Dental College was founded in the mid-1980s in Chennai, Tamil Nadu, and now operates under Meenakshi Academy of Higher Education and Research (MAHER), a deemed university with a broader multi-disciplinary academic portfolio including medical and engineering schools.\n\nThe college has built a long-standing regional reputation within Tamil Nadu's dense private dental education ecosystem, running BDS and MDS programmes across major dental specialities." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The MAHER campus in Chennai houses a dedicated dental hospital with facilities across major specialities, alongside academic blocks shared with the university's broader multi-disciplinary schools." },
    { tab: "info", heading: "Why Choose Meenakshi Dental", body: "- Long-standing dental education history since the mid-1980s\n- Ranked #13 nationally in NIRF 2024 Dental\n- Part of MAHER's broader multi-disciplinary academic ecosystem\n- Established presence within Tamil Nadu's competitive private dental landscape" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Orthodontics | 3 years | 4 | ₹24.0 L (indicative) |\n| MDS — Prosthodontics | 3 years | 4 | ₹24.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with MAHER admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, MAHER sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. MAHER conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the college's long-standing Chennai alumni network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, Meenakshi Dental's NEET cutoff has historically been moderately competitive, reflecting its established regional reputation. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with MAHER admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Meenakshi Academy of Higher Education and Research (Dental) is ranked #13 in NIRF 2024 Dental, and MAHER also ranks in NIRF's Medical and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "MAHER provides on-campus hostel accommodation for men and women in Chennai, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader MAHER multi-disciplinary campus culture." },
  ],
};

const amritaDental: CollegeContentPack = {
  slug: "amrita-vishwa-vidyapeetham-dental",
  college: {
    estd: 2002,
    website: "https://www.amrita.edu",
    feesNum: 1700000,
    feesLabel: "₹17.0 L",
    affiliation: "Deemed University (Amrita)",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Amrita School of Dentistry Kochi — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Amrita Vishwa Vidyapeetham School of Dentistry, Kochi NIRF #14 Dental: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Amrita School of Dentistry, part of Amrita Vishwa Vidyapeetham, a multi-campus deemed university, operates from Kochi, Kerala, benefiting from Amrita's strong overall academic reputation, substantial research investment, and shared multi-disciplinary campus ecosystem alongside Amrita's medical and engineering schools. It is ranked #14 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹17.0 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "4", feesLabel: "₹27.0 L total (indicative)" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "4", feesLabel: "₹27.0 L total (indicative)" },
  ],
  highlights: [
    "Part of Amrita Vishwa Vidyapeetham, a multi-campus deemed university with strong overall NIRF standing",
    "Located in Kochi, Kerala, alongside Amrita's medical school",
    "Ranked #14 in NIRF 2024 Dental",
    "Substantial research investment across Amrita's broader academic portfolio",
  ],
  faqs: [
    { question: "Is Amrita School of Dentistry linked to Amrita's engineering campuses?", answer: "Amrita School of Dentistry operates from Amrita's Kochi campus, distinct from Amrita's engineering-focused campuses (like Coimbatore), but shares the Amrita Vishwa Vidyapeetham deemed-university administrative and academic framework." },
    { question: "How is admission to Amrita School of Dentistry done?", answer: "Admission is via NEET-UG score; as a deemed university, Amrita conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Amrita School of Dentistry", body: "Amrita School of Dentistry operates from Amrita Vishwa Vidyapeetham's Kochi, Kerala campus, part of a larger multi-campus deemed university with a strong overall NIRF standing across engineering, medical, and other categories. The dental school runs BDS and MDS programmes across major dental specialities.\n\nAmrita's substantial institutional investment in research infrastructure across its schools has helped its dental programme build a strong academic reputation relatively quickly, alongside the university's broader multi-disciplinary ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Kochi campus houses a dedicated dental hospital alongside Amrita's medical school (Amrita Institute of Medical Sciences), giving dental students access to cross-specialty clinical exposure and shared research infrastructure." },
    { tab: "info", heading: "Why Choose Amrita School of Dentistry", body: "- Part of a strong overall multi-campus deemed university with high NIRF standing\n- Ranked #14 nationally in NIRF 2024 Dental\n- Cross-specialty exposure via the affiliated Amrita medical hospital\n- Substantial research investment across Amrita's broader academic portfolio" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹17.0 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 4 | ₹27.0 L (indicative) |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 4 | ₹27.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with Amrita admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, Amrita sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Amrita conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Amrita dental graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from Amrita's strong overall brand recognition." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within Amrita's dental hospital and, where relevant, its broader medical hospital network — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, Amrita's NEET cutoff has historically been moderately competitive, benefiting from the university's strong overall brand demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Amrita admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Amrita Vishwa Vidyapeetham (Dental) is ranked #14 in NIRF 2024 Dental, and Amrita also ranks strongly across NIRF's Engineering, Medical, and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "Amrita provides on-campus hostel accommodation for men and women at the Kochi campus, with mess facilities. Student life includes technical events, clinical case competitions, and access to Amrita's broader multi-campus culture." },
  ],
};

const govtDentalNagpur: CollegeContentPack = {
  slug: "government-dental-college-nagpur",
  college: {
    estd: 1968,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Maharashtra University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Government Dental College Nagpur — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Government Dental College, Nagpur NIRF #15 Dental: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Government Dental College, Nagpur, established in 1968, is one of Maharashtra's established government dental institutions, affiliated with Maharashtra University of Health Sciences. It combines heavily subsidised fees with a strong regional clinical training reputation, ranked #15 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Conservative Dentistry & Endodontics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Established 1968, one of Maharashtra's established government dental colleges",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #15 in NIRF 2024 Dental",
    "Affiliated with Maharashtra University of Health Sciences",
  ],
  faqs: [
    { question: "How is admission to Government Dental College Nagpur done?", answer: "Admission is via NEET-UG score through Maharashtra state-quota counselling for Maharashtra-domicile candidates and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
    { question: "Is Government Dental College Nagpur a good option?", answer: "As Maharashtra's second-highest-ranked government dental college behind Mumbai's government dental colleges, it offers heavily subsidised fees combined with a strong regional clinical training reputation for NEET aspirants targeting government seats." },
  ],
  sections: [
    { tab: "info", heading: "About Government Dental College, Nagpur", body: "Government Dental College, Nagpur was established in 1968 and is affiliated with Maharashtra University of Health Sciences. It runs BDS and MDS programmes across major dental specialities, serving as one of Maharashtra's established government dental training institutions outside Mumbai.\n\nAs a government institute, the college combines heavily subsidised fees with a strong clinical training reputation, drawing highly competitive NEET-UG applicants for its limited seats." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from a dedicated campus in Nagpur, Maharashtra, with a full-service dental hospital covering major specialities. As a government institution serving a large public patient base, students receive substantial hands-on clinical exposure." },
    { tab: "info", heading: "Why Choose Government Dental College Nagpur", body: "- Established government dental college with over five decades of history\n- Government fee structure, among the lowest of any top-tier dental institute\n- Ranked #15 nationally in NIRF 2024 Dental\n- Strong regional reputation across central Maharashtra" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Conservative Dentistry & Endodontics | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Maharashtra state government norms and are payable per year through the college's designated channels. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Maharashtra state-quota counselling for Maharashtra-domicile candidates and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Maharashtra domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Maharashtra's public health system, private practice, or hospital-affiliated clinical positions. The government-institute pedigree carries particular weight for public-sector dental career paths." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital, serving a large public patient base — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a well-regarded government dental college, closing ranks for the Maharashtra state quota and AIQ have historically required scores above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/Maharashtra counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per Maharashtra government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Government Dental College, Nagpur is ranked #15 in NIRF 2024 Dental, a strong position among India's government dental colleges." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Nagpur under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events typical of a government dental institute." },
  ],
};

const msRamaiahDental: CollegeContentPack = {
  slug: "m-s-ramaiah-university-of-applied-sciences-dental",
  college: {
    estd: 2013,
    website: "https://msruas.ac.in",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Private University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "M.S. Ramaiah Dental College Bengaluru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "M.S. Ramaiah University of Applied Sciences Dental NIRF #16: BDS/MDS courses, fees, NEET admission, cutoff, hostel details.",
    about:
      "M.S. Ramaiah Dental College, part of M.S. Ramaiah University of Applied Sciences in Bengaluru, benefits from the broader Ramaiah group's long-standing reputation across engineering, medical, and management education in Karnataka. It is ranked #16 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Prosthodontics", duration: "3 years", seats: "4", feesLabel: "₹24.0 L total (indicative)" },
  ],
  highlights: [
    "Part of the well-established Ramaiah group's Bengaluru education ecosystem",
    "Ranked #16 in NIRF 2024 Dental",
    "Access to Bengaluru's broader healthcare and technology industry base",
    "Strong regional Karnataka reputation across the Ramaiah institution network",
  ],
  faqs: [
    { question: "Is M.S. Ramaiah Dental College part of the same group as Ramaiah engineering/medical colleges?", answer: "Yes — M.S. Ramaiah Dental College operates under M.S. Ramaiah University of Applied Sciences, part of the broader Gokula Education Foundation/Ramaiah group that also runs well-regarded engineering and medical institutions in Bengaluru." },
    { question: "How is admission to M.S. Ramaiah Dental done?", answer: "Admission is via NEET-UG score through the institution's own centralised counselling process for its BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About M.S. Ramaiah Dental College", body: "M.S. Ramaiah Dental College operates under M.S. Ramaiah University of Applied Sciences in Bengaluru, part of the broader Ramaiah group of institutions that includes well-regarded engineering (M.S. Ramaiah Institute of Technology) and medical (M.S. Ramaiah Medical College) colleges across Karnataka. The dental college runs BDS and MDS programmes across major dental specialities.\n\nThe Ramaiah group's long institutional history and Bengaluru location give the dental college access to a strong regional healthcare and professional ecosystem." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Ramaiah campus in Bengaluru houses a dedicated dental hospital alongside the group's broader medical and engineering institutions, giving dental students access to a wider multi-disciplinary academic environment." },
    { tab: "info", heading: "Why Choose M.S. Ramaiah Dental", body: "- Part of the well-established Ramaiah group's Bengaluru education ecosystem\n- Ranked #16 nationally in NIRF 2024 Dental\n- Bengaluru location within India's largest technology and healthcare hub\n- Access to the broader Ramaiah multi-disciplinary academic network" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Prosthodontics | 3 years | 4 | ₹24.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with Ramaiah admissions." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a private university, M.S. Ramaiah sets its own fee structure. Fees are typically payable per year through the university's online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. M.S. Ramaiah conducts its own centralised counselling for BDS seats based on NEET-UG rank/score." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice in Bengaluru's competitive dental market, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the Ramaiah group's strong Karnataka professional network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a private-university management-quota-heavy intake, M.S. Ramaiah Dental's NEET cutoff has historically been moderately competitive, benefiting from the Ramaiah brand's strong Bengaluru demand. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with Ramaiah admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "M.S. Ramaiah University of Applied Sciences (Dental) is ranked #16 in NIRF 2024 Dental, and the broader Ramaiah group also ranks in NIRF's Engineering and Medical categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The Ramaiah campus provides on-campus hostel accommodation for men and women in Bengaluru, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader Ramaiah multi-disciplinary campus culture." },
  ],
};

const bhuDental: CollegeContentPack = {
  slug: "banaras-hindu-university-dental",
  college: {
    estd: 1950,
    website: "https://bhu.ac.in",
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Central University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "BHU Faculty of Dental Sciences Varanasi — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Banaras Hindu University Faculty of Dental Sciences NIRF #17: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Banaras Hindu University (BHU), one of India's largest and oldest central universities founded in 1916, runs its Faculty of Dental Sciences as part of the broader Institute of Medical Sciences in Varanasi, Uttar Pradesh. This gives dental students access to a century-old academic legacy and a large, multi-disciplinary medical university ecosystem, ranked #17 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "50", feesLabel: "₹1.5 L total" },
    { name: "MDS — Oral & Maxillofacial Surgery", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Faculty of Dental Sciences within BHU, one of India's largest and oldest central universities (founded 1916)",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #17 in NIRF 2024 Dental",
    "Access to BHU's large Institute of Medical Sciences hospital ecosystem",
  ],
  faqs: [
    { question: "Is BHU's dental faculty part of its medical college?", answer: "Yes — the Faculty of Dental Sciences operates within BHU's Institute of Medical Sciences, giving dental students access to the university's broader hospital and academic infrastructure in Varanasi." },
    { question: "How is admission to BHU dental done?", answer: "Admission is via NEET-UG score through BHU's own centralised counselling process for its central-university BDS seats, alongside participation in the MCC All India Quota process." },
  ],
  sections: [
    { tab: "info", heading: "About BHU Faculty of Dental Sciences", body: "Banaras Hindu University was founded in 1916 by Pandit Madan Mohan Malaviya and is one of India's largest and oldest central universities, located in Varanasi, Uttar Pradesh. Its Faculty of Dental Sciences operates within BHU's Institute of Medical Sciences, offering BDS and MDS programmes across major dental specialities.\n\nBeing part of a century-old, multi-disciplinary central university gives BHU dental students access to a broad academic and clinical ecosystem, alongside the historic and cultural significance of studying in Varanasi." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "BHU's Varanasi campus is one of India's largest university campuses, with the Institute of Medical Sciences housing dedicated dental hospital facilities alongside the university's broader medical hospital network, giving dental students substantial patient volume and cross-specialty exposure." },
    { tab: "info", heading: "Why Choose BHU Dental", body: "- Faculty of Dentistry within one of India's largest and oldest central universities\n- Government fee structure at among the lowest cost of any top-ranked dental institute\n- Cross-specialty clinical exposure through BHU's broader hospital network\n- Ranked #17 nationally in NIRF 2024 Dental" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 50 | ₹1.5 L |\n| MDS — Oral & Maxillofacial Surgery | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a central university, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees are payable per year through BHU's designated channels. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under central government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. BHU fills its central-university BDS seats through its own counselling process and participates in the MCC All India Quota process for a share of seats." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "BHU dental graduates commonly pursue MDS specialisation (aided by BHU's strong overall academic reputation), government dental officer roles, private practice, or hospital-affiliated clinical positions. The BHU name carries particular weight for public-sector and further-study pathways given the university's century-old legacy." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within BHU's dental hospital and, where relevant, its broader medical hospital network — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a highly-ranked central-university dental faculty, BHU's NEET cutoff is competitive — closing ranks have historically required scores well above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/BHU counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per central government policy\n- Central government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the university" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Banaras Hindu University is ranked #17 in NIRF 2024 Dental; the university as a whole also ranks strongly across NIRF's Medical, Overall University, and other categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "BHU provides on-campus hostel accommodation for dental students as part of its large university campus. Student life includes access to BHU's broader academic and cultural events, set against the historic and spiritual backdrop of Varanasi." },
  ],
};

const amuDental: CollegeContentPack = {
  slug: "aligarh-muslim-university-dental",
  college: {
    estd: 1920,
    website: "https://www.amu.ac.in",
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Central University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "AMU Dr. Ziauddin Ahmad Dental College — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Aligarh Muslim University Dental College NIRF #18: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Aligarh Muslim University's dental college, part of one of India's oldest central universities (founded 1920), operates within AMU's broader Faculty of Medicine (J.N. Medical College) ecosystem in Aligarh, Uttar Pradesh. It is ranked #18 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "40", feesLabel: "₹1.5 L total" },
  ],
  highlights: [
    "Part of Aligarh Muslim University, a central university founded in 1920",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #18 in NIRF 2024 Dental",
    "Access to AMU's broader J.N. Medical College hospital ecosystem",
  ],
  faqs: [
    { question: "Is AMU's dental college part of its medical college?", answer: "Yes — AMU's dental college operates within the broader Faculty of Medicine framework alongside J.N. Medical College, giving dental students access to AMU's wider hospital and academic infrastructure in Aligarh." },
    { question: "How is admission to AMU dental done?", answer: "Admission is via NEET-UG score through AMU's own centralised counselling process for its central-university BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About AMU Dental College", body: "Aligarh Muslim University was established in 1920, evolving from the Muhammadan Anglo-Oriental College founded in 1875. Its dental college operates within AMU's broader Faculty of Medicine, alongside J.N. Medical College, offering a BDS programme built on AMU's century-long institutional legacy and central-university funding.\n\nAs a central university, AMU's dental college benefits from heavily subsidised fees, among the lowest of any NIRF top-ranked dental institute." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "AMU's campus in Aligarh, Uttar Pradesh, includes the J.N. Medical College hospital complex, which houses dental clinical facilities supporting undergraduate training, giving students access to a broader medical hospital ecosystem." },
    { tab: "info", heading: "Why Choose AMU Dental", body: "- Central university with heavily subsidised government fees\n- Ranked #18 nationally in NIRF 2024 Dental\n- Access to AMU's broader J.N. Medical College hospital ecosystem\n- Backed by AMU's century-long overall institutional reputation" },
    { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 40 | ₹1.5 L |\n\nAs a central university, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees are payable per year through AMU's designated channels. Additional fee concessions apply for economically weaker and minority students under AMU's own policy framework." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. AMU conducts its own centralised counselling for its BDS seats based on NEET-UG rank/score, given its central-university status." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "AMU dental graduates commonly pursue MDS specialisation, government dental officer roles, private practice, or hospital-affiliated clinical positions, benefiting from AMU's century-long alumni network across North India and beyond." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within AMU's dental clinical facilities and broader J.N. Medical College hospital network — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a central university with a small BDS intake, AMU's NEET cutoff has historically been competitive given strong demand for its subsidised fees. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with AMU admissions." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for economically weaker and minority students per AMU policy\n- Central government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the university" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Aligarh Muslim University is ranked #18 in NIRF 2024 Dental, and also ranks strongly across NIRF's Engineering, Medical, and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "AMU provides on-campus hostel accommodation for dental students as part of its large, self-contained residential university campus. Student life includes access to AMU's century-old traditions and broader academic and cultural events." },
  ],
};

const govtDentalBangalore: CollegeContentPack = {
  slug: "government-dental-college-bangalore",
  college: {
    estd: 1957,
    feesNum: 150000,
    feesLabel: "₹1.5 L",
    affiliation: "Government, Rajiv Gandhi University of Health Sciences",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Government Dental College Bengaluru — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Government Dental College, Bengaluru NIRF #19 Dental: BDS/MDS courses, low government fees, NEET admission, cutoff details.",
    about:
      "Government Dental College, Bengaluru, established in 1957, is one of Karnataka's oldest and most respected government dental institutions, affiliated with Rajiv Gandhi University of Health Sciences. It combines heavily subsidised fees with a strong clinical training reputation, ranked #19 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "60", feesLabel: "₹1.5 L total" },
    { name: "MDS — Orthodontics", duration: "3 years", seats: "3", feesLabel: "₹1.5 L total (indicative)" },
  ],
  highlights: [
    "Established 1957, one of Karnataka's oldest government dental colleges",
    "Government fee structure, among the lowest of any top-ranked dental institute",
    "Ranked #19 in NIRF 2024 Dental",
    "Located in Bengaluru with strong regional healthcare ecosystem access",
  ],
  faqs: [
    { question: "How is admission to Government Dental College Bengaluru done?", answer: "Admission is via NEET-UG score through Karnataka state-quota counselling (KEA) for Karnataka-domicile candidates and the MCC All India Quota process for the AIQ share, following the standard government dental college admission route." },
    { question: "Is Government Dental College Bengaluru a good option?", answer: "As one of Karnataka's oldest and highest-ranked government dental colleges, it offers heavily subsidised fees combined with a strong clinical training reputation for NEET aspirants targeting government seats." },
  ],
  sections: [
    { tab: "info", heading: "About Government Dental College, Bengaluru", body: "Government Dental College, Bengaluru was established in 1957 and is affiliated with Rajiv Gandhi University of Health Sciences, Karnataka's state health-sciences university. It runs BDS and MDS programmes across major dental specialities, serving as one of Karnataka's oldest and most established government dental training institutions.\n\nAs a government institute, the college combines heavily subsidised fees with a strong clinical training reputation built over nearly seven decades, drawing highly competitive NEET-UG applicants for its limited seats." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The college operates from a dedicated campus in Bengaluru with a full-service dental hospital covering major specialities. As a government institution serving a large public patient base in one of India's biggest cities, students receive substantial hands-on clinical exposure." },
    { tab: "info", heading: "Why Choose Government Dental College Bengaluru", body: "- Nearly seven decades of dental education history\n- Government fee structure, among the lowest of any top-tier dental institute\n- Ranked #19 nationally in NIRF 2024 Dental\n- Strong regional reputation and Bengaluru healthcare ecosystem access" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 60 | ₹1.5 L |\n| MDS — Orthodontics | 3 years | 3 | ₹1.5 L (indicative) |\n\nAs a government institute, fees are heavily subsidised and among the lowest of any top-ranked dental college in India." },
    { tab: "courses-fees", heading: "Fee Payment & Concessions", body: "Fees follow Karnataka state government norms and are payable per year through the college's designated channels. Additional fee concessions apply for SC/ST/OBC/EWS-eligible students under state government policy." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The college fills seats through Karnataka Examinations Authority (KEA) state-quota counselling for Karnataka-domicile candidates and the MCC All India Quota process for the AIQ share." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Karnataka domicile certificate (for state-quota seats)\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category/domicile certificate, photo ID" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), government dental officer roles in Karnataka's public health system, private practice in Bengaluru's competitive dental market, or hospital-affiliated clinical positions. The government-institute pedigree carries particular weight for public-sector dental career paths." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital, serving a large public patient base — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As one of Karnataka's highest-ranked government dental colleges, closing ranks for the state quota and AIQ have historically required scores well above the median BDS-qualifying cutoff. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures on the MCC/KEA counselling portals." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Fee concessions for SC/ST/OBC/EWS-eligible students per Karnataka government policy\n- Central and state government post-matric scholarship schemes for eligible students\n- Merit scholarships for top academic performers\n- Need-based financial assistance through the college" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Government Dental College, Bengaluru is ranked #19 in NIRF 2024 Dental, one of the highest positions of any government dental college in India." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides on-campus hostel accommodation for students, particularly those from outside Bengaluru under the AIQ quota. Student life includes dental-specific clinical case competitions and academic events typical of a government dental institute." },
  ],
};

const drMgrDental: CollegeContentPack = {
  slug: "dr-m-g-r-educational-and-research-institute-dental",
  college: {
    estd: 1988,
    website: "https://www.drmgrdu.ac.in",
    feesNum: 1600000,
    feesLabel: "₹16.0 L",
    affiliation: "Deemed University",
    approvedBy: "Dental Council of India / National Dental Commission",
    metaTitle: "Dr. MGR Educational and Research Institute Dental — BDS Fees, Admission, NEET Cutoff 2026",
    metaDescription: "Dr. M.G.R. Educational and Research Institute Dental College, Chennai NIRF #20: BDS/MDS courses, fees, NEET admission, cutoff details.",
    about:
      "Dr. M.G.R. Educational and Research Institute's dental college, established in 1988 in Chennai and named after former Tamil Nadu Chief Minister M.G. Ramachandran, is part of a deemed university with a broad multi-disciplinary academic portfolio spanning engineering, medical, and dental education. It is ranked #20 in NIRF 2024 Dental.",
  },
  courses: [
    { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹16.0 L total" },
    { name: "MDS — Public Health Dentistry", duration: "3 years", seats: "3", feesLabel: "₹22.0 L total (indicative)" },
  ],
  highlights: [
    "Established 1988, named after former Tamil Nadu Chief Minister M.G. Ramachandran",
    "Part of a broad multi-disciplinary deemed university spanning engineering and medical education",
    "Ranked #20 in NIRF 2024 Dental",
    "Established presence within Chennai's competitive private dental education landscape",
  ],
  faqs: [
    { question: "What does 'Dr. MGR' refer to?", answer: "The institute is named after M.G. Ramachandran, a former Chief Minister of Tamil Nadu and popular film actor, reflecting the naming convention common among several Tamil Nadu private educational institutions." },
    { question: "How is admission to Dr. MGR Dental done?", answer: "Admission is via NEET-UG score; as a deemed university, Dr. MGR Educational and Research Institute conducts its own centralised counselling based on NEET rank for BDS seats." },
  ],
  sections: [
    { tab: "info", heading: "About Dr. MGR Educational and Research Institute Dental College", body: "Dr. M.G.R. Educational and Research Institute's dental college was established in 1988 in Chennai, Tamil Nadu, named after former Chief Minister M.G. Ramachandran. The broader institute operates as a deemed university with a multi-disciplinary portfolio spanning engineering, medical, dental, and allied health-sciences education.\n\nThe dental college runs BDS and MDS programmes across major dental specialities, benefiting from the institute's broader academic infrastructure and established presence within Chennai's competitive private education landscape." },
    { tab: "info", heading: "Campus & Clinical Facilities", body: "The Chennai campus houses a dedicated dental hospital with facilities across major specialities, alongside the institute's broader multi-disciplinary academic blocks shared across its engineering and medical schools." },
    { tab: "info", heading: "Why Choose Dr. MGR Dental", body: "- Over three decades of dental education history\n- Ranked #20 nationally in NIRF 2024 Dental\n- Access to a broader multi-disciplinary deemed-university ecosystem\n- Established presence within Chennai's competitive private dental landscape" },
    { tab: "courses-fees", heading: "BDS & MDS Programmes", body: "| Programme | Duration | Seats (approx.) | Total Fees |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹16.0 L |\n| MDS — Public Health Dentistry | 3 years | 3 | ₹22.0 L (indicative) |\n\nFees are charged per year and vary by specialisation; confirm the current year's exact figures with the institute's admissions office." },
    { tab: "courses-fees", heading: "Fee Payment & Structure", body: "As a deemed university, the institute sets its own fee structure. Fees are typically payable per year through the online portal, with education-loan support available." },
    { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. The institute conducts its own centralised counselling for BDS seats based on NEET-UG rank/score, separate from state government or MCC All India Quota counselling used for government colleges." },
    { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank for the admission year, minimum qualifying percentile\n- Minimum age 17 years at the time of admission\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), passport photos" },
    { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation, private practice, corporate dental chain roles, government dental officer positions, or licensing pathways abroad, benefiting from the institute's established Chennai alumni network." },
    { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital across all specialities — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
    { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "As a deemed-university management-quota-heavy intake, the college's NEET cutoff has historically been moderately competitive. Exact cutoff ranks vary by counselling round and category; confirm current-year figures with the institute's admissions office." },
    { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Merit scholarships for top NEET rank-holders among admitted students\n- Continuing merit scholarships tied to academic performance\n- Need-based financial assistance assessed case by case\n- Education loan facilitation cell for bank loan processing" },
    { tab: "rankings", heading: "NIRF & Other Rankings", body: "Dr. M.G.R. Educational and Research Institute (Dental) is ranked #20 in NIRF 2024 Dental, and the broader institute also ranks in NIRF's Engineering and Overall University categories." },
    { tab: "hostel", heading: "Hostel & Campus Life", body: "The institute provides on-campus hostel accommodation for men and women in Chennai, with mess facilities. Student life includes technical events, clinical case competitions, and access to the broader multi-disciplinary campus culture." },
  ],
};

export const dentalBatch2: CollegeContentPack[] = [
  srmDental,
  jmiDental,
  soaDental,
  sriRamachandraDental,
  manipalMangalore,
  jssDental,
  meenakshiDental,
  amritaDental,
  govtDentalNagpur,
  msRamaiahDental,
  bhuDental,
  amuDental,
  govtDentalBangalore,
  drMgrDental,
];
