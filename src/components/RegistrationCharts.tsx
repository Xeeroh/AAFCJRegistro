import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Registration {
  id: number;
  name: string;
  sector: string | number;
  church: string;
  district: string;
  created_at: string;
}

interface RegistrationChartsProps {
  data: Registration[];
}

export const RegistrationCharts = ({ data }: RegistrationChartsProps) => {
  const [selectedView, setSelectedView] = useState<'sector' | 'district' | 'church'>('district');

  // Datos para el gráfico de sectores
  const sectorData = Array.from(
    data.reduce((acc, curr) => {
      const sector = curr.sector.toString();
      acc.set(sector, (acc.get(sector) || 0) + 1);
      return acc;
    }, new Map<string, number>()),
    ([sector, count]) => ({ name: `Sector ${sector}`, value: count })
  );

  // Datos para el gráfico de distritos
  const districtData = Array.from(
    data.reduce((acc, curr) => {
      acc.set(curr.district, (acc.get(curr.district) || 0) + 1);
      return acc;
    }, new Map<string, number>()),
    ([district, count]) => ({ name: district, value: count })
  );

  // Datos para el gráfico de iglesias
  const churchData = Array.from(
    data.reduce((acc, curr) => {
      acc.set(curr.church, (acc.get(curr.church) || 0) + 1);
      return acc;
    }, new Map<string, number>()),
    ([church, count]) => ({ name: church, value: count })
  );

  const COLORS = ["#34d399", "#06b6d4", "#fbbf24", "#f472b6", "#a78bfa", "#82CA9D"];

  const currentData = selectedView === 'sector' 
    ? sectorData 
    : selectedView === 'district' 
      ? districtData 
      : churchData;

  return (
    <Card className="p-6 bg-[#232b32] border border-emerald-700/30 shadow-lg text-white w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-semibold text-emerald-300">Estadísticas de Registros</h3>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            className={`flex-1 sm:flex-none px-3 py-1 rounded font-bold uppercase tracking-wide transition-all duration-200 shadow-md ${selectedView === 'district' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' : 'bg-transparent border border-emerald-500 text-emerald-300'}`}
            onClick={() => setSelectedView('district')}
          >
            Por Distrito
          </button>
          <button
            className={`flex-1 sm:flex-none px-3 py-1 rounded font-bold uppercase tracking-wide transition-all duration-200 shadow-md ${selectedView === 'sector' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' : 'bg-transparent border border-emerald-500 text-emerald-300'}`}
            onClick={() => setSelectedView('sector')}
          >
            Por Sector
          </button>
          <button
            className={`flex-1 sm:flex-none px-3 py-1 rounded font-bold uppercase tracking-wide transition-all duration-200 shadow-md ${selectedView === 'church' ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white' : 'bg-transparent border border-emerald-500 text-emerald-300'}`}
            onClick={() => setSelectedView('church')}
          >
            Por Iglesia
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Gráfico de Barras */}
        <div className="h-[250px] sm:h-[300px] lg:h-[400px] bg-[#232b32] rounded-xl p-2 sm:p-4 w-full overflow-x-auto">
          <h4 className="text-center mb-2 sm:mb-4 text-emerald-300 text-sm sm:text-base">Registros por {selectedView === 'district' ? 'Distrito' : selectedView === 'sector' ? 'Sector' : 'Iglesia'}</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80} 
                stroke="#a7f3d0" 
                tick={{ fill: '#a7f3d0', fontSize: 12 }} 
                interval={0}
              />
              <YAxis stroke="#a7f3d0" tick={{ fill: '#a7f3d0', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#232b32', border: '1px solid #34d399', color: '#fff' }} />
              <Bar dataKey="value" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Gráfico Circular */}
        <div className="h-[250px] sm:h-[300px] lg:h-[400px] bg-[#232b32] rounded-xl p-2 sm:p-4 w-full">
          <h4 className="text-center mb-2 sm:mb-4 text-emerald-300 text-sm sm:text-base">Distribución por {selectedView === 'district' ? 'Distrito' : selectedView === 'sector' ? 'Sector' : 'Iglesia'}</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={window.innerWidth < 640 ? 80 : window.innerWidth < 1024 ? 100 : 150}
                fill="#34d399"
                dataKey="value"
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#232b32', border: '1px solid #34d399', color: '#fff' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};
