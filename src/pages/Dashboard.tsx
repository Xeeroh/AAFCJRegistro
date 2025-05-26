import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardStats } from "@/components/DashboardStats";
import { RegistrationCharts } from "@/components/RegistrationCharts";
import { RecentRegistrations } from "@/components/RecentRegistrations";
import PasswordProtection from "@/components/PasswordProtection";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const hasAccess = localStorage.getItem("dashboardAccess") === "true";
    setIsAuthenticated(hasAccess);

    if (hasAccess) {
      fetchRegistrations();
    }
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <PasswordProtection onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#181f23] px-4">
      <div className="max-w-7xl mx-auto space-y-8 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-emerald-400 tracking-widest uppercase drop-shadow-md">Dashboard de Registros</h1>
          <Button className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-500 text-white font-bold px-6 py-2 rounded-lg shadow-lg uppercase tracking-wide">
            Nuevo Registro
          </Button>
        </div>
        <DashboardStats data={registrations} />
        <RecentRegistrations data={registrations} />
        <RegistrationCharts data={registrations} />
      </div>
    </div>
  );
};

export default Dashboard;