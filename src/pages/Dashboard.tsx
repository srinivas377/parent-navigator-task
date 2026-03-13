import { motion } from "framer-motion";
import { GraduationCap, TrendingUp, DollarSign, Briefcase, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import StatCard from "@/components/dashboard/StatCard";
import UniversityCard from "@/components/dashboard/UniversityCard";
import { universities, salaryTrends, industryDistribution, formatCurrency } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const placementData = universities.map((u) => ({
    name: u.name.replace("IIT ", "").replace("NIT ", "").replace("BITS ", ""),
    rate: u.placementRate,
    salary: u.avgSalary,
  }));

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-hero rounded-3xl p-8 lg:p-10"
      >
        <div className="max-w-2xl">
          <p className="text-primary-foreground/60 text-sm font-medium mb-2">Parent Navigator System</p>
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-primary-foreground mb-3">
            Make Informed Decisions About Your Child's Future
          </h1>
          <p className="text-primary-foreground/70 text-sm lg:text-base mb-6">
            AI-powered career insights, placement analytics, and ROI calculations to help you choose the right university.
          </p>
          <button
            onClick={() => navigate("/advisor")}
            className="bg-primary-foreground text-foreground px-6 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Ask AI Advisor <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Avg Placement Rate" value="87%" icon={GraduationCap} gradient="primary" trend={{ value: 5, label: "YoY" }} />
        <StatCard title="Avg Starting Salary" value="₹13.5L" icon={DollarSign} gradient="accent" trend={{ value: 12, label: "YoY" }} />
        <StatCard title="Top Industry" value="IT / Software" icon={Briefcase} subtitle="38% of graduates" />
        <StatCard title="Avg ROI Period" value="2.1 Years" icon={TrendingUp} gradient="warm" />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Salary Trends */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-display font-bold mb-4">Salary Trends (2019–2024)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={salaryTrends}>
              <defs>
                <linearGradient id="salaryGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(243,75%,59%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(243,75%,59%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,90%)" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} />
              <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Area type="monotone" dataKey="avgSalary" stroke="hsl(243,75%,59%)" fill="url(#salaryGrad)" strokeWidth={2} name="Average" />
              <Area type="monotone" dataKey="medianSalary" stroke="hsl(172,66%,50%)" fill="none" strokeWidth={2} strokeDasharray="5 5" name="Median" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Distribution */}
        <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
          <h3 className="font-display font-bold mb-4">Industry Distribution</h3>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie
                  data={industryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="percentage"
                >
                  {industryDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {industryDistribution.slice(0, 5).map((item) => (
                <div key={item.industry} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-muted-foreground flex-1">{item.industry}</span>
                  <span className="text-xs font-bold">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Placement Comparison */}
      <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold">University Placement Comparison</h3>
          <button
            onClick={() => navigate("/universities")}
            className="text-xs text-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={placementData} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,13%,90%)" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="rate" fill="hsl(243,75%,59%)" radius={[6, 6, 0, 0]} name="Placement Rate %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Universities */}
      <div>
        <h3 className="font-display font-bold text-lg mb-4">Top Universities</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {universities.slice(0, 3).map((u, i) => (
            <UniversityCard key={u.id} university={u} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
