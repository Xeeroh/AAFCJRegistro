import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { churches } from "@/data/churches";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  sector: z.string().min(1, "Por favor seleccione un sector"),
  church: z.string().min(1, "Por favor seleccione una iglesia"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
});

export function RegistrationForm() {
  const [selectedSector, setSelectedSector] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sector: "",
      church: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);

    try {
      // Verificar si el sector es un número. Si no lo es, asignar "Foráneo"
      const sectorToRegister = isNaN(Number(values.sector)) ? "Foráneo" : values.sector;

      const { data: existingRegistrations, error: checkError } = await supabase
        .from("registrations")
        .select("*")
        .eq("church", values.church)
        .eq("name", values.name);

      if (checkError) {
        throw checkError;
      }

      if (existingRegistrations.length > 0) {
        toast({
          title: "Error",
          description: "Este nombre ya está registrado en esta iglesia.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("registrations")
        .insert([
          {
            name: values.name,
            sector: sectorToRegister, // Aquí usamos el valor modificado
            church: values.church,
          },
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Registro exitoso",
        description: `${values.name} ha sido registrado para el congreso.`,
        variant: "default",
      });

      form.reset();
      setSelectedSector("");
    } catch (error) {
      console.error("Error inserting data:", error);
      toast({
        title: "Error",
        description: "Hubo un problema al registrar los datos. Intenta nuevamente.",
        variant: "destructive",
      });
    }
  };

  // Obtener los sectores únicos de las iglesias disponibles
  const uniqueSectors = Array.from(new Set(churches.map((church) => church.sector)));

  const availableChurches = churches.filter(
    (church) => church.sector === (isNaN(Number(selectedSector)) ? selectedSector : Number(selectedSector))
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Registro</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="sector"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sector</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedSector(value);
                      form.setValue("church", "");
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un sector" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {uniqueSectors.map((sector) => (
                        <SelectItem key={sector} value={sector.toString()}>
                          {sector === "Foráneo" ? "Foráneo" : `Sector ${sector}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="church"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Iglesia</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} disabled={!selectedSector}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una iglesia" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableChurches.map((church) => (
                        <SelectItem key={church.name} value={church.name}>
                          {church.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Asistente</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el nombre completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Registrar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
