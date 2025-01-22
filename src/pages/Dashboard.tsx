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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard de Registros</h1>
          <Button onClick={() => navigate("/register")}>
            Nuevo Registro
          </Button>
        </div>
        
        <DashboardStats data={registrations} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RegistrationCharts data={registrations} />
        </div>
        
        <RecentRegistrations data={registrations} />
      </div>
    </div>
  );
};

export default Dashboard;