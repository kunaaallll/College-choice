import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { HeroSearch } from "@/components/HeroSearch";
import { HeroCarousel } from "@/components/HeroCarousel";
import { CollegeCard } from "@/components/CollegeCard";

// Render per-request so fresh DB data shows immediately. The API call goes over
// the internal Docker network (see lib/api.ts), so this stays fast.
export const dynamic = "force-dynamic";

const STATS = [
  { value: "13,000+", label: "Colleges" },
  { value: "1,500+", label: "Courses" },
  { value: "120+", label: "Exams" },
  { value: "2M+", label: "Students helped" },
];

// Hero background carousel (rotates every 5s). Placeholder campus shots — will be
// swapped for real partner-college photos (Bennett, IILM, Alliance, Amity).
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=80",
  "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=2000&q=80",
];

const VALUES = [
  { icon: "✔", title: "Verified data", body: "Every fee, cutoff and placement figure is sourced and verified — no guesswork." },
  { icon: "⇄", title: "Side-by-side compare", body: "Stack up to 4 colleges on the metrics that actually matter to you." },
  { icon: "★", title: "Free counselling", body: "Talk to mentors who've been there. Personalised guidance at zero cost." },
];

// Prominently featured courses on the homepage (KollegeApply-style).
// `href` overrides the default /stream/[slug] link when a course isn't its own stream.
const FEATURED_COURSES = [
  {
    slug: "engineering",
    name: "Engineering",
    icon: "⚙️",
    gradient: "linear-gradient(135deg,#6366f1,#4338ca)",
    blurb: "B.Tech, M.Tech & B.E. across CSE, ECE, Mechanical and more.",
    degrees: ["B.Tech", "M.Tech", "B.E."],
  },
  {
    slug: "management",
    name: "Management",
    icon: "📊",
    gradient: "linear-gradient(135deg,#f59e0b,#d97706)",
    blurb: "MBA, PGDM & BBA from India's top-ranked business schools.",
    degrees: ["MBA", "PGDM", "BBA"],
  },
  {
    slug: "dental",
    name: "Dental (BDS)",
    icon: "🦷",
    gradient: "linear-gradient(135deg,#06b6d4,#0e7490)",
    blurb: "BDS & MDS at India's top dental colleges — fees, cutoffs & seats.",
    degrees: ["BDS", "MDS"],
  },
  {
    slug: "medical",
    name: "Medical",
    icon: "⚕️",
    gradient: "linear-gradient(135deg,#10b981,#059669)",
    blurb: "MBBS & allied health at government and deemed colleges.",
    degrees: ["MBBS", "BAMS", "BPT"],
  },
];

export default async function HomePage() {
  // Fetch in parallel; tolerate API being down so the shell still renders.
  // Kick off both batches before awaiting so they run concurrently.
  const coreP = Promise.allSettled([
    api.streams(),
    api.colleges({ sort: "rank", pageSize: 6 }),
    api.cities(),
    api.exams(),
    api.news(),
  ]);
  const coursesP = Promise.allSettled(
    FEATURED_COURSES.map((c) => api.colleges({ stream: c.slug, sort: "rank", pageSize: 4 })),
  );

  const [streamsRes, topRes, citiesRes, examsRes, newsRes] = await coreP;
  const courseColleges = (await coursesP).map((r) => (r.status === "fulfilled" ? r.value.items : []));

  const streams = (streamsRes.status === "fulfilled" ? streamsRes.value.items : []).filter(
    (s) => s.slug !== "design",
  );
  const topColleges = topRes.status === "fulfilled" ? topRes.value.items : [];
  const cities = citiesRes.status === "fulfilled" ? citiesRes.value.items : [];
  const exams = examsRes.status === "fulfilled" ? examsRes.value.items.slice(0, 4) : [];
  const news = newsRes.status === "fulfilled" ? newsRes.value.items.slice(0, 3) : [];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-ink-900 text-white">
        <HeroCarousel images={HERO_IMAGES} />
        <div className="container-site relative py-16 text-center sm:py-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80">
            ★ India&apos;s most trusted college discovery platform
          </span>
          <h1 className="mx-auto mt-5 max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
            Find the right college, <span className="text-brand-400">make the right call.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            Compare 4,200+ colleges on fees, placements, cutoffs and reviews — all in one place, free.
          </p>
          <HeroSearch />
          <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <dt className="text-2xl font-extrabold sm:text-3xl">{s.value}</dt>
                <dd className="mt-1 text-xs text-white/60 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Featured courses ── */}
      <section className="container-site py-14">
        <SectionHead title="Explore top courses" subtitle="Popular courses" href="/courses" cta="View all courses →" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_COURSES.map((course, i) => {
            const stream = streams.find((s) => s.slug === course.slug);
            const cols = courseColleges[i] ?? [];
            return (
              <div key={course.slug} className="card flex flex-col p-5">
                <div className="flex items-center gap-3">
                  <span className="badge-grad h-12 w-12 text-xl" style={{ background: course.gradient }}>
                    {course.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-extrabold text-ink-900">{course.name}</h3>
                    <p className="text-xs text-ink-400">
                      {stream ? `${stream.collegeCount.toLocaleString("en-IN")} colleges` : "Explore colleges"}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-ink-500">{course.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {course.degrees.map((d) => (
                    <span key={d} className="chip">{d}</span>
                  ))}
                </div>
                {cols.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-line pt-4">
                    {cols.slice(0, 4).map((c, idx) => (
                      <li key={c.id}>
                        <Link
                          href={`/colleges/${c.slug}`}
                          className="flex items-center gap-2 text-sm text-ink-700 hover:text-brand-600"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-50 text-xs font-bold text-brand-600">
                            {idx + 1}
                          </span>
                          <span className="truncate font-semibold">{c.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <Link
                  href={"href" in course && course.href ? course.href : `/stream/${course.slug}`}
                  className="btn-primary mt-5 w-full py-2 text-center text-sm"
                >
                  Explore {course.name} colleges →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Browse by stream ── */}
      <section className="container-site py-14">
        <SectionHead title="Explore colleges by stream" subtitle="Browse colleges by stream" href="/courses" cta="View all courses →" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {streams.map((s) => (
            <Link
              key={s.slug}
              href={`/stream/${s.slug}`}
              className="card flex items-center gap-3 p-4 hover:border-brand-400"
            >
              <span className="badge-grad h-11 w-11 text-sm" style={{ background: s.colorGradient }}>
                {s.initial}
              </span>
              <span>
                <span className="block font-bold text-ink-900">{s.name}</span>
                <span className="block text-xs text-ink-400">{s.collegeCount} colleges</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Top ranked ── */}
      <section className="container-site py-4">
        <SectionHead title="Most-viewed colleges this week" subtitle="Top ranked" href="/colleges" cta="View all colleges →" />
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topColleges.map((c) => (
            <CollegeCard key={c.id} college={c} />
          ))}
        </div>
      </section>

      {/* ── Browse by city ── */}
      <section className="container-site py-14">
        <SectionHead title="Find colleges near you" subtitle="By location" href="/colleges" cta="Explore all cities →" />
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/colleges-in/${city.slug}`}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              {city.imageUrl && (
                <Image src={city.imageUrl} alt={city.name} fill sizes="25vw" className="object-cover" />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-ink-900/80 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white">
                <span className="block font-bold">{city.name}</span>
                <span className="block text-xs text-white/70">{city.collegeCount} colleges</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Upcoming exams ── */}
      <section className="container-site py-4">
        <SectionHead title="Upcoming entrance exams" subtitle="Stay ready" href="/exams" cta="All exams →" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {exams.map((ex) => (
            <div key={ex.slug} className="card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-ink-900">{ex.name}</h3>
                <span className="chip">{ex.level}</span>
              </div>
              <p className="mt-1 text-sm text-ink-400">{ex.fullName}</p>
              <p className="mt-4 text-sm font-semibold text-brand-700">📅 Next: {ex.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Value props ── */}
      <section className="container-site py-16">
        <h2 className="text-center text-2xl font-extrabold sm:text-3xl">
          Everything you need to choose with confidence
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-xl text-brand-600">
                {v.icon}
              </div>
              <h3 className="mt-4 text-lg">{v.title}</h3>
              <p className="mt-2 text-sm text-ink-500">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── News ── */}
      <section className="container-site pb-16">
        <SectionHead title="Latest News & admission updates" subtitle="From the desk" href="/news" cta="All articles →" />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {news.map((n) => (
            <Link key={n.slug} href={`/news/${n.slug}`} className="card overflow-hidden hover:border-brand-400">
              {n.imgUrl && (
                <div className="relative aspect-[16/9]">
                  <Image src={n.imgUrl} alt={n.title} fill sizes="33vw" className="object-cover" />
                </div>
              )}
              <div className="p-4">
                <span className="chip">{n.category}</span>
                <h3 className="mt-2 text-base font-bold leading-snug">{n.title}</h3>
                <p className="mt-2 text-xs text-ink-400">{n.date} · {n.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function SectionHead({ title, subtitle, href, cta }: { title: string; subtitle: string; href: string; cta: string }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-brand-600">{subtitle}</p>
        <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">{title}</h2>
      </div>
      <Link href={href} className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700">
        {cta}
      </Link>
    </div>
  );
}
