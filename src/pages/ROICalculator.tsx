import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, Clock, PiggyBank } from "lucide-react";
import { formatCurrency } from "@/data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ROICalculator = () => {
  const [tuition, setTuition] = useState(800000);
  const [livingCost, setLivingCost] = useState(300000);
  const [years, setYears] = useState(4);
  const [expectedSalary, setExpectedSalary] = useState(1200000);
  const [salaryGrowth, setSalaryGrowth] = useState(15);

  const totalCost = (tuition + livingCost) * years;
  const paybackYears = Math.ceil(totalCost / expectedSalary);

  const earningsData = Array.from({ length: 15 }, (_, i) => {
    const yr = i + 1;
    const salary = expectedSalary * Math.pow(1 + salaryGrowth / 100, yr - 1);
    const cumEarnings = Array.from({ length: yr }, (_, j) => expectedSalary * Math.pow(1 + salaryGrowth / 100, j)).reduce((a, b) => a + b, 0);
    return { year: `Y${yr}`, salary: Math.round(salary), cumEarnings: Math.round(cumEarnings), investment: totalCost };
  });

  const tenYearEarnings = earningsData[9]?.cumEarnings || 0;
  const roi = ((tenYearEarnings - totalCost) / totalCost * 100).toFixed(0);

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">ROI Calculator</h1>
        <p className="text-sm text-muted-foreground">Calculate the return on investment for education</p>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Annual Tuition Fee: {formatCurrency(tuition)}</label>
            <input type="range" min={100000} max={3000000} step={50000} value={tuition} onChange={(e) => setTuition(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Annual Living Cost: {formatCurrency(livingCost)}</label>
            <input type="range" min={100000} max={1000000} step={25000} value={livingCost} onChange={(e) => setLivingCost(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Program Duration: {years} years</label>
            <input type="range" min={2} max={6} value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Expected Starting Salary: {formatCurrency(expectedSalary)}</label>
            <input type="range" min={300000} max={5000000} step={50000} value={expectedSalary} onChange={(e) => setExpectedSalary(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block">Annual Salary Growth: {salaryGrowth}%</label>
            <input type="range" min={5} max={30} value={salaryGrowth} onChange={(e) => setSalaryGrowth(Number(e.target.value))} className="w-full accent-primary" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-xl p-5 shadow-card border border-border text-center">
          <PiggyBank className="w-6 h-6 text-destructive mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Total Investment</p>
          <p className="text-xl font-display font-bold">{formatCurrency(totalCost)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-card rounded-xl p-5 shadow-card border border-border text-center">
          <Clock className="w-6 h-6 text-warning mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Payback Period</p>
          <p className="text-xl font-display font-bold">{paybackYears} year{paybackYears > 1 ? "s" : ""}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-xl p-5 shadow-card border border-border text-center">
          <TrendingUp className="w-6 h-6 text-success mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">10-Year ROI</p>
          <p className="text-xl font-display font-bold text-success">{roi}%</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-xl p-5 shadow-card border border-border text-center">
          <Calculator className="w-6 h-6 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">10-Year Earnings</p>
          <p className="text-xl font-display font-bold">{formatCurrency(tenYearEarnings)}</p>
        </motion.div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
        <h3 className="font-display font-bold mb-4">Earnings vs Investment Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={earningsData}>
            <defs>
              <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(152,69%,40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(152,69%,40%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,90%)" />
            <XAxis dataKey="year" tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 11 }} />
            <Tooltip formatter={(v: number) => formatCurrency(v)} />
            <Area type="monotone" dataKey="cumEarnings" stroke="hsl(152,69%,40%)" fill="url(#earningsGrad)" strokeWidth={2} name="Cumulative Earnings" />
            <Area type="monotone" dataKey="investment" stroke="hsl(0,84%,60%)" fill="none" strokeWidth={2} strokeDasharray="5 5" name="Total Investment" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ROICalculator;
