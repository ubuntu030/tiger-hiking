import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import theme from "../../constants/theme";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  to?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
}

const Button = ({
  children,
  onClick,
  disabled = false,
  type = "button",
  isLoading = false,
  className = "",
  to,
  variant = "primary",
}: ButtonProps) => {
  const navigate = useNavigate();
  const commonClasses = `relative flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-300`;
  const disabledClasses = "bg-stone-300 text-stone-500 cursor-not-allowed";

  const variantClasses = {
    primary: `${theme.primary} ${theme.primaryHover} text-white shadow-sm transform hover:-translate-y-0.5`,
    secondary: `${theme.secondary} ${theme.secondaryHover} shadow-sm transform hover:-translate-y-0.5`,
    ghost: `${theme.ghost} ${theme.ghostHover}`,
    // 新增 danger 樣式
    danger: `${theme.danger} ${theme.dangerHover} text-white shadow-sm transform hover:-translate-y-0.5`,
    outline: `${
      theme.outline ??
      "bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
    } ${theme.outlineHover ?? ""}`,
  };
  const enabledClasses = variantClasses[variant];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      e.preventDefault();
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled || isLoading}
      className={`${commonClasses} ${
        disabled || isLoading ? disabledClasses : enabledClasses
      } ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      <div
        className={`flex items-center justify-center ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
