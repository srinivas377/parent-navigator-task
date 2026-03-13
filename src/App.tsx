import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "@/pages/Dashboard";
import Universities from "@/pages/Universities";
import CareerPrediction from "@/pages/CareerPrediction";
import ROICalculator from "@/pages/ROICalculator";
import Analytics from "@/pages/Analytics";
import Advisor from "@/pages/Advisor";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/career-prediction" element={<CareerPrediction />} />
            <Route path="/roi-calculator" element={<ROICalculator />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/advisor" element={<Advisor />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
