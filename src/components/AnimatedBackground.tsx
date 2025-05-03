import React from 'react';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <img 
        src="/logo/svg-background-animated.svg" 
        alt="" 
        className="w-full h-full object-cover"
      />
    </div>
  );
};
