import React from "react";

// Define the size options as a union type
type LoaderSize = "sm" | "md" | "lg" | "xl";

// Define the variant options as a union type
type LoaderVariant = "spinner" | "dots" | "pulse" | "bars" | "ripple";

// Define the props interface
interface CustomLoaderProps {
  /**
   * The size of the loader
   * @default 'md'
   */
  size?: LoaderSize;

  /**
   * The variant/style of the loader
   * @default 'spinner'
   */
  variant?: LoaderVariant;

  /**
   * Additional CSS classes to apply to the loader
   * @default ''
   */
  className?: string;

  /**
   * Optional text to display below the loader
   * @default ''
   */
  text?: string;
}

// Define the size classes type
type SizeClasses = Record<LoaderSize, string>;

const CustomLoader: React.FC<CustomLoaderProps> = ({
  size = "md",
  variant = "spinner",
  className = "",
  text = "",
}) => {
  const sizeClasses: SizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  const SpinnerLoader: React.FC = () => (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 rounded-full border-4 border-blue-200 opacity-25"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#005294] animate-spin"></div>
      </div>
    </div>
  );

  const DotsLoader: React.FC = () => (
    <div className={`flex space-x-1 ${className}`}>
      <div
        className="w-2 h-2 bg-[#005294] rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-[#005294] rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="w-2 h-2 bg-[#005294] rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );

  const PulseLoader: React.FC = () => (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="w-full h-full bg-[#005294] rounded-full animate-pulse"></div>
    </div>
  );

  const BarsLoader: React.FC = () => (
    <div
      className={`flex items-end space-x-1 ${className}`}
      style={{ height: "32px" }}
    >
      <div
        className="w-1 bg-[#005294] rounded animate-pulse"
        style={{ height: "20px", animationDelay: "0ms" }}
      ></div>
      <div
        className="w-1 bg-[#005294] rounded animate-pulse"
        style={{ height: "32px", animationDelay: "150ms" }}
      ></div>
      <div
        className="w-1 bg-[#005294] rounded animate-pulse"
        style={{ height: "16px", animationDelay: "300ms" }}
      ></div>
      <div
        className="w-1 bg-[#005294] rounded animate-pulse"
        style={{ height: "24px", animationDelay: "450ms" }}
      ></div>
    </div>
  );

  const RippleLoader: React.FC = () => (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <div className="absolute inset-0 rounded-full border-2 border-[#005294] animate-ping"></div>
      <div
        className="absolute inset-2 rounded-full border-2 border-[#005294] animate-ping"
        style={{ animationDelay: "0.5s" }}
      ></div>
    </div>
  );

  const renderLoader = (): React.ReactElement => {
    switch (variant) {
      case "dots":
        return <DotsLoader />;
      case "pulse":
        return <PulseLoader />;
      case "bars":
        return <BarsLoader />;
      case "ripple":
        return <RippleLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      {renderLoader()}
      {text && (
        <p className="text-[#005294] text-sm font-medium animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default CustomLoader;

// Export types for use in other components
export type { CustomLoaderProps, LoaderSize, LoaderVariant };
