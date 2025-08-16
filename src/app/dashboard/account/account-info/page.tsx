import PersonalInformation from "@/components/common/account/personal-information";
import { Loader } from "lucide-react";

export default function AccountInformation() {
  if (false)
    return (
      <div className="flex items-center justify-center border border-gray-100 rounded-lg min-h-[60vh] sm:max-w-[90%] md:max-w-[80%]">
        <Loader className="animate-spin" />
      </div>
    );
  // console.log(data);
  return (
    <div className="flex flex-col gap-4">
      <PersonalInformation
        defaultFullName={"Usman"}
        defaultEmail={"Usman"}
        defaulPhoneNumber={""}
        defaultStreetNumber={""}
        defaultHouseNumber={""}
        defaultCity={""}
        defaultState={""}
      />
    </div>
  );
}
