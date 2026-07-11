import type { CollegeContentPack, TabSection } from "./types";

// Shared builder for "ultra-rich" online-degree content packs — mirrors the
// Manipal University Jaipur (Online) flagship template exactly: 34 sections
// across 8 tabs (info×5, courses-fees×5, admissions×4, recognition×5,
// learning×5, placements×4, scholarships×3, rankings×3). Facts are injected
// per university; anything not confidently known is phrased generically
// rather than invented (no fabricated NAAC grades, WES status, or numbers).

export interface OnlineUniFacts {
  slug: string;
  /** Display name as it should appear in the DB / breadcrumbs, e.g. "Amity University (Online)". */
  displayName: string;
  /** The actual degree-awarding entity name used in prose, e.g. "Amity University". */
  uniName: string;
  /** Branded delivery platform if different from uniName, e.g. "Online Manipal". Defaults to uniName + " Online". */
  platformName?: string;
  city: string;
  state: string;
  estd?: number;
  /** e.g. "Deemed to be University", "State Private University", "Central Open University", "State Open University". */
  universityType: string;
  /** Only set when confidently known; otherwise omitted and generic phrasing is used. */
  naacGrade?: string;
  /** Only set true when confidently/commonly documented; otherwise recognition tab uses cautious generic phrasing. */
  wesRecognised?: boolean;
  /** Short parent-group note, e.g. "part of the Manipal Education & Medical Group (MEMG)". */
  groupNote?: string;
  /** e.g. "Online MBA" */
  flagshipProgram: string;
  /** Programme list for the courses-fees tab, in display order. */
  programs: { name: string; level: "PG" | "UG"; duration: string; feesLabel: string }[];
  /** Approximate per-semester fee range, low end, for the fee-structure note. */
  feeNote?: string;
  /** Whether this is a state/central open university (different tone: legacy ODL institution, not a private "online wing"). */
  isOpenUniversity?: boolean;
  website?: string;
  approvals: string[];
  feesLabel: string;
  feesNum: number;
}

const clean = (s: string) => s.replace(/\s+/g, " ").trim();

export function buildOnlinePack(f: OnlineUniFacts): CollegeContentPack {
  const platform = f.platformName ?? `${f.uniName} Online`;
  const naac = f.naacGrade ? `NAAC ${f.naacGrade} accredited` : "NAAC accredited";
  const naacShort = f.naacGrade ? `NAAC ${f.naacGrade}` : "NAAC accredited";
  const group = f.groupNote ? `, ${f.groupNote}` : "";
  const wesLine = f.wesRecognised
    ? `${f.uniName} is WES-recognised, which supports credential evaluation for higher study and employment in countries such as Canada and the US.`
    : `Confirm ${f.uniName}'s current international-recognition status (e.g. WES) directly with the university if you plan to use the degree for study or work abroad.`;
  const openNote = f.isOpenUniversity
    ? "As a long-established open university, it predates the UGC's 2020 online-degree framework and has run distance/open programmes for decades under UGC-DEB (and its predecessor, the DEC) recognition."
    : `Its online programmes are entitled by the UGC's Distance Education Bureau (UGC-DEB) to be offered in online mode.`;

  const pgPrograms = f.programs.filter((p) => p.level === "PG");
  const ugPrograms = f.programs.filter((p) => p.level === "UG");

  const sections: TabSection[] = [
    // ── INFO (5) ──────────────────────────────────────────
    {
      tab: "info",
      heading: `About ${f.uniName} (Online)`,
      body: `${f.uniName} (Online) delivers UGC-entitled online degree programmes through **${platform}**${group}. ${f.uniName} is a ${f.universityType}${f.estd ? `, established in ${f.estd}` : ""}, and is ${naac}.\n\n${openNote} The online portfolio typically spans postgraduate programmes (${pgPrograms.map((p) => p.name).join(", ")}) and undergraduate programmes (${ugPrograms.map((p) => p.name).join(", ")}), designed for working professionals, recent graduates and remote learners who want a recognised degree without attending a physical campus. The flagship offering is the **${f.flagshipProgram}**.`,
    },
    {
      tab: "info",
      heading: "Quick Facts & Snapshot",
      body: `| Attribute | Detail |\n|---|---|\n| Delivery platform | ${platform} |\n| Parent university | ${f.uniName} |\n| University type | ${f.universityType} |\n| Accreditation | ${naacShort} |\n| Online entitlement | UGC-DEB entitled |\n| Location | ${f.city}, ${f.state} |\n| Mode | 100% online (live + recorded) |\n| Intakes | Typically two per year |\n| Entrance exam | Not required for most programmes |\n| Flagship programme | ${f.flagshipProgram} |\n\nAll figures should be confirmed against the current-year prospectus on the ${platform} website.`,
    },
    {
      tab: "info",
      heading: `Why Choose ${f.uniName} Online`,
      body: `- **Recognition:** UGC-DEB entitled online degrees with the same academic value as on-campus degrees\n- **Institution:** a ${f.universityType}, ${naacShort}\n- **Flagship programme:** ${f.flagshipProgram}, built around working-professional schedules\n- **Flexibility:** recorded lectures, live sessions and remote-proctored exams\n- **Support:** enrolment advisors, academic mentors and a placement/career-support cell for online learners\n- **Affordability:** semester-wise fees with EMI options on most programmes`,
    },
    {
      tab: "info",
      heading: "Who These Online Programmes Are For",
      body: `${platform}'s ${f.uniName} programmes are built for:\n\n- **Working professionals** seeking a career upgrade (${f.flagshipProgram.includes("MBA") ? "MBA/management" : "PG"}) without a career break\n- **Recent graduates** who want a recognised degree with maximum flexibility\n- **Career switchers** moving into management, IT, analytics or finance\n- **Remote and NRI learners** who cannot relocate to ${f.city}\n\nBecause classes are recorded and exams are remote-proctored, learners can study from anywhere with a stable internet connection.`,
    },
    {
      tab: "info",
      heading: "Online vs Distance vs On-Campus: What's the Difference?",
      body: `| Feature | On-campus (regular) | Distance (correspondence) | Online (this programme) |\n|---|---|---|---|\n| Attendance | Physical, daily | Self-study + few contact classes | Fully online, live + recorded |\n| Flexibility | Low | Medium | High |\n| Exams | On-campus | Exam centre | Remote-proctored (from home) |\n| Recognition | UGC | UGC-DEB | UGC-DEB (equivalent value) |\n| Best for | Full-time students | Self-paced learners | Working professionals |\n\nUnder UGC's 2020 regulations, an online degree from a UGC-entitled university carries the **same academic value** as the corresponding on-campus degree.`,
    },

    // ── COURSES & FEES (5) ────────────────────────────────
    {
      tab: "courses-fees",
      heading: "Online Programmes Offered",
      body: `| Programme | Level | Duration | Indicative Total Fee |\n|---|---|---|---|\n${f.programs.map((p) => `| ${p.name} | ${p.level} | ${p.duration} | ${p.feesLabel} |`).join("\n")}\n\nAll fees are indicative and vary by intake and any running offers; confirm the exact current-year fee on the ${platform} website.`,
    },
    {
      tab: "courses-fees",
      heading: `${f.flagshipProgram} — Specialisations`,
      body: `The **${f.flagshipProgram}** is the flagship programme, typically offering a broad set of specialisations that a working professional can align to their career path — common tracks include Marketing, Finance, Human Resource Management, Operations, Analytics/Data Science and Information Systems.\n\nSpecialisation availability changes by intake — check the live list before enrolling. The programme is delivered across semesters with a mix of live sessions, recorded lectures, assignments and remote-proctored exams.`,
    },
    {
      tab: "courses-fees",
      heading: `Technology Programmes — Online ${ugPrograms.find((p) => /BCA/i.test(p.name)) ? "MCA & BCA" : "MCA"}`,
      body: `For IT and computing careers, ${platform} offers postgraduate and undergraduate computing programmes from ${f.uniName}:\n\n- **Online MCA (PG):** advanced software development, data structures, cloud and analytics with a capstone project — suited to graduates targeting software/IT roles.\n- **Online BCA (UG, where offered):** foundational programming, databases, web and application development — a recognised entry route into IT for 10+2 learners.\n\nBoth are UGC-entitled and delivered fully online with the same LMS, mentorship and exam model as the other programmes.`,
    },
    {
      tab: "courses-fees",
      heading: "Undergraduate Programmes — BBA, B.Com & BA",
      body: `Undergraduate options let 10+2 learners earn a recognised degree online:\n\n- **Online BBA:** management foundations, marketing, finance, HR and business analytics — a strong base for an MBA later.\n- **Online B.Com:** accounting, taxation, corporate finance and commerce — useful for finance/accounting careers and professional exams (CA/CS/CMA aspirants).\n- **Online BA:** liberal-arts/communication tracks depending on the intake.\n\nUG programmes are the most affordable tier and share the same accreditation and delivery model as the postgraduate programmes.`,
    },
    {
      tab: "courses-fees",
      heading: "Fee Structure, Semester Payment & EMI",
      body: `Fees are typically charged **per semester**, which spreads the cost across the programme.${f.feeNote ? ` ${f.feeNote}` : ""}\n\n${platform} usually offers **no-cost or low-cost EMI** and third-party education-loan tie-ups so fees can be paid monthly instead of a large upfront amount. Confirm the exact schedule, EMI plans and any scholarship-adjusted fee at the time of admission.`,
    },

    // ── ADMISSIONS (4) ────────────────────────────────────
    {
      tab: "admissions",
      heading: "Eligibility Criteria",
      body: `Eligibility depends on the programme level:\n\n- **PG (${pgPrograms.map((p) => p.name.replace("Online ", "")).join("/")}):** a bachelor's degree (typically 3–4 years) from a recognised university with the minimum aggregate specified for the programme (commonly ~50%, relaxed for reserved categories).\n- **UG (${ugPrograms.map((p) => p.name.replace("Online ", "")).join("/")}):** 10+2 (or equivalent) from a recognised board with the minimum aggregate specified.\n\nThere is **no national entrance exam** requirement for most programmes; admission is based on meeting the eligibility criteria. Always verify current-year eligibility on the ${platform} website.`,
    },
    {
      tab: "admissions",
      heading: "Admission Process — Step by Step",
      body: `1. **Register** on the ${platform} website with your basic details.\n2. **Choose** your programme and specialisation.\n3. **Fill the application** and upload the required documents.\n4. **Pay** the application/enrolment fee (and first-semester fee or EMI setup).\n5. **Document verification** by the admissions team.\n6. **Confirmation & LMS access** — you receive your enrolment confirmation and login to the learning platform.\n\nAn enrolment advisor is typically assigned to guide you through specialisation choice, financing and onboarding.`,
    },
    {
      tab: "admissions",
      heading: "Intake Sessions & Key Dates",
      body: `${platform} generally runs **two intakes per year**:\n\n| Intake | Typical application window | Classes begin |\n|---|---|---|\n| January/Spring session | Oct – Jan | January |\n| July/Autumn session | Apr – Jul | July |\n\nExact dates shift each year and applications often close in waves as batches fill. Apply early in the window to secure your preferred specialisation and any early-bird scholarship. Confirm the live calendar on the ${platform} website.`,
    },
    {
      tab: "admissions",
      heading: "Documents Required",
      body: `Keep scanned copies ready for a smooth application:\n\n- Class 10 & 12 mark sheets/certificates\n- Graduation mark sheets & degree certificate (for PG programmes)\n- Government photo ID (Aadhaar/PAN/passport)\n- Passport-size photograph\n- Category/reservation certificate (if claiming a category benefit)\n- Work-experience proof (optional, useful for some scholarships/waivers)\n\nDocuments are uploaded during the online application and verified by the admissions team before enrolment is confirmed.`,
    },

    // ── APPROVALS & RECOGNITION (5) ───────────────────────
    {
      tab: "recognition",
      heading: "UGC-DEB Entitlement & Online Degree Validity",
      body: `${f.uniName}'s online programmes are **entitled by the University Grants Commission's Distance Education Bureau (UGC-DEB)** to be offered in online mode. Under the **UGC (Open and Distance Learning Programmes and Online Programmes) Regulations, 2020**, a degree awarded in online mode by an entitled university holds the **same academic value** as the corresponding degree awarded in conventional (on-campus) mode.\n\nIn practical terms, this means the online degree is a bona fide university degree — usable for employment, competitive/government examinations and further study, subject to the specific eligibility rules of each employer or exam.`,
    },
    {
      tab: "recognition",
      heading: "Accreditations & Approvals",
      body: `| Body | Status | What it means |\n|---|---|---|\n| NAAC | ${naacShort} | Independent quality accreditation of the university |\n| UGC | Recognised ${f.universityType.toLowerCase()}; UGC-DEB entitled | Degrees are UGC-recognised; online mode is entitled |\n| Other approvals | ${f.approvals.length ? f.approvals.join(", ") : "As applicable to specific programmes"} | Programme-level approvals where relevant |\n\nAccreditation status can be revised over time — confirm the current NAAC grade and entitlement year on the university/UGC websites before enrolling.`,
    },
    {
      tab: "recognition",
      heading: "Degree Equivalence — Online Equals On-Campus",
      body: `A common concern is whether an online degree is 'lesser' than a campus degree. The regulatory position is clear:\n\n- The UGC's 2020 regulations explicitly establish **equivalence** between online-mode and on-campus degrees from entitled institutions.\n- The degree is awarded by **${f.uniName}**, the same degree-awarding university.\n\nThat said, the **learning experience** differs (self-paced, online), and some employers or foreign universities may ask for details of the mode. The academic value and eligibility, however, are treated on par with the regular degree under Indian regulations.`,
    },
    {
      tab: "recognition",
      heading: "International Recognition & Study Abroad",
      body: `${wesLine}\n\nRecognition of any online degree still depends on the **specific university, employer or immigration authority** you're applying to — always confirm their acceptance of online-mode degrees and the exact credential evaluation they require before applying.`,
    },
    {
      tab: "recognition",
      heading: "Is the Degree Valid for Government Jobs & Higher Study?",
      body: `- **Government jobs & exams:** UGC-entitled online degrees are generally accepted for eligibility, but individual recruiters/commissions (UPSC, SSC, state PSCs, banks) set their own conditions — verify the specific notification's wording on distance/online degrees.\n- **Higher study:** the degree is valid for further study at recognised institutions; some competitive/foreign programmes may have additional criteria.\n- **Professional progression:** widely accepted by private employers for promotions, role changes and salary bands that require a recognised degree.\n\nWhen a specific eligibility rule matters to you, confirm it in writing with that employer/authority before enrolling.`,
    },

    // ── LEARNING EXPERIENCE (5) ───────────────────────────
    {
      tab: "learning",
      heading: `The ${platform} Learning Platform (LMS)`,
      body: `All teaching, content and assessment run through the **${platform} LMS**, accessible via web and (where offered) a mobile app. A typical learner dashboard brings together:\n\n- **Recorded lectures** for every module (watch anytime, any device)\n- **Live/interactive sessions** with faculty on a schedule\n- **E-learning content** — reading material, presentations and reference resources\n- **Assignments, quizzes and discussion forums**\n- **Exam scheduling and results**\n\nBecause content is recorded and downloadable within the app, learners can study offline and revisit lectures before exams — key for working professionals with irregular hours.`,
    },
    {
      tab: "learning",
      heading: "Live Classes, Recorded Lectures & Study Material",
      body: `The programme blends **synchronous** and **asynchronous** learning:\n\n- **Recorded video lectures** cover the full syllabus and are the backbone of the course — ideal for self-paced study.\n- **Live online classes** add real-time interaction, doubt-solving and industry context.\n- **Curated e-content** (readings, case studies, slide decks) supports each module.\n- **Access to the university's digital library and resources** for research and assignments.\n\nThis structure lets a learner keep pace even if they miss a live session, since everything is available on-demand in the LMS.`,
    },
    {
      tab: "learning",
      heading: "Examination Pattern — Remote-Proctored Exams",
      body: `End-of-semester examinations are conducted through **remote proctoring**, so learners can appear **from home**:\n\n- Exams are taken online at a scheduled time, monitored by AI/human proctoring via webcam.\n- A stable internet connection, a webcam-enabled device and a quiet space are required.\n- Assessment typically combines **internal assessment** (assignments/quizzes) with the **proctored semester exam**.\n\nThis removes the need to travel to a physical exam centre — one of the biggest practical advantages of the online mode for working professionals and remote learners.`,
    },
    {
      tab: "learning",
      heading: "Mentorship, Doubt-Solving & Student Support",
      body: `Online learners get structured support so they are not studying in isolation:\n\n- **Academic mentors / programme coordinators** to guide progress\n- **Doubt-clearing sessions** and discussion forums with faculty and peers\n- **Enrolment & success advisors** for administrative help (fees, exams, documents)\n- **Peer community** across the online cohort for networking\n- **Technical support** for LMS/app issues\n\nThe combination of mentorship plus an always-on LMS is designed to keep completion rates high despite the flexibility of online study.`,
    },
    {
      tab: "learning",
      heading: "Flexibility, Duration & Mobile Learning",
      body: `The online model is built around a **working schedule**:\n\n- **Study anytime, anywhere** via the mobile app/web LMS\n- **No relocation, no daily commute** — attend from any city or country\n- **Recorded content** means you set your own study rhythm\n- **Standard programme duration** — same as the equivalent on-campus degree\n\nFor most learners the biggest benefit is being able to **upskill without a career break**, applying new learning directly at work while the degree is in progress.`,
    },

    // ── PLACEMENTS (4) ────────────────────────────────────
    {
      tab: "placements",
      heading: "Career Support for Online Learners",
      body: `${platform} typically provides a **dedicated career-support / placement cell** for online-degree learners — distinct from a traditional campus placement drive. Common services include:\n\n- **Resume and LinkedIn profile building**\n- **Interview preparation** and soft-skills training\n- **Access to a jobs/opportunities portal** with partner employers\n- **Virtual placement drives and webinars**\n- **Career counselling** aligned to the learner's specialisation\n\nBecause many online learners are **already employed**, the emphasis is on **career advancement, role change and salary progression** rather than a first job.`,
    },
    {
      tab: "placements",
      heading: "Career Outcomes & Recruiter Ecosystem",
      body: `Outcomes vary widely because online cohorts mix fresh graduates and experienced professionals. Reported outcomes for online learners commonly include:\n\n- **Promotions and role upgrades** within the learner's current organisation\n- **Switches into management, analytics, IT and finance roles**\n- **Participation in virtual placement drives** with the platform's hiring partners\n\nTreat any single 'average package' figure as **indicative** and confirm current placement statistics directly with ${platform}, since outcomes depend heavily on the individual's prior experience and specialisation.`,
    },
    {
      tab: "placements",
      heading: "Value for Working Professionals",
      body: `For someone already working, the placement value of an online degree is best measured as **return on career**, not a campus package:\n\n- **Eligibility unlock:** many mid/senior roles and salary bands require a recognised degree — the online programme fulfils that without a career break.\n- **Skill-to-job transfer:** learners apply coursework directly at work, often accelerating promotions.\n- **Brand & network:** the ${f.uniName} name and alumni network add credibility on a CV.\n\nThis is the core reason working professionals choose a recognised online degree over a full-time programme.`,
    },
    {
      tab: "placements",
      heading: "Industry Projects & Applied Learning",
      body: `The programmes embed **applied, industry-relevant work** so learning translates into employability:\n\n- **Capstone / project work** (especially in PG programmes)\n- **Case-study-driven assessments** reflecting real business/technology problems\n- **Guest sessions and webinars** with industry practitioners\n- **Specialisation electives** aligned to in-demand roles\n\nWhile online programmes don't include a traditional in-person internship, the project and case-study components are designed to build a portfolio a learner can showcase to employers.`,
    },

    // ── SCHOLARSHIPS (3) ──────────────────────────────────
    {
      tab: "scholarships",
      heading: "Scholarships & Fee Concessions",
      body: `${platform} periodically offers **scholarships and fee concessions** that reduce the effective programme cost. Commonly available categories include:\n\n- **Merit-based** concessions for strong academic records\n- **Early-bird** discounts for applying early in an intake\n- **Defence personnel & their dependents**\n- **Divyang (persons with disability)** concessions\n- **Alumni** benefits (where applicable)\n\nScholarship availability and percentages change by intake and cannot usually be combined unless stated. Confirm the live scholarship list and eligibility with your enrolment advisor before paying fees.`,
    },
    {
      tab: "scholarships",
      heading: "EMI & Education-Loan Options",
      body: `To make fees manageable, ${platform} typically supports:\n\n- **No-cost / low-cost EMI** on programme fees via financing partners\n- **Third-party education loans** through NBFC/bank tie-ups\n- **Semester-wise payment**, which naturally spreads the cost\n\nEMI plans let learners pay monthly instead of a large upfront amount — particularly useful for working professionals self-funding the degree. Interest terms depend on the financing partner; review them carefully before signing.`,
    },
    {
      tab: "scholarships",
      heading: "Who Should Ask About a Waiver",
      body: `You should specifically ask your enrolment advisor about concessions if you are:\n\n- A **defence-services** member or dependent\n- A **person with a disability (Divyang)**\n- A **${f.uniName} alumnus**\n- Applying **early** in the intake window\n- Able to demonstrate **strong academic merit** or relevant **work experience**\n\nEven a modest percentage waiver on a two- or three-year programme is a meaningful saving, so it's worth confirming eligibility before you lock in your fee plan.`,
    },

    // ── RANKINGS (3) ───────────────────────────────────────
    {
      tab: "rankings",
      heading: "Accreditation & Quality Standing",
      body: `| Marker | Status |\n|---|---|\n| NAAC | ${naacShort} |\n| UGC | Recognised ${f.universityType.toLowerCase()}; UGC-DEB entitled online programmes |\n| Group${f.groupNote ? "" : " affiliation"} | ${f.groupNote ?? "Independent university"} |\n\nFor online degrees, **accreditation and entitlement matter more than a stream rank** — they determine whether the degree is recognised and valued. ${f.uniName}'s ${naacShort.toLowerCase()} status and UGC-DEB entitlement are its core quality signals. Confirm the current NAAC grade and entitlement on the official sites.`,
    },
    {
      tab: "rankings",
      heading: "Institutional Reputation & Online Standing",
      body: `${f.uniName} is a ${f.universityType.toLowerCase()} based in ${f.city}, ${f.state}${group}. Unlike campus NIRF rankings (which assess physical institutions), online programmes are best judged by **accreditation, entitlement, brand strength and learner outcomes** — areas where ${f.uniName}'s online programmes aim to compete.\n\nWhere a specific ranking, survey position or media mention is quoted elsewhere, verify its source and year before relying on it.`,
    },
    {
      tab: "rankings",
      heading: "How to Judge an Online University",
      body: `When comparing online-degree providers, weigh these factors in order:\n\n1. **UGC-DEB entitlement** — non-negotiable for a valid degree\n2. **NAAC / university accreditation** — quality assurance\n3. **Brand and employer recognition** — how the degree reads on a CV\n4. **International recognition (e.g. WES)** — if you may study/work abroad\n5. **LMS quality, mentorship and support** — completion and experience\n6. **Fees, EMI and scholarships** — total cost of the degree\n\n${f.uniName} (Online) should be evaluated against these same factors alongside other options before you enrol.`,
    },
  ];

  return {
    slug: f.slug,
    college: {
      estd: f.estd,
      website: f.website,
      feesNum: f.feesNum,
      feesLabel: f.feesLabel,
      packageLabel: `Career support via ${platform} placement cell`,
      affiliation: `${f.uniName} (${f.universityType}${f.groupNote ? `, ${f.groupNote}` : ""})`,
      approvedBy: `UGC-DEB entitled; ${naac}${f.approvals.length ? `; ${f.approvals.join("; ")}` : ""}`,
      metaTitle: `${f.uniName} (Online) 2026 — Fees, Courses, Admission, UGC-DEB Recognition`,
      metaDescription: `${f.uniName} (Online) via ${platform}: online ${f.programs.map((p) => p.name.replace("Online ", "")).join("/")} fees, admission, UGC-DEB entitlement, ${naacShort}, LMS, exams and placement support.`,
      about: clean(
        `${f.uniName} (Online), delivered through ${platform}, offers UGC-entitled online degree programmes from a ${naacShort.toLowerCase()} ${f.universityType.toLowerCase()}${group}. Its ${f.flagshipProgram} is aimed at working professionals and recent graduates who need a fully online, flexible degree with the same academic value as an on-campus degree.`,
      ),
    },
    courses: f.programs.map((p) => ({ name: p.name, duration: p.duration, seats: "No fixed cap (online)", feesLabel: p.feesLabel })),
    highlights: [
      `${naacShort} ${f.universityType.toLowerCase()}, UGC-entitled online degrees`,
      `${f.flagshipProgram} is the flagship online programme`,
      `Fully online delivery via the ${platform} LMS — live + recorded classes`,
      "Degree carries the same academic value as an on-campus degree (UGC 2020 norms)",
      "Two intakes a year; no entrance exam for most programmes",
      "Dedicated placement & career-support cell for online learners",
      "EMI and no-cost financing options on programme fees",
    ],
    faqs: [
      {
        question: `Is the ${f.uniName} online degree valid?`,
        answer: `Yes. Online programmes from ${f.uniName} are entitled by the UGC's Distance Education Bureau (UGC-DEB), and under the UGC's 2020 regulations an online degree from an entitled university holds the same academic value as the equivalent on-campus degree — valid for jobs, government exams and higher education.`,
      },
      {
        question: `Is the ${platform} ${f.flagshipProgram} good for working professionals?`,
        answer: `Yes. The programme is designed for flexibility — recorded and live classes, remote-proctored exams and a mobile-friendly LMS — so working professionals can study without career breaks while earning a recognised degree.`,
      },
      {
        question: "Is the online degree recognised abroad?",
        answer: f.wesRecognised
          ? `${f.uniName} is WES-recognised, which supports credential evaluation for higher study and employment in countries such as Canada and the US. Always confirm specific-country/employer requirements before applying abroad.`
          : `Confirm ${f.uniName}'s current international-recognition status directly with the university before applying abroad, since requirements vary by country, employer and programme.`,
      },
    ],
    sections,
  };
}
