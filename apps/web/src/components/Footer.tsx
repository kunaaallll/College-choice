import Image from "next/image";
import Link from "next/link";

const COLS = [
  {
    title: "Explore",
    links: [
      { label: "All Colleges", href: "/colleges" },
      { label: "Online Degrees", href: "/online" },
      { label: "Courses", href: "/courses" },
      { label: "Exams", href: "/exams" },
      { label: "Compare", href: "/compare" },
    ],
  },
  {
    title: "Online degrees",
    links: [
      { label: "Online MBA", href: "/online/mba" },
      { label: "Online MCA", href: "/online/mca" },
      { label: "Online BBA", href: "/online/bba" },
      { label: "Online BCA", href: "/online/bca" },
    ],
  },
  {
    title: "Top cities",
    links: [
      { label: "Colleges in Delhi", href: "/colleges-in/delhi" },
      { label: "Colleges in Mumbai", href: "/colleges-in/mumbai" },
      { label: "Colleges in Bangalore", href: "/colleges-in/bangalore" },
      { label: "Colleges in Pune", href: "/colleges-in/pune" },
    ],
  },
  {
    title: "Top streams",
    links: [
      { label: "Engineering colleges", href: "/stream/engineering" },
      { label: "Medical colleges", href: "/stream/medical" },
      { label: "Management colleges", href: "/stream/management" },
      { label: "Law colleges", href: "/stream/law" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "News & Articles", href: "/news" },
      { label: "Privacy", href: "/about" },
      { label: "Terms", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-ink-900 text-white/80">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-1">
          <Link href="/" className="inline-flex rounded-lg bg-white p-2" aria-label="College Choice home">
            <Image src="/logo.png" alt="College Choice" width={1152} height={240} className="h-7 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            India&apos;s most trusted platform to find, compare and apply to colleges. 100% free for
            students.
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-bold text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} College Choice. All rights reserved.</p>
          <p>Built open-source · Data from public records</p>
        </div>
      </div>
    </footer>
  );
}
