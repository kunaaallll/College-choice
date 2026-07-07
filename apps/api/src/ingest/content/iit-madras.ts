import type { CollegeContentPack } from "./types";

/**
 * IIT Madras — full editorial content pack (demo standard for all enriched
 * colleges). Figures are from the institute's placement reports, JoSAA 2025
 * data and NIRF 2024; indicative values are labelled as such.
 */
export const iitMadras: CollegeContentPack = {
  slug: "indian-institute-of-technology-madras",

  college: {
    estd: 1959,
    website: "https://www.iitm.ac.in",
    feesNum: 850000,
    feesLabel: "₹8.5 L",
    packageLabel: "₹22.0 LPA",
    affiliation: "Autonomous — Institute of National Importance",
    approvedBy: "Ministry of Education, Government of India",
    about:
      "IIT Madras is ranked #1 in NIRF Engineering 2024 (9th consecutive year). Located on a 617-acre campus in Chennai, it offers B.Tech, M.Tech, MBA, M.Sc and India's first fully online BS degree.",
    metaTitle: "IIT Madras: Admission 2026, Courses, Fees, Cutoff, Placements & Rankings",
    metaDescription:
      "IIT Madras — NIRF #1 engineering institute. B.Tech fees ₹8.5 L, average package ₹22 LPA, highest ₹4.3 Cr. Admission 2026 via JEE Advanced, GATE, JAM, CAT. Cutoffs, scholarships, hostel.",
  },

  courses: [
    { name: "B.Tech (16 branches)", duration: "4 years", seats: "~1,150", feesLabel: "₹8.5 L" },
    { name: "B.Tech + M.Tech Dual Degree", duration: "5 years", seats: "~300", feesLabel: "₹10.5 L" },
    { name: "M.Tech", duration: "2 years", seats: "~1,200", feesLabel: "₹1.4 L" },
    { name: "BS Data Science & Applications (Online)", duration: "3–4 years", seats: "No cap", feesLabel: "₹3.0 L" },
    { name: "MBA (DoMS)", duration: "2 years", seats: "~60", feesLabel: "₹9.6 L" },
    { name: "M.Sc (Physics / Chemistry / Mathematics)", duration: "2 years", seats: "~250", feesLabel: "₹0.6 L" },
    { name: "PhD", duration: "4–6 years", seats: "Rolling", feesLabel: "₹1.0 L (stipend paid)" },
  ],

  placement: { avgPackage: "₹22.0 LPA", highestPackage: "₹4.3 Cr", placedPct: "80%+" },

  recruiters: [
    "Google",
    "Microsoft",
    "Jane Street",
    "Amazon",
    "Qualcomm",
    "Texas Instruments",
    "Goldman Sachs",
    "JPMorgan Chase",
    "McKinsey & Company",
    "Adobe",
    "Intel",
    "Flipkart",
    "Bajaj Auto",
    "ITC",
    "Schlumberger",
  ],

  highlights: [
    "Ranked #1 in NIRF Engineering for 9 consecutive years (2016–2024)",
    "Ranked #1 Overall in NIRF for 6 consecutive years (2019–2024)",
    "All-time record offer of ₹4.3 Cr (Jane Street, 2024–25 season)",
    "Average package ₹22 LPA, median ₹19.6 LPA (2024 batch)",
    "617-acre residential campus adjoining Guindy National Park",
    "India's first fully online BS degree (Data Science & Applications)",
    "IIT Madras Research Park — India's first university research park",
    "300+ startups incubated, including Ather Energy",
  ],

  faqs: [
    {
      question: "What is IIT Madras ranked in NIRF 2024?",
      answer:
        "IIT Madras is ranked #1 in the NIRF 2024 Engineering rankings — its 9th consecutive year at the top — and #1 Overall for the 6th year running. It also leads the NIRF Research category.",
    },
    {
      question: "What JEE Advanced rank is needed for CSE at IIT Madras?",
      answer:
        "In JoSAA 2025 Round 1, B.Tech Computer Science at IIT Madras closed at rank 171 (General, gender-neutral; opening rank 79). Closing ranks move slightly across rounds and years, so a rank under ~200 is a realistic target for CSE.",
    },
    {
      question: "What is the total fee for B.Tech at IIT Madras?",
      answer:
        "The complete 4-year cost is roughly ₹8.5–10 lakh including tuition (₹2 lakh/year), hostel and mess. Students with family income below ₹1 lakh get a full tuition waiver, and income between ₹1–5 lakh gets a two-thirds waiver; SC/ST/PwD students pay no tuition.",
    },
    {
      question: "What is the average package at IIT Madras?",
      answer:
        "For the 2024 graduating batch, the average package was about ₹22 LPA with a median of ₹19.6 LPA. The highest-ever offer, ₹4.3 crore, came from Jane Street in the 2024–25 season. Over 80% of B.Tech/Dual-Degree students were placed.",
    },
    {
      question: "Does IIT Madras provide hostel accommodation to all students?",
      answer:
        "Yes. IIT Madras is a fully residential campus with about 20 hostels named after Indian rivers. Hostel plus mess charges add roughly ₹1–1.3 lakh per year (indicative; see the official fee card).",
    },
    {
      question: "Who can join the IIT Madras online BS in Data Science?",
      answer:
        "Anyone who has passed Class 12 (with Class 11/12-level Maths and English) can apply — there is no age limit, no JEE requirement and no seat cap. Admission is through a qualifier process, and learners can exit with a certificate, diploma, BSc or full BS degree.",
    },
  ],

  sections: [
    // ─────────────────────────── INFO ───────────────────────────
    {
      tab: "info",
      heading: "About IIT Madras",
      body: `**Indian Institute of Technology Madras (IIT Madras)** is India's top-ranked engineering institution — #1 in the NIRF Engineering rankings for nine consecutive years (2016–2024) and #1 Overall for six years running. Established in **1959** with technical assistance from West Germany, it was the third IIT and is today an Institute of National Importance and an Institution of Eminence.

The institute sits on a **617-acre residential campus** in south Chennai, carved out of the Guindy National Park extension — famous for its tree-lined avenues, deer and blackbuck. Academics span **16 departments** across engineering, sciences, humanities and management, with around 600 faculty and over 10,000 students.

IIT Madras pioneered the **IIT Madras Research Park**, India's first university-based research park, and runs one of the country's most active deep-tech incubation ecosystems with 300+ startups (including Ather Energy). In 2020 it became the first IIT to launch a **fully online BS degree** (Data Science and Applications), opening IIT education to learners nationwide.`,
    },
    {
      tab: "info",
      heading: "IIT Madras Highlights 2026",
      body: `| Attribute | Details |
|---|---|
| Established | 1959 (third IIT) |
| Campus | 617 acres, fully residential, Chennai |
| NIRF 2024 | #1 Engineering (9th year), #1 Overall (6th year), #1 Research |
| Departments | 16 (Engineering, Sciences, Humanities, Management) |
| Programmes | B.Tech, Dual Degree, M.Tech, MBA, M.Sc, MA, BS (Online), MS, PhD |
| Entrance exams | JEE Advanced, GATE, JAM, CAT, institute qualifier (online BS) |
| Students | 10,000+ |
| Highest package (2024–25) | ₹4.3 Cr (Jane Street — all-time record) |
| Average package (2024) | ₹22 LPA (median ₹19.6 LPA) |
| Official website | [www.iitm.ac.in](https://www.iitm.ac.in) |`,
    },
    {
      tab: "info",
      heading: "What's New at IIT Madras",
      body: `- **Record-breaking offer:** a Computer Science student received a **₹4.3 crore** pre-placement offer from Jane Street (Hong Kong) in the 2024–25 season — the highest ever at IIT Madras.
- **NIRF 2024:** retained the #1 Engineering rank for the 9th straight year and #1 Overall for the 6th.
- **Online BS growth:** the Data Science & Applications programme has grown past 20,000 enrolled learners, the largest programme of its kind in India.
- **Research & innovation:** IIT Madras continues to lead the NIRF Research category, and its incubation cell has crossed 300 incubated startups.`,
    },
    {
      tab: "info",
      heading: "Notable Alumni",
      body: `- **Venkatraman Ramakrishnan** — Nobel Laureate in Chemistry (2009)
- **Sridhar Vembu** — founder & CEO, Zoho Corporation
- **Kris Gopalakrishnan** — co-founder, Infosys
- **Prem Watsa** — founder & chairman, Fairfax Financial Holdings
- **Gururaj "Desh" Deshpande** — serial entrepreneur & philanthropist
- **Tarun Mehta & Swapnil Jain** — founders of Ather Energy, incubated on campus
- **B. Muthuraman** — former Managing Director, Tata Steel`,
    },
    {
      tab: "info",
      heading: "Why Choose IIT Madras?",
      body: `- **Consistent #1 ranking** — the most decorated engineering institute in NIRF history.
- **Outcomes** — ₹22 LPA average package with global recruiters like Google, Jane Street and McKinsey on campus.
- **Research muscle** — highest research output among IITs, a dedicated Research Park and 300+ incubated startups.
- **True campus life** — a fully residential, green 617-acre campus with legendary festivals (Saarang and Shaastra).
- **Flexibility** — dual degrees, interdisciplinary minors and India's first online BS for learners outside the JEE route.`,
    },

    // ─────────────────────── COURSES & FEES ───────────────────────
    {
      tab: "courses-fees",
      heading: "IIT Madras Courses 2026: Overview",
      body: `IIT Madras offers undergraduate, postgraduate and doctoral programmes across 16 departments. Admission is exam-based for every programme, and fees vary sharply between UG and PG levels because of assistantships and waivers.

| Programme | Duration | Admission route | Approx. total fees |
|---|---|---|---|
| B.Tech (16 branches) | 4 years | JEE Advanced + JoSAA | ₹8.5–10 L |
| B.Tech + M.Tech Dual Degree | 5 years | JEE Advanced + JoSAA | ₹10–12 L |
| M.Tech | 2 years | GATE + COAP | ₹1–1.5 L (offset by ₹12,400/month HTRA) |
| MBA (DoMS) | 2 years | CAT + interview | ₹9–10 L |
| M.Sc (Physics/Chemistry/Maths) | 2 years | IIT JAM | ₹50–70 K |
| BS Data Science & Applications (Online) | 3–4 years | Institute qualifier | ₹2.5–4 L (exit-level dependent) |
| PhD | 4–6 years | GATE/NET + interview | Nominal; stipend ₹37,000–42,000/month |

Fees above are indicative totals for the full programme; always verify against the current semester fee card on the official website.`,
    },
    {
      tab: "courses-fees",
      heading: "B.Tech Fee Structure (General Category, Indicative)",
      body: `| Component | Amount per year |
|---|---|
| Tuition fee | ₹2,00,000 |
| Other institute fees (exam, medical, gymkhana etc.) | ₹15,000–25,000 |
| Hostel rent & establishment charges | ₹40,000–60,000 |
| Mess advance | ₹60,000–70,000 |
| **Approximate total** | **₹3.2–3.5 L per year (≈ ₹8.5–10 L for 4 years)** |

**Large fee waivers apply:**
- Family income below ₹1 lakh/year — **100% tuition waiver**
- Family income ₹1–5 lakh/year — **two-thirds tuition waiver**
- SC / ST / PwD students — **full tuition waiver**

With waivers, the effective 4-year cost for many students is dominated by hostel and mess charges alone.`,
    },
    {
      tab: "courses-fees",
      heading: "B.Tech Branches at IIT Madras",
      body: `- Computer Science & Engineering (~87 seats — most competitive)
- Data Science & Artificial Intelligence
- Electrical Engineering (~150 seats)
- Mechanical Engineering
- Aerospace Engineering
- Chemical Engineering
- Civil Engineering
- Engineering Physics
- Metallurgical & Materials Engineering
- Ocean Engineering / Naval Architecture
- Biological Engineering
- Engineering Design (5-year dual degree)

Seat counts change slightly each year with JoSAA's seat matrix; several branches also admit through 5-year dual-degree variants.`,
    },
    {
      tab: "courses-fees",
      heading: "BS in Data Science & Applications (Online)",
      body: `India's first fully online undergraduate degree from an IIT. Learners join through a **qualifier process** (no JEE), study at their own pace and can exit at four levels — Foundation certificate, Diploma, BSc, or the full **BS degree**.

- **Eligibility:** Class 12 pass with Class 11/12-level Mathematics and English; no age limit, no seat cap.
- **Fees:** roughly ₹2.5–4 lakh for the complete BS, paid per course — a fraction of on-campus cost.
- **Outcomes:** graduates receive an IIT Madras degree; top performers have transitioned into MS/PhD programmes and data roles at major companies.`,
    },

    // ───────────────────────── ADMISSIONS ─────────────────────────
    {
      tab: "admissions",
      heading: "IIT Madras Admission 2026: Overview",
      body: `Every programme at IIT Madras admits through a national exam followed by centralised counselling or an institute selection round.

| Programme | Exam | Typical timeline (2026 cycle) |
|---|---|---|
| B.Tech / Dual Degree | JEE Main → JEE Advanced → JoSAA | Jan–Apr (Main), May (Advanced), Jun–Jul (JoSAA) |
| M.Tech | GATE + COAP | Feb (GATE), Mar–Jun (COAP rounds) |
| MBA (DoMS) | CAT + PI | Nov 2025 (CAT), Jan–Apr 2026 (selection) |
| M.Sc | IIT JAM | Feb (exam), Mar–Jun (admission rounds) |
| BS Online | Institute qualifier | Multiple terms per year |
| PhD | GATE/NET + interview | Twice yearly (Apr & Oct intakes) |`,
    },
    {
      tab: "admissions",
      heading: "B.Tech Admission via JEE Advanced & JoSAA",
      body: `- **Step 1 — JEE Main (January & April 2026):** the top ~2.5 lakh scorers qualify for JEE Advanced.
- **Step 2 — JEE Advanced (May 2026):** register on the official portal and appear for both papers; the rank list is released in June.
- **Step 3 — JoSAA counselling (June–July 2026):** fill choices across IITs; around 5–6 seat-allotment rounds follow. IIT Madras CSE typically closes under rank ~200 (General).
- **Step 4 — Seat acceptance:** pay the seat-acceptance fee, complete online document verification and report to the institute.

**Tip:** fill a wide, honestly-ordered preference list in JoSAA — closing ranks shift between rounds, and float/slide options let you upgrade without risk.`,
    },
    {
      tab: "admissions",
      heading: "M.Tech Admission (GATE + COAP)",
      body: `M.Tech admission is through a valid **GATE score** followed by the **COAP** (Common Offer Acceptance Portal) rounds between March and June. Cutoff scores vary by department — Computer Science and Data Science specialisations are the most competitive. Full-time M.Tech students receive a **Half-Time Research Assistantship (HTRA) of ₹12,400/month**, which effectively offsets tuition for most students.`,
    },
    {
      tab: "admissions",
      heading: "MBA, M.Sc & PhD Admission",
      body: `- **MBA (DoMS IIT Madras):** CAT 2025 score followed by a personal interview round between January and April 2026. Work experience is valued but not mandatory.
- **M.Sc:** through **IIT JAM** (held in February) with centralised counselling across IITs.
- **PhD / MS by Research:** applications open twice a year (April and October intakes) with selection via written test/interview; GATE, NET or equivalent is required for most categories, and stipends of ₹37,000–42,000/month apply.`,
    },
    {
      tab: "admissions",
      heading: "Documents Required",
      body: `- JEE Advanced / GATE / JAM / CAT scorecard and admit card
- Class 10 and Class 12 marksheets and certificates
- Seat allotment letter (JoSAA/COAP) and seat-acceptance proof
- Category certificate (OBC-NCL / SC / ST / EWS / PwD), if applicable
- Photo ID (Aadhaar/passport), passport photos and medical fitness certificate
- Graduation marksheets and degree (for PG programmes)`,
    },

    // ───────────────────────── PLACEMENTS ─────────────────────────
    {
      tab: "placements",
      heading: "IIT Madras Placements 2025: Highlights",
      body: `IIT Madras runs one of India's strongest placement programmes. As per institute placement reports and media coverage of the 2023–24 and 2024–25 seasons:

| Metric | Value |
|---|---|
| Highest package (2024–25) | **₹4.3 Cr** — Jane Street, Hong Kong (all-time record) |
| Average package (2024 batch) | ₹22 LPA |
| Median package (2024 batch) | ₹19.6 LPA |
| Companies participating | 256 |
| Pre-placement offers (PPOs) | 300 extended, 235 accepted |
| International offers | 44 |
| B.Tech / Dual-Degree placed | 80%+ (as of end of season) |

CSE and allied computing branches command the highest packages, with the CSE B.Tech cohort recording an **average of ~₹53 LPA and median of ~₹46 LPA** in 2024–25.`,
    },
    {
      tab: "placements",
      heading: "Branch-wise Placement Trends (Indicative)",
      body: `| Branch | Typical average package |
|---|---|
| Computer Science & Engineering | ₹45–55 LPA |
| Data Science & AI | ₹30–40 LPA |
| Electrical Engineering | ₹22–30 LPA |
| Mechanical Engineering | ₹15–20 LPA |
| Chemical Engineering | ₹14–18 LPA |
| Civil Engineering | ₹12–16 LPA |

Figures are indicative, compiled from recent placement seasons; exact numbers vary by year and cohort. Core-sector branches also see strong PSU and research recruitment beyond these averages.`,
    },
    {
      tab: "placements",
      heading: "Top Recruiters",
      body: `Marquee recruiters across software, finance, consulting and core engineering visit every season, including **Google, Microsoft, Jane Street, Amazon, Qualcomm, Texas Instruments, Goldman Sachs, JPMorgan Chase, McKinsey & Company, Adobe, Intel, Flipkart, Bajaj Auto, ITC and Schlumberger**. Quant-trading and HFT firms (Jane Street, Tower Research, Da Vinci) have driven the record international offers of recent years.`,
    },
    {
      tab: "placements",
      heading: "Internships & PPOs",
      body: `The internship drive runs in the third year (December window), and converts strongly: **300 PPOs were extended in the 2024–25 season, of which 235 were accepted**. Internships at quant firms and global tech companies are the primary route to the highest packages, so CGPA and coding-round preparation from the second year onward matter significantly.`,
    },

    // ─────────────────────────── CUTOFFS ───────────────────────────
    {
      tab: "cutoffs",
      heading: "IIT Madras Cutoff 2025: Key Trends",
      body: `IIT Madras cutoffs are among the tightest in JoSAA. In **JoSAA 2025 Round 1**, B.Tech **Computer Science closed at rank 171** (General, gender-neutral; opening rank 79). Closing ranks relax slightly by the final round, but CSE has stayed under ~200 for several years. The newer **Data Science & AI** branch closes soon after CSE, while core branches (Mechanical, Civil) extend into four-digit ranks.`,
    },
    {
      tab: "cutoffs",
      heading: "Branch-wise Closing Ranks (General, Gender-Neutral)",
      body: `| Branch | Closing rank (JoSAA 2025 R1 / recent rounds, approx.) |
|---|---|
| Computer Science & Engineering | **171** (2025 R1, actual) |
| Data Science & AI | ~330 |
| Electrical Engineering | ~1,100–1,300 |
| Engineering Physics | ~2,400–2,800 |
| Aerospace Engineering | ~3,000–3,600 |
| Mechanical Engineering | ~4,000–4,700 |
| Chemical Engineering | ~5,300–6,000 |
| Metallurgical & Materials | ~7,500–8,300 |
| Civil Engineering | ~7,800–8,800 |
| Biological Engineering | ~9,200–10,200 |
| Naval Architecture & Ocean Eng. | ~9,800–11,000 |

Except where marked actual, ranks are approximate compilations of recent JoSAA rounds — final-round figures vary by year. Use them as targets, not guarantees.`,
    },
    {
      tab: "cutoffs",
      heading: "Category-wise Cutoff Guidance",
      body: `Category closing ranks are published as **category ranks**, not common ranks. For reference, IIT Madras CSE closed around **category rank 97 for OBC-NCL** and **29 for EWS** in JoSAA 2025 Round 1. As a rule of thumb, OBC-NCL category ranks run at roughly half the General closing rank, and SC/ST closing category ranks are lower still — always check the official JoSAA opening/closing rank archive for your exact category and gender pool.`,
    },
    {
      tab: "cutoffs",
      heading: "GATE Cutoffs for M.Tech",
      body: `M.Tech cutoffs vary by department and specialisation. Competitive specialisations (Computer Science, Data Science, VLSI) typically demand **GATE scores upward of ~700–750**, while core specialisations admit at moderately lower scores. COAP offers move in multiple rounds, so candidates near the boundary should hold and watch successive rounds before accepting.`,
    },

    // ──────────────────────── SCHOLARSHIPS ────────────────────────
    {
      tab: "scholarships",
      heading: "Fee Waivers & Institute Scholarships",
      body: `- **Merit-cum-Means (MCM) waiver:** family income below ₹1 lakh/year → **full tuition waiver**; income ₹1–5 lakh/year → **two-thirds tuition waiver** (covers a large share of UG students).
- **SC / ST / PwD students:** complete tuition fee exemption; hostel-related concessions also apply.
- **Institute Merit Prize & Free Studentship:** awarded for top academic performance each year.
- **Sports & cultural scholarships:** for students representing the institute at national level.`,
    },
    {
      tab: "scholarships",
      heading: "Assistantships for PG & Research Students",
      body: `| Programme | Assistantship |
|---|---|
| M.Tech (full-time) | HTRA ₹12,400/month |
| PhD (years 1–2) | ₹37,000/month |
| PhD (after upgrade) | ₹42,000/month |
| MS by Research | HTRA at par with M.Tech |

Assistantships require 8 hours/week of teaching/research assistance and effectively make postgraduate study at IIT Madras self-financing for most students.`,
    },
    {
      tab: "scholarships",
      heading: "External Scholarships",
      body: `Students regularly combine institute waivers with national and private scholarships:

- **Central Sector Scheme of Scholarships** (Ministry of Education)
- **State government post-matric and merit scholarships**
- **Aditya Birla Group Scholarship** (for top JEE ranks)
- **Reliance Foundation Undergraduate Scholarships**
- **O.P. Jindal Engineering & Management Scholarships**
- Alumni-funded need-based grants administered through the Office of Alumni & Corporate Relations`,
    },

    // ────────────────────────── RANKINGS ──────────────────────────
    {
      tab: "rankings",
      heading: "IIT Madras Rankings 2024–25",
      body: `| Ranking | Position |
|---|---|
| NIRF 2024 — Engineering | **#1** (9th consecutive year) |
| NIRF 2024 — Overall | **#1** (6th consecutive year) |
| NIRF 2024 — Research | **#1** |
| NIRF 2024 — Management (DoMS) | #16 |
| QS World University Rankings 2026 | ~#180 (first Indian IIT cohort inside top 200) |
| ARIIA (Innovation) | #1 in multiple editions |`,
    },
    {
      tab: "rankings",
      heading: "Year-wise NIRF Engineering Rank",
      body: `| Year | NIRF Engineering rank |
|---|---|
| 2024 | #1 |
| 2023 | #1 |
| 2022 | #1 |
| 2021 | #1 |
| 2020 | #1 |
| 2016–2019 | #1 every year |

No other institute has held the NIRF Engineering top spot even once since the rankings began in 2016.`,
    },
    {
      tab: "rankings",
      heading: "Accreditations & Recognition",
      body: `- **Institute of National Importance** under the Institutes of Technology Act
- **Institution of Eminence (IoE)** status conferred in 2019
- Programmes accredited by **NBA**; the institute leads national research metrics (publications, patents, PhD output)
- Home to the **IIT Madras Research Park** and one of India's largest deep-tech incubation ecosystems`,
    },

    // ─────────────────────────── HOSTEL ───────────────────────────
    {
      tab: "hostel",
      heading: "Hostels at IIT Madras",
      body: `IIT Madras is a **fully residential campus** — every student is guaranteed hostel accommodation. There are about **20 hostels named after Indian rivers** (Ganga, Kaveri, Godavari, Brahmaputra, Saraswathi and Sarayu among them; Sarayu and Sharavati house women students). Rooms are predominantly single-occupancy for senior students, with double sharing in the first year in some hostels.`,
    },
    {
      tab: "hostel",
      heading: "Hostel & Mess Fees (Indicative)",
      body: `| Component | Amount |
|---|---|
| Hostel rent & establishment charges | ₹40,000–60,000 per year |
| Mess advance | ₹30,000–35,000 per semester |
| **Approximate hostel + mess total** | **₹1.0–1.3 L per year** |

Multiple messes (including the central Himalaya mess complex) offer North Indian, South Indian and special menus; students choose and can switch mess each semester. Figures are indicative — the official semester fee card carries exact amounts.`,
    },
    {
      tab: "hostel",
      heading: "Campus Life & Facilities",
      body: `- **617-acre green campus** shared with spotted deer and blackbuck — one of India's most distinctive university settings.
- **Saarang** (cultural) and **Shaastra** (technical) — two of India's largest entirely student-run festivals.
- **Sports:** stadium, Olympic-size pool, tennis/basketball courts and a modern gymkhana.
- **Academics support:** the Central Library, high-performance computing centre and 24×7 reading halls.
- **Health & convenience:** on-campus hospital, banks, eateries (Café Coffee Day, Zaitoon and the iconic campus tea shops) and shuttle buses across campus.
- **Innovation:** the Centre for Innovation (CFI) student lab and Nirmaan pre-incubator feed directly into the institute's startup ecosystem.`,
    },
  ],
};
