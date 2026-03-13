import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Briefcase, DollarSign, BarChart3 } from "lucide-react";
import { formatCurrency } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const degrees = ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Biotechnology", "Electronics", "Pharmacy"];
const uniTiers = ["Tier 1 (IIT/NIT)", "Tier 2 (BITS/IIIT)", "Tier 3 (VIT/SRM)", "Tier 4 (State/Private)"];

const predict = (degree: string, tier: string, gpa: number, internships: number) => {
  const baseSalary: Record<string, number> = {
    "Computer Science": 1200000, "Electrical Engineering": 800000, "Mechanical Engineering": 700000,
    "Civil Engineering": 550000, "Chemical Engineering": 600000, "Biotechnology": 450000,
    "Electronics": 750000, "Pharmacy": 400000,
  };
  const tierMult: Record<string, number> = { "Tier 1 (IIT/NIT)": 2.2, "Tier 2 (BITS/IIIT)": 1.6, "Tier 3 (VIT/SRM)": 1.0, "Tier 4 (State/Private)": 0.7 };
  const base = baseSalary[degree] || 600000;
  const mult = tierMult[tier] || 1;
  const gpaMult = 0.7 + (gpa / 10) * 0.6;
  const internMult = 1 + internships * 0.08;
  const salary = Math.round(base * mult * gpaMult * internMult);
  const placement = Math.min(98, Math.round(60 + mult * 12 + gpa * 2 + internships * 3));
  const industries = degree === "Computer Science"
    ? [{ name: "Software", prob: 45 }, { name: "Fintech", prob: 22 }, { name: "AI/ML", prob: 18 }, { name: "Consulting", prob: 15 }]
    : degree === "Mechanical Engineering"
    ? [{ name: "Manufacturing", prob: 35 }, { name: "Automotive", prob: 25 }, { name: "IT Services", prob: 22 }, { name: "Consulting", prob: 18 }]
    : [{ name: "IT Services", prob: 38 }, { name: "Core Industry", prob: 28 }, { name: "Consulting", prob: 20 }, { name: "Startups", prob: 14 }];
  return { salary, placement, industries, salaryRange: { low: Math.round(salary * 0.6), high: Math.round(salary * 1.6) } };
};

const CareerPrediction = () => {
  const [degree, setDegree] = useState(degrees[0]);
  const [tier, setTier] = useState(uniTiers[0]);
  const [gpa, setGpa] = useState(8);
  const [internships, setInternships] = useState(2);
  const [result, setResult] = useState<ReturnType<typeof predict> | null>(null);

  const handlePredict = () => setResult(predict(degree, tier, gpa, internships));

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">Career Prediction</h1>
        <p className="text-sm text-muted-foreground">Predict career outcomes based on student profile</p>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Degree Program</label>
            <select value={degree} onChange={(e) => setDegree(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none">
              {degrees.map((d) => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">University Tier</label>
            <select value={tier} onChange={(e) => setTier(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-sm focus:ring-2 focus:ring-primary/30 focus:outline-none">
              {uniTiers.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">GPA (out of 10): {gpa}</label>
            <input type="range" min={4} max={10} step={0.5} value={gpa} onChange={(e) => setGpa(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Internships Completed: {internships}</label>
            <input type="range" min={0} max={5} value={internships} onChange={(e) => setInternships(Number(e.target.value))} className="w-full accent-primary" />
          </div>
        </div>
        <button onClick={handlePredict} className="w-full bg-gradient-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity">
          Predict Career Outcome
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-card rounded-xl p-5 shadow-card border border-border text-center">
                <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Placement Probability</p>
                <p className="text-2xl font-display font-bold text-success">{result.placement}%</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-card border border-border text-center">
                <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Expected Salary</p>
                <p className="text-2xl font-display font-bold">{formatCurrency(result.salary)}</p>
                <p className="text-[10px] text-muted-foreground">{formatCurrency(result.salaryRange.low)} – {formatCurrency(result.salaryRange.high)}</p>
              </div>
              <div className="bg-card rounded-xl p-5 shadow-card border border-border text-center col-span-2 lg:col-span-1">
                <Briefcase className="w-6 h-6 text-warning mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Top Industry</p>
                <p className="text-2xl font-display font-bold">{result.industries[0].name}</p>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <h3 className="font-display font-bold mb-4">Industry Placement Likelihood</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={result.industries} layout="vertical">
                  <XAxis type="number" domain={[0, 50]} tick={{ fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={100} />
                  <Tooltip />
                  <Bar dataKey="prob" fill="hsl(243,75%,59%)" radius={[0,6,6,0]} name="Probability %" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-gradient-primary rounded-2xl p-6">
              <h3 className="font-display font-bold text-primary-foreground mb-2">AI Insight for Parents</h3>
              <p className="text-primary-foreground/90 text-sm leading-relaxed">
                A student pursuing <strong>{degree}</strong> from a <strong>{tier}</strong> institution with a GPA of <strong>{gpa}/10</strong> and <strong>{internships} internship{internships !== 1 ? "s" : ""}</strong> has an estimated <strong>{result.placement}%</strong> chance of placement with an expected salary of <strong>{formatCurrency(result.salary)}</strong>. The most likely industry is <strong>{result.industries[0].name}</strong> ({result.industries[0].prob}% probability). We recommend focusing on skill development in {result.industries[0].name.toLowerCase()} and pursuing quality internships to maximize outcomes.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerPrediction;
