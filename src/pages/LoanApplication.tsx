import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { BilingualText } from "@/components/BilingualText";
import { StepIndicator } from "@/components/StepIndicator";
import { PersonalInfoStep } from "@/components/loan-steps/PersonalInfoStep";
import { AddressStep } from "@/components/loan-steps/AddressStep";
import { ExistingLoansStep } from "@/components/loan-steps/ExistingLoansStep";
import { LoanDetailsStep } from "@/components/loan-steps/LoanDetailsStep";
import { LoanSummaryStep } from "@/components/loan-steps/LoanSummaryStep";
import { FaceVerificationStep } from "@/components/loan-steps/FaceVerificationStep";
import { TermsConditionsStep } from "@/components/loan-steps/TermsConditionsStep";
import { ApplicationConfirmationStep } from "@/components/loan-steps/ApplicationConfirmationStep";
import mtbLogo from "@/assets/mtvb_logo.png";

const STEPS = [
  { id: 1, title: "Personal Info", titleBengali: "ব্যক্তিগত তথ্য" },
  { id: 2, title: "Address Details", titleBengali: "ঠিকানার বিবরণ" },
  { id: 3, title: "Existing Loans", titleBengali: "বিদ্যমান ঋণ" },
  { id: 4, title: "Loan Details", titleBengali: "ঋণের বিবরণ" },
  { id: 5, title: "Summary", titleBengali: "সারসংক্ষেপ" },
  { id: 6, title: "Face Verification", titleBengali: "মুখ যাচাইকরণ" },
  { id: 7, title: "Terms & Conditions", titleBengali: "শর্তাবলী" },
  { id: 8, title: "Confirmation", titleBengali: "নিশ্চিতকরণ" }
];

const LoanApplication = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationData, setApplicationData] = useState({});
  const navigate = useNavigate();

  const handleNext = (stepData?: any) => {
    if (stepData) {
      setApplicationData(prev => ({ ...prev, ...stepData }));
    }
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/dashboard");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep onNext={handleNext} data={applicationData} />;
      case 2:
        return <AddressStep onNext={handleNext} data={applicationData} />;
      case 3:
        return <ExistingLoansStep onNext={handleNext} data={applicationData} />;
      case 4:
        return <LoanDetailsStep onNext={handleNext} data={applicationData} />;
      case 5:
        return <LoanSummaryStep onNext={handleNext} data={applicationData} />;
      case 6:
        return <FaceVerificationStep onNext={handleNext} data={applicationData} />;
      case 7:
        return <TermsConditionsStep onNext={handleNext} data={applicationData} />;
      case 8:
        return <ApplicationConfirmationStep data={applicationData} />;
      default:
        return <PersonalInfoStep onNext={handleNext} data={applicationData} />;
    }
  };

  const progressPercentage = (currentStep / STEPS.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="banking-container py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={handlePrevious}
              className="p-0 h-auto hover:bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <BilingualText english="Back" bengali="পিছনে" />
            </Button>
            
            <div className="text-center flex items-center gap-3">
              <img src={mtbLogo} alt="MTB Logo" className="h-6" />
              <div className="mline-separator-vertical h-6"></div>
              <div>
                <h1 className="text-lg font-semibold text-mtb-primary">
                  <BilingualText english="Loan Application" bengali="ঋণের আবেদন" />
                </h1>
                <p className="text-sm text-muted-foreground">
                  <BilingualText 
                    english={`Step ${currentStep} of ${STEPS.length}`}
                    bengali={`ধাপ ${currentStep} এর ${STEPS.length}`}
                  />
                </p>
              </div>
            </div>
            
            <div className="w-16" /> {/* Spacer for alignment */}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </header>

      <div className="banking-container py-6">
        <div className="max-w-4xl mx-auto">
          {/* Step Indicators - Desktop */}
          <div className="hidden lg:block mb-8">
            <StepIndicator steps={STEPS} currentStep={currentStep} />
          </div>

          {/* Current Step Card */}
          <Card className="banking-card-elevated">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="step-indicator step-indicator-active">
                  {currentStep === STEPS.length ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    currentStep
                  )}
                </div>
                <div>
                  <CardTitle>
                    <BilingualText 
                      english={STEPS[currentStep - 1].title}
                      bengali={STEPS[currentStep - 1].titleBengali}
                    />
                  </CardTitle>
                  <CardDescription>
                    <BilingualText 
                      english="Please fill in the required information"
                      bengali="প্রয়োজনীয় তথ্য পূরণ করুন"
                    />
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {renderStep()}
            </CardContent>
          </Card>

          {/* Mobile Step Indicators */}
          <div className="lg:hidden mt-6">
            <div className="flex justify-center gap-2">
              {STEPS.map((step) => (
                <div
                  key={step.id}
                  className={`w-3 h-3 rounded-full ${
                    step.id === currentStep
                      ? "bg-primary"
                      : step.id < currentStep
                      ? "bg-secondary"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApplication;