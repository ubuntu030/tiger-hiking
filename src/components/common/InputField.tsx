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
}

const InputField = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  rows,
}: InputFieldProps) => {
  const commonProps = {
    id,
    name,
    value,
    onChange,
    placeholder,
    className: `w-full p-3 border ${theme.border} rounded-md ${theme.inputBg} ${theme.textPrimary} focus:outline-none focus:ring-2 ${theme.focusRing} transition-colors`,
  };

  if (rows) {
    return <textarea {...commonProps} rows={rows}></textarea>;
  }
  return <input {...commonProps} type={type} />;
};

export default InputField;
