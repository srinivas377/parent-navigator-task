import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users } from "lucide-react";
import { University, formatCurrency, formatPercent } from "@/data/mockData";
import { useNavigate } from "react-router-dom";

interface UniversityCardProps {
  university: University;
  index: number;
}

const UniversityCard = ({ university, index }: UniversityCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => navigate(`/universities?id=${university.id}`)}
      className="bg-card rounded-2xl p-5 shadow-card border border-border hover:shadow-elevated transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              #{university.ranking}
            </span>
            <h3 className="font-display font-bold text-sm group-hover:text-primary transition-colors">
              {university.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-3 h-3" />
            <span className="text-xs">{university.location}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div>
          <p className="text-xs text-muted-foreground">Placement</p>
          <p className="text-sm font-bold text-success">{formatPercent(university.placementRate)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Avg Salary</p>
          <p className="text-sm font-bold">{formatCurrency(university.avgSalary)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">ROI</p>
          <p className="text-sm font-bold text-primary">{university.roiYears}yr</p>
        </div>
      </div>
    </motion.div>
  );
};

export default UniversityCard;
