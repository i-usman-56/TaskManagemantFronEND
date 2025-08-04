import React from "react";
import { CiCircleCheck } from "react-icons/ci";
import firrbag from "@/assets/fi-rr-bag.svg";
import firrbag1 from "@/assets/Section Icon.svg";
import firrbag2 from "@/assets/iconsignup.svg";
import Image from "next/image";
const list = [
  {
    icon: firrbag,
    heading: "Dividend Portfolio Management",
    paragraph:
      "Integrate with guaranteed developer-friendly APIs or openly to choose a build-ready or low-code solution.",
  },
  {
    icon: firrbag1,
    heading: "Ask Hey Dividend",
    paragraph:
      "Keep your team members and customers in the loop by sharing your dashboard public.",
  },
  {
    icon: firrbag2,
    heading: "Portfolio Analysis",
    paragraph:
      "Receive detailed insights on all your numbers in real-time, see where visitors are coming from.",
  },
];

const SignupWelcome = ({ subHeading }: { subHeading?: string }) => {
  return (
    <div className="bg-primaryBlue h-full  flex  flex-col pt-[75px] lg:pt-[70px]  rounded-3xl lg:pb-4 w-full xl:pt-[125px] 2xl:pt-[145px] text-white shadow-lg ">
      <div>
        <h1 className="lg:text-[35px] text-[25px] font-medium leading-[140%] text-center text-white">
          Welcome to HeyDividend
        </h1>
        <p className="text-center mb-2 text-[12px] lg:text-[14px] text-[#B8DFFF]">
          {subHeading || " Start your FREE Account TODAY"}
        </p>
      </div>

      {/* {!subHeading && (
        <div className="flex gap-2 mx-auto text-[#B8DFFF] items-center justify-center">
          <CiCircleCheck />
          <p className="text-center  text-sm text-[#B8DFFF]">
            No credit card required
          </p>
        </div>
      )} */}
      <div className=" space-y-[35px] lg:space-y-[42px]  w-[80%] lg:w-[60%] mx-auto pt-[45px] lg:pt-14 xl:pt-[85px] 2xl:pt-[53px]">
        {list.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <Image src={item.icon} alt="" width={24} height={24} />
            <div>
              <p className=" text-[15px] lg:text-[17px] font-medium leading-[140%] text-white">
                {item.heading}
              </p>
              <p className="lg:text-[14px] text-[13px] font-normal leading-[140%] text-[#B8DFFF] mt-2">
                {item.paragraph}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="lg:mt-[128px] hidden">
        <h1 className=" text-[16px] lg:text-[20px] font-semibold leading-[150%] pl-[30px] tracking-wide text-center">
          Manage all your dividend paying securities
        </h1>
      </div>
    </div>
  );
};

export default SignupWelcome;
