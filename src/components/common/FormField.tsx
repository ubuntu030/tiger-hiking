import  theme  from '../../constants/theme';

const FormField = ({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={htmlFor}
      className={`mb-2 font-semibold ${theme.textSecondary}`}
    >
      {label}
    </label>
    {children}
  </div>
);

export default FormField;
