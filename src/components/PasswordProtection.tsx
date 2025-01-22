import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PasswordProtectionProps {
  onSuccess: () => void;
}

const PasswordProtection = ({ onSuccess }: PasswordProtectionProps) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica si ya se ha autenticado en el localStorage
  useEffect(() => {
    const hasAccess = localStorage.getItem("dashboardAccess") === "true";
    setIsAuthenticated(hasAccess);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "AAFCJ25") {
      // Si la contraseña es correcta, guarda el acceso en localStorage y llama onSuccess
      onSuccess();
      localStorage.setItem("dashboardAccess", "true");
    } else {
      toast.error("Contraseña incorrecta");
    }
  };

  if (isAuthenticated) {
    return null; // Si ya está autenticado, no muestra nada
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Acceso al Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ingresa la contraseña para acceder al dashboard
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Acceder
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection;
