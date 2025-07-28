import { useNavigate } from 'react-router-dom';
import { theme } from '../../constants/theme';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  to?: string; // Add 'to' prop for navigation
}

const Button = ({ children, onClick, disabled = false, className = '', to }: ButtonProps) => {
  const navigate = useNavigate();
  const commonClasses = `px-6 py-3 font-semibold rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2`;
  const disabledClasses = 'bg-stone-300 text-stone-500 cursor-not-allowed';
  const enabledClasses = `${theme.primary} text-white ${theme.primaryHover} transform hover:-translate-y-0.5`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(to) {
        e.preventDefault();
        navigate(to);
    }
    if (onClick) {
        onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${commonClasses} ${disabled ? disabledClasses : enabledClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
