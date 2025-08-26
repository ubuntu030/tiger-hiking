import { useNavigate } from "react-router-dom";
import theme from "../../constants/theme";
import Spinner from "./Spinner";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  to?: string;
  variant?: "primary" | "secondary";
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
  const commonClasses = `px-4 py-2 font-semibold relative px-3 py-1 font-semibold rounded-lg shadow-sm transition-all duration-300 focus:outline-none`;
  const disabledClasses = "bg-stone-300 text-stone-500 cursor-not-allowed";
  const variantClasses = {
    primary: `${theme.primary} text-white ${theme.primaryHover} transform hover:-translate-y-0.5`,
    secondary: `${theme.secondary} ${theme.secondaryHover} transform hover:-translate-y-0.5`,
  };
  const enabledClasses = variantClasses[variant];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (to) {
      e.preventDefault();
      navigate(to);
    }
    if (onClick) {
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
      <span className={isLoading ? "opacity-0" : "opacity-100"}>
        {children}
      </span>
    </button>
  );
};

export default Button;
