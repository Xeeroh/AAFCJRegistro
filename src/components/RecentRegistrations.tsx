import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Registration {
  id: number;
  name: string;
  sector: string | number;
  church: string;
  district: string;
  created_at: string;
}

interface RecentRegistrationsProps {
  data: Registration[];
}

export const RecentRegistrations = ({ data }: RecentRegistrationsProps) => {
  const [groupedView, setGroupedView] = useState(false);
  const [groupBy, setGroupBy] = useState<'church' | 'district'>('church');

  // Agrupar registros por iglesia o distrito
  const groupedData = data.reduce<Record<string, Registration[]>>((acc, registration) => {
    const key = groupBy === 'church' ? registration.church : registration.district;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(registration);
    return acc;
  }, {});

  return (
    <Card className="p-6 bg-[#232b32] border border-emerald-700/30 shadow-lg text-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-emerald-300">Registros Recientes</h3>
        <div className="flex gap-2">
          <Button 
            variant={groupBy === 'church' ? "default" : "outline"}
            className={`bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold ${groupBy === 'church' ? '' : 'bg-transparent border-emerald-500 text-emerald-300'}`}
            onClick={() => setGroupBy('church')}
          >
            Por Iglesia
          </Button>
          <Button 
            variant={groupBy === 'district' ? "default" : "outline"}
            className={`bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold ${groupBy === 'district' ? '' : 'bg-transparent border-emerald-500 text-emerald-300'}`}
            onClick={() => setGroupBy('district')}
          >
            Por Distrito
          </Button>
          <Button onClick={() => setGroupedView(!groupedView)} className="bg-[#232b32] border border-emerald-700/30 text-emerald-300 font-bold">
            {groupedView ? "Ver Lista Completa" : "Ver Agrupado"}
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {groupedView ? (
          // Vista agrupada
          <div className="space-y-6">
            {Object.entries(groupedData).map(([key, registrations]) => (
              <div key={key}>
                <h4 className="text-md font-bold mb-2 text-emerald-400">
                  {key} ({registrations.length} registros)
                </h4>
                <Table className="bg-[#232b32] text-white">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-emerald-300">Nombre</TableHead>
                      {groupBy === 'church' && <TableHead className="text-emerald-300">Distrito</TableHead>}
                      <TableHead className="text-emerald-300">Sector</TableHead>
                      <TableHead className="text-emerald-300">Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((registration, idx) => (
                      <TableRow key={registration.id} className={idx % 2 === 0 ? 'bg-[#232b32]' : 'bg-[#1a232a]'}>
                        <TableCell className="font-medium">{registration.name}</TableCell>
                        {groupBy === 'church' && <TableCell>{registration.district}</TableCell>}
                        <TableCell>{registration.sector}</TableCell>
                        <TableCell>{new Date(registration.created_at).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        ) : (
          // Vista plana (sin agrupar)
          <Table className="bg-[#232b32] text-white">
            <TableHeader>
              <TableRow>
                <TableHead className="text-emerald-300">Nombre</TableHead>
                <TableHead className="text-emerald-300">Distrito</TableHead>
                <TableHead className="text-emerald-300">Sector</TableHead>
                <TableHead className="text-emerald-300">Iglesia</TableHead>
                <TableHead className="text-emerald-300">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((registration, idx) => (
                <TableRow key={registration.id} className={idx % 2 === 0 ? 'bg-[#232b32]' : 'bg-[#1a232a]'}>
                  <TableCell className="font-medium">{registration.name}</TableCell>
                  <TableCell>{registration.district}</TableCell>
                  <TableCell>{registration.sector}</TableCell>
                  <TableCell>{registration.church}</TableCell>
                  <TableCell>{new Date(registration.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Card>
  );
};
