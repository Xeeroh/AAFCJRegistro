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
  district: z.string().min(1, "Por favor seleccione un distrito"),
  sector: z.string().optional(),
  church: z.string().optional(),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
});

export function RegistrationForm() {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedSector, setSelectedSector] = useState<string>("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      district: "",
      sector: "",
      church: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", values);

    try {
      // Si no es Distrito Noroeste, usar valores por defecto para sector e iglesia
      const isNoroeste = values.district === "Distrito Noroeste";
      const sectorToRegister = isNoroeste 
        ? (isNaN(Number(values.sector)) ? "Foráneo" : values.sector)
        : "Foráneo";
      const churchToRegister = isNoroeste ? values.church : values.district;

      const { data: existingRegistrations, error: checkError } = await supabase
        .from("registrations")
        .select("*")
        .eq("church", churchToRegister)
        .eq("name", values.name)
        .eq("district", values.district);

      if (checkError) {
        throw checkError;
      }

      if (existingRegistrations.length > 0) {
        toast({
          title: "Error",
          description: "Este nombre ya está registrado en este distrito.",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from("registrations")
        .insert([
          {
            name: values.name,
            sector: sectorToRegister,
            church: churchToRegister,
            district: values.district,
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
      setSelectedDistrict("");
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

  // Obtener los distritos únicos
  const uniqueDistricts = Array.from(new Set(churches.map((church) => church.district)));

  // Obtener los sectores únicos del distrito seleccionado
  const uniqueSectors = Array.from(
    new Set(
      churches
        .filter((church) => church.district === selectedDistrict)
        .map((church) => church.sector)
    )
  );

  const availableChurches = churches.filter(
    (church) =>
      church.district === selectedDistrict &&
      church.sector === (isNaN(Number(selectedSector)) ? selectedSector : Number(selectedSector))
  );

  return (
    <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-emerald-700/30 bg-[#182126]/90 backdrop-blur-md">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold tracking-widest text-emerald-400 uppercase drop-shadow-md">Registro</h2>
        <p className="text-cyan-300/80 font-semibold tracking-wide uppercase text-xs mt-2">Seminario Regional AAFCJ 2025</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cyan-200 font-bold uppercase tracking-wide">Distrito</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedDistrict(value);
                    setSelectedSector("");
                    form.setValue("sector", "");
                    form.setValue("church", "");
                    if (value !== "Distrito Noroeste") {
                      form.setValue("church", value);
                    }
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#1a232a] border-cyan-600/40 text-cyan-100 focus:ring-cyan-400 focus:border-emerald-400/80 shadow-inner shadow-emerald-900/30">
                      <SelectValue placeholder="Seleccione un distrito" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1a232a] border-cyan-600/40">
                    {uniqueDistricts.map((district) => (
                      <SelectItem 
                        key={district} 
                        value={district}
                        className="text-cyan-100 hover:bg-emerald-900/60 focus:bg-emerald-900/60 uppercase tracking-wide"
                      >
                        {district}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-rose-400" />
              </FormItem>
            )}
          />

          {selectedDistrict === "Distrito Noroeste" && (
            <>
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyan-200 font-bold uppercase tracking-wide">Sector</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedSector(value);
                        form.setValue("church", "");
                      }}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#1a232a] border-cyan-600/40 text-cyan-100 focus:ring-cyan-400 focus:border-emerald-400/80 shadow-inner shadow-emerald-900/30">
                          <SelectValue placeholder="Seleccione un sector" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a232a] border-cyan-600/40">
                        {uniqueSectors.map((sector) => (
                          <SelectItem 
                            key={sector} 
                            value={sector.toString()}
                            className="text-cyan-100 hover:bg-emerald-900/60 focus:bg-emerald-900/60 uppercase tracking-wide"
                          >
                            {sector === "Foráneo" ? "Foráneo" : `Sector ${sector}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-rose-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="church"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-cyan-200 font-bold uppercase tracking-wide">Iglesia</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!selectedSector}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-[#1a232a] border-cyan-600/40 text-cyan-100 focus:ring-cyan-400 focus:border-emerald-400/80 shadow-inner shadow-emerald-900/30 disabled:opacity-50">
                          <SelectValue placeholder="Seleccione una iglesia" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#1a232a] border-cyan-600/40">
                        {availableChurches.map((church) => (
                          <SelectItem 
                            key={church.name} 
                            value={church.name}
                            className="text-cyan-100 hover:bg-emerald-900/60 focus:bg-emerald-900/60 uppercase tracking-wide"
                          >
                            {church.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-rose-400" />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-cyan-200 font-bold uppercase tracking-wide">Nombre del Asistente</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ingrese el nombre completo" 
                    {...field} 
                    className="bg-[#1a232a] border-cyan-600/40 text-cyan-100 placeholder:text-cyan-300/50 focus:ring-cyan-400 focus:border-emerald-400/80 shadow-inner shadow-emerald-900/30"
                  />
                </FormControl>
                <FormMessage className="text-rose-400" />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-400 hover:from-cyan-400 hover:to-emerald-500 text-white font-extrabold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg tracking-widest uppercase text-lg drop-shadow-md"
          >
            Registrar
          </Button>
        </form>
      </Form>
    </div>
  );
}
