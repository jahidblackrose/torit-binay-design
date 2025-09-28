import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Smartphone, CreditCard, Shield } from "lucide-react";
import { BilingualText } from "@/components/BilingualText";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loginType, setLoginType] = useState<"account" | "mobile">("account");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!accountNumber && !mobileNumber) {
      toast({
        title: "Error",
        description: "Please enter your account number or mobile number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/otp-verification", { 
        state: { 
          accountNumber: loginType === "account" ? accountNumber : "", 
          mobileNumber: loginType === "mobile" ? mobileNumber : "" 
        } 
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="banking-container">
        <div className="max-w-md mx-auto">
          {/* MTB Logo and Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              <BilingualText english="MTB Torit e-Rin" bengali="এমটিবি তরিৎ ই-রিন" />
            </h1>
            <p className="text-muted-foreground">
              <BilingualText 
                english="Easy loan application and management" 
                bengali="সহজ ঋণের আবেদন ও ব্যবস্থাপনা" 
              />
            </p>
          </div>

          {/* Login Card */}
          <Card className="banking-card-elevated animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <BilingualText english="Secure Login" bengali="নিরাপদ লগইন" />
              </CardTitle>
              <CardDescription>
                <BilingualText 
                  english="Enter your account details to access your loan services" 
                  bengali="আপনার ঋণ সেবা অ্যাক্সেস করতে অ্যাকাউন্টের তথ্য প্রবেশ করান" 
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Login Type Toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
                <Button
                  variant={loginType === "account" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLoginType("account")}
                  className="text-xs"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  <BilingualText english="Account No." bengali="একাউন্ট নং" />
                </Button>
                <Button
                  variant={loginType === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setLoginType("mobile")}
                  className="text-xs"
                >
                  <Smartphone className="w-4 h-4 mr-2" />
                  <BilingualText english="Mobile No." bengali="মোবাইল নং" />
                </Button>
              </div>

              {/* Input Fields */}
              {loginType === "account" ? (
                <div className="space-y-2">
                  <Label className="bilingual-label">
                    <BilingualText english="Account Number" bengali="অ্যাকাউন্ট নম্বর" />
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="h-12"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="bilingual-label">
                    <BilingualText english="Mobile Number" bengali="মোবাইল নম্বর" />
                  </Label>
                  <Input
                    type="tel"
                    placeholder="+880 1XXX-XXXXXX"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="h-12"
                  />
                </div>
              )}

              {/* Login Button */}
              <Button 
                onClick={handleLogin} 
                disabled={isLoading}
                className="w-full h-12 gradient-primary"
                size="lg"
              >
                {isLoading ? (
                  <BilingualText english="Logging in..." bengali="লগইন করা হচ্ছে..." />
                ) : (
                  <BilingualText english="Login" bengali="লগইন" />
                )}
              </Button>

              <Separator className="my-6" />

              {/* MTB Neo App Link */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  <BilingualText 
                    english="Already have MTB Neo app?" 
                    bengali="ইতিমধ্যে এমটিবি নিও অ্যাপ আছে?" 
                  />
                </p>
                <Button variant="outline" className="w-full">
                  <BilingualText english="Access via MTB Neo" bengali="এমটিবি নিও দিয়ে অ্যাক্সেস করুন" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Note */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              <BilingualText 
                english="Your information is protected with bank-grade security" 
                bengali="আপনার তথ্য ব্যাংক-মানের নিরাপত্তায় সুরক্ষিত" 
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;