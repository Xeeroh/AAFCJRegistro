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
  sector: number;
  church: string;
  created_at: string;
}

interface RecentRegistrationsProps {
  data: Registration[];
}

export const RecentRegistrations = ({ data }: RecentRegistrationsProps) => {
  const [groupedView, setGroupedView] = useState(false);

  // Agrupar registros por iglesia
  const groupedData = data.reduce<Record<string, Registration[]>>((acc, registration) => {
    if (!acc[registration.church]) {
      acc[registration.church] = [];
    }
    acc[registration.church].push(registration);
    return acc;
  }, {});

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Registros Recientes</h3>
        <Button onClick={() => setGroupedView(!groupedView)}>
          {groupedView ? "Ver Lista Completa" : "Ver Agrupado por Iglesia"}
        </Button>
      </div>

      <div className="overflow-x-auto">
        {groupedView ? (
          // Vista agrupada por iglesia
          <div className="space-y-6">
            {Object.entries(groupedData).map(([church, registrations]) => (
              <div key={church}>
                <h4 className="text-md font-bold mb-2">
                  {church} ({registrations.length} registros)
                </h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registrations.map((registration) => (
                      <TableRow key={registration.id}>
                        <TableCell className="font-medium">{registration.name}</TableCell>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Iglesia</TableHead>
                <TableHead>Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell className="font-medium">{registration.name}</TableCell>
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
