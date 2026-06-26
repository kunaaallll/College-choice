/**
 * Seeds the database with the data baked into the original College Choice design,
 * normalised into the relational schema. Idempotent: clears and reloads.
 *
 *   npm run db:seed   (or  prisma db seed)
 */
import { PrismaClient, CollegeType } from "@prisma/client";
import { seedOnline } from "./online";

const prisma = new PrismaClient();

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Reviews-label like "2.4k" → 2400
const parseCount = (label: string) => {
  const m = label.trim().toLowerCase();
  if (m.endsWith("k")) return Math.round(parseFloat(m) * 1000);
  return parseInt(m.replace(/\D/g, ""), 10) || 0;
};

// Unsplash image set used by the design (imgA…imgJ)
const IMG = {
  a: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
  b: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80",
  c: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?auto=format&fit=crop&w=900&q=80",
  d: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
  e: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=900&q=80",
  f: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=900&q=80",
  g: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=900&q=80",
  h: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=900&q=80",
  i: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&w=900&q=80",
  j: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=80",
};

const STREAMS = [
  { name: "Engineering", initial: "En", colorGradient: "linear-gradient(135deg,#6366f1,#4338ca)", count: 1240, examName: "JEE Main", avgFees: "₹2–8 L", degrees: ["B.Tech", "M.Tech", "B.E."], description: "B.Tech, M.Tech and integrated programs across CSE, ECE, Mechanical and more." },
  { name: "Medical", initial: "Me", colorGradient: "linear-gradient(135deg,#ef4444,#b91c1c)", count: 480, examName: "NEET", avgFees: "₹6k–25 L", degrees: ["MBBS", "BDS", "BAMS"], description: "MBBS, BDS, BAMS and allied health sciences at India's top institutes." },
  { name: "Management", initial: "Mg", colorGradient: "linear-gradient(135deg,#0ea5e9,#0369a1)", count: 920, examName: "CAT", avgFees: "₹4–24 L", degrees: ["MBA", "PGDM", "BBA"], description: "MBA, PGDM and BBA programs with strong placement track records." },
  { name: "Commerce", initial: "Co", colorGradient: "linear-gradient(135deg,#16a34a,#15803d)", count: 760, examName: "CUET", avgFees: "₹40k–3 L", degrees: ["B.Com", "M.Com", "CA Found."], description: "B.Com, M.Com and professional pathways into finance and accounting." },
  { name: "Law", initial: "La", colorGradient: "linear-gradient(135deg,#f59e0b,#b45309)", count: 310, examName: "CLAT", avgFees: "₹1–12 L", degrees: ["BA LLB", "LLB", "LLM"], description: "5-year integrated and 3-year LLB programs at premier law schools." },
  { name: "Arts", initial: "Ar", colorGradient: "linear-gradient(135deg,#ec4899,#be185d)", count: 1080, examName: "CUET", avgFees: "₹30k–2 L", degrees: ["BA", "MA"], description: "Humanities, social sciences and liberal arts degrees." },
  { name: "Science", initial: "Sc", colorGradient: "linear-gradient(135deg,#8b5cf6,#6d28d9)", count: 890, examName: "CUET", avgFees: "₹40k–3 L", degrees: ["B.Sc", "M.Sc"], description: "Pure and applied sciences across physics, chemistry and biology." },
  { name: "Design", initial: "De", colorGradient: "linear-gradient(135deg,#14b8a6,#0f766e)", count: 240, examName: "NID/UCEED", avgFees: "₹3–14 L", degrees: ["B.Des", "M.Des"], description: "Product, UX, fashion and communication design degrees." },
];

// Cities shown in "browse by city" (with imagery + counts), plus any college cities.
const CITIES = [
  { name: "Delhi", state: "Delhi", count: 420, img: IMG.b },
  { name: "Mumbai", state: "Maharashtra", count: 380, img: IMG.a },
  { name: "Bangalore", state: "Karnataka", count: 510, img: IMG.e },
  { name: "Pune", state: "Maharashtra", count: 340, img: IMG.c },
  { name: "Chennai", state: "Tamil Nadu", count: 300, img: IMG.i },
  { name: "Hyderabad", state: "Telangana", count: 290, img: IMG.f },
  { name: "Kolkata", state: "West Bengal", count: 260, img: IMG.j },
  { name: "Ahmedabad", state: "Gujarat", count: 180, img: IMG.g },
  // College home cities not in the featured list
  { name: "Pilani", state: "Rajasthan", count: 4, img: null },
  { name: "Vellore", state: "Tamil Nadu", count: 12, img: null },
  { name: "Tiruchirappalli", state: "Tamil Nadu", count: 8, img: null },
  { name: "Manipal", state: "Karnataka", count: 9, img: null },
];

const EXAMS = [
  { name: "JEE Main", full: "Joint Entrance Examination", level: "National", date: "Jan 24, 2026", mode: "Online", stream: "Engineering" },
  { name: "NEET UG", full: "National Eligibility cum Entrance Test", level: "National", date: "May 03, 2026", mode: "Offline", stream: "Medical" },
  { name: "CUET", full: "Common University Entrance Test", level: "National", date: "May 15, 2026", mode: "Online", stream: "Multiple" },
  { name: "CAT", full: "Common Admission Test", level: "National", date: "Nov 29, 2026", mode: "Online", stream: "Management" },
  { name: "JEE Advanced", full: "For IIT admissions", level: "National", date: "May 18, 2026", mode: "Online", stream: "Engineering" },
  { name: "CLAT", full: "Common Law Admission Test", level: "National", date: "Dec 07, 2025", mode: "Offline", stream: "Law" },
  { name: "GATE", full: "Graduate Aptitude Test in Engineering", level: "National", date: "Feb 07, 2026", mode: "Online", stream: "Engineering" },
  { name: "BITSAT", full: "BITS Admission Test", level: "University", date: "May 26, 2026", mode: "Online", stream: "Engineering" },
];

// Maps a college's display exam label → normalised Exam.name (for the M:N link).
const EXAM_ALIAS: Record<string, string> = {
  "JEE Adv": "JEE Advanced",
  NEET: "NEET UG",
  CUET: "CUET",
  BITSAT: "BITSAT",
  "JEE Main": "JEE Main",
};

const COLLEGES = [
  { name: "IIT Bombay", location: "Mumbai, Maharashtra", city: "Mumbai", stream: "Engineering", type: "Public", rank: 1, rating: 4.8, reviews: "2.4k", feesNum: 230000, feesLabel: "₹2.30 L", packageLabel: "₹21.8 LPA", exam: "JEE Adv", estd: 1958, img: IMG.a },
  { name: "IIT Delhi", location: "New Delhi, Delhi", city: "Delhi", stream: "Engineering", type: "Public", rank: 2, rating: 4.8, reviews: "2.1k", feesNum: 220000, feesLabel: "₹2.20 L", packageLabel: "₹20.5 LPA", exam: "JEE Adv", estd: 1961, img: IMG.b },
  { name: "AIIMS Delhi", location: "New Delhi, Delhi", city: "Delhi", stream: "Medical", type: "Public", rank: 1, rating: 4.9, reviews: "1.8k", feesNum: 6000, feesLabel: "₹6,000", packageLabel: "₹12.0 LPA", exam: "NEET", estd: 1956, img: IMG.c },
  { name: "BITS Pilani", location: "Pilani, Rajasthan", city: "Pilani", stream: "Engineering", type: "Private", rank: 5, rating: 4.6, reviews: "1.5k", feesNum: 540000, feesLabel: "₹5.40 L", packageLabel: "₹18.0 LPA", exam: "BITSAT", estd: 1964, img: IMG.f },
  { name: "SRCC, Delhi University", location: "New Delhi, Delhi", city: "Delhi", stream: "Commerce", type: "Public", rank: 1, rating: 4.7, reviews: "1.2k", feesNum: 60000, feesLabel: "₹60,000", packageLabel: "₹14.0 LPA", exam: "CUET", estd: 1926, img: IMG.g },
  { name: "VIT Vellore", location: "Vellore, Tamil Nadu", city: "Vellore", stream: "Engineering", type: "Private", rank: 9, rating: 4.4, reviews: "3.1k", feesNum: 790000, feesLabel: "₹7.90 L", packageLabel: "₹9.0 LPA", exam: "VITEEE", estd: 1984, img: IMG.h },
  { name: "Christ University", location: "Bangalore, Karnataka", city: "Bangalore", stream: "Management", type: "Private", rank: 6, rating: 4.5, reviews: "2.0k", feesNum: 450000, feesLabel: "₹4.50 L", packageLabel: "₹8.0 LPA", exam: "Entrance", estd: 1969, img: IMG.e },
  { name: "NIT Trichy", location: "Tiruchirappalli, Tamil Nadu", city: "Tiruchirappalli", stream: "Engineering", type: "Public", rank: 4, rating: 4.6, reviews: "1.4k", feesNum: 160000, feesLabel: "₹1.60 L", packageLabel: "₹14.0 LPA", exam: "JEE Main", estd: 1964, img: IMG.i },
  { name: "Manipal Inst. of Technology", location: "Manipal, Karnataka", city: "Manipal", stream: "Engineering", type: "Private", rank: 12, rating: 4.4, reviews: "2.6k", feesNum: 1700000, feesLabel: "₹17.0 L", packageLabel: "₹10.0 LPA", exam: "MET", estd: 1957, img: IMG.j },
];

const RECRUITERS = ["Google", "Microsoft", "Amazon", "Goldman Sachs", "Tata", "Deloitte", "Adobe", "Qualcomm"];

const RATING_BARS = [
  { label: "Academics", pct: 92 },
  { label: "Faculty", pct: 88 },
  { label: "Placements", pct: 90 },
  { label: "Infra", pct: 85 },
  { label: "Campus", pct: 87 },
];

const REVIEWS = [
  { authorName: "Ananya R.", initial: "A", color: "#6366f1", meta: "B.Tech CSE · 2025", stars: 5.0, text: "World-class faculty and incredible peer group. The placement cell is extremely proactive and the campus culture pushes you to grow." },
  { authorName: "Rohit M.", initial: "R", color: "#16a34a", meta: "M.Tech · 2024", stars: 4.5, text: "Rigorous academics and great research opportunities. Hostel infrastructure could be better but academics more than make up for it." },
  { authorName: "Sneha K.", initial: "S", color: "#f59e0b", meta: "B.Tech ECE · 2026", stars: 4.8, text: "The exposure to industry projects and clubs is unmatched. Highly recommend for anyone serious about engineering." },
];

const NEWS = [
  { category: "Admissions", title: "JEE Main 2026 registration window now open", excerpt: "NTA opens the application portal; here are the key dates and steps to apply on time.", date: "Jun 16, 2026", read: "4 min read", img: IMG.b },
  { category: "Results", title: "NEET UG 2026 answer key released — raise objections by Jun 22", excerpt: "Candidates can challenge the provisional key before the final result is declared.", date: "Jun 14, 2026", read: "3 min read", img: IMG.c },
  { category: "Counselling", title: "CUET counselling: how to lock your college preferences", excerpt: "A step-by-step guide to filling choices and maximising your seat allotment chances.", date: "Jun 12, 2026", read: "6 min read", img: IMG.e },
  { category: "Rankings", title: "Top 50 engineering colleges in India — 2026 list", excerpt: "Our data team ranks institutions on placements, faculty and student outcomes.", date: "Jun 10, 2026", read: "8 min read", img: IMG.a },
  { category: "Scholarships", title: "5 national scholarships every student should apply for", excerpt: "From merit-cum-means to state schemes — deadlines and eligibility explained.", date: "Jun 08, 2026", read: "5 min read", img: IMG.f },
  { category: "Careers", title: "Which engineering branch has the best ROI in 2026?", excerpt: "We compare fees against average packages across CSE, ECE, Mechanical and more.", date: "Jun 05, 2026", read: "7 min read", img: IMG.i },
];

async function main() {
  console.log("🌱 Seeding College Choice…");

  // Clear (respect FK order)
  await prisma.application.deleteMany();
  await prisma.collegeExam.deleteMany();
  await prisma.collegeRecruiter.deleteMany();
  await prisma.galleryImage.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.ratingBar.deleteMany();
  await prisma.review.deleteMany();
  await prisma.highlight.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.recruiter.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.city.deleteMany();
  await prisma.stream.deleteMany();
  await prisma.newsArticle.deleteMany();

  // Streams
  const streamByName = new Map<string, number>();
  for (const s of STREAMS) {
    const row = await prisma.stream.create({
      data: {
        name: s.name,
        slug: slugify(s.name),
        initial: s.initial,
        colorGradient: s.colorGradient,
        description: s.description,
        avgFees: s.avgFees,
        degrees: s.degrees,
        examName: s.examName,
        collegeCount: s.count,
      },
    });
    streamByName.set(s.name, row.id);
  }

  // Cities
  const cityByName = new Map<string, number>();
  for (const c of CITIES) {
    const row = await prisma.city.create({
      data: { name: c.name, slug: slugify(c.name), state: c.state, imageUrl: c.img, collegeCount: c.count },
    });
    cityByName.set(c.name, row.id);
  }

  // Exams
  const examByName = new Map<string, number>();
  for (const e of EXAMS) {
    const row = await prisma.exam.create({
      data: { name: e.name, slug: slugify(e.name), fullName: e.full, level: e.level, date: e.date, mode: e.mode, stream: e.stream },
    });
    examByName.set(e.name, row.id);
  }

  // Recruiters
  const recruiterByName = new Map<string, number>();
  for (const name of RECRUITERS) {
    const row = await prisma.recruiter.create({ data: { name } });
    recruiterByName.set(name, row.id);
  }

  // Colleges (+ owned detail records)
  for (const c of COLLEGES) {
    const state = c.location.split(",").pop()?.trim() || null;
    const about = `${c.name} is one of India's premier ${c.stream.toLowerCase()} institutions, established in ${c.estd}. Located in ${c.location}, it is renowned for academic rigour, world-class faculty and exceptional placement outcomes. Admission is highly competitive and based on ${c.exam} performance.`;
    const descriptionLong = [
      `${c.name} is a top-ranked ${c.type.toLowerCase()} ${c.stream.toLowerCase()} institution in ${c.location}, established in ${c.estd}. Ranked #${c.rank} in ${c.stream} on College Choice, it consistently delivers strong placements with an average package of ${c.packageLabel}.`,
      `Admission to ${c.name} is primarily through the ${c.exam} entrance exam followed by counselling. The total programme fees are approximately ${c.feesLabel}, and the institute is rated ${c.rating}/5 by ${c.reviews} students.`,
      `Students choose ${c.name} for its world-class faculty, research opportunities and a recruiter network that includes leading Indian and global companies. This page covers ${c.name}'s courses and fees, admission process, placements, student reviews and frequently asked questions.`,
    ].join("\n\n");
    const faqs = [
      { question: `What is the total fees at ${c.name}?`, answer: `The approximate total programme fees at ${c.name} are ${c.feesLabel}. Exact fees vary by course and category.` },
      { question: `Which entrance exam is accepted by ${c.name}?`, answer: `${c.name} admits students based on ${c.exam} scores, followed by centralised counselling.` },
      { question: `What is the average placement package at ${c.name}?`, answer: `The average package at ${c.name} is ${c.packageLabel}, with top recruiters hiring across roles.` },
      { question: `What is the rank of ${c.name}?`, answer: `${c.name} is ranked #${c.rank} in ${c.stream} on College Choice, reflecting its academics, placements and student outcomes.` },
    ];

    const college = await prisma.college.create({
      data: {
        name: c.name,
        slug: slugify(c.name),
        location: c.location,
        state,
        type: c.type as CollegeType,
        rank: c.rank,
        rating: c.rating,
        reviewsLabel: c.reviews,
        reviewsCount: parseCount(c.reviews),
        feesNum: c.feesNum,
        feesLabel: c.feesLabel,
        packageLabel: c.packageLabel,
        examName: c.exam,
        estd: c.estd,
        imgUrl: c.img,
        about,
        descriptionLong,
        metaTitle: `${c.name} — Fees, Admission, Placements, Reviews`,
        metaDescription: `${c.name}: total fees ${c.feesLabel}, average package ${c.packageLabel}, admission via ${c.exam}. Courses, cutoffs, placements & student reviews.`,
        source: "seed",
        published: true,
        faqs: { create: faqs.map((f, i) => ({ ...f, sort: i })) },
        streamId: streamByName.get(c.stream)!,
        cityId: cityByName.get(c.city)!,
        highlights: {
          create: [
            { text: `Ranked #${c.rank} in ${c.stream} nationally` },
            { text: `Average package of ${c.packageLabel} with top recruiters` },
            { text: `${c.type} institute established in ${c.estd}` },
            { text: `Admissions through ${c.exam} entrance exam` },
          ],
        },
        courses: {
          create: [
            { name: `${c.stream} (Undergraduate)`, duration: "4 years", seats: "120", feesLabel: c.feesLabel },
            { name: `${c.stream} (Postgraduate)`, duration: "2 years", seats: "80", feesLabel: "₹1.20 L" },
            { name: "Integrated Dual Degree", duration: "5 years", seats: "60", feesLabel: "₹2.80 L" },
            { name: "Doctoral (PhD)", duration: "4–5 years", seats: "40", feesLabel: "₹45,000" },
          ],
        },
        ratingBars: { create: RATING_BARS.map((b) => ({ label: b.label, pct: b.pct })) },
        reviews: { create: REVIEWS.map((r) => ({ ...r })) },
        gallery: { create: [IMG.a, IMG.e, IMG.c, IMG.h].map((url, i) => ({ url, sort: i })) },
        placement: {
          create: { avgPackage: c.packageLabel, highestPackage: "₹1.2 Cr", placedPct: "94%" },
        },
      },
    });

    // recruiters M:N
    await prisma.collegeRecruiter.createMany({
      data: RECRUITERS.map((name) => ({ collegeId: college.id, recruiterId: recruiterByName.get(name)! })),
    });

    // exams M:N (only where the display label maps to a known exam)
    const examName = EXAM_ALIAS[c.exam];
    if (examName && examByName.has(examName)) {
      await prisma.collegeExam.create({ data: { collegeId: college.id, examId: examByName.get(examName)! } });
    }
  }

  // News
  for (const n of NEWS) {
    await prisma.newsArticle.create({
      data: {
        slug: slugify(n.title),
        category: n.category,
        title: n.title,
        excerpt: n.excerpt,
        body: n.excerpt,
        date: n.date,
        readTime: n.read,
        imgUrl: n.img,
      },
    });
  }

  // Online / distance universities (additive, idempotent).
  await seedOnline(prisma);

  const counts = {
    streams: await prisma.stream.count(),
    cities: await prisma.city.count(),
    exams: await prisma.exam.count(),
    colleges: await prisma.college.count(),
    onlineColleges: await prisma.college.count({ where: { mode: "Online" } }),
    news: await prisma.newsArticle.count(),
  };
  console.log("✅ Seed complete:", counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
