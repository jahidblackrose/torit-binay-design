import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  CreditCard, 
  DollarSign, 
  Calendar, 
  LogOut, 
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { BilingualText, LanguageToggle } from "@/components/BilingualText";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const [existingLoans] = useState([
    {
      id: "LN001",
      amount: 150000,
      balance: 45000,
      installmentPaid: 8,
      totalInstallments: 12,
      status: "active",
      nextDue: "2024-02-15",
      monthlyPayment: 13500
    },
    {
      id: "LN002", 
      amount: 75000,
      balance: 0,
      installmentPaid: 6,
      totalInstallments: 6,
      status: "completed",
      nextDue: null,
      monthlyPayment: 12500
    }
  ]);

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    navigate("/");
  };

  const handleCloseLoan = (loanId: string) => {
    navigate("/loan-closure", { state: { loanId } });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="status-pending">Active</Badge>;
      case "completed":
        return <Badge className="status-approved">Completed</Badge>;
      case "overdue":
        return <Badge className="status-rejected">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="banking-container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">
                  <BilingualText english="MTB Torit e-Rin" bengali="এমটিবি তরিৎ ই-রিন" />
                </h1>
                <p className="text-sm text-muted-foreground">
                  <BilingualText english="Welcome back" bengali="স্বাগতম" />
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageToggle className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground" />
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                <BilingualText english="Logout" bengali="লগআউট" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="banking-container py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  <BilingualText english="Loan Services" bengali="ঋণ সেবা" />
                </CardTitle>
                <CardDescription>
                  <BilingualText 
                    english="Apply for new loans or manage existing ones" 
                    bengali="নতুন ঋণের জন্য আবেদন করুন বা বিদ্যমানগুলি পরিচালনা করুন" 
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Button 
                    onClick={() => navigate("/loan-application")}
                    className="h-16 gradient-primary text-left justify-start"
                    size="lg"
                  >
                    <div className="flex items-center gap-3">
                      <Plus className="w-6 h-6" />
                      <div>
                        <div className="font-medium">
                          <BilingualText english="Apply New Loan" bengali="নতুন ঋণের আবেদন" />
                        </div>
                        <div className="text-xs text-primary-foreground/80">
                          <BilingualText english="Quick & Easy Process" bengali="দ্রুত ও সহজ প্রক্রিয়া" />
                        </div>
                      </div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/loan-calculator")}
                    className="h-16 text-left justify-start"
                    size="lg"
                  >
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-6 h-6 text-primary" />
                      <div>
                        <div className="font-medium">
                          <BilingualText english="Loan Calculator" bengali="ঋণ ক্যালকুলেটর" />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          <BilingualText english="Calculate EMI" bengali="ইএমআই গণনা করুন" />
                        </div>
                      </div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Existing Loans */}
            <Card className="banking-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <BilingualText english="My Loan Accounts" bengali="আমার ঋণ অ্যাকাউন্টসমূহ" />
                </CardTitle>
                <CardDescription>
                  <BilingualText 
                    english="Manage your existing loan accounts" 
                    bengali="আপনার বিদ্যমান ঋণ অ্যাকাউন্টগুলি পরিচালনা করুন" 
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {existingLoans.map((loan, index) => (
                    <div key={loan.id} className="p-4 rounded-lg border bg-card/50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">Loan #{loan.id}</h3>
                            {getStatusBadge(loan.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <BilingualText 
                              english={`৳${loan.amount.toLocaleString()} - ${loan.installmentPaid}/${loan.totalInstallments} paid`}
                              bengali={`৳${loan.amount.toLocaleString()} - ${loan.installmentPaid}/${loan.totalInstallments} পরিশোধিত`}
                            />
                          </p>
                        </div>
                        {loan.status === "active" && loan.installmentPaid > 0 && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleCloseLoan(loan.id)}
                          >
                            <BilingualText english="Close Loan" bengali="ঋণ বন্ধ করুন" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            <BilingualText english="Balance" bengali="বকেয়া" />
                          </p>
                          <p className="font-medium">৳{loan.balance.toLocaleString()}</p>
                        </div>
                        {loan.nextDue && (
                          <div>
                            <p className="text-muted-foreground">
                              <BilingualText english="Next Due" bengali="পরবর্তী বকেয়া" />
                            </p>
                            <p className="font-medium">{loan.nextDue}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <Card className="banking-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <BilingualText english="Account Info" bengali="অ্যাকাউন্ট তথ্য" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">
                      <BilingualText english="Account Number" bengali="অ্যাকাউন্ট নম্বর" />
                    </p>
                    <p className="font-medium">****1234</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">
                      <BilingualText english="Mobile" bengali="মোবাইল" />
                    </p>
                    <p className="font-medium">+880 1***-***456</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-muted-foreground">
                      <BilingualText english="Customer Since" bengali="গ্রাহক হিসেবে" />
                    </p>
                    <p className="font-medium">Jan 2020</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="banking-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  <BilingualText english="Quick Stats" bengali="দ্রুত পরিসংখ্যান" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm">
                        <BilingualText english="Loans Completed" bengali="সম্পূর্ণ ঋণ" />
                      </span>
                    </div>
                    <span className="font-bold">1</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-pending" />
                      <span className="text-sm">
                        <BilingualText english="Active Loans" bengali="সক্রিয় ঋণ" />
                      </span>
                    </div>
                    <span className="font-bold">1</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
