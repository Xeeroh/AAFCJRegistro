import { RegistrationForm } from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat py-12 px-4 relative"
      style={{
        backgroundImage: "url('/lovable-uploads/3530198d-82d9-4777-b862-e14375b0610d.png')",
      }}
    >
      {/* Overlay to ensure form readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <img 
          src="/lovable-uploads/f27fb80a-16f5-43ce-941b-6a639616eb45.png" 
          alt="Congreso Distrital" 
          className="w-full max-w-lg mx-auto mb-8"
        />
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Index;