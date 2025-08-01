import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className = 'w-5 h-5' }: SpinnerProps) => {
  return <Loader2 className={`animate-spin ${className}`} />;
};

export default Spinner;