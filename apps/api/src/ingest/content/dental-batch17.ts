import type { CollegeContentPack } from "./types";

// DCI long-tail dental colleges (beyond NIRF top-40) — batch 6, part 1 of 6
// (7 Karnataka + 3 Kerala private colleges).

function karnatakaPack(opts: {
  slug: string;
  name: string;
  city: string;
  estd: number;
  seats?: string;
  feesLabel?: string;
}): CollegeContentPack {
  const seats = opts.seats ?? "100";
  const feesLabel = opts.feesLabel ?? "₹8.5 L total (indicative)";
  return {
    slug: opts.slug,
    college: {
      estd: opts.estd,
      feesNum: 850000,
      feesLabel: "₹8.5 L (indicative, total)",
      affiliation: "Private, Rajiv Gandhi University of Health Sciences",
      approvedBy: "Dental Council of India / National Dental Commission",
      metaTitle: `${opts.name} — BDS Fees, Admission, NEET Cutoff 2026`,
      metaDescription: `${opts.name}, ${opts.city}: BDS courses, fees, NEET admission, cutoff, hostel details.`,
      about: `${opts.name}, established around ${opts.estd} in ${opts.city}, is a private dental institution affiliated with Rajiv Gandhi University of Health Sciences.`,
    },
    courses: [
      { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats, feesLabel },
    ],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Rajiv Gandhi University of Health Sciences",
      "NEET-UG based admission through Karnataka state counselling and management quota",
      "Structured clinical training with a regional Karnataka patient base",
    ],
    faqs: [
      { question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Karnataka Examinations Authority (KEA) state counselling for government-quota seats and the college's own management quota process." },
    ],
    sections: [
      { tab: "info", heading: `About ${opts.name}`, body: `${opts.name} was established around ${opts.estd} in ${opts.city} and is affiliated with Rajiv Gandhi University of Health Sciences. As a private dental institution, it runs a BDS programme across all core dental disciplines.` },
      { tab: "info", heading: "Campus & Clinical Facilities", body: `The college operates from ${opts.city} with a dental hospital covering major specialities, serving a regional Karnataka patient base and offering students structured clinical rotations.` },
      { tab: "info", heading: `Why Choose ${opts.name}`, body: `- Private dental college in ${opts.city}\n- Affiliated with Rajiv Gandhi University of Health Sciences\n- Established around ${opts.estd}\n- NEET-UG based transparent admission process` },
      { tab: "courses-fees", heading: "BDS Programme", body: `| Programme | Duration | Seats | Total Fees (indicative) |\n|---|---|---|---|\n| BDS | 5 years (incl. internship) | ${seats} | ${feesLabel} |\n\nFees vary by quota (government/management/NRI) and are set per Karnataka private dental college fee-regulation norms; confirm current-year figures directly with the college.` },
      { tab: "courses-fees", heading: "Fee Payment & Quota Structure", body: "Private dental colleges in Karnataka typically operate government-quota and management-quota seats with different fee structures, regulated by the state fee-fixation committee. Confirm the applicable quota and fee schedule with the college admissions office." },
      { tab: "admissions", heading: "Admission Process (NEET-UG)", body: "NEET-UG is mandatory for BDS admission. Seats are filled through Karnataka Examinations Authority (KEA) state counselling (government quota) and the college's management quota, based on NEET-UG rank/score." },
      { tab: "admissions", heading: "Eligibility & Documents", body: "- Class 12 pass with Physics, Chemistry, Biology, and English, minimum 50% aggregate (40% for reserved categories)\n- Valid NEET-UG score/rank meeting the qualifying cutoff for the admission year\n- Documents: Class 10/12 mark sheets, NEET-UG scorecard, category certificate (if applicable), photo ID" },
      { tab: "placements", heading: "Career Outcomes After BDS", body: "Graduates commonly pursue MDS specialisation (NEET-MDS), private dental practice, or clinical positions in hospitals and dental chains across Karnataka." },
      { tab: "placements", heading: "Internship & Clinical Training", body: "The mandatory 1-year rotating internship is completed within the college's own dental hospital — a Dental Council of India (now National Dental Commission) requirement before BDS graduates can register to practise." },
      { tab: "cutoffs", heading: "NEET Cutoff (Indicative)", body: "Government-quota seats typically require higher NEET scores than management-quota seats. Exact cutoff ranks vary by counselling round, category, and quota; confirm current-year figures with KEA or the college." },
      { tab: "scholarships", heading: "Scholarships & Financial Aid", body: "- Government-quota fee concessions for SC/ST/OBC-eligible students per Karnataka state policy\n- Merit-based fee waivers for top-ranking students, where offered\n- Education loan assistance through the college's administrative office\n- Central government post-matric scholarship schemes for eligible students" },
      { tab: "rankings", heading: "NIRF & Other Rankings", body: `${opts.name} is not among NIRF's formally ranked top-40 dental institutes.` },
      { tab: "hostel", heading: "Hostel & Campus Life", body: "The college provides separate hostel accommodation for male and female students with mess facilities. Student life includes dental-specific clinical case competitions and academic events." },
    ],
  };
}

function keralaPack(opts: {
  slug: string;
  name: string;
  city: string;
  estd: number;
}): CollegeContentPack {
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
    courses: [
      { name: "BDS (Bachelor of Dental Surgery)", duration: "5 years (incl. 1-year internship)", seats: "100", feesLabel: "₹8.5 L total (indicative)" },
    ],
    highlights: [
      `Private dental college in ${opts.city}, established around ${opts.estd}`,
      "Affiliated with Kerala University of Health Sciences",
      "NEET-UG based admission through Kerala state counselling and management quota",
      "Structured clinical training with a Kerala patient base",
    ],
    faqs: [
      { question: `How is admission to ${opts.name} done?`, answer: "Admission is via NEET-UG score through Kerala state counselling for government-quota seats and the college's own management quota process." },
    ],
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

export const dentalBatch17: CollegeContentPack[] = [
  karnatakaPack({ slug: "ame-s-dental-college-and-hospital", name: "AME's Dental College & Hospital", city: "Raichur", estd: 2004 }),
  karnatakaPack({ slug: "al-ameen-dental-college-and-hospital", name: "Al Ameen Dental College & Hospital", city: "Bijapur", estd: 2005 }),
  karnatakaPack({ slug: "dr-syamala-reddy-dental-college", name: "Dr. Syamala Reddy Dental College", city: "Bengaluru", estd: 2001 }),
  karnatakaPack({ slug: "k-g-f-college-of-dental-sciences-and-hospital", name: "K.G.F. College of Dental Sciences & Hospital", city: "Kolar Gold Fields", estd: 2001 }),
  karnatakaPack({ slug: "kle-society-s-institute-of-dental-sciences", name: "KLE Society's Institute of Dental Sciences", city: "Bengaluru", estd: 2004 }),
  karnatakaPack({ slug: "navodaya-dental-college", name: "Navodaya Dental College", city: "Raichur", estd: 2001 }),
  karnatakaPack({ slug: "sri-hasanamba-dental-college-and-hospital", name: "Sri Hasanamba Dental College & Hospital", city: "Hassan", estd: 2007 }),
  keralaPack({ slug: "al-azhar-dental-college", name: "Al-Azhar Dental College", city: "Thodupuzha", estd: 2008 }),
  keralaPack({ slug: "educare-institute-of-dental-sciences", name: "Educare Institute of Dental Sciences", city: "Malappuram", estd: 2001 }),
  keralaPack({ slug: "malabar-dental-college-and-research-centre", name: "Malabar Dental College & Research Centre", city: "Malappuram", estd: 2007 }),
];
