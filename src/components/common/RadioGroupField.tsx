import FormField from './FormField';

interface RadioGroupFieldProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
}

const RadioGroupField = ({
  label,
  name,
  options,
  selectedValue,
  onChange,
  error,
}: RadioGroupFieldProps) => (
  <FormField label={label} htmlFor={name} error={error}>
    <div className="flex items-center space-x-6 mt-1">
      {options.map((option) => (
        <label key={option.value} className="flex items-center cursor-pointer">
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={onChange}
            className="h-4 w-4 text-green-700 border-stone-400 focus:ring-green-700"
          />
          <span className="ml-2 text-stone-700">{option.label}</span>
        </label>
      ))}
    </div>
  </FormField>
);

export default RadioGroupField;
