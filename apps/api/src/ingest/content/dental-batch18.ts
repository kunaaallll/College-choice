import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 6, part 2 of 6
// (2 Kerala + 5 Tamil Nadu + 3 Maharashtra private colleges).

function keralaPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 850000,
      feesLabel: "₹8.5 L (indicative, total)",
      affiliation: "Private, Kerala University of Health Sciences",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Kerala: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with Kerala University of Health Sciences.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8.5 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Kerala University of Health Sciences",
      "NEET-UG based admission through Kerala state counselling and management quota",
      "Structured clinical training with a Kerala patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Kerala state counselling for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with Kerala University of Health Sciences. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving the local Kerala patient population and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with Kerala University of Health Sciences\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8.5 L |\n\nFees vary by quota (government/management/NRI) and are set per Kerala private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Kerala typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Kerala state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Kerala." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with Kerala state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Kerala state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

function tnPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 900000,
      feesLabel: "₹9 L (indicative, total)",
      affiliation: "Private, The Tamil Nadu Dr. M.G.R. Medical University",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Tamil Nadu: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with The Tamil Nadu Dr. M.G.R. Medical University.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹9 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with The Tamil Nadu Dr. M.G.R. Medical University",
      "NEET-UG based admission through Tamil Nadu state counselling and management quota",
      "Structured clinical training with a Tamil Nadu patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Tamil Nadu state counselling (Directorate of Medical Education) for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with The Tamil Nadu Dr. M.G.R. Medical University. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving the local population and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with The Tamil Nadu Dr. M.G.R. Medical University\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹9 L |\n\nFees vary by quota (government/management/NRI) and are set per Tamil Nadu private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Tamil Nadu typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Tamil Nadu's Directorate of Medical Education state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Tamil Nadu." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with Tamil Nadu state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Tamil Nadu state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

function mhPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 850000,
      feesLabel: "₹8.5 L (indicative, total)",
      affiliation: "Private, Maharashtra University of Health Sciences",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Maharashtra: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with Maharashtra University of Health Sciences.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8.5 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Maharashtra University of Health Sciences",
      "NEET-UG based admission through Maharashtra state counselling and management quota",
      "Structured clinical training with a Maharashtra patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Maharashtra state counselling for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with Maharashtra University of Health Sciences. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving a regional Maharashtra patient base and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with Maharashtra University of Health Sciences\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8.5 L |\n\nFees vary by quota (government/management/NRI) and are set per Maharashtra private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Maharashtra typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Maharashtra state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Maharashtra." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with Maharashtra state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Maharashtra state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

export const dentalBatch18: CollegeContentPack[] = [
  keralaPack({ slug: "noorul-islam-college-of-dental-sciences", name: "Noorul Islam College of Dental Sciences", city: "Thiruvananthapuram", estd: 2007 }),
  keralaPack({ slug: "psm-college-of-dental-sciences-and-research", name: "PSM College of Dental Sciences & Research", city: "Thrissur", estd: 2000 }),
  tnPack({ slug: "best-dental-science-college", name: "Best Dental Science College", city: "Madurai", estd: 2007 }),
  tnPack({ slug: "dhanalakshmi-srinivasan-dental-college", name: "Dhanalakshmi Srinivasan Dental College", city: "Perambalur", estd: 2008 }),
  tnPack({ slug: "jkk-natrajah-dental-college-and-hospital", name: "JKK Natrajah Dental College & Hospital", city: "Komarapalayam", estd: 2008 }),
  tnPack({ slug: "k-s-r-institute-of-dental-science-and-research", name: "K.S.R. Institute of Dental Science & Research", city: "Tiruchengode", estd: 2008 }),
  tnPack({ slug: "r-v-s-dental-college-and-hospital", name: "R.V.S. Dental College & Hospital", city: "Sulur", estd: 2008 }),
  mhPack({ slug: "annasaheb-chudaman-patil-memorial-dental-college", name: "Annasaheb Chudaman Patil Memorial Dental College", city: "Dhule", estd: 2010 }),
  mhPack({ slug: "bharati-vidyapeeth-dental-college-and-hospital-sangli", name: "Bharati Vidyapeeth Dental College & Hospital, Sangli", city: "Sangli", estd: 2005 }),
  mhPack({ slug: "chatrapati-shahu-maharaj-dental-college", name: "Chatrapati Shahu Maharaj Dental College", city: "Aurangabad", estd: 2008 }),
];
