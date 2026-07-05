/**
 * Seeds the full NIRF 2024 top lists (Engineering top 100, Management top 100,
 * Medical top 50 — NIRF only ranks 50 for medical). Real ranks/names/cities from
 * nirfindia.org; fees/type/rating are indicative. Ranks the colleges to the top
 * of each stream. Cross-listed institutions get a stream-specific slug so every
 * course list is complete.
 *
 *   npm run seed:nirf -w @collegechoice/api
 *   (then: npm run images  — to fetch real campus photos)
 */
import * as dotenv from "dotenv";
import path from "node:path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
dotenv.config({ path: path.join(process.cwd(), "../../.env") });

import { PrismaClient } from "@prisma/client";
import { ensureCity, ensureStream, slugify, toCollegeType } from "./normalize";

const prisma = new PrismaClient();
const YEAR = 2024;

type Row = [rank: number, name: string, city: string, state: string];

const ENGINEERING: Row[] = [
  [1, "Indian Institute of Technology Madras", "Chennai", "Tamil Nadu"],
  [2, "Indian Institute of Technology Delhi", "New Delhi", "Delhi"],
  [3, "Indian Institute of Technology Bombay", "Mumbai", "Maharashtra"],
  [4, "Indian Institute of Technology Kanpur", "Kanpur", "Uttar Pradesh"],
  [5, "Indian Institute of Technology Kharagpur", "Kharagpur", "West Bengal"],
  [6, "Indian Institute of Technology Roorkee", "Roorkee", "Uttarakhand"],
  [7, "Indian Institute of Technology Guwahati", "Guwahati", "Assam"],
  [8, "Indian Institute of Technology Hyderabad", "Hyderabad", "Telangana"],
  [9, "National Institute of Technology Tiruchirappalli", "Tiruchirappalli", "Tamil Nadu"],
  [10, "Indian Institute of Technology (BHU) Varanasi", "Varanasi", "Uttar Pradesh"],
  [11, "Vellore Institute of Technology", "Vellore", "Tamil Nadu"],
  [12, "Jadavpur University", "Kolkata", "West Bengal"],
  [13, "SRM Institute of Science and Technology", "Chennai", "Tamil Nadu"],
  [14, "Anna University", "Chennai", "Tamil Nadu"],
  [15, "Indian Institute of Technology (ISM) Dhanbad", "Dhanbad", "Jharkhand"],
  [16, "Indian Institute of Technology Indore", "Indore", "Madhya Pradesh"],
  [17, "National Institute of Technology Karnataka, Surathkal", "Surathkal", "Karnataka"],
  [18, "Indian Institute of Technology Gandhinagar", "Gandhinagar", "Gujarat"],
  [19, "National Institute of Technology Rourkela", "Rourkela", "Odisha"],
  [20, "Birla Institute of Technology and Science, Pilani", "Pilani", "Rajasthan"],
  [21, "National Institute of Technology Warangal", "Warangal", "Telangana"],
  [22, "Indian Institute of Technology Ropar", "Rupnagar", "Punjab"],
  [23, "Amrita Vishwa Vidyapeetham", "Coimbatore", "Tamil Nadu"],
  [24, "Jamia Millia Islamia", "New Delhi", "Delhi"],
  [25, "National Institute of Technology Calicut", "Kozhikode", "Kerala"],
  [26, "Siksha 'O' Anusandhan", "Bhubaneswar", "Odisha"],
  [27, "Delhi Technological University", "New Delhi", "Delhi"],
  [28, "Indian Institute of Technology Jodhpur", "Jodhpur", "Rajasthan"],
  [29, "Thapar Institute of Engineering and Technology", "Patiala", "Punjab"],
  [30, "Amity University", "Gautam Budh Nagar", "Uttar Pradesh"],
  [31, "Indian Institute of Technology Mandi", "Mandi", "Himachal Pradesh"],
  [32, "Chandigarh University", "Mohali", "Punjab"],
  [33, "Aligarh Muslim University", "Aligarh", "Uttar Pradesh"],
  [34, "Indian Institute of Technology Patna", "Patna", "Bihar"],
  [35, "Koneru Lakshmaiah Education Foundation University", "Vaddeswaram", "Andhra Pradesh"],
  [36, "Kalasalingam Academy of Research and Education", "Srivilliputhur", "Tamil Nadu"],
  [37, "Kalinga Institute of Industrial Technology", "Bhubaneswar", "Odisha"],
  [38, "Shanmugha Arts Science Technology and Research Academy", "Thanjavur", "Tamil Nadu"],
  [39, "Visvesvaraya National Institute of Technology Nagpur", "Nagpur", "Maharashtra"],
  [40, "National Institute of Technology Silchar", "Silchar", "Assam"],
  [41, "Institute of Chemical Technology", "Mumbai", "Maharashtra"],
  [42, "UPES", "Dehradun", "Uttarakhand"],
  [43, "Malaviya National Institute of Technology", "Jaipur", "Rajasthan"],
  [44, "National Institute of Technology Durgapur", "Durgapur", "West Bengal"],
  [45, "National Institute of Technology Delhi", "Delhi", "Delhi"],
  [46, "Sri Sivasubramaniya Nadar College of Engineering", "Kalavakkam", "Tamil Nadu"],
  [47, "International Institute of Information Technology Hyderabad", "Hyderabad", "Telangana"],
  [48, "Birla Institute of Technology, Mesra", "Ranchi", "Jharkhand"],
  [49, "Indian Institute of Engineering Science and Technology, Shibpur", "Howrah", "West Bengal"],
  [50, "Lovely Professional University", "Phagwara", "Punjab"],
  [51, "Indian Institute of Space Science and Technology", "Thiruvananthapuram", "Kerala"],
  [52, "Graphic Era University", "Dehradun", "Uttarakhand"],
  [53, "Saveetha Institute of Medical and Technical Sciences", "Chennai", "Tamil Nadu"],
  [54, "Indian Institute of Technology Bhubaneswar", "Bhubaneswar", "Odisha"],
  [55, "National Institute of Technology Patna", "Patna", "Bihar"],
  [56, "Manipal Institute of Technology", "Manipal", "Karnataka"],
  [57, "Netaji Subhas University of Technology", "Delhi", "Delhi"],
  [58, "Dr. B R Ambedkar National Institute of Technology Jalandhar", "Jalandhar", "Punjab"],
  [59, "Sardar Vallabhbhai National Institute of Technology", "Surat", "Gujarat"],
  [60, "Motilal Nehru National Institute of Technology", "Prayagraj", "Uttar Pradesh"],
  [61, "Indian Institute of Technology Tirupati", "Yerpedu", "Andhra Pradesh"],
  [62, "Indian Institute of Technology Jammu", "Jammu", "Jammu and Kashmir"],
  [63, "Defence Institute of Advanced Technology", "Pune", "Maharashtra"],
  [64, "Indian Institute of Technology Palakkad", "Palakkad", "Kerala"],
  [65, "Manipal University Jaipur", "Jaipur", "Rajasthan"],
  [66, "Sathyabama Institute of Science and Technology", "Chennai", "Tamil Nadu"],
  [67, "PSG College of Technology", "Coimbatore", "Tamil Nadu"],
  [68, "National Institute of Technology Meghalaya", "Shillong", "Meghalaya"],
  [69, "Visvesvaraya Technological University", "Belgaum", "Karnataka"],
  [70, "University of Hyderabad", "Hyderabad", "Telangana"],
  [71, "National Institute of Technology Raipur", "Raipur", "Chhattisgarh"],
  [72, "Maulana Azad National Institute of Technology", "Bhopal", "Madhya Pradesh"],
  [73, "Indian Institute of Technology Bhilai", "Raipur", "Chhattisgarh"],
  [74, "International Institute of Information Technology Bangalore", "Bengaluru", "Karnataka"],
  [75, "M. S. Ramaiah Institute of Technology", "Bengaluru", "Karnataka"],
  [76, "Sant Longowal Institute of Engineering and Technology", "Longowal", "Punjab"],
  [77, "COEP Technological University", "Pune", "Maharashtra"],
  [78, "Banasthali Vidyapith", "Banasthali", "Rajasthan"],
  [79, "National Institute of Technology Srinagar", "Srinagar", "Jammu and Kashmir"],
  [80, "Rajiv Gandhi Institute of Petroleum Technology", "Amethi", "Uttar Pradesh"],
  [81, "National Institute of Technology Kurukshetra", "Kurukshetra", "Haryana"],
  [82, "National Institute of Technology Agartala", "Agartala", "Tripura"],
  [83, "Sri Krishna College of Engineering and Technology", "Coimbatore", "Tamil Nadu"],
  [84, "Madan Mohan Malaviya University of Technology", "Gorakhpur", "Uttar Pradesh"],
  [85, "Indraprastha Institute of Information Technology Delhi", "New Delhi", "Delhi"],
  [86, "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology", "Chennai", "Tamil Nadu"],
  [87, "Indian Institute of Information Technology Allahabad", "Prayagraj", "Uttar Pradesh"],
  [88, "Jawaharlal Nehru Technological University Hyderabad", "Hyderabad", "Telangana"],
  [89, "Guru Gobind Singh Indraprastha University", "New Delhi", "Delhi"],
  [90, "AU College of Engineering", "Visakhapatnam", "Andhra Pradesh"],
  [91, "Vignan's Foundation for Science, Technology and Research", "Guntur", "Andhra Pradesh"],
  [92, "Shoolini University of Biotechnology and Management Sciences", "Solan", "Himachal Pradesh"],
  [93, "Christ University", "Bengaluru", "Karnataka"],
  [94, "Chitkara University", "Rajpura", "Punjab"],
  [95, "Jain University", "Bengaluru", "Karnataka"],
  [96, "C.V. Raman Global University", "Bhubaneswar", "Odisha"],
  [97, "National Institute of Technology Puducherry", "Karaikal", "Pondicherry"],
  [98, "SR University", "Warangal", "Telangana"],
  [99, "R.V. College of Engineering", "Bengaluru", "Karnataka"],
  [100, "Siddaganga Institute of Technology", "Tumkur", "Karnataka"],
];

const MANAGEMENT: Row[] = [
  [1, "Indian Institute of Management Ahmedabad", "Ahmedabad", "Gujarat"],
  [2, "Indian Institute of Management Bangalore", "Bengaluru", "Karnataka"],
  [3, "Indian Institute of Management Kozhikode", "Kozhikode", "Kerala"],
  [4, "Indian Institute of Technology Delhi", "New Delhi", "Delhi"],
  [5, "Indian Institute of Management Calcutta", "Kolkata", "West Bengal"],
  [6, "Indian Institute of Management Mumbai", "Mumbai", "Maharashtra"],
  [7, "Indian Institute of Management Lucknow", "Lucknow", "Uttar Pradesh"],
  [8, "Indian Institute of Management Indore", "Indore", "Madhya Pradesh"],
  [9, "XLRI - Xavier School of Management", "Jamshedpur", "Jharkhand"],
  [10, "Indian Institute of Technology Bombay", "Mumbai", "Maharashtra"],
  [11, "Management Development Institute", "Gurugram", "Haryana"],
  [12, "Indian Institute of Management Rohtak", "Rohtak", "Haryana"],
  [13, "Symbiosis Institute of Business Management", "Pune", "Maharashtra"],
  [14, "Indian Institute of Management Raipur", "Raipur", "Chhattisgarh"],
  [15, "Indian Institute of Foreign Trade", "New Delhi", "Delhi"],
  [16, "Indian Institute of Technology Madras", "Chennai", "Tamil Nadu"],
  [17, "Indian Institute of Management Ranchi", "Ranchi", "Jharkhand"],
  [18, "Indian Institute of Technology Roorkee", "Roorkee", "Uttarakhand"],
  [19, "Indian Institute of Technology Kharagpur", "Kharagpur", "West Bengal"],
  [20, "S. P. Jain Institute of Management and Research", "Mumbai", "Maharashtra"],
  [21, "SVKM's Narsee Monjee Institute of Management Studies", "Mumbai", "Maharashtra"],
  [22, "Indian Institute of Management Udaipur", "Udaipur", "Rajasthan"],
  [23, "Indian Institute of Management Kashipur", "Kashipur", "Uttarakhand"],
  [24, "Indian Institute of Management Shillong", "Shillong", "Meghalaya"],
  [25, "Jamia Millia Islamia", "New Delhi", "Delhi"],
  [26, "Indian Institute of Management Visakhapatnam", "Visakhapatnam", "Andhra Pradesh"],
  [27, "Indian Institute of Management Tiruchirappalli", "Tiruchirappalli", "Tamil Nadu"],
  [28, "Amrita Vishwa Vidyapeetham", "Coimbatore", "Tamil Nadu"],
  [29, "Amity University", "Gautam Budh Nagar", "Uttar Pradesh"],
  [30, "Indian Institute of Technology Kanpur", "Kanpur", "Uttar Pradesh"],
  [31, "Indian Institute of Management Nagpur", "Nagpur", "Maharashtra"],
  [32, "MICA", "Ahmedabad", "Gujarat"],
  [33, "Indian Institute of Management Bodh Gaya", "Gaya", "Bihar"],
  [34, "Great Lakes Institute of Management, Chennai", "Chennai", "Tamil Nadu"],
  [35, "Institute of Management Technology", "Ghaziabad", "Uttar Pradesh"],
  [36, "Chandigarh University", "Mohali", "Punjab"],
  [37, "Goa Institute of Management", "Sanquelim", "Goa"],
  [38, "Lovely Professional University", "Phagwara", "Punjab"],
  [39, "ICFAI Foundation for Higher Education", "Hyderabad", "Telangana"],
  [40, "International Management Institute", "New Delhi", "Delhi"],
  [41, "UPES", "Dehradun", "Uttarakhand"],
  [42, "Indian Institute of Management Jammu", "Jammu", "Jammu and Kashmir"],
  [43, "XIM University", "Bhubaneswar", "Odisha"],
  [44, "Thapar Institute of Engineering and Technology", "Patiala", "Punjab"],
  [45, "Jaipuria Institute of Management, Noida", "Noida", "Uttar Pradesh"],
  [46, "Indian Institute of Technology Dhanbad", "Dhanbad", "Jharkhand"],
  [47, "Indian Institute of Management Amritsar", "Amritsar", "Punjab"],
  [48, "Banaras Hindu University", "Varanasi", "Uttar Pradesh"],
  [49, "Institute of Rural Management Anand", "Anand", "Gujarat"],
  [50, "Indian Institute of Management Sambalpur", "Sambalpur", "Odisha"],
  [51, "National Institute of Technology Tiruchirappalli", "Tiruchirappalli", "Tamil Nadu"],
  [52, "Great Lakes Institute of Management, Gurgaon", "Gurgaon", "Haryana"],
  [53, "Fore School of Management", "New Delhi", "Delhi"],
  [54, "Chitkara University", "Rajpura", "Punjab"],
  [55, "Nirma University", "Ahmedabad", "Gujarat"],
  [56, "International Management Institute, Kolkata", "Kolkata", "West Bengal"],
  [57, "Indian Institute of Management Sirmaur", "Sirmaur", "Himachal Pradesh"],
  [58, "T. A. Pai Management Institute", "Manipal", "Karnataka"],
  [59, "Graphic Era University", "Dehradun", "Uttarakhand"],
  [60, "Christ University", "Bengaluru", "Karnataka"],
  [61, "International Management Institute, Bhubaneswar", "Bhubaneswar", "Odisha"],
  [62, "Siksha 'O' Anusandhan", "Bhubaneswar", "Odisha"],
  [63, "K J Somaiya Institute of Management", "Mumbai", "Maharashtra"],
  [64, "Birla Institute of Management Technology", "Greater Noida", "Uttar Pradesh"],
  [65, "Guru Gobind Singh Indraprastha University", "New Delhi", "Delhi"],
  [66, "Loyola Institute of Business Administration", "Chennai", "Tamil Nadu"],
  [67, "Kalinga Institute of Industrial Technology", "Bhubaneswar", "Odisha"],
  [68, "Malaviya National Institute of Technology", "Jaipur", "Rajasthan"],
  [69, "Anna University", "Chennai", "Tamil Nadu"],
  [70, "Aligarh Muslim University", "Aligarh", "Uttar Pradesh"],
  [71, "Alliance University", "Bengaluru", "Karnataka"],
  [72, "Jaipuria Institute of Management, Lucknow", "Lucknow", "Uttar Pradesh"],
  [73, "Manipal University Jaipur", "Jaipur", "Rajasthan"],
  [74, "Saveetha Institute of Medical and Technical Sciences", "Chennai", "Tamil Nadu"],
  [75, "Jaipuria Institute of Management, Jaipur", "Jaipur", "Rajasthan"],
  [76, "National Institute of Technology Calicut", "Kozhikode", "Kerala"],
  [77, "Jain University", "Bengaluru", "Karnataka"],
  [78, "Jamia Hamdard", "New Delhi", "Delhi"],
  [79, "Koneru Lakshmaiah Education Foundation University", "Vaddeswaram", "Andhra Pradesh"],
  [80, "PSG College of Technology", "Coimbatore", "Tamil Nadu"],
  [81, "Cochin University of Science and Technology", "Cochin", "Kerala"],
  [82, "Thiagarajar School of Management", "Madurai", "Tamil Nadu"],
  [83, "BML Munjal University", "Gurgaon", "Haryana"],
  [84, "Prin. L.N. Welingkar Institute of Management Development and Research", "Mumbai", "Maharashtra"],
  [85, "Atal Bihari Vajpayee Indian Institute of Information Technology and Management", "Gwalior", "Madhya Pradesh"],
  [86, "Babasaheb Bhimrao Ambedkar University", "Lucknow", "Uttar Pradesh"],
  [87, "Jagan Institute of Management Studies", "Delhi", "Delhi"],
  [88, "New Delhi Institute of Management", "Delhi", "Delhi"],
  [89, "Pandit Deendayal Energy University", "Gandhinagar", "Gujarat"],
  [90, "Birla Institute of Technology, Mesra", "Ranchi", "Jharkhand"],
  [91, "National Institute of Bank Management", "Pune", "Maharashtra"],
  [92, "Panjab University", "Chandigarh", "Chandigarh"],
  [93, "Rajagiri Business School", "Cochin", "Kerala"],
  [94, "Bharathidasan Institute of Management", "Tiruchirappalli", "Tamil Nadu"],
  [95, "Tezpur University", "Tezpur", "Assam"],
  [96, "National Institute of Agricultural Extension Management", "Hyderabad", "Telangana"],
  [97, "Institute of Management Technology, Hyderabad", "Hyderabad", "Telangana"],
  [98, "Galgotias University", "Gautam Budh Nagar", "Uttar Pradesh"],
  [99, "Krea University", "Sri City", "Andhra Pradesh"],
  [100, "National Institute of Technology Warangal", "Warangal", "Telangana"],
];

const MEDICAL: Row[] = [
  [1, "All India Institute of Medical Sciences Delhi", "New Delhi", "Delhi"],
  [2, "Post Graduate Institute of Medical Education and Research", "Chandigarh", "Chandigarh"],
  [3, "Christian Medical College, Vellore", "Vellore", "Tamil Nadu"],
  [4, "National Institute of Mental Health and Neuro Sciences", "Bengaluru", "Karnataka"],
  [5, "Jawaharlal Institute of Post Graduate Medical Education and Research", "Puducherry", "Pondicherry"],
  [6, "Sanjay Gandhi Postgraduate Institute of Medical Sciences", "Lucknow", "Uttar Pradesh"],
  [7, "Banaras Hindu University", "Varanasi", "Uttar Pradesh"],
  [8, "Amrita Vishwa Vidyapeetham", "Kochi", "Kerala"],
  [9, "Kasturba Medical College, Manipal", "Manipal", "Karnataka"],
  [10, "Madras Medical College", "Chennai", "Tamil Nadu"],
  [11, "Dr. D. Y. Patil Vidyapeeth", "Pune", "Maharashtra"],
  [12, "Saveetha Institute of Medical and Technical Sciences", "Chennai", "Tamil Nadu"],
  [13, "Sree Chitra Tirunal Institute for Medical Sciences and Technology", "Thiruvananthapuram", "Kerala"],
  [14, "All India Institute of Medical Sciences Rishikesh", "Rishikesh", "Uttarakhand"],
  [15, "All India Institute of Medical Sciences Bhubaneswar", "Bhubaneswar", "Odisha"],
  [16, "All India Institute of Medical Sciences Jodhpur", "Jodhpur", "Rajasthan"],
  [17, "Vardhman Mahavir Medical College & Safdarjung Hospital", "New Delhi", "Delhi"],
  [18, "SRM Institute of Science and Technology", "Chennai", "Tamil Nadu"],
  [19, "King George's Medical University", "Lucknow", "Uttar Pradesh"],
  [20, "Sri Ramachandra Institute of Higher Education and Research", "Chennai", "Tamil Nadu"],
  [21, "Siksha 'O' Anusandhan", "Bhubaneswar", "Odisha"],
  [22, "Institute of Post Graduate Medical Education and Research", "Kolkata", "West Bengal"],
  [23, "Datta Meghe Institute of Higher Education and Research", "Wardha", "Maharashtra"],
  [24, "Maulana Azad Medical College", "New Delhi", "Delhi"],
  [25, "Kalinga Institute of Industrial Technology", "Bhubaneswar", "Odisha"],
  [26, "All India Institute of Medical Sciences Patna", "Patna", "Bihar"],
  [27, "Aligarh Muslim University", "Aligarh", "Uttar Pradesh"],
  [28, "St. John's Medical College", "Bengaluru", "Karnataka"],
  [29, "Lady Hardinge Medical College", "New Delhi", "Delhi"],
  [30, "Armed Forces Medical College", "Pune", "Maharashtra"],
  [31, "All India Institute of Medical Sciences Bhopal", "Bhopal", "Madhya Pradesh"],
  [32, "University College of Medical Sciences", "New Delhi", "Delhi"],
  [33, "Kasturba Medical College, Mangalore", "Mangaluru", "Karnataka"],
  [34, "Institute of Liver and Biliary Sciences", "New Delhi", "Delhi"],
  [35, "Government Medical College and Hospital, Chandigarh", "Chandigarh", "Chandigarh"],
  [36, "Maharishi Markandeshwar", "Ambala", "Haryana"],
  [37, "Jamia Hamdard", "New Delhi", "Delhi"],
  [38, "All India Institute of Medical Sciences Raipur", "Raipur", "Chhattisgarh"],
  [39, "JSS Medical College", "Mysuru", "Karnataka"],
  [40, "Dayanand Medical College", "Ludhiana", "Punjab"],
  [41, "PSG Institute of Medical Sciences and Research", "Coimbatore", "Tamil Nadu"],
  [42, "Government Medical College, Thiruvananthapuram", "Thiruvananthapuram", "Kerala"],
  [43, "Sawai Man Singh Medical College", "Jaipur", "Rajasthan"],
  [44, "Medical College, Kolkata", "Kolkata", "West Bengal"],
  [45, "Gujarat Cancer and Research Institute", "Ahmedabad", "Gujarat"],
  [46, "M. S. Ramaiah Medical College", "Bengaluru", "Karnataka"],
  [47, "Mahatma Gandhi Medical College and Research Institute", "Puducherry", "Pondicherry"],
  [48, "Osmania Medical College", "Hyderabad", "Telangana"],
  [49, "Christian Medical College, Ludhiana", "Ludhiana", "Punjab"],
  [50, "Pandit Bhagwat Dayal Sharma University of Health Sciences", "Rohtak", "Haryana"],
];

const round1 = (x: number) => Math.round(x * 10) / 10;
const ratingFor = (r: number) => Math.max(4.0, round1(4.9 - (r - 1) * 0.01));

function typeFor(name: string): string {
  const n = name.toLowerCase();
  if (/vidyapeeth|vishwa vidyapeetham|deemed|saveetha|amrita|manipal|kalinga|siksha|datta meghe|sri ramachandra|patil|hamdard|maharishi|academy of research/.test(n)) return "Deemed";
  if (/indian institute|national institute|all india institute|aiims|government|govt|jawaharlal|post graduate institute|sanjay gandhi|king george|jamia|aligarh|banaras hindu|anna university|jadavpur|delhi technological|netaji subhas|visvesvaraya|panjab|osmania|madras medical|maulana azad|lady hardinge|armed forces|university of hyderabad|cochin university|tezpur|babasaheb|university college of medical|malaviya|motilal nehru|sardar vallabhbhai|dr\. b r ambedkar|guru gobind|jawaharlal nehru tech|indian school of mines|indraprastha institute|indian institute of information|indian institute of engineering|indian institute of space|rajiv gandhi|sant longowal|coep|madan mohan|au college|institute of rural|institute of post graduate|institute of liver|sree chitra|vardhman/.test(n)) return "Government";
  return "Private";
}
function examFor(stream: string, name: string): string {
  if (stream === "Engineering") return /Indian Institute of Technology/.test(name) ? "JEE Advanced" : "JEE Main";
  if (stream === "Management") return "CAT";
  return "NEET";
}
interface Money { feesNum: number | null; feesLabel: string | null; pkg: string | null }
function moneyFor(stream: string, type: string): Money {
  const priv = type === "Private" || type === "Deemed";
  if (stream === "Engineering") return priv ? { feesNum: 1400000, feesLabel: "₹14.0 L", pkg: "₹8.0 LPA" } : { feesNum: 800000, feesLabel: "₹8.0 L", pkg: "₹16.0 LPA" };
  if (stream === "Management") return priv ? { feesNum: 1800000, feesLabel: "₹18.0 L", pkg: "₹18.0 LPA" } : { feesNum: 2200000, feesLabel: "₹22.0 L", pkg: "₹24.0 LPA" };
  return priv ? { feesNum: 2000000, feesLabel: "₹20.0 L", pkg: null } : { feesNum: 150000, feesLabel: "₹1.5 L", pkg: null };
}
function describe(name: string, rank: number, city: string, state: string, stream: string, exam: string, m: Money): string {
  const adj = stream.toLowerCase();
  return [
    `${name} is ranked #${rank} among ${adj} institutions in India in the NIRF ${YEAR} rankings.`,
    `Located in ${city}, ${state}, it is one of the country's most reputed ${adj} institutions.`,
    m.feesLabel ? `The approximate total programme fee is ${m.feesLabel}.` : "",
    m.pkg ? `Graduates report an average placement package of around ${m.pkg}.` : "",
    `Admission is primarily through ${exam}.`,
    `This page covers ${name}'s courses, fees, eligibility, cut-offs, admission process, placements and student reviews.`,
  ].filter(Boolean).join(" ");
}

async function upsertRow([rank, name, city, state]: Row, stream: string, streamId: number) {
  const type = typeFor(name);
  const cityId = await ensureCity(prisma, city, state);
  // Give cross-listed institutions a stream-specific slug so each course list is complete.
  const base = slugify(name);
  const existing = await prisma.college.findUnique({ where: { slug: base }, select: { streamId: true } });
  const slug = existing && existing.streamId !== streamId ? `${base}-${slugify(stream)}` : base;

  const exam = examFor(stream, name);
  const m = moneyFor(stream, type);
  const data = {
    name,
    location: `${city}, ${state}`,
    state,
    type: toCollegeType(type),
    rank,
    nirfRank: rank,
    rating: ratingFor(rank),
    feesNum: m.feesNum,
    feesLabel: m.feesLabel,
    packageLabel: m.pkg,
    examName: exam,
    about: `${name} is ranked #${rank} for ${stream} in NIRF ${YEAR}. Located in ${city}, ${state}.`,
    descriptionLong: describe(name, rank, city, state, stream, exam, m),
    metaTitle: `${name} — NIRF #${rank}, Fees, Admission & Placements`,
    metaDescription: `${name}, ${city}: NIRF ${YEAR} rank #${rank} for ${stream}. Fees${m.feesLabel ? ` ${m.feesLabel}` : ""}, admission via ${exam}, courses, cut-offs & reviews.`.slice(0, 158),
    source: "manual:nirf",
    published: true,
    streamId,
    cityId,
  };
  await prisma.college.upsert({ where: { slug }, update: { ...data, imgUrl: undefined }, create: { ...data, slug } });
}

// Normalised key to match a college across short/long naming (for photo re-apply).
const ABBR: [RegExp, string][] = [
  [/indian institute of technology/g, "iit"],
  [/national institute of technology/g, "nit"],
  [/indian institute of management/g, "iim"],
  [/all india institute of medical sciences/g, "aiims"],
  [/birla institute of technology and science/g, "bits"],
  [/indian institute of information technology/g, "iiit"],
];
const GENERIC = new Set([
  "of", "the", "and", "for", "institute", "technology", "university", "college", "science",
  "sciences", "research", "education", "national", "indian", "school", "academy", "foundation",
]);
function normKey(name: string): string {
  let s = name.toLowerCase().replace(/[^a-z0-9 ]/g, " ");
  for (const [re, ab] of ABBR) s = s.replace(re, ab);
  return s.split(/\s+/).filter((t) => t && !GENERIC.has(t)).sort().join(" ");
}
const isReal = (u?: string | null) => !!u && (u.includes("wikimedia") || u.startsWith("/colleges/"));

async function run() {
  const groups: [string, Row[]][] = [
    ["Engineering", ENGINEERING],
    ["Management", MANAGEMENT],
    ["Medical", MEDICAL],
  ];

  // 1. Snapshot real photos so a rename doesn't lose them.
  const withPhoto = await prisma.college.findMany({
    where: { OR: [{ imgUrl: { contains: "wikimedia" } }, { imgUrl: { startsWith: "/colleges/" } }] },
    select: { name: true, imgUrl: true },
  });
  const photoMap = new Map<string, string>();
  for (const c of withPhoto) if (c.imgUrl) photoMap.set(normKey(c.name), c.imgUrl);
  console.log(`Snapshotted ${photoMap.size} real photos.`);

  // 2. Clear the old eng/mgmt/medical NIRF entries (short-named duplicates); keep dental/law/science/featured/online.
  const del = await prisma.college.deleteMany({
    where: { nirfRank: { not: null }, stream: { slug: { in: ["engineering", "management", "medical"] } } },
  });
  console.log(`Cleared ${del.count} old NIRF eng/mgmt/medical colleges.`);

  // 3. Seed the full official lists.
  for (const [stream, rows] of groups) {
    const streamId = await ensureStream(prisma, stream);
    for (const row of rows) await upsertRow(row, stream, streamId);
    console.log(`  ${stream}: ${rows.length} colleges`);
  }

  // 4. Re-apply the snapshotted photos by matched name.
  let reapplied = 0;
  const seeded = await prisma.college.findMany({
    where: { source: "manual:nirf", stream: { slug: { in: ["engineering", "management", "medical"] } } },
    select: { id: true, name: true, imgUrl: true },
  });
  for (const c of seeded) {
    if (isReal(c.imgUrl)) continue;
    const img = photoMap.get(normKey(c.name));
    if (img) {
      await prisma.college.update({
        where: { id: c.id },
        data: { imgUrl: img, source: img.startsWith("/colleges/") ? "manual:photo" : "manual:wiki" },
      });
      reapplied++;
    }
  }
  console.log(`Re-applied ${reapplied} photos by name match.`);

  await prisma.$executeRaw`UPDATE "Stream" AS s SET "collegeCount" = (SELECT COUNT(*) FROM "College" c WHERE c."streamId" = s.id)`;
  await prisma.$executeRaw`UPDATE "City" AS ci SET "collegeCount" = (SELECT COUNT(*) FROM "College" c WHERE c."cityId" = ci.id)`;
  console.log(`\nDone. ${ENGINEERING.length + MANAGEMENT.length + MEDICAL.length} NIRF colleges seeded.`);
}

run()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
