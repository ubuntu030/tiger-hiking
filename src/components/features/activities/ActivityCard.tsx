import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import theme from '../../../constants/theme';
import type { IActivity } from '../../../types/activity';

interface ActivityCardProps {
  activity: IActivity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const statusStyles = {
    報名登記: 'bg-green-100 text-green-800',
    不可報名: 'bg-amber-100 text-amber-800',
    活動結束: 'bg-stone-200 text-stone-600',
  };

  return (
    <div
      className={`${theme.cardBg} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col`}
    >
      <div className="relative">
        <img
          className="w-full h-56 object-cover"
          src={activity.image}
          alt={activity.name}
        />
        <span
          className={`absolute top-4 right-4 px-3 py-1 text-sm font-semibold rounded-full ${
            statusStyles[activity.status]
          }`}
        >
          {activity.status}
        </span>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className={`text-2xl font-bold ${theme.textPrimary} mb-2`}>
          {activity.name}
        </h3>
        <p className={`flex items-center ${theme.textSecondary} mb-4`}>
          <Calendar className="w-5 h-5 mr-2" />
          {activity.startDate} ~ {activity.endDate}
        </p>
        <p className={`flex-grow ${theme.textSecondary} mb-4 line-clamp-2`}>
          {activity.description}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <p className={`text-xl font-bold ${theme.accent}`}>
            NT$ {activity.priceA.toLocaleString()}
          </p>
          <Link
            to={`/activities/${activity.id}`}
            className="font-semibold text-green-800 hover:text-green-600 transition-colors"
          >
            查看詳情 &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
