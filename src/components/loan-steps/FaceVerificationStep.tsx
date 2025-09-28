import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Camera, CheckCircle, AlertCircle } from "lucide-react";
import { BilingualText } from "@/components/BilingualText";

interface FaceVerificationStepProps {
  onNext: () => void;
  data: any;
}

export const FaceVerificationStep = ({ onNext, data }: FaceVerificationStepProps) => {
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "capturing" | "success" | "failed">("idle");
  const [photoTaken, setPhotoTaken] = useState(false);

  const handleStartVerification = () => {
    setVerificationStatus("capturing");
    // Simulate photo capture process
    setTimeout(() => {
      setVerificationStatus("success");
      setPhotoTaken(true);
    }, 3000);
  };

  const retakePhoto = () => {
    setVerificationStatus("idle");
    setPhotoTaken(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
        <Camera className="w-6 h-6 text-primary" />
        <div>
          <h3 className="font-semibold">
            <BilingualText english="Face Verification" bengali="মুখ যাচাইকরণ" />
          </h3>
          <p className="text-sm text-muted-foreground">
            <BilingualText 
              english="Take a selfie to verify your identity" 
              bengali="আপনার পরিচয় যাচাই করতে একটি সেলফি তুলুন" 
            />
          </p>
        </div>
      </div>

      {/* Verification Area */}
      <Card>
        <CardContent className="p-8 text-center">
          <div className="max-w-md mx-auto">
            {/* Camera Preview/Placeholder */}
            <div className="relative">
              <div className="w-64 h-80 mx-auto bg-muted/50 rounded-2xl border-2 border-dashed border-border flex items-center justify-center mb-6">
                {verificationStatus === "idle" && (
                  <div className="text-center">
                    <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      <BilingualText english="Position your face in the frame" bengali="ফ্রেমে আপনার মুখ রাখুন" />
                    </p>
                  </div>
                )}
                
                {verificationStatus === "capturing" && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <Camera className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <p className="text-primary font-medium">
                      <BilingualText english="Capturing..." bengali="ছবি তোলা হচ্ছে..." />
                    </p>
                  </div>
                )}
                
                {verificationStatus === "success" && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-success font-medium">
                      <BilingualText english="Verification Successful!" bengali="যাচাইকরণ সফল!" />
                    </p>
                  </div>
                )}
                
                {verificationStatus === "failed" && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-destructive font-medium">
                      <BilingualText english="Verification Failed" bengali="যাচাইকরণ ব্যর্থ" />
                    </p>
                  </div>
                )}
              </div>

              {/* Face outline guide */}
              {verificationStatus === "idle" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-64 border-2 border-primary/30 rounded-full opacity-30"></div>
                </div>
              )}
            </div>

            {/* Action Button */}
            {verificationStatus === "idle" && (
              <Button 
                onClick={handleStartVerification}
                className="gradient-primary" 
                size="lg"
              >
                <Camera className="w-5 h-5 mr-2" />
                <BilingualText english="Take Selfie" bengali="সেলফি তুলুন" />
              </Button>
            )}

            {verificationStatus === "capturing" && (
              <Button disabled className="bg-muted" size="lg">
                <BilingualText english="Processing..." bengali="প্রক্রিয়াজাত করা হচ্ছে..." />
              </Button>
            )}

            {(verificationStatus === "success" || verificationStatus === "failed") && (
              <div className="space-y-3">
                <Button 
                  onClick={retakePhoto}
                  variant="outline" 
                  size="lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  <BilingualText english="Retake Photo" bengali="আবার ছবি তুলুন" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4 text-center">
          <div className="text-2xl mb-2">📱</div>
          <h4 className="font-semibold mb-2">
            <BilingualText english="Hold Steady" bengali="স্থির রাখুন" />
          </h4>
          <p className="text-sm text-muted-foreground">
            <BilingualText 
              english="Keep your phone steady and look directly at the camera" 
              bengali="আপনার ফোন স্থির রাখুন এবং সরাসরি ক্যামেরার দিকে তাকান" 
            />
          </p>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl mb-2">💡</div>
          <h4 className="font-semibold mb-2">
            <BilingualText english="Good Lighting" bengali="ভালো আলো" />
          </h4>
          <p className="text-sm text-muted-foreground">
            <BilingualText 
              english="Make sure you're in a well-lit area" 
              bengali="নিশ্চিত করুন যে আপনি একটি ভাল আলোকিত এলাকায় আছেন" 
            />
          </p>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-2xl mb-2">👤</div>
          <h4 className="font-semibold mb-2">
            <BilingualText english="Face Clear" bengali="মুখ পরিষ্কার" />
          </h4>
          <p className="text-sm text-muted-foreground">
            <BilingualText 
              english="Remove glasses or anything covering your face" 
              bengali="চশমা বা মুখ ঢেকে রাখে এমন কিছু সরিয়ে নিন" 
            />
          </p>
        </Card>
      </div>

      {/* Next Button */}
      {photoTaken && verificationStatus === "success" && (
        <div className="flex justify-end">
          <Button onClick={onNext} className="gradient-primary" size="lg">
            <BilingualText english="Continue" bengali="চালিয়ে যান" />
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};