import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { buildMetadata, itemListJsonLd, faqJsonLd } from "@/lib/seo";
import { PROGRAMS } from "@/lib/online";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CollegeCard } from "@/components/CollegeCard";
import { JsonLd } from "@/components/JsonLd";
import { Collapsible } from "@/components/Collapsible";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Online Degree Courses & Universities in India 2026 — UGC-DEB Approved",
  description:
    "Compare UGC-DEB approved online universities in India. Online MBA, MCA, BBA, BCA, M.Com & more — fees, approvals (NAAC, AICTE, WES), EMI and admission. 100% online, valid degrees.",
  path: "/online",
});

const TRUST = ["UGC-DEB entitled", "NAAC accredited", "AICTE approved", "WES recognised"];

// Detailed online course breakdown (the "ultra-rich" course content).
const COURSES = [
  { code: "Online MBA", level: "PG", duration: "2 years", eligibility: "Any bachelor's degree", fees: "₹1.2 L – ₹2 L", who: "Working professionals aiming for management, analytics or leadership roles — the most popular online degree in India.", specs: ["Marketing", "Finance", "HR", "Business Analytics", "Operations", "IT & Systems"] },
  { code: "Online MCA", level: "PG", duration: "2 years", eligibility: "Bachelor's (with Maths/CS)", fees: "₹1.2 L – ₹1.7 L", who: "Graduates targeting software development, cloud and data roles, or stepping up from a BCA.", specs: ["Software Engineering", "Data Science", "Cloud", "Cyber Security"] },
  { code: "Online M.Com", level: "PG", duration: "2 years", eligibility: "B.Com / any bachelor's", fees: "₹0.8 L – ₹1.1 L", who: "Finance and accounting careers, and CA/CS/CMA aspirants who want a recognised master's.", specs: ["Accounting & Finance", "Taxation", "Banking"] },
  { code: "Online BBA", level: "UG", duration: "3 years", eligibility: "10+2 (any stream)", fees: "₹1.1 L – ₹1.5 L", who: "A flexible management foundation for 12th-pass students, and a strong base for an MBA later.", specs: ["Marketing", "Finance", "HR", "Digital Business"] },
  { code: "Online BCA", level: "UG", duration: "3 years", eligibility: "10+2 (any stream)", fees: "₹1.1 L – ₹1.5 L", who: "A recognised entry route into IT and software careers for 10+2 learners.", specs: ["Programming", "Web & App Dev", "Databases", "AI/ML basics"] },
  { code: "Online BA", level: "UG", duration: "3 years", eligibility: "10+2 (any stream)", fees: "₹0.7 L – ₹1 L", who: "Versatile liberal-arts degree — ideal for civil-services prep and general graduation.", specs: ["English", "Journalism", "Political Science", "Economics"] },
];

const RECOGNITION = [
  { badge: "UGC-DEB", title: "Entitled for online mode", body: "The university is approved by the UGC's Distance Education Bureau to offer the programme online — the single most important thing to verify." },
  { badge: "UGC 2020", title: "Equal to on-campus", body: "Under the UGC 2020 regulations, an online degree from an entitled university holds the same academic value as the equivalent on-campus degree." },
  { badge: "NAAC", title: "Quality accreditation", body: "A strong NAAC grade (A/A+/A++) signals independently-assessed academic quality — prefer NAAC-accredited universities." },
  { badge: "WES", title: "Recognised abroad", body: "WES-evaluated degrees support higher study and skilled-immigration credential checks in countries like Canada and the US." },
];

const HOW_IT_WORKS = [
  { icon: "🎥", title: "Live + recorded classes", body: "Attend live sessions or watch recordings anytime on the LMS — study around your job." },
  { icon: "📚", title: "E-content & digital library", body: "Readings, case studies and a digital library for every module, accessible on web and mobile." },
  { icon: "🖥️", title: "Remote-proctored exams", body: "Sit your semester exams online from home — no travel to an exam centre." },
  { icon: "🧭", title: "Mentors & doubt-solving", body: "Academic mentors, discussion forums and a success team keep you on track to graduate." },
];

const PERSONAS = [
  { icon: "💼", title: "Working professionals", body: "Upgrade to a master's or a management degree without a career break or salary loss." },
  { icon: "🎓", title: "Recent graduates", body: "Add a recognised PG or a second degree with full flexibility and lower fees." },
  { icon: "🔄", title: "Career switchers", body: "Move into management, IT, analytics or finance with an industry-aligned online programme." },
  { icon: "🏡", title: "Remote & NRI learners", body: "Earn an Indian degree from anywhere — no relocation, study on your own schedule." },
];

const CHOOSE = [
  "UGC-DEB entitlement for that specific programme (non-negotiable).",
  "NAAC grade and overall university accreditation.",
  "Brand strength and how the degree reads on a CV to employers.",
  "International recognition (e.g. WES) if you may study or work abroad.",
  "LMS quality, mentorship and learner support — these drive completion.",
  "Total fees, EMI options and any scholarships or waivers.",
];

const FAQS = [
  { question: "Are online degrees valid in India?", answer: "Yes. Degrees from UGC-DEB entitled universities in online mode are treated as equivalent to regular on-campus degrees for jobs, government exams and higher education (UGC notification 2020)." },
  { question: "What is UGC-DEB entitlement and why does it matter?", answer: "UGC-DEB (the UGC's Distance Education Bureau) entitles a university to offer specific programmes in online/distance mode. It's the single most important check — only enrol in programmes that are UGC-DEB entitled for the current year." },
  { question: "Is an online MBA good for a career?", answer: "An online MBA from a UGC-DEB approved, NAAC-accredited university is recognised by employers and is ideal for working professionals who want to upskill and move into management without leaving their job." },
  { question: "Can I apply for government jobs and exams with an online degree?", answer: "UGC-entitled online degrees are generally accepted for eligibility, but each recruiter/commission (UPSC, SSC, state PSCs, banks) sets its own conditions — always check the specific notification's wording on distance/online degrees." },
  { question: "What's the difference between online and distance education?", answer: "Distance is largely self-study with occasional contact classes; online is fully digital — live and recorded classes, an LMS and remote-proctored exams. Both are UGC-DEB regulated; online offers the most flexibility and interaction." },
  { question: "Do online degrees mention 'online' on the certificate?", answer: "Per UGC norms, the degree is equivalent to the on-campus degree. Most universities issue a standard degree certificate without distinguishing the mode — confirm the exact wording with the university." },
  { question: "How are online exams conducted?", answer: "Most universities use remote-proctored exams: you appear online at a scheduled time, monitored via webcam. Assessment usually combines internal assignments/quizzes with the proctored semester exam." },
  { question: "Can I pay online course fees in EMI?", answer: "Most online universities offer no-cost EMI and semester-wise payment, and many have education-loan tie-ups — so you can spread the cost instead of paying upfront." },
];

export default async function OnlinePage() {
  const { items } = await api.colleges({ mode: "Online", sort: "rating", pageSize: 60 }).catch(() => ({ items: [] }));

  return (
    <>
      <JsonLd
        data={[
          itemListJsonLd("Online universities in India", items.map((c) => ({ name: c.name, path: `/colleges/${c.slug}` }))),
          faqJsonLd(FAQS),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <div className="container-site relative py-12 sm:py-16">
          <div className="text-white/80">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Online", path: "/online" }]} />
          </div>
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold">
            🌐 100% Online · UGC-DEB approved
          </span>
          <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Online degrees from India&apos;s top universities
          </h1>
          <p className="mt-4 max-w-2xl text-white/70 sm:text-lg">
            Compare UGC-DEB entitled online universities on fees, approvals, EMI and admission. Earn a
            degree equivalent to on-campus — without leaving your job. 100% free guidance.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {TRUST.map((t) => (
              <span key={t} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-semibold">✓ {t}</span>
            ))}
          </div>
          <form action="/colleges" method="get" className="mx-auto mt-8 flex max-w-xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-pop sm:flex-row">
            <input type="hidden" name="mode" value="Online" />
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-line px-3">
              <span className="text-ink-400">⌕</span>
              <input
                name="search"
                placeholder="Search online universities or programs…"
                className="w-full bg-transparent py-3 text-sm text-ink-900 outline-none"
              />
            </div>
            <button type="submit" className="btn-primary px-6 py-3">Search</button>
          </form>
        </div>
      </section>

      {/* Recognition & validity — moved above the program list so visitors see
          "is this valid?" before browsing programs. */}
      <section className="container-site py-8">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Is an online degree valid? What to check</h2>
        <p className="mt-2 max-w-2xl text-ink-500">Four markers decide whether an online degree is genuinely recognised and worth your money.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {RECOGNITION.map((r) => (
            <div key={r.badge} className="card p-5">
              <span className="inline-flex rounded-lg bg-success/10 px-2.5 py-1 text-xs font-bold text-success">{r.badge}</span>
              <h3 className="mt-3 text-base font-bold text-ink-900">{r.title}</h3>
              <p className="mt-1.5 text-sm text-ink-500">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Program quick links */}
      <section className="container-site py-10">
        <h2 className="text-2xl font-extrabold">Popular online programs</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PROGRAMS.map((p) => (
            <Link key={p.slug} href={`/online/${p.slug}`} className="card flex items-center justify-between p-4 hover:border-brand-400">
              <span className="font-bold text-ink-900">{p.label}</span>
              <span className="text-brand-600">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Intro / about online degrees */}
      <section className="container-site pb-4">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-extrabold sm:text-3xl">Online degrees in India — a complete guide</h2>
          <Collapsible previewHeight={110}>
            <p className="mt-3 text-ink-600">
              Online education has moved from the fringes to the mainstream. Since the UGC&apos;s 2020
              regulations, degrees earned fully online from entitled universities carry the <strong>same
              academic value as on-campus degrees</strong> — valid for jobs, promotions, government
              examinations and higher study. For India&apos;s millions of working professionals and
              remote learners, that means a real, recognised qualification without quitting a job or
              relocating.
            </p>
            <p className="mt-3 text-ink-600">
              The catch is that quality varies. The safest online degrees come from <strong>UGC-DEB
              entitled, NAAC-accredited universities</strong> with a recognised brand — that combination
              is what employers and foreign universities actually respect. This guide breaks down the
              popular courses, what makes a degree valid, how online learning works, and how to choose
              the right university.
            </p>
          </Collapsible>
        </div>
      </section>

      {/* Courses in detail */}
      <section className="container-site py-8">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Popular online courses in detail</h2>
        <p className="mt-2 max-w-2xl text-ink-500">Duration, eligibility, indicative fees and who each programme suits best.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
            <div key={c.code} className="card flex flex-col p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-ink-900">{c.code}</h3>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-700">{c.level}</span>
              </div>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-[13px]">
                <div><dt className="text-ink-400">Duration</dt><dd className="font-semibold text-ink-900">{c.duration}</dd></div>
                <div><dt className="text-ink-400">Indicative fees</dt><dd className="font-semibold text-brand-700">{c.fees}</dd></div>
                <div className="col-span-2"><dt className="text-ink-400">Eligibility</dt><dd className="font-semibold text-ink-900">{c.eligibility}</dd></div>
              </dl>
              <p className="mt-3 text-sm text-ink-500">{c.who}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.specs.map((s) => <span key={s} className="chip">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How online learning works */}
      <section className="container-site py-8">
        <h2 className="text-2xl font-extrabold sm:text-3xl">How online learning works</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((h) => (
            <div key={h.title} className="card p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-xl">{h.icon}</div>
              <h3 className="mt-3 text-base font-bold text-ink-900">{h.title}</h3>
              <p className="mt-1.5 text-sm text-ink-500">{h.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Universities */}
      <section className="container-site py-8">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Top online universities</h2>
        <p className="mt-2 text-ink-500">{items.length} UGC-DEB approved universities offering online degrees.</p>
        {items.length === 0 ? (
          <p className="mt-8 text-ink-500">No online universities listed yet.</p>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((c) => (
              <CollegeCard key={c.id} college={c} />
            ))}
          </div>
        )}
      </section>

      {/* Who it's for + how to choose */}
      <section className="container-site py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Who should consider an online degree?</h2>
            <div className="mt-5 space-y-3">
              {PERSONAS.map((p) => (
                <div key={p.title} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-xl">{p.icon}</span>
                  <div>
                    <h3 className="text-sm font-bold text-ink-900">{p.title}</h3>
                    <p className="mt-0.5 text-sm text-ink-500">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">How to choose the right online university</h2>
            <ol className="mt-5 space-y-3">
              {CHOOSE.map((c, i) => (
                <li key={i} className="flex gap-3 rounded-2xl border border-line bg-white p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-sm font-extrabold text-white">{i + 1}</span>
                  <span className="text-sm text-ink-600">{c}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-site py-12">
        <h2 className="text-2xl font-extrabold sm:text-3xl">Online degrees — FAQs</h2>
        <div className="mt-5 space-y-3">
          {FAQS.map((f) => (
            <details key={f.question} className="card p-4">
              <summary className="cursor-pointer font-bold text-ink-900">{f.question}</summary>
              <p className="mt-2 text-sm text-ink-500">{f.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
