import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  gradient?: "primary" | "accent" | "warm";
}

const gradientMap = {
  primary: "bg-gradient-primary",
  accent: "bg-gradient-accent",
  warm: "bg-gradient-warm",
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, gradient }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-elevated transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
            gradient ? gradientMap[gradient] : "bg-primary/10"
          }`}
        >
          <Icon className={`w-5 h-5 ${gradient ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        {trend && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trend.value >= 0 ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
            }`}
          >
            {trend.value >= 0 ? "+" : ""}
            {trend.value}% {trend.label}
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-1">{title}</p>
      <p className="text-2xl font-display font-bold">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
    </motion.div>
  );
};

export default StatCard;
