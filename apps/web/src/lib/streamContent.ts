// Editorial content shown on each course/stream landing page (like KollegeApply).
// Keyed by stream slug; falls back to null for streams without curated copy.

export interface StreamContent {
  overview: string[]; // paragraphs
  eligibility: string;
  specializations: string[];
  careers: string[];
  recruiters: string[];
  scope: string;
}

export const STREAM_CONTENT: Record<string, StreamContent> = {
  engineering: {
    overview: [
      "Engineering is among the most popular undergraduate choices in India, offering B.Tech, B.E., M.Tech and integrated dual-degree programmes across a wide range of specialisations. The country's top institutes — the IITs, NITs, IIITs and leading private universities — combine rigorous academics with research, internships and strong placement records.",
      "Admission to the best colleges is competitive and largely driven by entrance exams. Choosing the right college means weighing rank and placements against fees, location, specialisation strength and campus facilities.",
    ],
    eligibility:
      "10+2 with Physics, Chemistry and Mathematics. Admission is through JEE Main and JEE Advanced (IITs), state CETs or university-level exams. B.Tech/B.E. is 4 years; M.Tech is 2 years (via GATE).",
    specializations: [
      "Computer Science", "Information Technology", "Electronics & Communication", "Electrical",
      "Mechanical", "Civil", "Chemical", "Aerospace", "AI & Data Science", "Robotics",
    ],
    careers: ["Software Engineer", "Data Scientist", "Core/Design Engineer", "Product Manager", "Research & MS", "PSU roles (GATE)"],
    recruiters: ["Google", "Microsoft", "Amazon", "TCS", "Infosys", "L&T", "Tata Motors", "Qualcomm"],
    scope:
      "Engineering graduates enjoy strong demand across IT, core, product and analytics roles. Beyond placements, popular paths include GATE for PSUs and M.Tech, MS abroad, the civil services, and entrepreneurship.",
  },
  management: {
    overview: [
      "Management education — MBA, PGDM and BBA — builds the leadership, analytical and business skills that employers value most. The IIMs, along with schools like XLRI, FMS, MDI and SPJIMR, are known for exceptional return on investment and recruiter relationships.",
      "An MBA suits both fresh graduates and working professionals looking to accelerate their careers. Selectivity, specialisation strength, average package and alumni network are the metrics that matter most when comparing B-schools.",
    ],
    eligibility:
      "A bachelor's degree in any discipline for MBA/PGDM, with admission via CAT, XAT, GMAT or CMAT followed by GD-PI. BBA follows 10+2. The MBA/PGDM is a 2-year full-time programme.",
    specializations: ["Finance", "Marketing", "Human Resources", "Operations", "Business Analytics", "IT & Systems", "International Business", "Entrepreneurship"],
    careers: ["Management Consultant", "Investment Banker", "Marketing Manager", "Product Manager", "HR Manager", "Operations Lead"],
    recruiters: ["McKinsey", "BCG", "Deloitte", "Amazon", "HUL", "Goldman Sachs", "ICICI", "Accenture"],
    scope:
      "Top B-schools place graduates in consulting, finance, product, marketing and general management, with average packages that make the MBA one of the highest-ROI degrees in India.",
  },
  medical: {
    overview: [
      "Medical education in India — led by MBBS and allied health programmes — is among the most respected and competitive career paths. AIIMS, PGIMER, CMC Vellore, JIPMER and other top institutes offer world-class clinical training and research exposure.",
      "With a single national entrance exam and limited seats, admission is highly selective. Fees vary enormously between government and private colleges, making informed comparison essential.",
    ],
    eligibility:
      "10+2 with Physics, Chemistry and Biology. Admission is strictly through NEET-UG. MBBS is 5.5 years including a one-year rotating internship; postgraduate MD/MS follows via NEET-PG.",
    specializations: ["General Medicine", "Surgery", "Pediatrics", "Radiology", "Orthopedics", "Dermatology", "Anaesthesiology", "Psychiatry"],
    careers: ["Doctor", "Surgeon", "MD/MS Specialist", "Medical Officer", "Medical Researcher", "Public Health"],
    recruiters: ["AIIMS", "Apollo", "Fortis", "Max Healthcare", "Medanta", "Government hospitals"],
    scope:
      "Beyond clinical practice, medical graduates move into specialisation (MD/MS), research, hospital administration, public health and teaching. Demand for qualified doctors remains consistently high across India and abroad.",
  },
  dental: {
    overview: [
      "Dentistry offers a rewarding clinical career through the BDS (Bachelor of Dental Surgery) and postgraduate MDS programmes. Top dental colleges — recognised by the Dental Council of India — combine strong clinical training with modern hospital infrastructure.",
      "Admission is through NEET, and fees differ significantly between government and private colleges. Placement, clinical exposure and specialisation options are key factors when choosing a dental college.",
    ],
    eligibility:
      "10+2 with Physics, Chemistry and Biology. Admission is via NEET-UG. BDS is a 5-year programme including a one-year internship; MDS is a 3-year specialisation.",
    specializations: ["Orthodontics", "Oral & Maxillofacial Surgery", "Endodontics", "Periodontics", "Prosthodontics", "Pedodontics", "Oral Pathology"],
    careers: ["Dental Surgeon", "Orthodontist", "Oral Surgeon", "Clinic Owner", "Academician", "Public Health Dentist"],
    recruiters: ["Clove Dental", "Apollo White", "Hospital dental departments", "Private practice"],
    scope:
      "Dental graduates can practise clinically, open their own clinics, specialise through MDS, or move into academics and research. Growing awareness of oral health continues to expand demand for qualified dentists.",
  },
  "online-degrees": {
    overview: [
      "Online degrees let working professionals and remote learners earn a UGC-recognised degree — MBA, MCA, BBA, BCA, B.Com, BA and more — without attending a physical campus. Programmes are entitled by the UGC's Distance Education Bureau (UGC-DEB), and under the UGC's 2020 regulations carry the same academic value as the equivalent on-campus degree.",
      "Delivery is fully online: recorded and live classes, a mobile-friendly LMS, and remote-proctored exams taken from home. This makes an online degree the practical choice for anyone who needs flexibility — a career upgrade without a career break, no relocation, and study on your own schedule.",
    ],
    eligibility:
      "A bachelor's degree for PG programmes (MBA/MCA/M.Com/MA) or 10+2 for UG programmes (BBA/BCA/B.Com/BA), from a recognised board/university with the minimum aggregate the programme specifies. Most online programmes have no entrance exam — admission is based on meeting eligibility and completing the application.",
    specializations: ["Online MBA", "Online MCA", "Online BBA", "Online BCA", "Online B.Com", "Online BA", "Online M.Com"],
    careers: ["Working-professional career upgrade", "Management & Analytics roles", "IT & Software roles", "Finance & Commerce roles", "Higher study eligibility", "Government-exam eligibility"],
    recruiters: ["Career-support cells (platform-specific)", "Employer-recognised for promotions/role-change", "Virtual placement drives"],
    scope:
      "Online degrees are best judged on UGC-DEB entitlement, university accreditation (NAAC) and brand recognition rather than a campus rank. They suit learners who need a genuinely flexible, recognised degree — for eligibility, promotion or a career switch — while continuing to work.",
  },
};

export const streamContent = (slug: string): StreamContent | null => STREAM_CONTENT[slug] ?? null;
