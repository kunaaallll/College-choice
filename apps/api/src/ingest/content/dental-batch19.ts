import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 6, part 3 of 6
// (5 Maharashtra + 4 Rajasthan + 1 Madhya Pradesh private colleges).

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

function rjPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 800000,
      feesLabel: "₹8 L (indicative, total)",
      affiliation: "Private, Rajasthan University of Health Sciences",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Rajasthan: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with Rajasthan University of Health Sciences.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Rajasthan University of Health Sciences",
      "NEET-UG based admission through Rajasthan state counselling and management quota",
      "Structured clinical training with a Rajasthan patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Rajasthan state counselling for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with Rajasthan University of Health Sciences. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving a regional Rajasthan patient base and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with Rajasthan University of Health Sciences\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8 L |\n\nFees vary by quota (government/management/NRI) and are set per Rajasthan private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Rajasthan typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Rajasthan state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Rajasthan." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with Rajasthan state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Rajasthan state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

function mpPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 800000,
      feesLabel: "₹8 L (indicative, total)",
      affiliation: "Private, Madhya Pradesh Medical Science University",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Madhya Pradesh: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with Madhya Pradesh Medical Science University.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Madhya Pradesh Medical Science University",
      "NEET-UG based admission through Madhya Pradesh state counselling and management quota",
      "Structured clinical training with a Madhya Pradesh patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Madhya Pradesh state counselling for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with Madhya Pradesh Medical Science University. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving a regional Madhya Pradesh patient base and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with Madhya Pradesh Medical Science University\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8 L |\n\nFees vary by quota (government/management/NRI) and are set per Madhya Pradesh private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Madhya Pradesh typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Madhya Pradesh state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Madhya Pradesh." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with Madhya Pradesh state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Madhya Pradesh government policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

export const dentalBatch19: CollegeContentPack[] = [
  mhPack({ slug: "m-a-rangoonwala-college-of-dental-sciences", name: "M.A. Rangoonwala College of Dental Sciences", city: "Pune", estd: 2001 }),
  mhPack({ slug: "maharashtra-institute-of-dental-sciences-and-research", name: "Maharashtra Institute of Dental Sciences & Research", city: "Latur", estd: 2005 }),
  mhPack({ slug: "nanded-rural-dental-college-and-research-center", name: "Nanded Rural Dental College & Research Center", city: "Nanded", estd: 2010 }),
  mhPack({ slug: "padmashree-dr-d-y-patil-dental-college", name: "Padmashree Dr. D.Y. Patil Dental College", city: "Navi Mumbai", estd: 2001 }),
  mhPack({ slug: "s-m-b-t-dental-college-and-hospital", name: "S.M.B.T. Dental College & Hospital", city: "Amrutnagar", estd: 2008 }),
  rjPack({ slug: "dr-s-s-tantia-dental-college", name: "Dr. S. S. Tantia Dental College", city: "Sri Ganganagar", estd: 2007 }),
  rjPack({ slug: "jodhpur-dental-college-general-hospital", name: "Jodhpur Dental College General Hospital", city: "Jodhpur", estd: 2007 }),
  rjPack({ slug: "mahatma-gandhi-dental-college-and-hospital", name: "Mahatma Gandhi Dental College & Hospital", city: "Jaipur", estd: 2001 }),
  rjPack({ slug: "surendera-dental-college-and-research-institute", name: "Surendera Dental College & Research Institute", city: "Sri Ganganagar", estd: 2008 }),
  mpPack({ slug: "bhabha-college-of-dental-sciences", name: "Bhabha College of Dental Sciences", city: "Bhopal", estd: 2008 }),
];
