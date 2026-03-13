import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  TrendingUp,
  Calculator,
  MessageCircle,
  GraduationCap,
  BarChart3,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/universities", icon: Building2, label: "Universities" },
  { to: "/career-prediction", icon: TrendingUp, label: "Career Prediction" },
  { to: "/roi-calculator", icon: Calculator, label: "ROI Calculator" },
  { to: "/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/advisor", icon: MessageCircle, label: "AI Advisor" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold leading-tight">Parent</h1>
            <p className="font-display text-sm text-muted-foreground leading-tight">Navigator</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border">
        <div className="rounded-xl bg-gradient-primary p-4">
          <p className="text-primary-foreground text-sm font-semibold mb-1">Need Help?</p>
          <p className="text-primary-foreground/80 text-xs">Ask our AI advisor about any career question.</p>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
