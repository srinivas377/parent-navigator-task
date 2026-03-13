import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { universities, salaryTrends, industryDistribution, careerGrowthData, formatCurrency } from "@/data/mockData";

const Analytics = () => {
  const comparisonData = universities.map((u) => ({
    name: u.name.split(" ").slice(-1)[0],
    placement: u.placementRate,
    internship: u.internshipConversion,
    higherEd: u.higherEducationRate,
  }));

  const radarData = universities.slice(0, 3).map((u) => ({
    university: u.name.split(" ").slice(-1)[0],
    placement: u.placementRate,
    salary: Math.round(u.avgSalary / 30000),
    roi: Math.round(100 / u.roiYears),
    internship: u.internshipConversion,
    ranking: 100 - u.ranking * 5,
  }));

  const forecastData = [
    { year: "2025", software: 42, fintech: 20, ai: 25, consulting: 12 },
    { year: "2026", software: 40, fintech: 22, ai: 30, consulting: 11 },
    { year: "2027", software: 38, fintech: 24, ai: 35, consulting: 10 },
    { year: "2028", software: 35, fintech: 25, ai: 40, consulting: 9 },
    { year: "2029", software: 33, fintech: 26, ai: 45, consulting: 8 },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">Analytics</h1>
        <p className="text-sm text-muted-foreground">Deep dive into career and placement data</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Career Growth Timeline */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-display font-bold mb-1">Career Growth Timeline (CS Graduate)</h3>
          <p className="text-xs text-muted-foreground mb-4">Average salary progression over 15 years</p>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={careerGrowthData}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(243,75%,59%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(243,75%,59%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,90%)" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 10 }} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} labelFormatter={(l) => {
                const d = careerGrowthData.find((c) => c.year === l);
                return d ? `${l} — ${d.designation}` : l;
              }} />
              <Area type="monotone" dataKey="salary" stroke="hsl(243,75%,59%)" fill="url(#growthGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Industry Forecast */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-display font-bold mb-1">Industry Demand Forecast (2025–2029)</h3>
          <p className="text-xs text-muted-foreground mb-4">Predicted hiring trends by sector</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,90%)" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="ai" stroke="hsl(243,75%,59%)" strokeWidth={2} name="AI / ML" />
              <Line type="monotone" dataKey="software" stroke="hsl(172,66%,50%)" strokeWidth={2} name="Software" />
              <Line type="monotone" dataKey="fintech" stroke="hsl(38,92%,50%)" strokeWidth={2} name="Fintech" />
              <Line type="monotone" dataKey="consulting" stroke="hsl(340,75%,55%)" strokeWidth={2} name="Consulting" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* University Comparison */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-display font-bold mb-4">University Metrics Comparison</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="placement" fill="hsl(243,75%,59%)" name="Placement %" radius={[3,3,0,0]} />
              <Bar dataKey="internship" fill="hsl(172,66%,50%)" name="Internship Conv %" radius={[3,3,0,0]} />
              <Bar dataKey="higherEd" fill="hsl(38,92%,50%)" name="Higher Ed %" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Salary Distribution */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-display font-bold mb-4">Salary by University</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={universities.map((u) => ({ name: u.name.split(" ").slice(-1)[0], avg: u.avgSalary / 100000, median: u.medianSalary / 100000, highest: u.highestSalary / 100000 }))} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} label={{ value: "₹ Lakhs", angle: -90, position: "insideLeft", style: { fontSize: 10 } }} />
              <Tooltip formatter={(v: number) => `₹${v}L`} />
              <Bar dataKey="avg" fill="hsl(243,75%,59%)" name="Average" radius={[3,3,0,0]} />
              <Bar dataKey="median" fill="hsl(172,66%,50%)" name="Median" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;
