type AccountHeaderProps = {
  title: string;
  description: string;
};

export default function AccountHeader({
  title,
  description,
}: AccountHeaderProps) {
  return (
    <div className="w-full py-6 space-y-1">
      <h2 className="text-[20px] font-[500] font-sfDisplay text-[#0F172A] leading-[140%] ">
        {title}
      </h2>
      <p className="text-[14px] font-normal font-sfDisplay text-[#64748B] leading-[140%]  lg:w-[50%]">
        {description}
      </p>
    </div>
  );
}
