import { RegistrationForm } from "@/components/RegistrationForm";

const Register = () => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat py-12 px-4 relative"
      style={{
        backgroundImage: "url('/lovable-uploads/3530198d-82d9-4777-b862-e14375b0610d.png')",
      }}
    >
      {/* Overlay para mejorar la visibilidad del contenido */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Contenedor principal centrado */}
      <div className="max-w-4xl w-full text-center relative z-10 flex flex-col items-center">
        <img 
          src="/lovable-uploads/f27fb80a-16f5-43ce-941b-6a639616eb45.png" 
          alt="Congreso Distrital" 
          className="w-full max-w-[150px] mb-8"
        />
        
        {/* Contenedor del formulario alineado a la izquierda */}
        <div className="w-full max-w-2xl text-left">
          <RegistrationForm />
        </div>
      </div>
      
      {/* Footer con imágenes visibles y fondo transparente */}
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
