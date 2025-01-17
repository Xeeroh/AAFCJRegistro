import { RegistrationForm } from "@/components/RegistrationForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
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