import { RegistrationForm } from "@/components/RegistrationForm";

const Register = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center relative overflow-hidden">
      {/* Fondo con gradiente radial, patrón de puntos y resplandor */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#16232a] via-[#1a2d2f] to-[#22313a]">
        {/* Gradiente radial aqua-esmeralda */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(6,182,212,0.18)_0%,_transparent_70%)]" />
        {/* Patrón de puntos sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(16,185,129,0.08)_1px,_transparent_1.5px)] bg-[size:24px_24px] opacity-60" />
        {/* Resplandor esmeralda en la esquina inferior derecha */}
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-[radial-gradient(circle,_rgba(16,185,129,0.18)_0%,_transparent_70%)] pointer-events-none" />
      </div>
      {/* Contenedor principal perfectamente centrado */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="w-full max-w-2xl flex justify-center">
          <RegistrationForm />
        </div>
      </div>
      {/* Footer con logo */}
      <footer className="relative z-10 mt-12 py-6 bg-transparent w-full flex justify-center">
        <div className="max-w-4xl w-full flex justify-center">
          <img 
            src="/lovable-uploads/Logos_AAFCJ.png" 
            alt="Logo 1" 
            className="h-12 opacity-90 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      </footer>
    </div>
  );
};

export default Register;
