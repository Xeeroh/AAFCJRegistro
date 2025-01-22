import { Card } from "@/components/ui/card";
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
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Registros Recientes</h3>
      <div className="overflow-x-auto">
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
      </div>
    </Card>
  );
};