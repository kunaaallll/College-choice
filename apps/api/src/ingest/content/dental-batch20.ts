import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 6, part 4 of 6
// (3 Madhya Pradesh + 4 Uttar Pradesh + 3 Gujarat private colleges).

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

function upPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 800000,
      feesLabel: "₹8 L (indicative, total)",
      affiliation: "Private, King George's Medical University / State Medical University UP",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Uttar Pradesh: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution serving Uttar Pradesh's dental education demand.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Serves Uttar Pradesh's dental education demand",
      "NEET-UG based admission through UP state counselling and management quota",
      "Structured clinical training with a regional UP patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Uttar Pradesh state counselling for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city}. As a private dental institution, it runs a BDS programme across all core dental disciplines, serving Uttar Pradesh's dental education demand.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving a regional UP patient base and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Serves Uttar Pradesh's dental education demand\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8 L |\n\nFees vary by quota (government/management/NRI) and are set per Uttar Pradesh private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Uttar Pradesh typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Uttar Pradesh state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Uttar Pradesh." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with UP state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Uttar Pradesh state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

function gjPack(opts: { slug: string; name: string; city: string; estd: number }): CollegeContentPack {
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 850000,
      feesLabel: "₹8.5 L (indicative, total)",
      affiliation: "Private, Gujarat University",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}, Gujarat: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with Gujarat University.`,
    },
    courses: [{ name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8.5 L total (indicative)" }],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Gujarat University",
      "NEET-UG based admission through Gujarat state counselling and management quota",
      "Structured clinical training with a regional Gujarat patient base",
    ],
    faqs: [{ question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Gujarat state counselling for government-quota seats and the college's own management quota process." }],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with Gujarat University. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving a regional Gujarat patient base and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with Gujarat University\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: "| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | 100 | ₹8.5 L |\n\nFees vary by quota (government/management/NRI) and are set per Gujarat private dental college fee-regulation norms; confirm current-year figures directly with the college." },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Gujarat typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Gujarat state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation elsewhere (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Gujarat." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with Gujarat state counselling authorities or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Gujarat state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

export const dentalBatch20: CollegeContentPack[] = [
  mpPack({ slug: "hitkarini-dental-college-and-hospital", name: "Hitkarini Dental College & Hospital", city: "Jabalpur", estd: 2003 }),
  mpPack({ slug: "index-institute-of-dental-sciences", name: "Index Institute of Dental Sciences", city: "Indore", estd: 2007 }),
  mpPack({ slug: "maharana-pratap-college-of-dentistry", name: "Maharana Pratap College of Dentistry", city: "Gwalior", estd: 2007 }),
  upPack({ slug: "i-t-s-dental-college-hospital-and-research-centre", name: "I.T.S. Dental College, Hospital & Research Centre", city: "Greater Noida", estd: 2004 }),
  upPack({ slug: "kalka-dental-college", name: "Kalka Dental College", city: "Meerut", estd: 2007 }),
  upPack({ slug: "maharana-pratap-dental-college-and-hospital", name: "Maharana Pratap Dental College & Hospital", city: "Kanpur", estd: 2004 }),
  upPack({ slug: "sardar-patel-post-graduate-institute", name: "Sardar Patel Post Graduate Institute", city: "Lucknow", estd: 2003 }),
  gjPack({ slug: "faculty-of-dental-science-dharmsinh-desai-university", name: "Faculty of Dental Science, Dharmsinh Desai University", city: "Nadiad", estd: 2005 }),
  gjPack({ slug: "goenka-research-institute-of-dental-sciences", name: "Goenka Research Institute of Dental Sciences", city: "Gandhinagar", estd: 2008 }),
  gjPack({ slug: "narsinhbhai-patel-dental-college-and-hospital", name: "Narsinhbhai Patel Dental College & Hospital", city: "Visnagar", estd: 2007 }),
];
