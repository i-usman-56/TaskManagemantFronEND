import React from "react";
import firrbag from "@/assets/fi-rr-bag.svg";
import firrbag1 from "@/assets/Section Icon.svg";
import firrbag2 from "@/assets/iconsignup.svg";
import Image from "next/image";
const list = [
  {
    icon: firrbag,
    heading: "Verify this is you by either Email or Text",
    paragraph:
      "We take security seriously and want to verify this is you signing up. Please select how you want to verify your account",
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

const WelcomeBackForgetPassword = () => {
  return (
    <div className="bg-primaryBlue h-full flex  flex-col  pt-[75px] lg:pt-[70px] xl:pt-[125px] 2xl:pt-[145px] rounded-3xl max-w-4xl w-full  text-white shadow-lg">
      <h1 className="lg:text-[35px] text-[25px] font-medium text-center text-white">
        Welcome to HeyDIvidend
      </h1>
      <p className="text-center mb-2 text-[12px] lg:text-[14px] text-[#B8DFFF]">Finish Account Setup</p>
      <div className=" space-y-[35px] lg:space-y-[42px]  w-[80%] lg:w-[60%] mx-auto pt-[45px] lg:pt-12 xl:pt-[85px] 2xl:pt-[53px] ">
        {list.map((item, index) => (
          <div key={index} className="flex flex-row items-start gap-3">
            <Image src={item.icon} alt="" />

            <div>
              <p className="text-[17px] font-medium leading-[140%] text-white">
                {item.heading}
              </p>
              <p className="text-[14px] font-normal leading-[140%] text-[#B8DFFF] mt-2">
                {item.paragraph}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeBackForgetPassword;
