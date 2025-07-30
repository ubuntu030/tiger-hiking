import theme from '../../constants/theme';

interface InputFieldProps {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  rows?: number;
  error?: boolean;
}

const InputField = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  rows,
  error,
}: InputFieldProps) => {
  const errorClasses = error
    ? 'border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.4)]'
    : `${theme.border} focus:shadow-[0_0_0_3px_rgba(5,150,105,0.3)] ${theme.focusRing}`;

  const commonProps = {
    id,
    name,
    value,
    onChange,
    placeholder,
    className: `w-full p-3 border rounded-md ${theme.inputBg} ${theme.textPrimary} focus:outline-none transition-all duration-300 ${errorClasses}`,
  };

  if (rows) {
    return <textarea {...commonProps} rows={rows}></textarea>;
  }
  return <input {...commonProps} type={type} />;
};

export default InputField;
