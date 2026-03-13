import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Users, Trophy, ArrowLeft } from "lucide-react";
import { universities, formatCurrency, formatPercent } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import UniversityCard from "@/components/dashboard/UniversityCard";
import { useSearchParams } from "react-router-dom";

const Universities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get("id");
  const [search, setSearch] = useState("");

  const selected = universities.find((u) => u.id === selectedId);
  const filtered = universities.filter(
    (u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.location.toLowerCase().includes(search.toLowerCase())
  );

  if (selected) {
    const courseData = selected.courses.map((c) => ({
      name: c.name.length > 12 ? c.name.slice(0, 12) + "…" : c.name,
      placement: c.placementRate,
      salary: c.avgSalary / 100000,
    }));

    return (
      <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        <button
          onClick={() => setSearchParams({})}
          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all
        </button>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-hero rounded-3xl p-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-primary-foreground/60 text-xs font-bold bg-primary-foreground/20 px-2 py-0.5 rounded-full">
              Rank #{selected.ranking}
            </span>
          </div>
          <h1 className="font-display text-2xl lg:text-3xl font-bold text-primary-foreground mb-1">{selected.name}</h1>
          <div className="flex items-center gap-1 text-primary-foreground/70 text-sm">
            <MapPin className="w-3.5 h-3.5" /> {selected.location}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Placement Rate", value: formatPercent(selected.placementRate) },
            { label: "Avg Salary", value: formatCurrency(selected.avgSalary) },
            { label: "Highest Salary", value: formatCurrency(selected.highestSalary) },
            { label: "ROI Period", value: `${selected.roiYears} years` },
            { label: "Tuition Fee", value: formatCurrency(selected.tuitionFee) },
            { label: "Internship Conv.", value: formatPercent(selected.internshipConversion) },
            { label: "Higher Ed Rate", value: formatPercent(selected.higherEducationRate) },
            { label: "Students", value: selected.totalStudents.toLocaleString() },
          ].map((item) => (
            <div key={item.label} className="bg-card rounded-xl p-4 shadow-card border border-border">
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-lg font-display font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-display font-bold mb-4">Course-wise Placement & Salary</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={courseData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar yAxisId="left" dataKey="placement" fill="hsl(243,75%,59%)" radius={[4,4,0,0]} name="Placement %" />
              <Bar yAxisId="right" dataKey="salary" fill="hsl(172,66%,50%)" radius={[4,4,0,0]} name="Salary (₹L)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-display font-bold mb-3">Top Recruiters</h3>
          <div className="flex flex-wrap gap-2">
            {selected.topRecruiters.map((r) => (
              <span key={r} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-display font-bold mb-3">Course Details</h3>
          <div className="space-y-3">
            {selected.courses.map((c) => (
              <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="font-semibold text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.topIndustries.join(", ")}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-success">{formatPercent(c.placementRate)}</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(c.avgSalary)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold mb-1">Universities</h1>
        <p className="text-sm text-muted-foreground">Compare placement outcomes across top institutions</p>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search universities..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((u, i) => (
          <UniversityCard key={u.id} university={u} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Universities;
