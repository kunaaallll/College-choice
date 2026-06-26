/**
 * Seeds UGC-DEB approved **online / distance universities** (CollegeVidya-style).
 * Additive & idempotent: upserts by slug, so it won't disturb campus colleges and
 * can be re-run safely.
 *
 *   npm run db:seed:online   (or  tsx prisma/online.ts)
 *
 * Also invoked at the end of the main seed so fresh installs include online unis.
 */
import { CollegeMode, CollegeType, PrismaClient } from "@prisma/client";
import { ensureCity, ensureStream, slugify } from "../src/ingest/normalize";
import { refreshCounts } from "../src/ingest/upsert";

interface Program {
  name: string;
  duration: string;
  feesLabel: string;
}
interface OnlineUni {
  name: string;
  city: string;
  state: string;
  type: keyof typeof CollegeType;
  stream: string; // primary category
  rating: number;
  feesNum: number; // flagship (Online MBA) total fee
  feesLabel: string;
  estd: number;
  approvals: string[];
  img: string;
  programs: Program[];
}

const IMG = {
  a: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
  e: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=80",
  f: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=900&q=80",
  g: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
  i: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=900&q=80",
};

const P = {
  mba: (fee: string): Program => ({ name: "Online MBA", duration: "2 years", feesLabel: fee }),
  mca: (fee: string): Program => ({ name: "Online MCA", duration: "2 years", feesLabel: fee }),
  bba: (fee: string): Program => ({ name: "Online BBA", duration: "3 years", feesLabel: fee }),
  bca: (fee: string): Program => ({ name: "Online BCA", duration: "3 years", feesLabel: fee }),
  mcom: (fee: string): Program => ({ name: "Online M.Com", duration: "2 years", feesLabel: fee }),
  bcom: (fee: string): Program => ({ name: "Online B.Com", duration: "3 years", feesLabel: fee }),
  ma: (fee: string): Program => ({ name: "Online MA", duration: "2 years", feesLabel: fee }),
};

const UNIS: OnlineUni[] = [
  { name: "Amity University Online", city: "Noida", state: "Uttar Pradesh", type: "Deemed", stream: "Management", rating: 4.4, feesNum: 199000, feesLabel: "₹1.99 L", estd: 2005, approvals: ["UGC-DEB", "NAAC A+", "WES", "AICTE"], img: IMG.a, programs: [P.mba("₹1.99 L"), P.mca("₹1.50 L"), P.bba("₹1.50 L"), P.bca("₹1.50 L"), P.ma("₹0.90 L"), P.mcom("₹0.85 L")] },
  { name: "Manipal University Jaipur Online", city: "Jaipur", state: "Rajasthan", type: "Private", stream: "Management", rating: 4.5, feesNum: 166000, feesLabel: "₹1.66 L", estd: 2011, approvals: ["UGC-DEB", "NAAC A+", "WES"], img: IMG.e, programs: [P.mba("₹1.66 L"), P.mca("₹1.40 L"), P.bba("₹1.50 L"), P.bca("₹1.35 L"), P.mcom("₹0.66 L"), P.ma("₹0.60 L")] },
  { name: "NMIMS Online (Distance)", city: "Mumbai", state: "Maharashtra", type: "Deemed", stream: "Management", rating: 4.4, feesNum: 171000, feesLabel: "₹1.71 L", estd: 1981, approvals: ["UGC-DEB", "NAAC A+", "AICTE"], img: IMG.f, programs: [P.mba("₹1.71 L"), P.bcom("₹1.05 L"), P.bba("₹1.20 L")] },
  { name: "Jain University Online", city: "Bangalore", state: "Karnataka", type: "Deemed", stream: "Management", rating: 4.3, feesNum: 160000, feesLabel: "₹1.60 L", estd: 1990, approvals: ["UGC-DEB", "NAAC A++"], img: IMG.e, programs: [P.mba("₹1.60 L"), P.mca("₹1.40 L"), P.bba("₹1.35 L"), P.bcom("₹0.95 L"), P.mcom("₹0.60 L"), P.ma("₹0.55 L")] },
  { name: "Lovely Professional University Online", city: "Jalandhar", state: "Punjab", type: "Private", stream: "Management", rating: 4.2, feesNum: 160000, feesLabel: "₹1.60 L", estd: 2005, approvals: ["UGC-DEB", "NAAC A++", "WES"], img: IMG.i, programs: [P.mba("₹1.60 L"), P.mca("₹1.40 L"), P.bba("₹1.40 L"), P.bca("₹1.30 L"), P.mcom("₹0.70 L")] },
  { name: "UPES Online", city: "Dehradun", state: "Uttarakhand", type: "Private", stream: "Management", rating: 4.3, feesNum: 175000, feesLabel: "₹1.75 L", estd: 2003, approvals: ["UGC-DEB", "NAAC A", "WES"], img: IMG.g, programs: [P.mba("₹1.75 L"), P.bba("₹1.50 L"), P.bcom("₹1.10 L")] },
  { name: "Chandigarh University Online", city: "Mohali", state: "Punjab", type: "Private", stream: "Management", rating: 4.2, feesNum: 150000, feesLabel: "₹1.50 L", estd: 2012, approvals: ["UGC-DEB", "NAAC A+"], img: IMG.a, programs: [P.mba("₹1.50 L"), P.mca("₹1.30 L"), P.bba("₹1.30 L"), P.bca("₹1.20 L"), P.mcom("₹0.65 L")] },
  { name: "DY Patil University Online", city: "Pune", state: "Maharashtra", type: "Deemed", stream: "Management", rating: 4.3, feesNum: 160000, feesLabel: "₹1.60 L", estd: 2003, approvals: ["UGC-DEB", "NAAC A++"], img: IMG.f, programs: [P.mba("₹1.60 L"), P.mca("₹1.40 L"), P.mcom("₹0.70 L")] },
];

function content(u: OnlineUni) {
  const programNames = u.programs.map((p) => p.name.replace("Online ", "")).join(", ");
  const descriptionLong = [
    `${u.name} offers UGC-entitled online degree programs (${u.approvals.join(", ")}) that are 100% online and equivalent to on-campus degrees. Based out of ${u.city}, ${u.state}, it is a popular choice for working professionals and students who need flexibility.`,
    `Programs include ${programNames}. The flagship Online MBA costs approximately ${u.feesLabel}, with no-cost EMI options available. Admissions are merit-based with no entrance exam, and degrees are recognised for jobs, promotions and higher education in India and abroad.`,
    `This page covers ${u.name}'s online courses and fees, approvals & accreditation, admission process and frequently asked questions.`,
  ].join("\n\n");
  const highlights = [
    `UGC-DEB entitled — degree equivalent to on-campus (${u.approvals.join(", ")})`,
    `100% online learning with recorded + live classes`,
    `No-cost EMI and scholarships available`,
    `Merit-based admission — no entrance exam`,
  ];
  const faqs = [
    { question: `Is the online degree from ${u.name} valid?`, answer: `Yes. ${u.name} is UGC-DEB entitled (${u.approvals.join(", ")}), so its online degrees are recognised as equivalent to regular on-campus degrees for jobs, government exams and higher studies.` },
    { question: `What is the fee for the Online MBA at ${u.name}?`, answer: `The Online MBA at ${u.name} costs approximately ${u.feesLabel} in total, with no-cost EMI options to pay per semester.` },
    { question: `Is there an entrance exam for admission?`, answer: `No. Admission to ${u.name}'s online programs is merit-based (based on your qualifying degree); there is no entrance exam.` },
    { question: `Which programs are offered online by ${u.name}?`, answer: `${u.name} offers ${programNames} in online mode, among others.` },
  ];
  return { descriptionLong, highlights, faqs };
}

export async function seedOnline(prisma: PrismaClient) {
  for (const u of UNIS) {
    const slug = slugify(u.name);
    const [streamId, cityId] = await Promise.all([
      ensureStream(prisma, u.stream),
      ensureCity(prisma, u.city, u.state),
    ]);
    const { descriptionLong, highlights, faqs } = content(u);

    const scalar = {
      name: u.name,
      location: `${u.city}, ${u.state}`,
      state: u.state,
      type: CollegeType[u.type],
      mode: CollegeMode.Online,
      approvals: u.approvals,
      rating: u.rating,
      reviewsLabel: null,
      feesNum: u.feesNum,
      feesLabel: u.feesLabel,
      packageLabel: null, // online — emphasise approvals/EMI, not placement package
      examName: null, // merit-based
      estd: u.estd,
      imgUrl: u.img,
      about: `${u.name} is a UGC-DEB approved online university offering flexible, industry-relevant online degrees.`,
      descriptionLong,
      metaTitle: `${u.name} — Online Courses, Fees, Approvals & Admission 2026`,
      metaDescription: `${u.name}: UGC-DEB approved online degrees (${u.approvals.join(", ")}). Online MBA fee ${u.feesLabel}, courses, admission & FAQs.`.slice(0, 158),
      source: "online-seed",
      published: true,
      streamId,
      cityId,
    };

    const college = await prisma.college.upsert({
      where: { slug },
      update: scalar,
      create: { ...scalar, slug },
    });

    // Reset owned children so re-runs stay idempotent.
    await prisma.course.deleteMany({ where: { collegeId: college.id } });
    await prisma.highlight.deleteMany({ where: { collegeId: college.id } });
    await prisma.faq.deleteMany({ where: { collegeId: college.id } });

    await prisma.course.createMany({
      data: u.programs.map((p) => ({ collegeId: college.id, name: p.name, duration: p.duration, seats: "Open", feesLabel: p.feesLabel })),
    });
    await prisma.highlight.createMany({ data: highlights.map((text) => ({ collegeId: college.id, text })) });
    await prisma.faq.createMany({ data: faqs.map((f, i) => ({ collegeId: college.id, question: f.question, answer: f.answer, sort: i })) });
  }

  await refreshCounts(prisma);
  return UNIS.length;
}

// Standalone runner
if (require.main === module) {
  const prisma = new PrismaClient();
  seedOnline(prisma)
    .then((n) => console.log(`✅ Seeded ${n} online universities.`))
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
