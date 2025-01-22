import { Card } from "@/components/ui/card";
import { Users, Church, Map, CalendarClock } from "lucide-react";

interface Registration {
  id: number;
  name: string;
  sector: number;
  church: string;
  created_at: string;
}

interface DashboardStatsProps {
  data: Registration[];
}

export const DashboardStats = ({ data }: DashboardStatsProps) => {
  // Calcular estadísticas
  const totalRegistrations = data.length;
  const uniqueChurches = new Set(data.map(r => r.church)).size;
  const uniqueSectors = new Set(data.map(r => r.sector)).size;
  
  // Registros del último mes
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const recentRegistrations = data.filter(r => new Date(r.created_at) > lastMonth).length;

  const stats = [
    {
      title: "Total Registros",
      value: totalRegistrations,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Iglesias",
      value: uniqueChurches,
      icon: Church,
      color: "text-indigo-600",
    },
    {
      title: "Sectores",
      value: uniqueSectors,
      icon: Map,
      color: "text-purple-600",
    },
    {
      title: "Último Mes",
      value: recentRegistrations,
      icon: CalendarClock,
      color: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-4">
            <div className={`${stat.color} bg-opacity-10 p-3 rounded-full`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};