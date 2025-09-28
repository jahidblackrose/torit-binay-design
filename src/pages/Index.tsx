import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page as this is a banking application
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">MTB Torit e-Rin</h1>
        <p className="text-xl text-muted-foreground">Redirecting to login...</p>
      </div>
    </div>
  );
};

export default Index;
