export interface University {
  id: string;
  name: string;
  location: string;
  ranking: number;
  placementRate: number;
  avgSalary: number;
  medianSalary: number;
  highestSalary: number;
  tuitionFee: number;
  roiYears: number;
  totalStudents: number;
  internshipConversion: number;
  higherEducationRate: number;
  topRecruiters: string[];
  courses: Course[];
}

export interface Course {
  name: string;
  placementRate: number;
  avgSalary: number;
  topIndustries: string[];
}

export interface SalaryTrend {
  year: string;
  avgSalary: number;
  medianSalary: number;
  topSalary: number;
}

export interface IndustryDistribution {
  industry: string;
  percentage: number;
  avgSalary: number;
  color: string;
}

export interface CareerGrowth {
  year: string;
  salary: number;
  designation: string;
}

export const universities: University[] = [
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    ranking: 1,
    placementRate: 92,
    avgSalary: 2150000,
    medianSalary: 1800000,
    highestSalary: 15000000,
    tuitionFee: 800000,
    roiYears: 1.2,
    totalStudents: 2400,
    internshipConversion: 68,
    higherEducationRate: 28,
    topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "Amazon", "JP Morgan"],
    courses: [
      { name: "Computer Science", placementRate: 98, avgSalary: 3200000, topIndustries: ["Software", "Fintech", "AI/ML"] },
      { name: "Electrical Engineering", placementRate: 90, avgSalary: 1800000, topIndustries: ["Semiconductors", "Power", "IT"] },
      { name: "Mechanical Engineering", placementRate: 85, avgSalary: 1400000, topIndustries: ["Automotive", "Manufacturing", "Consulting"] },
      { name: "Chemical Engineering", placementRate: 82, avgSalary: 1300000, topIndustries: ["Petrochemicals", "FMCG", "Pharma"] },
    ],
  },
  {
    id: "iit-delhi",
    name: "IIT Delhi",
    location: "New Delhi",
    ranking: 2,
    placementRate: 90,
    avgSalary: 2050000,
    medianSalary: 1700000,
    highestSalary: 14500000,
    tuitionFee: 800000,
    roiYears: 1.3,
    totalStudents: 2200,
    internshipConversion: 65,
    higherEducationRate: 30,
    topRecruiters: ["Google", "Apple", "McKinsey", "Amazon", "Samsung"],
    courses: [
      { name: "Computer Science", placementRate: 97, avgSalary: 3100000, topIndustries: ["Software", "AI/ML", "Consulting"] },
      { name: "Electrical Engineering", placementRate: 88, avgSalary: 1750000, topIndustries: ["Telecom", "Power", "IT"] },
      { name: "Civil Engineering", placementRate: 78, avgSalary: 1100000, topIndustries: ["Construction", "Infrastructure", "Government"] },
      { name: "Textile Engineering", placementRate: 72, avgSalary: 900000, topIndustries: ["Textiles", "Fashion", "Manufacturing"] },
    ],
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    ranking: 5,
    placementRate: 85,
    avgSalary: 1650000,
    medianSalary: 1400000,
    highestSalary: 10000000,
    tuitionFee: 2000000,
    roiYears: 2.8,
    totalStudents: 1800,
    internshipConversion: 58,
    higherEducationRate: 35,
    topRecruiters: ["Microsoft", "Google", "DE Shaw", "Sprinklr", "Oracle"],
    courses: [
      { name: "Computer Science", placementRate: 95, avgSalary: 2500000, topIndustries: ["Software", "Fintech", "Product"] },
      { name: "Electronics", placementRate: 82, avgSalary: 1400000, topIndustries: ["Semiconductors", "IT", "Telecom"] },
      { name: "Mechanical Engineering", placementRate: 75, avgSalary: 1100000, topIndustries: ["Automotive", "Manufacturing", "Consulting"] },
      { name: "Pharmacy", placementRate: 70, avgSalary: 800000, topIndustries: ["Pharma", "Healthcare", "Research"] },
    ],
  },
  {
    id: "nit-trichy",
    name: "NIT Trichy",
    location: "Tiruchirappalli, TN",
    ranking: 8,
    placementRate: 88,
    avgSalary: 1200000,
    medianSalary: 1000000,
    highestSalary: 6000000,
    tuitionFee: 600000,
    roiYears: 1.5,
    totalStudents: 1500,
    internshipConversion: 52,
    higherEducationRate: 22,
    topRecruiters: ["TCS", "Infosys", "Cognizant", "Microsoft", "Flipkart"],
    courses: [
      { name: "Computer Science", placementRate: 95, avgSalary: 1800000, topIndustries: ["IT Services", "Software", "Consulting"] },
      { name: "Electronics", placementRate: 85, avgSalary: 1100000, topIndustries: ["Electronics", "IT", "Telecom"] },
      { name: "Instrumentation", placementRate: 78, avgSalary: 900000, topIndustries: ["Automation", "Manufacturing", "IT"] },
      { name: "Civil Engineering", placementRate: 72, avgSalary: 750000, topIndustries: ["Construction", "Government", "Infrastructure"] },
    ],
  },
  {
    id: "vit-vellore",
    name: "VIT Vellore",
    location: "Vellore, TN",
    ranking: 12,
    placementRate: 80,
    avgSalary: 850000,
    medianSalary: 700000,
    highestSalary: 4400000,
    tuitionFee: 1500000,
    roiYears: 3.5,
    totalStudents: 5000,
    internshipConversion: 42,
    higherEducationRate: 18,
    topRecruiters: ["TCS", "Wipro", "Cognizant", "Infosys", "Capgemini"],
    courses: [
      { name: "Computer Science", placementRate: 90, avgSalary: 1200000, topIndustries: ["IT Services", "Software", "Startups"] },
      { name: "Electronics", placementRate: 78, avgSalary: 750000, topIndustries: ["Electronics", "IT", "Telecom"] },
      { name: "Mechanical Engineering", placementRate: 68, avgSalary: 600000, topIndustries: ["Manufacturing", "Automotive", "IT"] },
      { name: "Biotechnology", placementRate: 55, avgSalary: 500000, topIndustries: ["Pharma", "Healthcare", "Research"] },
    ],
  },
];

export const salaryTrends: SalaryTrend[] = [
  { year: "2019", avgSalary: 850000, medianSalary: 650000, topSalary: 6000000 },
  { year: "2020", avgSalary: 780000, medianSalary: 600000, topSalary: 5500000 },
  { year: "2021", avgSalary: 920000, medianSalary: 720000, topSalary: 7500000 },
  { year: "2022", avgSalary: 1050000, medianSalary: 800000, topSalary: 9000000 },
  { year: "2023", avgSalary: 1200000, medianSalary: 900000, topSalary: 12000000 },
  { year: "2024", avgSalary: 1350000, medianSalary: 1000000, topSalary: 15000000 },
];

export const industryDistribution: IndustryDistribution[] = [
  { industry: "IT / Software", percentage: 38, avgSalary: 1500000, color: "hsl(243, 75%, 59%)" },
  { industry: "Fintech / Banking", percentage: 18, avgSalary: 1800000, color: "hsl(172, 66%, 50%)" },
  { industry: "Consulting", percentage: 12, avgSalary: 1600000, color: "hsl(38, 92%, 50%)" },
  { industry: "Manufacturing", percentage: 10, avgSalary: 900000, color: "hsl(340, 75%, 55%)" },
  { industry: "E-Commerce", percentage: 8, avgSalary: 1300000, color: "hsl(200, 80%, 50%)" },
  { industry: "Healthcare / Pharma", percentage: 6, avgSalary: 800000, color: "hsl(280, 60%, 55%)" },
  { industry: "Government / PSU", percentage: 5, avgSalary: 700000, color: "hsl(120, 50%, 45%)" },
  { industry: "Others", percentage: 3, avgSalary: 650000, color: "hsl(0, 0%, 60%)" },
];

export const careerGrowthData: CareerGrowth[] = [
  { year: "Year 0", salary: 1200000, designation: "Junior Engineer" },
  { year: "Year 2", salary: 1800000, designation: "Software Engineer" },
  { year: "Year 4", salary: 2800000, designation: "Senior Engineer" },
  { year: "Year 6", salary: 4200000, designation: "Tech Lead" },
  { year: "Year 8", salary: 6000000, designation: "Engineering Manager" },
  { year: "Year 10", salary: 8500000, designation: "Senior Manager" },
  { year: "Year 15", salary: 15000000, designation: "Director / VP" },
];

export const formatCurrency = (value: number): string => {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value.toLocaleString("en-IN")}`;
};

export const formatPercent = (value: number): string => `${value}%`;
