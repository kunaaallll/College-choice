import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 6, part 5 of 6
// (3 Punjab + 3 Haryana + 3 Telangana + 1 Andhra Pradesh private colleges).

function pbPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 800000,
      feesLabel: "₹8 L (indicative, total)",
      affiliation: "Private, Baba Farid University of Health Sciences",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Punjab: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with Baba Farid University of Health Sciences.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Baba Farid University of Health Sciences",
      "NEET-UG based admission through Punjab state counselling and management quota",
      "Structured clinical training with a regional Punjab patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Punjab state counselling for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with Baba Farid University of Health Sciences. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving a regional Punjab patient base and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with Baba Farid University of Health Sciences\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8 L |\n\nFees vary by quota (government/management/NRI) and are set per Punjab private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Punjab typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Punjab state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Punjab." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with Punjab state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Punjab state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

function hrPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 850000,
      feesLabel: "₹8.5 L (indicative, total)",
      affiliation: "Private, Pt. B.D. Sharma University of Health Sciences",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Haryana: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with Pt. B.D. Sharma University of Health Sciences.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8.5 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Pt. B.D. Sharma University of Health Sciences",
      "NEET-UG based admission through Haryana state counselling and management quota",
      "Structured clinical training with a regional Haryana patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Haryana state counselling for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with Pt. B.D. Sharma University of Health Sciences. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving a regional Haryana patient base and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with Pt. B.D. Sharma University of Health Sciences\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8.5 L |\n\nFees vary by quota (government/management/NRI) and are set per Haryana private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Haryana typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Haryana state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Haryana." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with Haryana state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Haryana state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

function tsPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 850000,
      feesLabel: "₹8.5 L (indicative, total)",
      affiliation: "Private, Kaloji Narayana Rao University of Health Sciences",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Telangana: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with Kaloji Narayana Rao University of Health Sciences.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8.5 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Kaloji Narayana Rao University of Health Sciences",
      "NEET-UG based admission through Telangana state counselling and management quota",
      "Structured clinical training with a regional Telangana patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Telangana state counselling for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with Kaloji Narayana Rao University of Health Sciences. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving a regional Telangana patient base and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with Kaloji Narayana Rao University of Health Sciences\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8.5 L |\n\nFees vary by quota (government/management/NRI) and are set per Telangana private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Telangana typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Telangana state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Telangana." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with Telangana state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Telangana state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

function apPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 850000,
      feesLabel: "₹8.5 L (indicative, total)",
      affiliation: "Private, Dr. NTR University of Health Sciences",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Andhra Pradesh: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with Dr. NTR University of Health Sciences.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8.5 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Dr. NTR University of Health Sciences",
      "NEET-UG based admission through Andhra Pradesh state counselling and management quota",
      "Structured clinical training with a regional Andhra Pradesh patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Andhra Pradesh state counselling for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with Dr. NTR University of Health Sciences. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving a regional Andhra Pradesh patient base and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with Dr. NTR University of Health Sciences\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8.5 L |\n\nFees vary by quota (government/management/NRI) and are set per Andhra Pradesh private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Andhra Pradesh typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Andhra Pradesh state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Andhra Pradesh." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with Andhra Pradesh state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Andhra Pradesh state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

export const dentalBatch21: CollegeContentPack[] = [
  pbPack({ slug: "baba-jaswant-singh-dental-college-hospital", name: "Baba Jaswant Singh Dental College Hospital", city: "Ludhiana", estd: 2004 }),
  pbPack({ slug: "dasmesh-institute-of-research-and-dental-sciences", name: "Dasmesh Institute of Research & Dental Sciences", city: "Faridkot", estd: 2007 }),
  pbPack({ slug: "guru-nanak-dev-dental-college-and-research", name: "Guru Nanak Dev Dental College & Research", city: "Sunam", estd: 2007 }),
  hrPack({ slug: "d-a-v-centenary-dental-college", name: "D.A.V. Centenary Dental College", city: "Yamuna Nagar", estd: 1985 }),
  hrPack({ slug: "pdm-dental-college-and-research-institute", name: "PDM Dental College & Research Institute", city: "Jhajjar", estd: 2007 }),
  hrPack({ slug: "swami-devi-dyal-hospital-and-dental-college", name: "Swami Devi Dyal Hospital & Dental College", city: "Panchkula", estd: 2005 }),
  tsPack({ slug: "malla-reddy-institute-of-dental-sciences", name: "Malla Reddy Institute of Dental Sciences", city: "Hyderabad", estd: 2001 }),
  tsPack({ slug: "mamata-institute-of-dental-sciences", name: "Mamata Institute of Dental Sciences", city: "Khammam", estd: 2005 }),
  tsPack({ slug: "tirumala-institute-of-dental-sciences-and-research", name: "Tirumala Institute of Dental Sciences & Research", city: "Hyderabad", estd: 2008 }),
  apPack({ slug: "sibar-institute-of-dental-sciences", name: "Sibar Institute of Dental Sciences", city: "Guntur", estd: 2001 }),
];
