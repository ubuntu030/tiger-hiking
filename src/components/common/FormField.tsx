import theme from '../../constants/theme';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string | null;
}

const FormField = ({ label, htmlFor, children, error }: FormFieldProps) => (
  <div className="flex flex-col">
    <label
      htmlFor={htmlFor}
      className={`mb-2 font-semibold ${theme.textSecondary}`}
    >
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default FormField;
