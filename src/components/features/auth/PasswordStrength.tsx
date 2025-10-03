import { CheckCircle, XCircle } from 'lucide-react';

interface PasswordStrengthProps {
  password?: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password = '' }) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[^A-Za-z0-9]/.test(password),
  };

  const requirements = [
    { label: '至少 8 個字元', met: checks.length },
    { label: '包含一個大寫字母', met: checks.uppercase },
    { label: '包含一個小寫字母', met: checks.lowercase },
    { label: '包含一個數字', met: checks.number },
    { label: '包含一個特殊符號', met: checks.specialChar },
  ];

  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-gray-700">密碼要求:</p>
      <ul className="text-sm text-gray-600">
        {requirements.map((req, index) => (
          <li key={index} className={`flex items-center ${req.met ? 'text-green-600' : 'text-red-500'}`}>
            {req.met ? <CheckCircle size={16} className="mr-2" /> : <XCircle size={16} className="mr-2" />}
            {req.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordStrength;
