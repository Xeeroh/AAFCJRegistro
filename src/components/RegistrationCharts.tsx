import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface Registration {
  id: number;
  name: string;
  sector: number;
  church: string;
  created_at: string;
}

interface RegistrationChartsProps {
  data: Registration[];
}

export const RegistrationCharts = ({ data }: RegistrationChartsProps) => {
  const [selectedSector, setSelectedSector] = useState<number | null>(null);

  const sectorData = Array.from(
    data.reduce((acc, curr) => {
      acc.set(curr.sector, (acc.get(curr.sector) || 0) + 1);
      return acc;
    }, new Map()),
    ([sector, count]) => ({ sector, count })
  );

  const churchData = Array.from(
    data.reduce((acc, curr) => {
      acc.set(curr.church, (acc.get(curr.church) || 0) + 1);
      return acc;
    }, new Map()),
    ([name, value]) => ({ name, value })
  );

  const churchSectorData = data.reduce((acc, curr) => {
    if (!acc[curr.sector]) {
      acc[curr.sector] = {};
    }
    acc[curr.sector][curr.church] = (acc[curr.sector][curr.church] || 0) + 1;
    return acc;
  }, {} as Record<number, Record<string, number>>);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Registros por Sector</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sectorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sector" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" onClick={(e) => setSelectedSector(e.sector)} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Distribución por Iglesia</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={churchData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {churchData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {selectedSector !== null && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Iglesias en Sector {selectedSector}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Iglesia</th>
                  <th className="border px-4 py-2">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(churchSectorData[selectedSector] || {}).map(([church, count]) => (
                  <tr key={church}>
                    <td className="border px-4 py-2">{church}</td>
                    <td className="border px-4 py-2 text-center">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={() => setSelectedSector(null)}>
            Cerrar
          </button>
        </Card>
      )}
    </>
  );
};
