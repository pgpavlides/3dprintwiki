import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: 'blue' | 'red' | 'purple' | 'green' | 'emerald' | 'orange' | 'indigo' | 'pink' | 'yellow';
  showTicks?: boolean;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = 'blue',
  showTicks = true,
  label
}) => {
  const percentage = (value / max) * 100;
  
  const colorClasses = {
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    emerald: 'bg-emerald-500',
    orange: 'bg-orange-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500',
    yellow: 'bg-yellow-500'
  };

  return (
    <div className="w-full">
      <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`absolute left-0 top-0 h-full ${colorClasses[color]} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
        {showTicks && (
          <div className="absolute inset-0 flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="flex-1 border-r border-gray-300 dark:border-gray-600 last:border-r-0" 
              />
            ))}
          </div>
        )}
      </div>
      {label && (
        <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5 text-center">
          {label}
        </div>
      )}
    </div>
  );
};
