import theme from "../../constants/theme";

const PageTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="text-center mb-12">
        <h1 className={`text-4xl font-bold ${theme.textPrimary} tracking-tight sm:text-5xl`}>{title}</h1>
        {subtitle && <p className={`mt-4 text-lg ${theme.textSecondary}`}>{subtitle}</p>}
    </div>
);

export default PageTitle;