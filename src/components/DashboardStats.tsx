import { Card } from "@/components/ui/card";
import { Users, Church, Map, CalendarClock } from "lucide-react";

interface Registration {
  id: number;
  name: string;
  sector: string | number;
  church: string;
  district: string;
  created_at: string;
}

interface DashboardStatsProps {
  data: Registration[];
}

export const DashboardStats = ({ data }: DashboardStatsProps) => {
  const totalRegistrations = data.length;
  const uniqueChurches = new Set(data.map((r) => r.church)).size;
  const uniqueDistricts = new Set(data.map((r) => r.district)).size;
  
  const registrationsByDistrict = data.reduce((acc, curr) => {
    acc[curr.district] = (acc[curr.district] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const districtWithMostRegistrations = Object.entries(registrationsByDistrict)
    .sort(([, a], [, b]) => b - a)[0];

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  const dbfyesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  dbfyesterday.setDate(today.getDate() - 2);


  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const recentRegistrations = data.filter((r) => new Date(r.created_at) > lastMonth).length;
  const registrationsToday = data.filter((r) => new Date(r.created_at) >= today).length;
  const registrationsYesterday = data.filter((r) => {
    const date = new Date(r.created_at);
    return date >= yesterday && date < today;
  }).length;

  const formatDate = (date: Date) => date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });

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
      title: "Distritos",
      value: uniqueDistricts,
      icon: Map,
      color: "text-purple-600",
    },
    {
      title: `Hoy (${formatDate(today)})`,
      value: registrationsToday,
      icon: CalendarClock,
      color: "text-green-600",
    },
    {
      title: `Ayer (${formatDate(yesterday)})`,
      value: registrationsYesterday,
      icon: CalendarClock,
      color: "text-green-600",
    },
    {
      title: `Antier (${formatDate(dbfyesterday)})`,
      value: data.filter((r) => {
        const date = new Date(r.created_at);
        return date >= dbfyesterday && date < yesterday;
      }).length,
      icon: CalendarClock,
      color: "text-green-600",
    },
  ];
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 bg-[#232b32] border border-emerald-700/30 shadow-lg text-white">
          <div className="flex items-center space-x-4">
            <div className={`${stat.color} bg-opacity-20 p-3 rounded-full`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-emerald-300">{stat.title}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}

      <Card className="p-6 bg-[#232b32] border border-emerald-700/30 shadow-lg text-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-400/20 rounded-full">
            <CalendarClock className="w-6 h-6 text-orange-400" />
          </div>
          <div>
            <p className="text-sm text-emerald-300">Distrito con más Registros</p>
            <h3 className="text-2xl font-bold text-white">
              {districtWithMostRegistrations ? districtWithMostRegistrations[0] : "N/A"}
            </h3>
            <p className="text-sm text-emerald-300">
              {districtWithMostRegistrations ? `${districtWithMostRegistrations[1]} registros` : ""}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
