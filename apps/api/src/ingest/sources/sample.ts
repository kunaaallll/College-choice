import { IngestSource, RawCollege } from "../types";

/**
 * A small embedded dataset so the pipeline runs with zero external files
 * (`npm run ingest -- --source=sample`). Mirrors the column shape produced by
 * open sources like NIRF / AICTE. Replace/augment with real CSVs in production.
 */
const ROWS: RawCollege[] = [
  { name: "IIT Madras", city: "Chennai", state: "Tamil Nadu", stream: "Engineering", type: "Public", nirfRank: 1, rating: 4.8, feesNum: 210000, feesLabel: "₹2.10 L", packageLabel: "₹21.0 LPA", examName: "JEE Adv", estd: 1959, approvedBy: "MoE", sourceUrl: "https://www.nirfindia.org/" },
  { name: "IISc Bangalore", city: "Bangalore", state: "Karnataka", stream: "Science", type: "Public", nirfRank: 1, rating: 4.9, feesNum: 90000, feesLabel: "₹90,000", packageLabel: "₹25.0 LPA", examName: "GATE/JEE Adv", estd: 1909, approvedBy: "MoE" },
  { name: "IIT Kanpur", city: "Kanpur", state: "Uttar Pradesh", stream: "Engineering", type: "Public", nirfRank: 4, rating: 4.7, feesNum: 215000, feesLabel: "₹2.15 L", packageLabel: "₹19.0 LPA", examName: "JEE Adv", estd: 1959 },
  { name: "IIT Kharagpur", city: "Kharagpur", state: "West Bengal", stream: "Engineering", type: "Public", nirfRank: 5, rating: 4.7, feesNum: 220000, feesLabel: "₹2.20 L", packageLabel: "₹18.5 LPA", examName: "JEE Adv", estd: 1951 },
  { name: "Jadavpur University", city: "Kolkata", state: "West Bengal", stream: "Engineering", type: "Public", nirfRank: 12, rating: 4.5, feesNum: 24000, feesLabel: "₹24,000", packageLabel: "₹10.0 LPA", examName: "WBJEE", estd: 1955 },
  { name: "Delhi Technological University", city: "Delhi", state: "Delhi", stream: "Engineering", type: "Public", nirfRank: 28, rating: 4.4, feesNum: 800000, feesLabel: "₹8.00 L", packageLabel: "₹12.0 LPA", examName: "JEE Main", estd: 1941 },
  { name: "JIPMER Puducherry", city: "Puducherry", state: "Puducherry", stream: "Medical", type: "Public", nirfRank: 6, rating: 4.6, feesNum: 12000, feesLabel: "₹12,000", packageLabel: "₹11.0 LPA", examName: "NEET", estd: 1956 },
  { name: "CMC Vellore", city: "Vellore", state: "Tamil Nadu", stream: "Medical", type: "Private", nirfRank: 3, rating: 4.7, feesNum: 480000, feesLabel: "₹4.80 L", packageLabel: "₹10.0 LPA", examName: "NEET", estd: 1900 },
  { name: "IIM Ahmedabad", city: "Ahmedabad", state: "Gujarat", stream: "Management", type: "Public", nirfRank: 1, rating: 4.8, feesNum: 2500000, feesLabel: "₹25.0 L", packageLabel: "₹34.0 LPA", examName: "CAT", estd: 1961 },
  { name: "IIM Bangalore", city: "Bangalore", state: "Karnataka", stream: "Management", type: "Public", nirfRank: 2, rating: 4.8, feesNum: 2400000, feesLabel: "₹24.0 L", packageLabel: "₹33.0 LPA", examName: "CAT", estd: 1973 },
  { name: "National Law School of India University", city: "Bangalore", state: "Karnataka", stream: "Law", type: "Public", nirfRank: 1, rating: 4.7, feesNum: 320000, feesLabel: "₹3.20 L", packageLabel: "₹16.0 LPA", examName: "CLAT", estd: 1987 },
  { name: "St. Stephen's College", city: "Delhi", state: "Delhi", stream: "Arts", type: "Public", rating: 4.7, feesNum: 45000, feesLabel: "₹45,000", packageLabel: "₹9.0 LPA", examName: "CUET", estd: 1881 },
];

export function sampleSource(): IngestSource {
  return {
    name: "sample",
    async load(): Promise<RawCollege[]> {
      return ROWS;
    },
  };
}
