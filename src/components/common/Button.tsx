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
  variant?: "primary" | "secondary" | "ghost"; // 新增 'ghost'
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
  // 優化：加入 flex 置中，並移除 shadow-sm，讓 variant 控制陰影
  const commonClasses = `relative flex items-center justify-center px-6 py-3 font-semibold rounded-lg transition-all duration-300`;
  const disabledClasses = "bg-stone-300 text-stone-500 cursor-not-allowed";

  const variantClasses = {
    primary: `${theme.primary} text-white ${theme.primaryHover} shadow-sm transform hover:-translate-y-0.5`,
    secondary: `${theme.secondary} ${theme.secondaryHover} shadow-sm transform hover:-translate-y-0.5`,
    // 新增 ghost 樣式，無陰影和 transform
    ghost: `${theme.ghost} ${theme.ghostHover}`,
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
