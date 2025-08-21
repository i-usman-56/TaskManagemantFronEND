"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Building2,
  User,
  ArrowRight,
  ArrowLeft,
  Upload,
  X,
} from "lucide-react";
import { useOnBoardingMutation } from "@/hooks/use-onboarding-mutation";
import { FiLoader } from "react-icons/fi";

interface BaseOnboarding {
  name: string;
  industryType: string;
  address: string;
  contactEmail: string;
  logo: string;
}

interface IndividualData extends BaseOnboarding {
  accountType: "individual";
  purposeofUse: string;
  role: string;
  customRole?: string;
}

interface OrganizationData extends BaseOnboarding {
  accountType: "organization";
}

type OnboardingData = IndividualData | OrganizationData;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const OnboardingMutaion = useOnBoardingMutation();

  const [accountType, setAccountType] = useState<
    "individual" | "organization" | ""
  >("");
  const [individualData, setIndividualData] = useState<Partial<IndividualData>>(
    {}
  );
  const [organizationData, setOrganizationData] = useState<
    Partial<OrganizationData>
  >({});

  const totalSteps = accountType === "individual" ? 3 : 2;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        setOrganizationData({ ...organizationData, logo: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
    setOrganizationData({ ...organizationData, logo: "" });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleComplete = () => {
    let finalData: OnboardingData;

    if (accountType === "individual") {
      const { customRole, ...rest } = individualData; // remove customRole
      finalData = {
        accountType: "individual",
        ...rest,
        role: customRole || rest.role,
      } as IndividualData;
    } else {
      finalData = {
        accountType: "organization",
        ...organizationData,
      } as OrganizationData;
    }

    const tempToken = localStorage.getItem("tempToken") || "";

    OnboardingMutaion.mutate({
      accountType: finalData.accountType,
      address: finalData.address,
      contactEmail: finalData.contactEmail,
      industryType: finalData.industryType,
      logo: finalData.logo,
      name: finalData.name,
      purposeofUse:
        finalData.accountType === "individual" ? finalData.purposeofUse : "", // send empty for org
      role: finalData.accountType === "individual" ? finalData.role : "", // send empty for org
      tempToken,
    });
  };

  const canProceed = () => {
    if (currentStep === 1) return accountType !== "";

    if (accountType === "individual") {
      if (currentStep === 2) return individualData.purposeofUse !== undefined;
      if (currentStep === 3) return individualData.role !== undefined;
    } else if (accountType === "organization") {
      if (currentStep === 2) {
        return (
          organizationData.name &&
          organizationData.industryType &&
          organizationData.address &&
          organizationData.contactEmail
        );
      }
    }
    return false;
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Choose Your Account Type
            </h2>
            <p className="text-gray-600">
              Select the option that best describes how you'll use our platform
            </p>
          </div>

          <RadioGroup
            value={accountType}
            onValueChange={(value) =>
              setAccountType(value as "individual" | "organization")
            }
            className=" mx-[175px]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Label htmlFor="individual" className="cursor-pointer">
                <Card
                  className={`p-6 transition-all hover:shadow-md ${
                    accountType === "individual"
                      ? "ring-2 ring-primaryBlue bg-blue-50"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="individual" id="individual" />
                    <User className="h-32 w-8 text-primaryBlue" />
                    <div>
                      <h3 className="font-semibold text-lg">Individual</h3>
                      <p className="text-sm text-gray-600">
                        Personal use and individual projects
                      </p>
                    </div>
                  </div>
                </Card>
              </Label>

              <Label htmlFor="organization" className="cursor-pointer">
                <Card
                  className={`p-6 transition-all hover:shadow-md ${
                    accountType === "organization"
                      ? "ring-2 ring-primaryBlue bg-blue-50"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value="organization" id="organization" />
                    <Building2 className="h-32 w-8 text-primaryBlue " />
                    <div>
                      <h3 className="font-semibold text-lg">Organization</h3>
                      <p className="text-sm text-gray-600">
                        Business and team collaboration
                      </p>
                    </div>
                  </div>
                </Card>
              </Label>
            </div>
          </RadioGroup>
        </div>
      );
    }

    if (accountType === "individual") {
      if (currentStep === 2) {
        return (
          <div className="space-y-6 mx-[175px]">
            <div className="text-center space-y-2 mb-10">
              <h2 className="text-2xl font-bold text-gray-900">
                What's Your Purpose?
              </h2>
              <p className="text-gray-600">
                Help us understand how you plan to use our platform
              </p>
            </div>

            <RadioGroup
              value={individualData.purposeofUse}
              onValueChange={(value) =>
                setIndividualData({ ...individualData, purposeofUse: value })
              }
              className="gap-y-4 w-full"
            >
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Work",
                  "Personal",
                  "Education",
                  "Freelancing",
                  "Side Projects",
                ].map((purpose) => (
                  <Label
                    key={purpose}
                    htmlFor={purpose.toLowerCase()}
                    className="cursor-pointer w-full"
                  >
                    <Card
                      className={`p-4 transition-all hover:shadow-sm ${
                        individualData.purposeofUse === purpose
                          ? "ring-2 ring-primaryBlue bg-blue-50"
                          : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={purpose}
                          id={purpose.toLowerCase()}
                        />
                        <span className="font-medium">{purpose}</span>
                      </div>
                    </Card>
                  </Label>
                ))}
              </div>
            </RadioGroup>
          </div>
        );
      }

      if (currentStep === 3) {
        return (
          <div className="space-y-6 mx-[175px]">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-gray-900">
                What's Your Role?
              </h2>
              <p className="text-gray-600">
                Tell us about your professional role
              </p>
            </div>

            <div className="space-y-4">
              <Select
                value={individualData.role}
                onValueChange={(value) =>
                  setIndividualData({
                    ...individualData,
                    role: value,
                    customRole: undefined,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                  <SelectItem value="Product Manager">
                    Product Manager
                  </SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              {individualData.role === "Other" && (
                <div className="space-y-2">
                  <Label htmlFor="customRole">Please describe your role</Label>
                  <Textarea
                    id="customRole"
                    placeholder="Tell us about your role..."
                    value={individualData.customRole || ""}
                    onChange={(e) =>
                      setIndividualData({
                        ...individualData,
                        customRole: e.target.value,
                      })
                    }
                    className="min-h-[100px]"
                  />
                </div>
              )}
            </div>
          </div>
        );
      }
    }

    if (accountType === "organization" && currentStep === 2) {
      return (
        <div className="space-y-6 mx-[175px]">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              Organization Details
            </h2>
            <p className="text-gray-600">Tell us about your organization</p>
          </div>

          {/* <div className="space-y-2">
            <Label htmlFor="logoUpload">Organization Logo</Label>
            <div className="flex items-center space-x-4">
              {logoPreview ? (
                <div className="relative">
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Logo preview"
                    className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
              )}
              <div className="flex-1">
                <input
                  id="logoUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("logoUpload")?.click()}
                  className="w-full"
                >
                  {logoPreview ? "Change Logo" : "Upload Logo"}
                </Button>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: Square image, max 2MB
                </p>
              </div>
            </div>
          </div> */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                placeholder="Organization Name"
                className={`w-full border  rounded-[12px] px-4 py-2.5 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#0079DB] focus:shadow-md focus:shadow-blue-100/50  
                 
                 `}
                value={organizationData.name || ""}
                onChange={(e) =>
                  setOrganizationData({
                    ...organizationData,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="industry">Industry Type</Label>
              <Select
                value={organizationData.industryType}
                onValueChange={(value) =>
                  setOrganizationData({
                    ...organizationData,
                    industryType: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Gaming">Gaming</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Enter Address"
                value={organizationData.address || ""}
                className={`w-full border  rounded-[12px] px-4 py-2.5 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#0079DB] focus:shadow-md focus:shadow-blue-100/50  
                 
                 `}
                onChange={(e) =>
                  setOrganizationData({
                    ...organizationData,
                    address: e.target.value,
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="emailsample@contact.com"
                value={organizationData.contactEmail || ""}
                className={`w-full border  rounded-[12px] px-4 py-2.5 outline-none bg-transparent font-inter text-sm h-10 focus:border-[#0079DB] focus:shadow-md focus:shadow-blue-100/50  
                 
                 `}
                onChange={(e) =>
                  setOrganizationData({
                    ...organizationData,
                    contactEmail: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen  overflow-hidden ">
      <Card className="w-full h-full min-h-screen">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex justify-center  ">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-8 bg-primaryBlue rounded-md flex items-center justify-center">
                  <div className="text-white font-bold text-sm">TMS</div>
                </div>
                <span className="text-2xl font-bold text-gray-800">
                  <span className="text-primaryBlue">Task</span> Manamgement
                  <span className="text-primaryBlue"> System</span>
                </span>
              </div>
            </div>
          </div>
          <CardTitle className="text-[18px] text-ellipsis text-primary-foreground text-[#64748B]  font-montreal">
            Welcome! Let's set up your account
          </CardTitle>

          <Progress value={progress} className="mt-4" />
        </CardHeader>

        <CardContent className="">
          {renderStepContent()}

          <div
            className={`flex justify-end items-end bottom-0  ${
              currentStep === 1 ? "justify-end" : "justify-between"
            }  pt-6 mx-[175px]`}
          >
            {currentStep !== 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </Button>
            )}

            <Button
              onClick={handleNext}
              // disabled={!canProceed()}
              className="flex items-center space-x-2 text-white bg-primaryBlue hover:bg-primaryBlue"
            >
              <span className=" flex items-center gap-1">
                {currentStep === totalSteps ? "Complete Setup" : "Continue"}
              </span>
              {currentStep === totalSteps ? (
                <>
                  {OnboardingMutaion.isLoading ? (
                    <FiLoader className="animate-spin" />
                  ) : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </>
              ) : (
                <>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
