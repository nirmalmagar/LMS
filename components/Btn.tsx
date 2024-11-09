import React, { ReactNode, CSSProperties } from "react";

interface BtnProps {
  color?: "light" | "primary" | "error" | "warning";
  outline?: "light" | "primary" | "error" | "warning" | string;
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  className?: string;
  sm?: boolean;
  styles?: CSSProperties;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

const baseClasses = "font-semibold flex justify-center items-center";
const colorClasses = {
  light: "bg-white border border-gray-300 text-gray-700",
  primary: "bg-blue-500 border border-blue-500 text-white",
  error: "bg-error-500 border border-error-500",
  warning: "bg-warning-500 text-dark",
};

const outlineClasses = {
  light: "bg-transparent border border-gray-300 text-gray-700",
  primary: "bg-transparent border border-primary-500 text-primary-500",
  error: "bg-transparent border border-red-500 text-red-500",
  warning: "bg-transparent border border-warning-500 text-warning-500",
};

const sizeClasses = {
  sm: "py-0.5 px-1.5 text-sm rounded",
  md: "py-2 px-3.5 text-sm rounded",
  lg: "py-3 px-5 text-base tracking-wider rounded-lg",
};

const Btn: React.FC<BtnProps> = ({
  color = "primary",
  outline = "",
  size = "md",
  type = "button",
  className,
  children,
  sm,
  styles,
  onClick,
  disabled,
  ...props
}) => {
  const colorClassesStr = colorClasses[color] || "";
  const outlineClassesStr = outlineClasses[outline] || "";

  const sizeClassesStr = sizeClasses[size] || "";

  return (
    <button
      onClick={onClick}
      {...props}
      className={`${baseClasses} ${
        outlineClassesStr != "" ? outlineClassesStr : colorClassesStr
      } ${sizeClassesStr} ${className} disabled:opacity-40 disabled:cursor-not-allowed`}
      style={{
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        ...styles,
      }}
      type={type}
      disabled={disabled}
    >
      {children ? children : ""}
    </button>
  );
};

export default Btn;
