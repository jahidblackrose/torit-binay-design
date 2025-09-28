import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowLeft, Shield, RefreshCw } from "lucide-react";
import { BilingualText } from "@/components/BilingualText";
import { toast } from "@/hooks/use-toast";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { accountNumber, mobileNumber } = location.state || {};

  useEffect(() => {
    if (resendTimer > 0 && !canResend) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer, canResend]);

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const handleResendOtp = () => {
    setResendTimer(60);
    setCanResend(false);
    setOtp("");
    toast({
      title: "OTP Sent",
      description: "A new OTP has been sent to your registered mobile number",
    });
  };

  const maskedNumber = mobileNumber 
    ? mobileNumber.replace(/(\d{4})\d{4}(\d{3})/, "$1****$2")
    : accountNumber?.replace(/(\d{4})\d{6}(\d{3})/, "$1******$2");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="banking-container">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 p-0 h-auto hover:bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <BilingualText english="Back" bengali="পিছনে" />
          </Button>

          {/* OTP Verification Card */}
          <Card className="banking-card-elevated animate-slide-up">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>
                <BilingualText english="OTP Verification" bengali="ওটিপি যাচাইকরণ" />
              </CardTitle>
              <CardDescription className="text-center">
                <BilingualText 
                  english={`Enter the 6-digit code sent to ${maskedNumber}`}
                  bengali={`${maskedNumber} এ পাঠানো ৬-সংখ্যার কোডটি প্রবেশ করান`}
                />
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* OTP Input */}
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {/* Verify Button */}
              <Button 
                onClick={handleVerifyOtp} 
                disabled={isLoading || otp.length !== 6}
                className="w-full h-12 gradient-primary"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <BilingualText english="Verifying..." bengali="যাচাই করা হচ্ছে..." />
                  </div>
                ) : (
                  <BilingualText english="Verify OTP" bengali="ওটিপি যাচাই করুন" />
                )}
              </Button>

              {/* Resend OTP */}
              <div className="text-center">
                {!canResend ? (
                  <p className="text-sm text-muted-foreground">
                    <BilingualText 
                      english={`Resend OTP in ${resendTimer}s`}
                      bengali={`${resendTimer}সে মধ্যে ওটিপি পুনরায় পাঠান`}
                    />
                  </p>
                ) : (
                  <Button 
                    variant="ghost" 
                    onClick={handleResendOtp}
                    className="text-primary hover:text-primary-dark"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    <BilingualText english="Resend OTP" bengali="ওটিপি পুনরায় পাঠান" />
                  </Button>
                )}
              </div>

              {/* Help Text */}
              <div className="text-center pt-4 border-t">
                <p className="text-xs text-muted-foreground">
                  <BilingualText 
                    english="Didn't receive the code? Check your SMS or call customer service" 
                    bengali="কোড পাননি? আপনার এসএমএস চেক করুন বা কাস্টমার সার্ভিসে কল করুন" 
                  />
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OtpVerification;