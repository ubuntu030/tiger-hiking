import theme from '../../constants/theme';

interface SelectFieldProps {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const SelectField = ({
  id,
  name,
  value,
  onChange,
  options,
}: SelectFieldProps) => (
  <select
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    className={`w-full p-3 border ${theme.border} rounded-md ${theme.inputBg} ${theme.textPrimary} focus:outline-none focus:ring-2 ${theme.focusRing} transition-colors`}
  >
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default SelectField;
