import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, TrendingUp, Calculator, MessageCircle, BarChart3 } from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Home" },
  { to: "/universities", icon: Building2, label: "Colleges" },
  { to: "/career-prediction", icon: TrendingUp, label: "Predict" },
  { to: "/roi-calculator", icon: Calculator, label: "ROI" },
  { to: "/analytics", icon: BarChart3, label: "Charts" },
  { to: "/advisor", icon: MessageCircle, label: "Advisor" },
];

const MobileNav = () => {
  const location = useLocation();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border">
      <div className="flex justify-around py-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 text-[10px] font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
